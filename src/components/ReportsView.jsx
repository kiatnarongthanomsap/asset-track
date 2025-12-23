import React, { useMemo, useState } from 'react';
import {
    PieChart,
    MapPin,
    AlertCircle,
    CheckCircle2,
    FileText,
    BarChart,
    Printer,
    Download,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { exportAssetsToCSV } from '../utils/assetManager';

const ReportsView = ({ data }) => {
    const [reportMode, setReportMode] = useState('analytics'); // 'analytics' or 'detailed'

    // Grouping for Analytics
    const summaryByCategory = useMemo(() => {
        const groups = {};
        let maxVal = 0;
        data.forEach(item => {
            const cat = item.category || 'ไม่ระบุ';
            if (!groups[cat]) groups[cat] = { count: 0, value: 0 };
            groups[cat].count += 1;
            groups[cat].value += item.price;
            if (groups[cat].value > maxVal) maxVal = groups[cat].value;
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
        return Object.entries(groups).sort((a, b) => b[1] - a[1]);
    }, [data]);

    const maintenanceList = useMemo(() => {
        return data.filter(item => ['Repair', 'Check'].includes(item.status));
    }, [data]);

    // Grouping for Detailed Report
    const groupedData = useMemo(() => {
        const groups = {};
        data.forEach(item => {
            const cat = item.category || 'ไม่ระบุ';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(item);
        });
        return groups;
    }, [data]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6 print:p-0">
            {/* Header - Hidden on Print */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">รายงานธุรกรรมและวิเคราะห์</h2>
                    <p className="text-slate-500 mt-1">สรุปภาพรวมและรายละเอียดทรัพย์สินในระบบ</p>
                </div>

                <div className="flex gap-2">
                    <div className="bg-slate-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setReportMode('analytics')}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${reportMode === 'analytics' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <BarChart className="w-4 h-4 mr-2" /> สถิติภาพรวม
                        </button>
                        <button
                            onClick={() => setReportMode('detailed')}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${reportMode === 'detailed' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <FileText className="w-4 h-4 mr-2" /> รายงานสรุปตามหมวด
                        </button>
                    </div>

                    <button
                        onClick={() => exportAssetsToCSV(data)}
                        className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                        <Download className="w-4 h-4 mr-2 text-blue-600" /> Excel
                    </button>

                    <button
                        onClick={handlePrint}
                        className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                    >
                        <Printer className="w-4 h-4 mr-2" /> พิมพ์รายงาน
                    </button>
                </div>
            </div>

            {reportMode === 'analytics' ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 1. Category Value Report */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-800 flex items-center">
                                    <PieChart className="w-5 h-5 mr-2 text-blue-500" />
                                    มูลค่าสะสมตามหมวดหมู่
                                </h3>
                            </div>
                            <div className="space-y-5">
                                {Object.entries(summaryByCategory.groups).map(([cat, info]) => (
                                    <div key={cat} className="group">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-bold text-slate-700">{cat}</span>
                                            <span className="text-slate-500 font-mono text-xs">
                                                ฿{info.value.toLocaleString()} ({info.count} ชิ้น)
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-50 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-700 ease-out group-hover:bg-emerald-600"
                                                style={{ width: `${(info.value / summaryByCategory.maxVal) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Location Distribution */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-800 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-rose-500" />
                                    จำนวนทรัพยากรตามสถานที่
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {summaryByLocation.map(([loc, count], index) => (
                                    <div key={loc} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all hover:bg-emerald-50/30 group">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-xl bg-white shadow-sm text-slate-800 flex items-center justify-center text-xs font-bold mr-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                {index + 1}
                                            </div>
                                            <span className="text-sm text-slate-600 font-bold">{loc}</span>
                                        </div>
                                        <span className="text-sm font-bold text-emerald-600 px-2 py-1">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Action Required Report */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-8 py-5 border-b border-slate-50 bg-amber-50/30 flex justify-between items-center">
                            <h3 className="font-bold text-amber-900 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                รายการที่รอการซ่อมแซมหรือตรวจสอบ
                            </h3>
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-black rounded-full">
                                {maintenanceList.length} รายการ
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-xs text-slate-400 uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-8 py-4">รหัสครุภัณฑ์</th>
                                        <th className="px-8 py-4">รายการ / ยี่ห้อ</th>
                                        <th className="px-8 py-4">สถานที่ตั้ง</th>
                                        <th className="px-8 py-4">สถานะ</th>
                                        <th className="px-8 py-4 text-right">การดำเนินการ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {maintenanceList.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.code}</span>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-800">
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-xs text-slate-400 font-medium">{item.brand}</div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-600 font-medium">{item.location}</td>
                                            <td className="px-8 py-5">
                                                <StatusBadge status={item.status} />
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="text-xs font-black text-emerald-600 hover:text-emerald-800 px-4 py-2 bg-emerald-50 rounded-xl transition-all hover:shadow-sm">
                                                    จัดการสถานะ
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {maintenanceList.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="p-16 text-center text-slate-300">
                                                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                                <p className="font-bold">เรียบร้อย! ไม่มีรายการที่ต้องดูแลในขณะนี้</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                /* Detailed Categorized Report */
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500 print:shadow-none print:border-none">
                    <div className="p-8 border-b border-slate-50 print:pb-4">
                        <h3 className="text-xl font-bold text-slate-800 print:text-2xl">รายงานสรุปทรัพย์สินแยกตามหมวดหมู่</h3>
                        <p className="text-slate-500 text-sm mt-1">ข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH')}</p>
                    </div>

                    <div className="p-8 space-y-12 print:p-0">
                        {Object.entries(groupedData).map(([category, assets]) => (
                            <div key={category} className="space-y-4 break-inside-avoid">
                                <div className="flex items-center justify-between border-l-4 border-emerald-500 pl-4 py-1 bg-emerald-50/30 pr-4 rounded-r-xl">
                                    <h4 className="font-bold text-emerald-900 text-lg">{category}</h4>
                                    <span className="text-sm font-bold text-emerald-600">{assets.length} รายการ</span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                                                <th className="px-4 py-3">รหัส</th>
                                                <th className="px-4 py-3">ชื่อรายการ</th>
                                                <th className="px-4 py-3">ยี่ห้อ/รุ่น</th>
                                                <th className="px-4 py-3 text-right">ราคาทุน</th>
                                                <th className="px-4 py-3">สถานที่</th>
                                                <th className="px-4 py-3">สถานะ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {assets.map(asset => (
                                                <tr key={asset.id} className="text-sm hover:bg-slate-50/50">
                                                    <td className="px-4 py-3 font-mono font-bold text-slate-700">{asset.code}</td>
                                                    <td className="px-4 py-3 font-bold text-slate-800">{asset.name}</td>
                                                    <td className="px-4 py-3 text-slate-500">{asset.brand || '-'}</td>
                                                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-700">
                                                        {asset.price.toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-600 font-medium">{asset.location}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${asset.status === 'Normal' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            asset.status === 'Repair' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                'bg-slate-50 text-slate-600 border-slate-100'
                                                            }`}>
                                                            {asset.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="bg-slate-50/70 border-t-2 border-slate-100">
                                                <td colSpan="3" className="px-4 py-3 font-black text-slate-800 text-right">รวมหมวด {category}:</td>
                                                <td className="px-4 py-3 text-right font-mono font-black text-emerald-700">
                                                    {assets.reduce((sum, a) => sum + a.price, 0).toLocaleString()}
                                                </td>
                                                <td colSpan="2"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                        <div className="pt-8 mt-12 border-t-2 border-slate-100 bg-slate-900 text-white p-8 rounded-3xl flex justify-between items-center print:bg-white print:text-black print:border-t-4">
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-black tracking-widest print:text-gray-500">มูลค่ารวมทรัพย์สินทั้งหมด</p>
                                <p className="text-4xl font-black mt-1">฿{data.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-xs uppercase font-black tracking-widest print:text-gray-500">จำนวนรายการรวม</p>
                                <p className="text-4xl font-black mt-1">{data.length} <span className="text-lg">ชุด</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsView;
