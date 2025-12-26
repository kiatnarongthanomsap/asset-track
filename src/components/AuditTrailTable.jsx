import React, { useState, useMemo } from 'react';
import { Database, File as FileIcon, FileSpreadsheet, ChevronRight, X } from 'lucide-react';

// Helper function to format date: YYYY-MM-DD to DD/MM/YY
const formatDate = (dateString) => {
    if (!dateString) return '-';
    
    // If already in DD/MM/YY format, return as is
    if (typeof dateString === 'string' && dateString.includes('/')) {
        return dateString;
    }
    
    // Convert YYYY-MM-DD to DD/MM/YY
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear() + 543).slice(-2); // BE year
        
        return `${day}/${month}/${year}`;
    } catch (e) {
        return dateString;
    }
};

// Helper function to normalize log data (handle both DB format and component format)
const normalizeLog = (log) => {
    if (!log) return null;
    
    return {
        id: log.id,
        date: formatDate(log.date || log.action_date),
        action: log.action || '',
        code: log.code || log.asset_code || '-',
        operator: log.operator || '-',
        doc: log.doc || log.document_ref || '-'
    };
};

// Get action badge color
const getActionBadgeClass = (action) => {
    const actionMap = {
        'ตรวจนับ': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        'ซ่อม': 'bg-amber-100 text-amber-700 border border-amber-200',
        'จำหน่าย': 'bg-rose-100 text-rose-700 border border-rose-200',
        'โอนย้าย': 'bg-blue-100 text-blue-700 border border-blue-200',
        'เพิ่ม': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
        'แก้ไข': 'bg-purple-100 text-purple-700 border border-purple-200',
        'ลบ': 'bg-red-100 text-red-700 border border-red-200'
    };
    
    return actionMap[action] || 'bg-slate-100 text-slate-700 border border-slate-200';
};

// Export to CSV/Excel
const exportToCSV = (logs, filename = 'audit_trail') => {
    const headers = ['วันที่', 'รายการ', 'เลขครุภัณฑ์', 'ผู้ดำเนินการ', 'เอกสารอ้างอิง'];
    const rows = logs.map(log => [
        log.date,
        log.action,
        log.code,
        log.operator,
        log.doc
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Add BOM for UTF-8 with Thai characters
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
};

// Modal component for viewing all logs
const ViewAllModal = ({ logs, isOpen, onClose, onExportCSV, onExportPDF }) => {
    if (!isOpen) return null;
    
    const normalizedLogs = logs.map(normalizeLog).filter(Boolean);
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col border border-slate-200/50 overflow-hidden">
                <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                            ประวัติการดำเนินการทั้งหมด
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            {normalizedLogs.length} รายการ
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onExportCSV(normalizedLogs)}
                            className="text-xs flex items-center px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" /> Excel
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
                        >
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">วันที่</th>
                                <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">รายการ</th>
                                <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">เลขครุภัณฑ์</th>
                                <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">ผู้ดำเนินการ</th>
                                <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">เอกสารอ้างอิง</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {normalizedLogs.map((log, index) => (
                                <tr 
                                    key={log.id} 
                                    className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200"
                                >
                                    <td className="px-6 sm:px-8 py-4 font-mono text-sm text-slate-600 font-semibold group-hover:text-slate-800">
                                        {log.date}
                                    </td>
                                    <td className="px-6 sm:px-8 py-4">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${getActionBadgeClass(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 sm:px-8 py-4 font-mono text-sm text-indigo-600 font-bold group-hover:text-indigo-700">
                                        {log.code}
                                    </td>
                                    <td className="px-6 sm:px-8 py-4 text-sm text-slate-800 font-semibold group-hover:text-slate-900">
                                        {log.operator}
                                    </td>
                                    <td className="px-6 sm:px-8 py-4 text-sm text-slate-500 group-hover:text-slate-600">
                                        {log.doc}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AuditTrailTable = ({ logs = [] }) => {
    const [showAllModal, setShowAllModal] = useState(false);
    
    // Normalize and prepare logs for display
    const displayLogs = useMemo(() => {
        return logs
            .map(normalizeLog)
            .filter(Boolean)
            .slice(0, 10);
    }, [logs]);
    
    const allLogs = useMemo(() => {
        return logs.map(normalizeLog).filter(Boolean);
    }, [logs]);
    
    const handleExportCSV = () => {
        exportToCSV(allLogs);
    };
    
    const handleExportPDF = () => {
        // PDF export can be implemented with a library like jsPDF
        alert('การส่งออก PDF กำลังพัฒนา');
    };
    
    return (
        <>
            <div className="relative overflow-hidden">
                {/* Header Section */}
                <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                                Audit Trail
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                ประวัติการดำเนินการล่าสุด ({displayLogs.length} รายการ)
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleExportCSV}
                            className="text-xs flex items-center px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" /> Excel
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="text-xs flex items-center px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <FileIcon className="w-3.5 h-3.5 mr-1.5" /> PDF
                        </button>
                        {allLogs.length > 10 && (
                            <button
                                onClick={() => setShowAllModal(true)}
                                className="text-xs text-indigo-600 hover:text-indigo-700 font-bold px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                ดูทั้งหมด ({allLogs.length})
                                <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    {displayLogs.length === 0 ? (
                        <div className="px-6 sm:px-8 py-16 sm:py-20 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                                <Database className="w-10 h-10 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-semibold text-sm sm:text-base">ยังไม่มีประวัติการดำเนินการ</p>
                            <p className="text-slate-400 text-xs mt-1">เมื่อมีการดำเนินการใดๆ จะแสดงที่นี่</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <table className="w-full text-left">
                                <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">วันที่</th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">รายการ</th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">เลขครุภัณฑ์</th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">ผู้ดำเนินการ</th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">เอกสารอ้างอิง</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {displayLogs.map((log, index) => (
                                        <tr 
                                            key={log.id} 
                                            className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 cursor-pointer"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="px-6 sm:px-8 py-4 font-mono text-sm text-slate-600 font-semibold group-hover:text-slate-800">
                                                {log.date}
                                            </td>
                                            <td className="px-6 sm:px-8 py-4">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${getActionBadgeClass(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 font-mono text-sm text-indigo-600 font-bold group-hover:text-indigo-700">
                                                {log.code}
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 text-sm text-slate-800 font-semibold group-hover:text-slate-900">
                                                {log.operator}
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 text-sm text-slate-500 group-hover:text-slate-600">
                                                {log.doc}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            
            <ViewAllModal
                logs={logs}
                isOpen={showAllModal}
                onClose={() => setShowAllModal(false)}
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
            />
        </>
    );
};

export default AuditTrailTable;
