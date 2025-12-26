import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Bell, X, AlertTriangle, Clock, ClipboardCheck, Wrench, Search, ArrowRight, ShieldAlert } from 'lucide-react';
import * as supabaseService from '../services/supabaseService';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import { hasRealImage } from '../utils/assetManager';

const NotificationBell = ({ assets, onAlertClick, onStatClick, onViewInventory, categories = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCycles, setActiveCycles] = useState([]);
    const [cycleProgress, setCycleProgress] = useState({});
    const [loadingCycles, setLoadingCycles] = useState(true);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchActiveCycles();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const fetchActiveCycles = async () => {
        setLoadingCycles(true);
        try {
            const result = await supabaseService.fetchInventoryCycles();
            if (result.status === 'success') {
                const inProgress = result.data.filter(c => c.status === 'In Progress');
                setActiveCycles(inProgress);
                
                // ดึงข้อมูล progress สำหรับแต่ละ cycle
                const progressData = {};
                for (const cycle of inProgress) {
                    try {
                        const summaryResult = await supabaseService.getInventorySummary(cycle.id);
                        if (summaryResult.status === 'success') {
                            progressData[cycle.id] = summaryResult.data.progressPercent || 0;
                        }
                    } catch (error) {
                        console.error(`Error fetching progress for cycle ${cycle.id}:`, error);
                        progressData[cycle.id] = 0;
                    }
                }
                setCycleProgress(progressData);
            }
        } catch (error) {
            console.error('Error fetching inventory cycles:', error);
        } finally {
            setLoadingCycles(false);
        }
    };

    // Asset alerts (อายุการใช้งาน, การซ่อม)
    const alerts = useMemo(() => {
        const now = new Date();
        const results = [];

        assets.forEach(asset => {
            // 1. Useful Life Alert
            if (asset.purchaseDate) {
                const purchaseDate = new Date(asset.purchaseDate);
                const yearsPassed = (now - purchaseDate) / (1000 * 60 * 60 * 24 * 365.25);

                if (yearsPassed >= asset.usefulLife - 1) {
                    results.push({
                        id: `life-${asset.id}`,
                        type: 'life',
                        level: yearsPassed >= asset.usefulLife ? 'critical' : 'warning',
                        title: yearsPassed >= asset.usefulLife ? 'ครบอายุการใช้งาน' : 'ใกล้ครบอายุการใช้งาน',
                        assetName: asset.name,
                        code: asset.code,
                        desc: yearsPassed >= asset.usefulLife
                            ? `ใช้งานมาแล้ว ${yearsPassed.toFixed(1)} ปี (กำหนด ${asset.usefulLife} ปี)`
                            : `จะครบกำหนดในอีก ${(asset.usefulLife - yearsPassed).toFixed(1)} ปี`,
                        icon: Clock,
                        asset: asset
                    });
                }
            }

            // 2. High Value Repair Alert
            if (asset.status === 'Repair' && asset.price > 50000) {
                results.push({
                    id: `repair-${asset.id}`,
                    type: 'repair',
                    level: 'critical',
                    title: 'ทรัพย์สินราคาสูงชำรุด',
                    assetName: asset.name,
                    code: asset.code,
                    desc: 'ครุภัณฑ์มูลค่าสูงกำลังรอการซ่อมแซม โปรดติดตามความคืบหน้า',
                    icon: AlertTriangle,
                    asset: asset
                });
            }
        });

        results.sort((a, b) => {
            if (a.level === 'critical' && b.level !== 'critical') return -1;
            if (a.level !== 'critical' && b.level === 'critical') return 1;
            return 0;
        });

        return results;
    }, [assets]);

    // Pending tasks
    const pendingItems = useMemo(() => {
        if (!assets) return { repair: [], check: [], total: 0 };
        
        const repairItems = assets.filter(a => a.status === 'Repair');
        const checkItems = assets.filter(a => a.status === 'Check');
        
        return {
            repair: repairItems.slice(0, 5),
            check: checkItems.slice(0, 5),
            repairCount: repairItems.length,
            checkCount: checkItems.length,
            total: repairItems.length + checkItems.length
        };
    }, [assets]);

    const totalNotifications = alerts.length + (!loadingCycles && activeCycles.length > 0 ? activeCycles.length : 0) + pendingItems.total;
    const hasNotifications = totalNotifications > 0;

    if (!hasNotifications) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
                <Bell className="w-5 h-5" />
                {totalNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                        {totalNotifications > 99 ? '99+' : totalNotifications}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-96 max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 z-50">
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-rose-500" />
                                <h3 className="text-sm font-black text-slate-800">การแจ้งเตือนและการเฝ้าระวัง</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Inventory Cycles */}
                            {!loadingCycles && activeCycles.length > 0 && (
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <ClipboardCheck className="w-4 h-4 text-blue-600" />
                                        <h4 className="text-sm font-black text-slate-800">มีการตรวจนับกำลังดำเนินการ</h4>
                                    </div>
                                    <div className="space-y-2">
                                        {activeCycles.slice(0, 3).map((cycle) => {
                                            const progress = cycleProgress[cycle.id] || 0;
                                            return (
                                                <div
                                                    key={cycle.id}
                                                    className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-xs text-slate-800 truncate">{cycle.cycle_name}</p>
                                                            <p className="text-[10px] text-slate-500 mt-0.5">
                                                                {new Date(cycle.start_date).toLocaleDateString('th-TH')} - {new Date(cycle.end_date).toLocaleDateString('th-TH')}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                onViewInventory?.(cycle);
                                                                setIsOpen(false);
                                                            }}
                                                            className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center shrink-0"
                                                        >
                                                            ดู
                                                            <ArrowRight className="w-3 h-3 ml-1" />
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Progress Bar */}
                                                    <div className="mt-2 pt-2 border-t border-blue-100">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="text-[9px] font-semibold text-slate-500">ความคืบหน้า</span>
                                                            <span className="text-[9px] font-bold text-blue-600">{progress.toFixed(0)}%</span>
                                                        </div>
                                                        <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                                                                style={{ width: `${progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Asset Alerts */}
                            {alerts.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 px-1">การแจ้งเตือนทรัพย์สิน</h4>
                                    <div className="space-y-2">
                                        {alerts.slice(0, 5).map(alert => (
                                            <div
                                                key={alert.id}
                                                onClick={() => {
                                                    onAlertClick?.(alert.asset);
                                                    setIsOpen(false);
                                                }}
                                                className={`p-3 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                                                    alert.level === 'critical'
                                                        ? 'bg-rose-50/50 border-rose-100 hover:border-rose-300'
                                                        : 'bg-amber-50/50 border-amber-100 hover:border-amber-300'
                                                }`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <div className={`p-1.5 rounded-lg ${alert.level === 'critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                                        <alert.icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h5 className={`text-xs font-black ${alert.level === 'critical' ? 'text-rose-900' : 'text-amber-900'}`}>
                                                                {alert.title}
                                                            </h5>
                                                            <span className="text-[9px] font-black text-slate-400">{alert.code}</span>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-slate-700 truncate mb-0.5">{alert.assetName}</p>
                                                        <p className="text-[9px] text-slate-500 line-clamp-1">{alert.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pending Tasks */}
                            {pendingItems.total > 0 && (
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 px-1">งานที่รอการดำเนินการ</h4>
                                    
                                    {pendingItems.repairCount > 0 && (
                                        <div className="mb-3">
                                            <div 
                                                onClick={() => {
                                                    onStatClick?.('Repair');
                                                    setIsOpen(false);
                                                }}
                                                className="bg-gradient-to-r from-amber-50 to-orange-50 p-2 rounded-lg border border-amber-100 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-all mb-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Wrench className="w-4 h-4 text-amber-600" />
                                                        <span className="text-xs font-black text-slate-800">ครุภัณฑ์ชำรุด ({pendingItems.repairCount})</span>
                                                    </div>
                                                    <ArrowRight className="w-3 h-3 text-amber-600" />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                {pendingItems.repair.slice(0, 3).map((asset, index) => (
                                                    <div
                                                        key={asset.id || index}
                                                        onClick={() => {
                                                            onStatClick?.('Repair');
                                                            setIsOpen(false);
                                                        }}
                                                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 cursor-pointer transition-all"
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                            {hasRealImage(asset.image) ? (
                                                                <img 
                                                                    src={asset.image} 
                                                                    alt={asset.name} 
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        const iconContainer = e.target.nextElementSibling;
                                                                        if (iconContainer) {
                                                                            iconContainer.style.display = 'flex';
                                                                        }
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <div className={`w-full h-full flex items-center justify-center text-amber-500 ${hasRealImage(asset.image) ? 'hidden' : 'flex'}`}>
                                                                {(() => {
                                                                    const iconName = getIconNameFromCategories(asset.category, categories);
                                                                    const IconComponent = getCategoryIcon(asset.category, iconName);
                                                                    return <IconComponent className="w-3.5 h-3.5" strokeWidth={2} />;
                                                                })()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider truncate">{asset.code}</p>
                                                            <p className="text-[10px] font-bold text-slate-800 truncate">{asset.name}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {pendingItems.checkCount > 0 && (
                                        <div>
                                            <div 
                                                onClick={() => {
                                                    onStatClick?.('Check');
                                                    setIsOpen(false);
                                                }}
                                                className="bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded-lg border border-orange-100 cursor-pointer hover:from-orange-100 hover:to-amber-100 transition-all mb-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Search className="w-4 h-4 text-orange-600" />
                                                        <span className="text-xs font-black text-slate-800">รอการตรวจสอบ ({pendingItems.checkCount})</span>
                                                    </div>
                                                    <ArrowRight className="w-3 h-3 text-orange-600" />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                {pendingItems.check.slice(0, 3).map((asset, index) => (
                                                    <div
                                                        key={asset.id || index}
                                                        onClick={() => {
                                                            onStatClick?.('Check');
                                                            setIsOpen(false);
                                                        }}
                                                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 cursor-pointer transition-all"
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                            {hasRealImage(asset.image) ? (
                                                                <img 
                                                                    src={asset.image} 
                                                                    alt={asset.name} 
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        const iconContainer = e.target.nextElementSibling;
                                                                        if (iconContainer) {
                                                                            iconContainer.style.display = 'flex';
                                                                        }
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <div className={`w-full h-full flex items-center justify-center text-orange-500 ${hasRealImage(asset.image) ? 'hidden' : 'flex'}`}>
                                                                {(() => {
                                                                    const iconName = getIconNameFromCategories(asset.category, categories);
                                                                    const IconComponent = getCategoryIcon(asset.category, iconName);
                                                                    return <IconComponent className="w-3.5 h-3.5" strokeWidth={2} />;
                                                                })()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider truncate">{asset.code}</p>
                                                            <p className="text-[10px] font-bold text-slate-800 truncate">{asset.name}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationBell;

