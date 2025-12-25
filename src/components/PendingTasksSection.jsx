import React, { useMemo } from 'react';
import { Wrench, Search, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import { hasRealImage } from '../utils/assetManager';

const PendingTasksSection = ({ assets, onStatClick, categories = [] }) => {
    const pendingItems = useMemo(() => {
        if (!assets) return { repair: [], check: [], total: 0 };
        
        const repairItems = assets.filter(a => a.status === 'Repair');
        const checkItems = assets.filter(a => a.status === 'Check');
        
        return {
            repair: repairItems.slice(0, 5), // Show top 5
            check: checkItems.slice(0, 5),
            repairCount: repairItems.length,
            checkCount: checkItems.length,
            total: repairItems.length + checkItems.length
        };
    }, [assets]);

    if (pendingItems.total === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-amber-500" />
                    งานที่รอการดำเนินการ
                </h3>
                <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    {pendingItems.total} รายการ
                </span>
            </div>

            <div className={`grid grid-cols-1 ${pendingItems.repairCount > 0 && pendingItems.checkCount > 0 ? 'lg:grid-cols-2' : ''} gap-6`}>
                {/* Repair Items */}
                {pendingItems.repairCount > 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-amber-100 overflow-hidden">
                        <div 
                            onClick={() => onStatClick?.('Repair')}
                            className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-100 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Wrench className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-800">ครุภัณฑ์ชำรุด</h4>
                                        <p className="text-sm text-slate-500 font-medium">รอการซ่อมแซม {pendingItems.repairCount} รายการ</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-amber-600 group-hover:text-amber-700">
                                    <span className="text-xs font-black uppercase tracking-wider">ดูทั้งหมด</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-3">
                            {pendingItems.repair.map((asset, index) => (
                                <div
                                    key={asset.id || index}
                                    onClick={() => onStatClick?.('Repair')}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 cursor-pointer transition-all group/item"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {hasRealImage(asset.image) ? (
                                            <img 
                                                src={asset.image} 
                                                alt={asset.name} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // ซ่อนรูปภาพและแสดง icon แทน
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
                                                return <IconComponent className="w-5 h-5" strokeWidth={2} />;
                                            })()}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-wider truncate">{asset.code}</p>
                                        <p className="text-sm font-bold text-slate-800 truncate">{asset.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{asset.location || 'ไม่ระบุสถานที่'}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-amber-600 group-hover/item:translate-x-1 transition-all shrink-0" />
                                </div>
                            ))}
                            {pendingItems.repairCount > 5 && (
                                <div 
                                    onClick={() => onStatClick?.('Repair')}
                                    className="text-center py-3 text-sm font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                                >
                                    ดูรายการเพิ่มเติม {pendingItems.repairCount - 5} รายการ →
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Check Items */}
                {pendingItems.checkCount > 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                        <div 
                            onClick={() => onStatClick?.('Check')}
                            className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b border-orange-100 cursor-pointer hover:from-orange-100 hover:to-amber-100 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Search className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-800">รอการตรวจสอบ</h4>
                                        <p className="text-sm text-slate-500 font-medium">รอยืนยันสถานะ {pendingItems.checkCount} รายการ</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-orange-600 group-hover:text-orange-700">
                                    <span className="text-xs font-black uppercase tracking-wider">ดูทั้งหมด</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-3">
                            {pendingItems.check.map((asset, index) => (
                                <div
                                    key={asset.id || index}
                                    onClick={() => onStatClick?.('Check')}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 cursor-pointer transition-all group/item"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {hasRealImage(asset.image) ? (
                                            <img 
                                                src={asset.image} 
                                                alt={asset.name} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // ซ่อนรูปภาพและแสดง icon แทน
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
                                                return <IconComponent className="w-5 h-5" strokeWidth={2} />;
                                            })()}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-wider truncate">{asset.code}</p>
                                        <p className="text-sm font-bold text-slate-800 truncate">{asset.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{asset.location || 'ไม่ระบุสถานที่'}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-orange-600 group-hover/item:translate-x-1 transition-all shrink-0" />
                                </div>
                            ))}
                            {pendingItems.checkCount > 5 && (
                                <div 
                                    onClick={() => onStatClick?.('Check')}
                                    className="text-center py-3 text-sm font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                                >
                                    ดูรายการเพิ่มเติม {pendingItems.checkCount - 5} รายการ →
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Card if both exist */}
            {pendingItems.repairCount > 0 && pendingItems.checkCount > 0 && (
                <div 
                    onClick={() => onStatClick?.('All')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <AlertCircle className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white mb-1">มีงานที่ต้องดำเนินการ {pendingItems.total} รายการ</h4>
                                <p className="text-white/90 text-sm font-medium">
                                    ชำรุด {pendingItems.repairCount} รายการ • รอตรวจสอบ {pendingItems.checkCount} รายการ
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <span className="text-sm font-black uppercase tracking-wider">คลิกเพื่อดูรายละเอียด</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingTasksSection;
