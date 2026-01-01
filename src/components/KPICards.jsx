import React, { useMemo } from 'react';
import { Box, CheckCircle2, Wrench, Search, ArrowUpRight, TrendingUp } from 'lucide-react';

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
            gradientFrom: 'from-blue-500',
            gradientTo: 'to-blue-600',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200',
            shadowColor: 'shadow-blue-500/20',
            progress: 100
        },
        {
            title: 'ปกติ',
            statusValue: 'Normal',
            subtitle: 'พร้อมสำหรับการใช้งาน',
            value: stats.normal,
            icon: CheckCircle2,
            gradientFrom: 'from-emerald-500',
            gradientTo: 'to-emerald-600',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-600',
            textColor: 'text-emerald-600',
            borderColor: 'border-emerald-200',
            shadowColor: 'shadow-emerald-500/20',
            progress: stats.all ? (stats.normal / stats.all) * 100 : 0
        },
        {
            title: 'ชำรุด',
            statusValue: 'Repair',
            subtitle: 'รอคิวแจ้งซ่อมบำรุง',
            value: stats.repair,
            icon: Wrench,
            gradientFrom: 'from-amber-500',
            gradientTo: 'to-amber-600',
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-600',
            textColor: 'text-amber-600',
            borderColor: 'border-amber-200',
            shadowColor: 'shadow-amber-500/20',
            progress: stats.all ? (stats.repair / stats.all) * 100 : 0
        },
        {
            title: 'รอตรวจสอบ',
            statusValue: 'Check',
            subtitle: 'กำลังรอการยืนยัน',
            value: stats.check,
            icon: Search,
            gradientFrom: 'from-orange-500',
            gradientTo: 'to-orange-600',
            iconBg: 'bg-orange-500/10',
            iconColor: 'text-orange-600',
            textColor: 'text-orange-600',
            borderColor: 'border-orange-200',
            shadowColor: 'shadow-orange-500/20',
            progress: stats.all ? (stats.check / stats.all) * 100 : 0
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi, index) => (
                <div
                    key={index}
                    onClick={() => onStatClick?.(kpi.statusValue)}
                    className="group relative bg-white rounded-lg p-6 border border-slate-200 cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 card-hover"
                >

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Top Section: Icon and Arrow */}
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${kpi.iconBg} p-3 rounded-lg ${kpi.borderColor} border group-hover:scale-105 transition-transform duration-200`}>
                                <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} strokeWidth={2} />
                            </div>
                            <div className="p-1.5 rounded-md bg-slate-50 group-hover:bg-slate-100 transition-colors duration-200">
                                <ArrowUpRight className={`w-3.5 h-3.5 ${kpi.textColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200`} strokeWidth={2} />
                            </div>
                        </div>

                        {/* Middle Section: Value (Main Focus) */}
                        <div className="flex-1 flex flex-col justify-center mb-4">
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className={`text-4xl lg:text-5xl font-black ${kpi.textColor} tracking-tight leading-none`}>
                                    {kpi.value.toLocaleString('th-TH')}
                                </span>
                                <span className="text-xs font-medium text-slate-400">
                                    รายการ
                                </span>
                            </div>
                        </div>

                        {/* Bottom Section: Title, Subtitle, and Progress */}
                        <div className="mt-auto">
                            {/* Title and Subtitle */}
                            <div className="mb-4">
                                <h3 className="text-sm font-bold text-slate-700 mb-1">
                                    {kpi.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {kpi.subtitle}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">สัดส่วน</span>
                                    <span className={`text-xs font-bold ${kpi.textColor}`}>
                                        {kpi.progress.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-gradient-to-r ${kpi.gradientFrom} ${kpi.gradientTo} rounded-full transition-all duration-1000 ease-out group-hover:shadow-md`}
                                        style={{ width: `${kpi.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Indicator */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${kpi.gradientFrom} ${kpi.gradientTo} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                </div>
            ))}
        </div>
    );
};

export default KPICards;
