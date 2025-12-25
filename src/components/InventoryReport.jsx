import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Download,
    Printer,
    BarChart3,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    MapPin,
    TrendingUp,
    FileText
} from 'lucide-react';
import * as supabaseService from '../services/supabaseService';

const InventoryReport = ({ cycle, onBack }) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState([]);

    useEffect(() => {
        if (cycle) {
            fetchData();
        }
    }, [cycle]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [summaryResult, countsResult] = await Promise.all([
                supabaseService.getInventorySummary(cycle.id),
                supabaseService.fetchAssetsForCounting(cycle.id)
            ]);

            if (summaryResult.status === 'success') {
                setSummary(summaryResult.data);
            }

            if (countsResult.status === 'success') {
                setCounts(countsResult.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        // TODO: Implement CSV/Excel export
        alert('ฟีเจอร์ Export กำลังพัฒนา');
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="mt-4 text-slate-500">กำลังโหลดข้อมูล...</p>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">ไม่พบข้อมูลสรุป</p>
            </div>
        );
    }

    const statusBreakdown = {
        found: counts.filter(c => c.counted_status === 'Found').length,
        notFound: counts.filter(c => c.counted_status === 'Not Found').length,
        damaged: counts.filter(c => c.counted_status === 'Damaged').length,
        moved: counts.filter(c => c.counted_status === 'Moved').length
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6 print:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center text-slate-600 hover:text-slate-800 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        กลับ
                    </button>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">รายงานสรุปผลการตรวจนับ</h2>
                    <p className="text-slate-500 mt-1">{cycle.cycle_name}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                        <Download className="w-4 h-4 mr-2 text-blue-600" />
                        Export
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        พิมพ์รายงาน
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ทั้งหมด</p>
                        <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-3xl font-black text-slate-800">{summary.total}</p>
                    <p className="text-xs text-slate-500 mt-1">รายการ</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ตรวจนับแล้ว</p>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-black text-emerald-600">{summary.counted}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div
                                className="bg-emerald-500 h-2 rounded-full transition-all"
                                style={{ width: `${summary.progressPercent}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{summary.progressPercent.toFixed(0)}%</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ตรงกับระบบ</p>
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-black text-blue-600">{summary.matches}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${summary.accuracyPercent}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{summary.accuracyPercent.toFixed(0)}%</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ต้องแก้ไข</p>
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-3xl font-black text-amber-600">{summary.requiresAdjustment}</p>
                    <p className="text-xs text-slate-500 mt-1">รายการ</p>
                </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
                    สรุปตามสถานะการตรวจนับ
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center justify-between mb-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span className="text-2xl font-black text-emerald-700">{statusBreakdown.found}</span>
                        </div>
                        <p className="text-sm font-bold text-emerald-800">พบ</p>
                    </div>

                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                        <div className="flex items-center justify-between mb-2">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="text-2xl font-black text-red-700">{statusBreakdown.notFound}</span>
                        </div>
                        <p className="text-sm font-bold text-red-800">ไม่พบ</p>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-center justify-between mb-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <span className="text-2xl font-black text-amber-700">{statusBreakdown.damaged}</span>
                        </div>
                        <p className="text-sm font-bold text-amber-800">สภาพเปลี่ยน</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span className="text-2xl font-black text-blue-700">{statusBreakdown.moved}</span>
                        </div>
                        <p className="text-sm font-bold text-blue-800">ย้ายที่</p>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">รายละเอียดการตรวจนับ</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs text-slate-400 uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">รหัสครุภัณฑ์</th>
                                <th className="px-6 py-4">ชื่อรายการ</th>
                                <th className="px-6 py-4">สถานที่ในระบบ</th>
                                <th className="px-6 py-4">สถานที่ที่พบจริง</th>
                                <th className="px-6 py-4">สถานะการตรวจนับ</th>
                                <th className="px-6 py-4">หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {counts.slice(0, 50).map((item) => {
                                const asset = item.asset;
                                if (!asset) return null;

                                return (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-bold text-blue-600">
                                                {asset.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{asset.name}</div>
                                            <div className="text-xs text-slate-400">{asset.brand}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{asset.location}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {item.counted_location ? (
                                                <span className={item.counted_location !== asset.location ? 'text-amber-600 font-bold' : 'text-slate-600'}>
                                                    {item.counted_location}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.counted_status ? (
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                                                    item.counted_status === 'Found' ? 'bg-emerald-100 text-emerald-700' :
                                                    item.counted_status === 'Not Found' ? 'bg-red-100 text-red-700' :
                                                    item.counted_status === 'Damaged' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {item.counted_status}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-sm">ยังไม่ตรวจนับ</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {item.counted_notes || '-'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryReport;

