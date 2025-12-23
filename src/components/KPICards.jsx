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
        {
            title: 'จำหน่ายออก',
            statusValue: 'Disposed',
            subtitle: 'โอนย้าย/ทำลายแล้ว',
            value: stats.disposed,
            icon: Trash2,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            border: 'border-rose-100',
            progress: stats.all ? (stats.disposed / stats.all) * 100 : 0
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
            {kpis.map((kpi, index) => (
                <div
                    key={index}
                    onClick={() => onStatClick?.(kpi.statusValue)}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden cursor-pointer"
                >
                    {/* Background Icon Detail */}
                    <kpi.icon className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-5 pointer-events-none transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 ${kpi.color}`} />

                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${kpi.bg} p-2.5 rounded-2xl ${kpi.border} border transition-colors duration-300 group-hover:bg-white`}>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                        </div>

                        <div>
                            <p className="text-[11px] uppercase tracking-[0.1em] font-black text-slate-400 mb-1">{kpi.title}</p>
                            <p className="text-[10px] text-slate-300 mb-4 line-clamp-1">{kpi.subtitle}</p>

                            <div className="flex items-end gap-2 mb-4">
                                <span className={`text-5xl font-black tracking-tighter ${kpi.color}`}>{kpi.value}</span>
                                <span className="text-slate-400 text-sm font-bold mb-2 leading-none">รายการ</span>
                            </div>
                        </div>

                        {/* Progress Bar Detail */}
                        <div className="mt-auto pt-2">
                            <div className="w-full bg-slate-50 h-[3px] rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out ${kpi.color.replace('text', 'bg')}`}
                                    style={{ width: `${kpi.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KPICards;
