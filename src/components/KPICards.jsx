import React, { useMemo } from 'react';

const KPICards = ({ data }) => {

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
        { title: 'ทั้งหมด', value: stats.all, color: 'text-blue-600' },
        { title: 'ปกติ', value: stats.normal, color: 'text-emerald-600', statusColor: 'bg-emerald-500' },
        { title: 'ชำรุด', value: stats.repair, color: 'text-amber-600', statusColor: 'bg-amber-500' },
        { title: 'รอตรวจสอบ', value: stats.check, color: 'text-orange-600', statusColor: 'bg-orange-500' },
        { title: 'จำหน่ายออก', value: stats.disposed, color: 'text-red-600', statusColor: 'bg-red-500' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
            {kpis.map((kpi, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-2 truncate">{kpi.title}</p>
                    <div className="flex items-center justify-between">
                        <div className={`text-2xl md:text-3xl font-bold tracking-tight ${kpi.color}`}>{kpi.value}</div>
                        {kpi.statusColor && (
                            <div className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${kpi.statusColor} ring-4 ring-white shadow-sm opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KPICards;
