import React, { useMemo } from 'react';
import {
    FileText,
    Shield,
    CheckSquare,
    AlertCircle,
    Calendar,
    AlertTriangle,
    TrendingUp,
    PieChart,
    Wallet,
    ArrowRight
} from 'lucide-react';
import { calculateDepreciation } from '../utils/calculations';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';

const ValueStatusSection = ({ data, onStatClick, onCategoryClick, categories = [] }) => {
    // Calculate real financial totals
    const financials = useMemo(() => {
        let totalCapital = 0;
        let totalBookValue = 0;
        let totalAccumulatedDepreciation = 0;
        let totalDisposalValue = 0;

        if (data) {
            data.forEach(asset => {
                const dep = calculateDepreciation(asset.price, asset.purchaseDate, asset.usefulLife);
                totalCapital += asset.price;
                totalBookValue += dep.bookValue;
                totalAccumulatedDepreciation += dep.accumulatedDepreciation;

                if (['Disposed', 'Repair'].includes(asset.status)) {
                    totalDisposalValue += dep.bookValue;
                }
            });
        }
        return { totalCapital, totalBookValue, totalAccumulatedDepreciation, totalDisposalValue };
    }, [data]);

    const categoryStats = useMemo(() => {
        const stats = {};
        let maxVal = 0;
        data.forEach(asset => {
            const cat = asset.category || 'ไม่ระบุ';
            if (!stats[cat]) stats[cat] = 0;
            stats[cat] += asset.price;
            if (stats[cat] > maxVal) maxVal = stats[cat];
        });
        return { stats: Object.entries(stats).sort((a, b) => b[1] - a[1]), maxVal };
    }, [data]);

    const depRatio = financials.totalCapital ? (financials.totalAccumulatedDepreciation / financials.totalCapital) * 100 : 0;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Financial Analytics */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-6 sm:p-8 flex flex-col h-full overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                                สรุปมูลค่าทางบัญชี
                            </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">ภาพรวมการเงินและค่าเสื่อมสะสม</p>
                    </div>
                </div>

                <div className="space-y-5 sm:space-y-6 relative z-10 flex-1">
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group hover:shadow-blue-500/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                        <TrendingUp className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
                        <div className="relative z-10">
                            <p className="text-slate-300 text-xs font-black uppercase tracking-[0.2em] mb-3">ราคาทุนรวม (Total Capital)</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm sm:text-base text-emerald-400 font-bold">฿</span>
                                <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
                                    {financials.totalCapital.toLocaleString()}
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200/50 hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Book Value</p>
                            <p className="text-lg sm:text-xl font-black text-slate-800 group-hover:text-blue-700 transition-colors">฿{Math.round(financials.totalBookValue).toLocaleString()}</p>
                        </div>
                        <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-rose-50/30 rounded-2xl border border-slate-200/50 hover:border-rose-300 hover:shadow-md transition-all duration-300 group">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">เสื่อมสะสม</p>
                            <p className="text-lg sm:text-xl font-black text-rose-600 group-hover:text-rose-700 transition-colors">฿{Math.round(financials.totalAccumulatedDepreciation).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                            <span className="text-slate-500">อัตราการเสื่อมสภาพรวม</span>
                            <span className="text-blue-600 font-bold">{depRatio.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 sm:h-5 rounded-full p-0.5 border border-slate-200/50 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.4)] relative overflow-hidden"
                                style={{ width: `${depRatio}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Category Breakdown */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-6 sm:p-8 flex flex-col overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100/30 to-emerald-100/30 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10 shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <PieChart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                                มูลค่าแยกตามหมวดหมู่
                            </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">สัดส่วนงบประมาณลงทุนจำแนกตามประเภท</p>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-5 relative z-10 flex-1 overflow-y-auto pr-2 max-h-[500px] min-h-[300px] custom-scrollbar">
                    {categoryStats.stats.map(([category, value], i) => {
                        // นับจำนวน asset ในหมวดหมู่นี้
                        const categoryCount = data.filter(a => (a.category || 'ไม่ระบุ') === category).length;
                        const percentage = (value / categoryStats.maxVal) * 100;
                        
                        return (
                            <div 
                                key={i} 
                                onClick={() => onCategoryClick?.(category)}
                                className="group cursor-pointer p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50/80 to-white hover:from-emerald-50/80 hover:to-emerald-50/30 border border-slate-200/50 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex justify-between items-end mb-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-11 h-11 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-300 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                                            {(() => {
                                                const iconName = getIconNameFromCategories(category, categories);
                                                const IconComponent = getCategoryIcon(category, iconName);
                                                return <IconComponent className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors" strokeWidth={2.5} />;
                                            })()}
                                        </div>
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span className="font-black text-slate-700 text-sm sm:text-base group-hover:text-emerald-700 transition-colors truncate">{category}</span>
                                            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                                                {categoryCount} รายการ
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-3 shrink-0">
                                        <span className="text-xs sm:text-sm font-bold text-slate-600 font-mono group-hover:text-emerald-600 transition-colors">฿{value.toLocaleString()}</span>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 h-3 sm:h-3.5 rounded-full overflow-hidden border border-slate-200/50 p-0.5 group-hover:border-emerald-300 transition-colors shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] relative overflow-hidden"
                                        style={{ width: `${percentage}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ValueStatusSection;
