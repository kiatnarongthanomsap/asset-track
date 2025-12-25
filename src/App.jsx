import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Package,
    BarChart3,
    Settings,
    Menu,
    X,
    CreditCard,
    LogOut,
    ClipboardCheck
} from 'lucide-react';

import { INITIAL_DATA } from './data/mockData';
import { ASSET_CATEGORIES } from './utils/assetManager';

import CoopHeader from './components/CoopHeader';
import KPICards from './components/KPICards';
import ValueStatusSection from './components/ValueStatusSection';
import AuditTrailTable from './components/AuditTrailTable';
import ActionZone from './components/ActionZone';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import AssetRegistry from './components/AssetRegistry';
import EditAssetModal from './components/EditAssetModal';
import RepairRequestModal from './components/RepairRequestModal';
import LoginPage from './components/LoginPage';
import StickerPrintModal from './components/StickerPrintModal';
import AlertSection from './components/AlertSection';
import ExcelImportModal from './components/ExcelImportModal';
import PendingTasksSection from './components/PendingTasksSection';
import InventoryAlertSection from './components/InventoryAlertSection';
import InventoryCycleManager from './components/InventoryCycleManager';
import InventoryCountingView from './components/InventoryCountingView';
import InventoryReconciliation from './components/InventoryReconciliation';
import InventoryReport from './components/InventoryReport';
import { AUDIT_LOGS } from './data/mockData';
import * as supabaseService from './services/supabaseService';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // -- State Management --
    const [user, setUser] = useState(null);
    const [assets, setAssets] = useState(INITIAL_DATA);
    const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);
    const [categories, setCategories] = useState(ASSET_CATEGORIES);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [currentAsset, setCurrentAsset] = useState(null);
    const [assetFilter, setAssetFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [repairAsset, setRepairAsset] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [inventoryView, setInventoryView] = useState('manager'); // manager, counting, reconciliation, report

    // -- API Interaction --
    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const [assetsData, logsData, catsData] = await Promise.all([
                supabaseService.fetchAssets(),
                supabaseService.fetchAuditLogs(),
                supabaseService.fetchCategories()
            ]);

            // ใช้ข้อมูลจาก Supabase ถ้ามี (และไม่ว่าง)
            if (assetsData && assetsData.length > 0) {
                // ไม่ตั้งค่า default image - ให้แสดง icon แทนเมื่อไม่มีรูป
                setAssets(assetsData);
            } else {
                console.warn('No assets from Supabase, using mock data');
            }

            if (logsData && logsData.length > 0) {
                setAuditLogs(logsData);
            } else {
                console.warn('No audit logs from Supabase, using mock data');
            }

            // เก็บ categories เป็น objects (มี name, icon_name, และ useful_life)
            if (catsData && catsData.length > 0) {
                // แปลง useful_life เป็น usefulLife และ icon_name เป็น iconName
                const formattedCategories = catsData.map(cat => ({
                    ...cat,
                    usefulLife: cat.useful_life || cat.usefulLife || 5,
                    iconName: cat.icon_name || cat.iconName || null
                }));
                setCategories(formattedCategories);
            } else {
                // ใช้ mock categories (แปลงเป็น objects)
                const mockCategories = ASSET_CATEGORIES.map(c => {
                    if (typeof c === 'string') {
                        return { name: c, icon_name: null, useful_life: 5, usefulLife: 5 };
                    }
                    return { 
                        name: c.name || c, 
                        icon_name: null, 
                        useful_life: c.usefulLife || 5,
                        usefulLife: c.usefulLife || 5
                    };
                });
                setCategories(mockCategories);
                console.warn('No categories from Supabase, using mock data');
            }
        } catch (error) {
            console.error('Failed to fetch data from Supabase:', error);
            console.log('Falling back to mock data');
            // ใช้ mock data เป็น fallback (แปลงเป็น objects)
            const mockCategories = ASSET_CATEGORIES.map(c => {
                if (typeof c === 'string') {
                    return { name: c, icon_name: null, useful_life: 5, usefulLife: 5 };
                }
                return { 
                    name: c.name || c, 
                    icon_name: null, 
                    useful_life: c.usefulLife || 5,
                    usefulLife: c.usefulLife || 5
                };
            });
            setCategories(mockCategories);
        }
    };

    const handleDashboardStatClick = (status) => {
        setAssetFilter(status);
        setCategoryFilter(null);
        setActiveTab('assets');
    };

    const handleCategoryClick = (category) => {
        setCategoryFilter(category);
        setAssetFilter('All');
        setActiveTab('assets');
    };

    const handleAddAsset = () => {
        if (!supabaseService.canManageAssets(user)) {
            alert('คุณไม่มีสิทธิ์เพิ่มทรัพย์สิน');
            return;
        }
        // Create an empty asset template
        const newAsset = {
            id: Date.now(), // temporary ID
            code: '',
            name: '',
            brand: '',
            color: '',
            category: '',
            serial: '',
            price: 0,
            purchaseDate: '',
            usefulLife: 5,
            location: '',
            status: 'Normal',
            custodian: '',
            vendor: '',
            warrantyExpiry: '',
            notes: '',
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'
        };
        setCurrentAsset(newAsset);
        setIsEditModalOpen(true);
    };

    const handleEditAsset = (asset) => {
        setCurrentAsset(asset);
        setIsEditModalOpen(true);
    };

    const handleRepairRequest = (asset) => {
        setRepairAsset(asset);
    };

    const handleSaveAsset = async (savedAsset) => {
        try {
            const result = await supabaseService.saveAsset(savedAsset);
            if (result.status === 'success') {
                fetchData(); // Refresh all data
                setIsEditModalOpen(false);
            } else {
                console.error('Failed to save asset:', result.message);
                alert('ไม่สามารถบันทึกข้อมูลได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Failed to save asset:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    const handleUpdateStatus = async (assetId, newStatus) => {
        const asset = assets.find(a => a.id === assetId);
        if (!asset) return;

        try {
            const result = await supabaseService.updateAssetStatus(assetId, newStatus);
            if (result.status === 'success') {
                fetchData();
            } else {
                console.error('Failed to update status:', result.message);
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const navItems = [
        { id: 'dashboard', label: 'ภาพรวม (Dashboard)', icon: LayoutDashboard },
        { id: 'assets', label: 'ทะเบียนทรัพย์สิน', icon: Package },
        { id: 'inventory', label: 'ตรวจนับครุภัณฑ์', icon: ClipboardCheck },
        { id: 'reports', label: 'รายงานธุรกรรม', icon: BarChart3 },
        { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings },
    ];

    if (!user) {
        return <LoginPage onLogin={setUser} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
            <div className="fixed inset-0 bg-gray-50/50 pointer-events-none z-0"></div>

            {/* Edit Modal */}
            <EditAssetModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                asset={currentAsset}
                onSave={handleSaveAsset}
                categories={categories}
            />

            {/* Sticker Modal */}
            <StickerPrintModal
                isOpen={isStickerModalOpen}
                onClose={() => setIsStickerModalOpen(false)}
                assets={assets}
                categories={categories}
                onDataChange={fetchData}
            />

            {/* Excel Import Modal */}
            <ExcelImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportComplete={fetchData}
            />

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
                <div className="p-8 pb-4 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <span className="font-bold">A</span>
                            </div>
                            <h1 className="text-xl font-bold text-white tracking-wide">AssetTrack</h1>
                        </div>
                        <p className="text-xs text-emerald-300/80 font-medium tracking-wider uppercase ml-1">Kasetsart Univ. Co-op</p>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-emerald-300 hover:text-white p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        // Check if user has permission to access settings
                        if (item.id === 'settings' && user && !supabaseService.canAccessSettings(user)) {
                            return null; // Don't show settings menu if no permission
                        }
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    // Double check permission before switching to settings
                                    if (item.id === 'settings' && user && !supabaseService.canAccessSettings(user)) {
                                        alert('คุณไม่มีสิทธิ์เข้าถึงการตั้งค่า');
                                        return;
                                    }
                                    setActiveTab(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${activeTab === item.id
                                    ? 'bg-white/10 text-white shadow-lg border border-white/10'
                                    : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {activeTab === item.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-l-xl"></div>
                                )}
                                <item.icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-emerald-300' : 'text-emerald-400/50'}`} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-6">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-[2px] shrink-0">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                                    SM
                                </div>
                            </div>
                            <div className="ml-3 overflow-hidden flex-1">
                                <p className="text-sm font-bold text-white truncate">{user?.name || 'Staff Member'}</p>
                                <p className="text-xs text-emerald-300 truncate">{user?.role || 'Asset Officer'}</p>
                            </div>
                            <button
                                onClick={() => setUser(null)}
                                className="ml-2 p-2 rounded-xl text-emerald-300 hover:bg-white/10 hover:text-white transition-all group"
                                title="ออกจากระบบ"
                            >
                                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-screen flex flex-col relative z-10 w-full">

                {/* Mobile Header */}
                <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-30 shadow-sm">
                    <span className="font-bold text-slate-800 text-lg">AssetTrack</span>
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* --- Content Area --- */}
                {activeTab === 'dashboard' && (
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6 sm:space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Welcome Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-1">
                                    ยินดีต้อนรับกลับมา, <span className="text-emerald-600">Staff Member</span> 👋
                                </h2>
                                <p className="text-slate-400 font-bold text-sm flex items-center">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                                    วันนี้วันที่ {new Date().toLocaleDateString('th-TH', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">สถานะระบบ</p>
                                    <p className="text-emerald-600 font-black text-sm">พร้อมใช้งาน (Live)</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                                </div>
                            </div>
                        </div>


                        <InventoryAlertSection
                            onViewInventory={(cycle) => {
                                setSelectedCycle(cycle);
                                setActiveTab('inventory');
                                setInventoryView('counting');
                            }}
                        />

                        <AlertSection 
                            assets={assets}
                            onAlertClick={handleEditAsset}
                        />

                        <PendingTasksSection
                            assets={assets}
                            onStatClick={handleDashboardStatClick}
                            categories={categories}
                        />

                        <KPICards
                            data={assets}
                            onStatClick={handleDashboardStatClick}
                        />
                        <ValueStatusSection
                            data={assets}
                            onStatClick={handleDashboardStatClick}
                            onCategoryClick={handleCategoryClick}
                            categories={categories}
                        />

                        <div className="grid grid-cols-1 gap-8">
                            <AuditTrailTable logs={auditLogs} />
                            <ActionZone
                                assets={assets}
                                onAddAsset={handleAddAsset}
                                onTabChange={setActiveTab}
                                onPrintStickers={() => setIsStickerModalOpen(true)}
                                onImportExcel={() => {
                                    if (!supabaseService.canImportAssets(user)) {
                                        alert('คุณไม่มีสิทธิ์นำเข้าข้อมูล');
                                        return;
                                    }
                                    setIsImportModalOpen(true);
                                }}
                                user={user}
                            />
                        </div>
                    </div>
                )}

                {/* Asset Registry View */}
                {activeTab === 'assets' && (
                    <AssetRegistry user={user}
                        data={assets}
                        onEditAsset={handleEditAsset}
                        onAddAsset={handleAddAsset}
                        onRepairRequest={handleRepairRequest}
                        initialFilter={assetFilter}
                        onFilterChange={setAssetFilter}
                        initialCategoryFilter={categoryFilter}
                        onCategoryFilterChange={setCategoryFilter}
                        categories={categories}
                    />
                )}

                {/* Inventory View */}
                {activeTab === 'inventory' && (
                    <>
                        {inventoryView === 'manager' && (
                            <InventoryCycleManager
                                user={user}
                                onCycleSelect={(cycle) => {
                                    setSelectedCycle(cycle);
                                    setInventoryView('counting');
                                }}
                                onViewChange={(view) => {
                                    setInventoryView(view);
                                }}
                            />
                        )}
                        {inventoryView === 'counting' && selectedCycle && (
                            <InventoryCountingView
                                cycle={selectedCycle}
                                user={user}
                                onBack={() => {
                                    setSelectedCycle(null);
                                    setInventoryView('manager');
                                }}
                            />
                        )}
                        {inventoryView === 'reconciliation' && selectedCycle && (
                            <InventoryReconciliation
                                cycle={selectedCycle}
                                user={user}
                                onBack={() => {
                                    setSelectedCycle(null);
                                    setInventoryView('manager');
                                }}
                            />
                        )}
                        {inventoryView === 'report' && selectedCycle && (
                            <InventoryReport
                                cycle={selectedCycle}
                                onBack={() => {
                                    setSelectedCycle(null);
                                    setInventoryView('manager');
                                }}
                            />
                        )}
                    </>
                )}

                {/* Reports View */}
                {activeTab === 'reports' && (
                    <ReportsView
                        data={assets}
                        onUpdateStatus={handleUpdateStatus}
                        categories={categories}
                    />
                )}

                {/* Settings View */}
                {activeTab === 'settings' && (
                    <SettingsView user={user}
                        categories={categories}
                        setCategories={setCategories}
                        assets={assets}
                        setAssets={setAssets}
                        onDataChange={fetchData}
                    />
                )}

                {repairAsset && (
                    <RepairRequestModal
                        asset={repairAsset}
                        onClose={() => setRepairAsset(null)}
                        categories={categories}
                    />
                )}

            </main>
        </div>
    );
}
