import React, { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    BarChart3,
    Settings,
    Menu,
    X,
    CreditCard
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

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // -- State Management --
    const [assets, setAssets] = useState(INITIAL_DATA);
    const [categories, setCategories] = useState(ASSET_CATEGORIES);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAsset, setCurrentAsset] = useState(null);
    const [assetFilter, setAssetFilter] = useState('All');

    const handleDashboardStatClick = (status) => {
        setAssetFilter(status);
        setActiveTab('assets');
    };

    const handleAddAsset = () => {
        // Create an empty asset template
        const newAsset = {
            id: Date.now(), // temporary ID
            code: '',
            name: '',
            brand: '',
            category: '',
            serial: '',
            price: 0,
            purchaseDate: new Date().toISOString().split('T')[0],
            usefulLife: 5,
            location: '',
            status: 'Normal',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400'
        };
        setCurrentAsset(newAsset);
        setIsEditModalOpen(true);
    };

    const handleEditAsset = (asset) => {
        setCurrentAsset(asset);
        setIsEditModalOpen(true);
    };

    const handleSaveAsset = (savedAsset) => {
        setAssets(prevAssets => {
            const exists = prevAssets.find(a => a.id === savedAsset.id);
            if (exists) {
                return prevAssets.map(a => a.id === savedAsset.id ? savedAsset : a);
            } else {
                return [...prevAssets, savedAsset];
            }
        });
        setIsEditModalOpen(false);
    };

    const navItems = [
        { id: 'dashboard', label: 'ภาพรวม (Dashboard)', icon: LayoutDashboard },
        { id: 'assets', label: 'ทะเบียนทรัพย์สิน', icon: Package },
        { id: 'reports', label: 'รายงานธุรกรรม', icon: BarChart3 },
        { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings },
    ];

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
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
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
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-6">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-[2px] shrink-0">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                                    SM
                                </div>
                            </div>
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">Staff Member</p>
                                <p className="text-xs text-emerald-300 truncate">Asset Officer</p>
                            </div>
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
                    <div className="p-4 md:p-10 w-full max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

                        <CoopHeader />
                        <KPICards
                            data={assets}
                            onStatClick={handleDashboardStatClick}
                        />
                        <ValueStatusSection
                            data={assets}
                            onStatClick={handleDashboardStatClick}
                        />

                        <div className="grid grid-cols-1 gap-8">
                            <AuditTrailTable />
                            <ActionZone />
                        </div>
                    </div>
                )}

                {/* Asset Registry View */}
                {activeTab === 'assets' && (
                    <AssetRegistry
                        data={assets}
                        onEditAsset={handleEditAsset}
                        onAddAsset={handleAddAsset}
                        initialFilter={assetFilter}
                        onFilterChange={setAssetFilter}
                    />
                )}

                {/* Reports View */}
                {activeTab === 'reports' && (
                    <ReportsView data={assets} />
                )}

                {/* Settings View */}
                {activeTab === 'settings' && (
                    <SettingsView
                        categories={categories}
                        setCategories={setCategories}
                    />
                )}

            </main>
        </div>
    );
}
