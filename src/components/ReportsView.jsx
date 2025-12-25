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
    ChevronUp,
    X,
    ArrowLeft
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { exportAssetsToCSV } from '../utils/assetManager';
import { calculateDepreciation } from '../utils/calculations';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import { getImageUrl } from '../services/imageService';

const ReportsView = ({ data, onUpdateStatus, categories = [] }) => {
    const [reportMode, setReportMode] = useState('analytics'); // 'analytics' or 'detailed'
    const [selectedFilter, setSelectedFilter] = useState(null); // { type: 'location' | 'category', value: string }

    // Filter assets based on selected filter
    const filteredAssets = useMemo(() => {
        if (!selectedFilter) return [];
        return data.filter(item => {
            if (selectedFilter.type === 'location') {
                return (item.location || 'ไม่ระบุ') === selectedFilter.value;
            } else if (selectedFilter.type === 'category') {
                return (item.category || 'ไม่ระบุ') === selectedFilter.value;
            }
            return false;
        });
    }, [data, selectedFilter]);

    // Grouping for Analytics
    const analytics = useMemo(() => {
        const byCategory = {};
        const byLocation = {};
        let totalCost = 0;
        let totalBookValue = 0;
        let stickerPrinted = 0;
        let maxCategoryValue = 0;

        data.forEach(item => {
            const dep = calculateDepreciation(item.price, item.purchaseDate, item.usefulLife);

            // By Category
            const cat = item.category || 'ไม่ระบุ';
            if (!byCategory[cat]) byCategory[cat] = { count: 0, cost: 0, bookValue: 0 };
            byCategory[cat].count += 1;
            byCategory[cat].cost += item.price;
            byCategory[cat].bookValue += dep.bookValue;
            if (byCategory[cat].cost > maxCategoryValue) maxCategoryValue = byCategory[cat].cost;

            // By Location
            const loc = item.location || 'ไม่ระบุ';
            if (!byLocation[loc]) byLocation[loc] = 0;
            byLocation[loc] += 1;

            // General Stats
            totalCost += item.price;
            totalBookValue += dep.bookValue;
            if (item.isStickerPrinted) stickerPrinted += 1;
        });

        return {
            byCategory: Object.entries(byCategory).sort((a, b) => b[1].cost - a[1].cost),
            byLocation: Object.entries(byLocation).sort((a, b) => a[0].localeCompare(b[0], 'th')), // เรียงตามตัวอักษร
            totalCost,
            totalBookValue,
            stickerPrinted,
            stickerPercent: data.length > 0 ? (stickerPrinted / data.length) * 100 : 0,
            maxCategoryValue
        };
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
                <div className="mb-4 md:mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">รายงานธุรกรรมและวิเคราะห์</h2>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">สรุปภาพรวมและรายละเอียดทรัพย์สินในระบบ</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="bg-slate-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setReportMode('analytics')}
                            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${reportMode === 'analytics' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <BarChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> 
                            <span className="hidden sm:inline">สถิติภาพรวม</span>
                            <span className="sm:hidden">สถิติ</span>
                        </button>
                        <button
                            onClick={() => setReportMode('detailed')}
                            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${reportMode === 'detailed' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> 
                            <span className="hidden sm:inline">รายงานสรุปตามหมวด</span>
                            <span className="sm:hidden">รายงาน</span>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => exportAssetsToCSV(data)}
                            className="flex items-center justify-center px-3 sm:px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-50 transition-all flex-1 sm:flex-initial"
                        >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2 text-blue-600" /> 
                            <span className="hidden sm:inline">Excel</span>
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex items-center justify-center px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 flex-1 sm:flex-initial"
                        >
                            <Printer className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" /> 
                            <span className="hidden sm:inline">พิมพ์รายงาน</span>
                            <span className="sm:hidden">พิมพ์</span>
                        </button>
                    </div>
                </div>
            </div>

            {reportMode === 'analytics' ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                    {/* KPI Cards for Reports - จัดเรียงใหม่ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 1. จำนวนรายการทั้งหมด */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm border border-blue-200">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">จำนวนรายการทั้งหมด</p>
                            <p className="text-3xl font-black text-blue-700">{data.length} <span className="text-lg">รายการ</span></p>
                        </div>
                        {/* 2. ราคาทุนรวมทั้งหมด */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl shadow-sm border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ราคาทุนรวมทั้งหมด</p>
                            <p className="text-2xl font-black text-slate-800">฿{analytics.totalCost.toLocaleString()}</p>
                        </div>
                        {/* 3. มูลค่าปัจจุบัน (Book Value) */}
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-sm border border-emerald-200">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">มูลค่าปัจจุบัน (Book Value)</p>
                            <p className="text-2xl font-black text-emerald-700">฿{Math.round(analytics.totalBookValue).toLocaleString()}</p>
                        </div>
                        {/* 4. พิมพ์สติ๊กเกอร์แล้ว */}
                        <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-2xl shadow-sm border border-violet-200">
                            <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1">พิมพ์สติ๊กเกอร์แล้ว</p>
                            <div className="flex items-end gap-2">
                                <p className="text-2xl font-black text-violet-700">{analytics.stickerPrinted} / {data.length}</p>
                                <span className="text-xs font-bold text-violet-500 mb-1">{analytics.stickerPercent.toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>


                    {/* 1. Location Distribution - แสดง 4 คอลัมน์ */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-rose-500" />
                                <span className="hidden sm:inline">จำนวนทรัพยากรตามสถานที่</span>
                                <span className="sm:hidden">ทรัพยากรตามสถานที่</span>
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {analytics.byLocation.map(([loc, count]) => (
                                <div 
                                    key={loc} 
                                    onClick={() => setSelectedFilter({ type: 'location', value: loc })}
                                    className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg group cursor-pointer"
                                >
                                    <div className="p-5">
                                        <div className="flex items-center justify-end mb-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-3 line-clamp-2 min-h-[2.5rem]">{loc}</h4>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-emerald-600">{count}</span>
                                            <span className="text-xs font-bold text-slate-500">รายการ</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Category Value Report - แสดง 4 คอลัมน์ */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center">
                                <PieChart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                                <span className="hidden lg:inline">มูลค่าสะสมตามหมวดหมู่ (ทุน vs ปัจจุบัน)</span>
                                <span className="lg:hidden">มูลค่าตามหมวดหมู่</span>
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {analytics.byCategory.map(([cat, info]) => (
                                <div 
                                    key={cat} 
                                    onClick={() => setSelectedFilter({ type: 'category', value: cat })}
                                    className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl group cursor-pointer"
                                >
                                    <div className="p-5">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">{cat}</h4>
                                            <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-full">
                                                {info.count} ชิ้น
                                            </span>
                                        </div>
                                        
                                        {/* Values */}
                                        <div className="space-y-2 mb-4">
                                            <div className="bg-white/70 rounded-lg p-2 border border-slate-200">
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mb-0.5">ราคาทุน</p>
                                                <p className="text-sm font-black text-slate-700 font-mono">฿{info.cost.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-emerald-50/70 rounded-lg p-2 border border-emerald-200">
                                                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide mb-0.5">มูลค่าปัจจุบัน</p>
                                                <p className="text-sm font-black text-emerald-700 font-mono">฿{Math.round(info.bookValue).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Bar */}
                                        <div className="relative">
                                            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-700 shadow-sm"
                                                    style={{ width: `${(info.bookValue / analytics.maxCategoryValue) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-[9px] text-slate-400 font-medium mt-1 text-center">
                                                {((info.bookValue / info.cost) * 100).toFixed(0)}% ของทุน
                                            </p>
                                        </div>
                                    </div>
                                    {/* Hover Effect */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Asset List Modal */}
                    {selectedFilter && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
                                {/* Header */}
                                <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-blue-50 flex items-center justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-2xl font-black text-slate-800 flex items-center gap-2 sm:gap-3">
                                            {selectedFilter.type === 'location' ? (
                                                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 shrink-0" />
                                            ) : (
                                                <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 shrink-0" />
                                            )}
                                            <span className="truncate">
                                                <span className="hidden sm:inline">{selectedFilter.type === 'location' ? 'ทรัพย์สินในสถานที่' : 'ทรัพย์สินในหมวดหมู่'}: </span>
                                                {selectedFilter.value}
                                            </span>
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1">{filteredAssets.length} รายการ</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedFilter(null)}
                                        className="p-2 hover:bg-white/50 rounded-xl transition-colors shrink-0"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left min-w-[800px]">
                                            <thead className="bg-slate-50 sticky top-0">
                                                <tr>
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider w-20 sm:w-24">รูปภาพ</th>
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider">รหัสครุภัณฑ์</th>
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider">ชื่อรายการ</th>
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider hidden sm:table-cell">ยี่ห้อ</th>
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider text-right">ราคาทุน</th>
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider text-right">มูลค่าปัจจุบัน</th>
                                                    {selectedFilter.type === 'location' && (
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider hidden md:table-cell">หมวดหมู่</th>
                                                    )}
                                                    {selectedFilter.type === 'category' && (
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider hidden md:table-cell">สถานที่</th>
                                                    )}
                                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-black text-slate-600 uppercase tracking-wider">สถานะ</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {filteredAssets.map(asset => {
                                                    const dep = calculateDepreciation(asset.price, asset.purchaseDate, asset.usefulLife);
                                                    const iconName = getIconNameFromCategories(asset.category, categories);
                                                    const CategoryIcon = getCategoryIcon(asset.category, iconName);
                                                    const imageUrl = asset.image ? getImageUrl(asset.image) : null;
                                                    
                                                    return (
                                                        <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center relative">
                                                                    {imageUrl ? (
                                                                        <>
                                                                            <img 
                                                                                src={imageUrl} 
                                                                                alt={asset.name}
                                                                                className="w-full h-full object-cover"
                                                                                onError={(e) => {
                                                                                    e.target.style.display = 'none';
                                                                                    const fallback = e.target.parentElement.querySelector('.icon-fallback');
                                                                                    if (fallback) fallback.style.display = 'flex';
                                                                                }}
                                                                            />
                                                                            <div className="icon-fallback hidden absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100">
                                                                                <CategoryIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center">
                                                                            <CategoryIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                                <span className="font-mono text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                                                    {asset.code}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                                <div className="font-bold text-sm sm:text-base text-slate-800">{asset.name}</div>
                                                                {asset.serial && (
                                                                    <div className="text-xs text-slate-400">S/N: {asset.serial}</div>
                                                                )}
                                                                <div className="text-xs sm:hidden text-slate-500 mt-1">{asset.brand || '-'}</div>
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-600 hidden sm:table-cell">{asset.brand || '-'}</td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                                                                <span className="font-mono text-xs sm:text-sm text-slate-700">฿{asset.price.toLocaleString()}</span>
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                                                                <span className="font-mono text-xs sm:text-sm font-bold text-emerald-600">฿{Math.round(dep.bookValue).toLocaleString()}</span>
                                                            </td>
                                                            {selectedFilter.type === 'location' && (
                                                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                                                    <span className="text-xs sm:text-sm text-slate-600">{asset.category || 'ไม่ระบุ'}</span>
                                                                </td>
                                                            )}
                                                            {selectedFilter.type === 'category' && (
                                                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                                                    <span className="text-xs sm:text-sm text-slate-600">{asset.location || 'ไม่ระบุ'}</span>
                                                                </td>
                                                            )}
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                                <StatusBadge status={asset.status} />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {filteredAssets.length === 0 && (
                                                    <tr>
                                                        <td colSpan={selectedFilter.type === 'location' ? 8 : 8} className="p-8 sm:p-16 text-center">
                                                            <div className="text-slate-300">
                                                                <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-20" />
                                                                <p className="font-bold text-sm sm:text-base text-slate-400">ไม่พบรายการ</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-4 sm:px-8 py-3 sm:py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="text-xs sm:text-sm text-slate-600">
                                        <span className="font-bold">รวม {filteredAssets.length} รายการ</span>
                                        {selectedFilter.type === 'category' && (
                                            <span className="block sm:inline sm:ml-4 mt-1 sm:mt-0">
                                                ราคาทุนรวม: <span className="font-mono font-bold">฿{filteredAssets.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</span>
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedFilter(null)}
                                        className="px-4 sm:px-6 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        ปิด
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                /* Detailed Categorized Report */
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500 print:shadow-none print:border-none">
                    <div className="p-8 border-b border-slate-50 print:pb-4">
                        <h3 className="text-xl font-bold text-slate-800 print:text-2xl">รายงานสรุปทรัพย์สินและค่าเสื่อมราคาแยกตามหมวดหมู่</h3>
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
                                                <th className="px-4 py-3 text-right">ราคาทุน</th>
                                                <th className="px-4 py-3 text-right">ค่าเสื่อมสะสม</th>
                                                <th className="px-4 py-3 text-right">มูลค่าปัจจุบัน</th>
                                                <th className="px-4 py-3">สถานที่</th>
                                                <th className="px-4 py-3">สถานะ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {assets.map(asset => {
                                                const dep = calculateDepreciation(asset.price, asset.purchaseDate, asset.usefulLife);
                                                return (
                                                    <tr key={asset.id} className="text-sm hover:bg-slate-50/50">
                                                        <td className="px-4 py-3 font-mono font-bold text-slate-700">{asset.code}</td>
                                                        <td className="px-4 py-3 font-bold text-slate-800">
                                                            {asset.name}
                                                            <div className="text-[10px] text-slate-400 font-normal">{asset.brand} • S/N: {asset.serial}</div>
                                                        </td>
                                                        <td className="px-4 py-3 text-right font-mono text-slate-500">{asset.price.toLocaleString()}</td>
                                                        <td className="px-4 py-3 text-right font-mono text-slate-400">{Math.round(dep.accumulatedDepreciation).toLocaleString()}</td>
                                                        <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">{Math.round(dep.bookValue).toLocaleString()}</td>
                                                        <td className="px-4 py-3 text-slate-600 font-medium">{asset.location}</td>
                                                        <td className="px-4 py-3">
                                                            <StatusBadge status={asset.status} />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr className="bg-slate-50/70 border-t-2 border-slate-100 font-black">
                                                <td colSpan="2" className="px-4 py-3 text-slate-800 text-right uppercase text-xs">รวมหมวด {category}:</td>
                                                <td className="px-4 py-3 text-right font-mono text-slate-600">
                                                    {assets.reduce((sum, a) => sum + a.price, 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-slate-400">
                                                    {assets.reduce((sum, a) => {
                                                        const dep = calculateDepreciation(a.price, a.purchaseDate, a.usefulLife);
                                                        return sum + dep.accumulatedDepreciation;
                                                    }, 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-emerald-700">
                                                    {assets.reduce((sum, a) => {
                                                        const dep = calculateDepreciation(a.price, a.purchaseDate, a.usefulLife);
                                                        return sum + dep.bookValue;
                                                    }, 0).toLocaleString()}
                                                </td>
                                                <td colSpan="2"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                        <div className="pt-8 mt-12 border-t-2 border-slate-100 bg-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 print:bg-white print:text-black print:border-t-4">
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest print:text-gray-500">ราคาทุนรวม</p>
                                    <p className="text-3xl font-black mt-1">฿{data.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-emerald-400 text-[10px] uppercase font-black tracking-widest print:text-gray-500">มูลค่าปัจจุบันรวม</p>
                                    <p className="text-3xl font-black mt-1 text-emerald-400 print:text-black">฿{Math.round(data.reduce((sum, a) => {
                                        const dep = calculateDepreciation(a.price, a.purchaseDate, a.usefulLife);
                                        return sum + dep.bookValue;
                                    }, 0)).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest print:text-gray-500">จำนวนรายการรวม</p>
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
