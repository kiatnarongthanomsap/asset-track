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
        'ตรวจนับ': 'bg-green-100 text-green-700',
        'ซ่อม': 'bg-yellow-100 text-yellow-700',
        'จำหน่าย': 'bg-red-100 text-red-700',
        'โอนย้าย': 'bg-blue-100 text-blue-700',
        'เพิ่ม': 'bg-indigo-100 text-indigo-700',
        'แก้ไข': 'bg-purple-100 text-purple-700',
        'ลบ': 'bg-red-100 text-red-700'
    };
    
    return actionMap[action] || 'bg-gray-100 text-gray-700';
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">
                        ประวัติการดำเนินการทั้งหมด ({normalizedLogs.length} รายการ)
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onExportCSV(normalizedLogs)}
                            className="text-xs flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition"
                        >
                            <FileSpreadsheet className="w-3 h-3 mr-1" /> Excel
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded transition"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs sticky top-0">
                            <tr>
                                <th className="px-6 py-3 font-semibold">วันที่</th>
                                <th className="px-6 py-3 font-semibold">รายการ</th>
                                <th className="px-6 py-3 font-semibold">เลขครุภัณฑ์</th>
                                <th className="px-6 py-3 font-semibold">ผู้ดำเนินการ</th>
                                <th className="px-6 py-3 font-semibold">เอกสารอ้างอิง</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {normalizedLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-blue-50/50">
                                    <td className="px-6 py-3 font-mono text-gray-600">{log.date}</td>
                                    <td className="px-6 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getActionBadgeClass(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 font-mono text-blue-600 font-medium">{log.code}</td>
                                    <td className="px-6 py-3 text-gray-900">{log.operator}</td>
                                    <td className="px-6 py-3 text-gray-500">{log.doc}</td>
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
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-indigo-600" />
                        Audit Trail (ประวัติการดำเนินการล่าสุด)
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handleExportCSV}
                            className="text-xs flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition"
                        >
                            <FileSpreadsheet className="w-3 h-3 mr-1" /> Excel
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="text-xs flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition"
                        >
                            <FileIcon className="w-3 h-3 mr-1" /> PDF
                        </button>
                        {allLogs.length > 10 && (
                            <button
                                onClick={() => setShowAllModal(true)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 flex items-center"
                            >
                                ดูทั้งหมด ({allLogs.length})
                                <ChevronRight className="w-3 h-3 ml-1" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {displayLogs.length === 0 ? (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <Database className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>ยังไม่มีประวัติการดำเนินการ</p>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">วันที่</th>
                                    <th className="px-6 py-3 font-semibold">รายการ</th>
                                    <th className="px-6 py-3 font-semibold">เลขครุภัณฑ์</th>
                                    <th className="px-6 py-3 font-semibold">ผู้ดำเนินการ</th>
                                    <th className="px-6 py-3 font-semibold">เอกสารอ้างอิง</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {displayLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-blue-50/50 transition">
                                        <td className="px-6 py-3 font-mono text-gray-600">{log.date}</td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getActionBadgeClass(log.action)}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 font-mono text-blue-600 font-medium">{log.code}</td>
                                        <td className="px-6 py-3 text-gray-900">{log.operator}</td>
                                        <td className="px-6 py-3 text-gray-500">{log.doc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
