import React, { useMemo } from 'react';
import { Box, CheckCircle2, Wrench, Search, Trash2, ArrowUpRight } from 'lucide-react';

const KPICards = ({ data, onStatClick }) => {
    const stats = useMemo(() => {
        if (!data) return { all: 0, normal: 0, repair: 0, check: 0, disposed: 0 };
        return {
            all: data.length,
            normal: data.filter(a => a.status === 'Normal').length,
            repair: data.filter(a => a.status === 'Repair').length,
            check: data.filter(a => a.status === 'Check').length,
            disposed: data.filter(a => a.status === 'Disposed').length,
        };
    }, [data]);

    const kpis = [
        {
            title: 'ทั้งหมด',
            statusValue: 'All',
            subtitle: 'รายการทุกรายการในระบบ',
            value: stats.all,
            icon: Box,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            progress: 100
        },
        {
            title: 'ปกติ',
            statusValue: 'Normal',
            subtitle: 'พร้อมสำหรับการใช้งาน',
            value: stats.normal,
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            progress: stats.all ? (stats.normal / stats.all) * 100 : 0
        },
        {
            title: 'ชำรุด',
            statusValue: 'Repair',
            subtitle: 'รอคิวแจ้งซ่อมบำรุง',
            value: stats.repair,
            icon: Wrench,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            progress: stats.all ? (stats.repair / stats.all) * 100 : 0
        },
        {
            title: 'รอตรวจสอบ',
            statusValue: 'Check',
            subtitle: 'กำลังรอการยืนยัน',
            value: stats.check,
            icon: Search,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            progress: stats.all ? (stats.check / stats.all) * 100 : 0
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {kpis.map((kpi, index) => (
                <div
                    key={index}
                    onClick={() => onStatClick?.(kpi.statusValue)}
                    className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bg.replace('bg-', 'from-')} to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex items-center justify-between mb-5">
                            <div className={`${kpi.bg} p-3 rounded-xl ${kpi.border} border-2 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                                <kpi.icon className={`w-6 h-6 ${kpi.color}`} strokeWidth={2.5} />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                        </div>

                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5">{kpi.title}</p>
                            <p className="text-[11px] text-slate-400 mb-5 line-clamp-1">{kpi.subtitle}</p>

                            <div className="flex items-baseline gap-2 mb-5">
                                <span className={`text-4xl sm:text-5xl font-black tracking-tight ${kpi.color} drop-shadow-sm`}>{kpi.value}</span>
                                <span className="text-slate-400 text-sm font-semibold mb-1">รายการ</span>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default KPICards;
