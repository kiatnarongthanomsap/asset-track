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

const ValueStatusSection = ({ data, onStatClick }) => {
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Left: Financial Analytics */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/30 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center">
                            <Wallet className="w-6 h-6 mr-3 text-blue-600" />
                            สรุปมูลค่าทางบัญชี
                        </h3>
                        <p className="text-sm text-slate-400 font-medium">ภาพรวมการเงินและค่าเสื่อมสะสม</p>
                    </div>
                </div>

                <div className="space-y-6 relative z-10 flex-1">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                        <TrendingUp className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">ราคาทุนรวม (Total Capital)</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs text-emerald-400">฿</span>
                            <h4 className="text-5xl font-black tracking-tighter">
                                {financials.totalCapital.toLocaleString()}
                            </h4>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Book Value</p>
                            <p className="text-xl font-black text-slate-800">฿{Math.round(financials.totalBookValue).toLocaleString()}</p>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-200 transition-colors">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">เสื่อมสะสม</p>
                            <p className="text-xl font-black text-rose-600">฿{Math.round(financials.totalAccumulatedDepreciation).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                            <span className="text-slate-400">อัตราการเสื่อมสภาพรวม</span>
                            <span className="text-blue-600">{depRatio.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded-full p-1 border border-slate-200/50">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                style={{ width: `${depRatio}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Category Breakdown */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 h-full flex flex-col overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50/30 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center">
                            <PieChart className="w-6 h-6 mr-3 text-emerald-600" />
                            มูลค่าแยกตามหมวดหมู่
                        </h3>
                        <p className="text-sm text-slate-400 font-medium">สัดส่วนงบประมาณลงทุนจำแนกตามประเภท</p>
                    </div>
                </div>

                <div className="space-y-6 relative z-10 flex-1 overflow-y-auto pr-2">
                    {categoryStats.stats.map(([category, value], i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-black text-slate-700 text-sm">{category}</span>
                                <span className="text-xs font-bold text-slate-400 font-mono">฿{value.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100 p-0.5">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000 group-hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                    style={{ width: `${(value / categoryStats.maxVal) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ValueStatusSection;
