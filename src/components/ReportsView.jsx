import React, { useMemo } from 'react';
import { PieChart, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ReportsView = ({ data }) => {
    // คำนวณข้อมูลสำหรับรายงาน
    const summaryByCategory = useMemo(() => {
        const groups = {};
        let maxVal = 0;
        data.forEach(item => {
            if (!groups[item.category]) groups[item.category] = { count: 0, value: 0 };
            groups[item.category].count += 1;
            groups[item.category].value += item.price;
            if (groups[item.category].value > maxVal) maxVal = groups[item.category].value;
        });
        return { groups, maxVal };
    }, [data]);

    const summaryByLocation = useMemo(() => {
        const groups = {};
        data.forEach(item => {
            const loc = item.location || 'ไม่ระบุ';
            if (!groups[loc]) groups[loc] = 0;
            groups[loc] += 1;
        });
        // Convert to array and sort by count
        return Object.entries(groups).sort((a, b) => b[1] - a[1]);
    }, [data]);

    const maintenanceList = useMemo(() => {
        return data.filter(item => ['Repair', 'Check'].includes(item.status));
    }, [data]);

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">รายงานสรุปผล</h2>
                <p className="text-gray-500">วิเคราะห์ข้อมูลงบประมาณและสถานะครุภัณฑ์</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Category Value Report */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <PieChart className="w-5 h-5 mr-2 text-blue-500" />
                            มูลค่าตามหมวดหมู่
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(summaryByCategory.groups).map(([cat, info]) => (
                            <div key={cat} className="group">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{cat}</span>
                                    <span className="text-gray-900 font-mono">
                                        {info.value.toLocaleString()} บาท ({info.count} รายการ)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out group-hover:bg-blue-600"
                                        style={{ width: `${(info.value / summaryByCategory.maxVal) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Location Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                            การกระจายตัวตามสถานที่
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {summaryByLocation.map(([loc, count], index) => (
                            <div key={loc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mr-3">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{loc}</span>
                                </div>
                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Action Required Report */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-orange-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-orange-800 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        รายการที่ต้องดำเนินการ (แจ้งซ่อม/รอตรวจสอบ)
                    </h3>
                    <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {maintenanceList.length} รายการ
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-3">รหัสครุภัณฑ์</th>
                                <th className="px-6 py-3">รายการ</th>
                                <th className="px-6 py-3">สถานที่</th>
                                <th className="px-6 py-3">สถานะ</th>
                                <th className="px-6 py-3 text-right">ดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {maintenanceList.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm text-blue-600">{item.code}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {item.name}
                                        <div className="text-xs text-gray-500">{item.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                                            เปิดใบงานซ่อม
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {maintenanceList.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">
                                        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                                        ไม่มีรายการที่ต้องดำเนินการในขณะนี้
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsView;
