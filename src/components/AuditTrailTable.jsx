import React, { useState, useMemo } from 'react';
import { Database, File as FileIcon, FileSpreadsheet, ChevronRight, X, Search, Filter, Calendar, User, Package, TrendingUp, Clock } from 'lucide-react';

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
    
    // แยก document_ref สำหรับการตรวจนับ (ถ้ามี - แสดงว่าเป็นเหตุผล)
    let doc = log.doc || log.document_ref || '-';
    let notes = '';
    
    // ตรวจสอบว่ามี ' - ' ใน document_ref และเป็น action ตรวจนับ
    const action = log.action || '';
    
    // Debug: ตรวจสอบข้อมูลที่เข้ามา
    if (action === 'ตรวจนับ' || action.includes('ตรวจนับ')) {
        // ตรวจสอบ document_ref ที่เริ่มต้นด้วย "Cycle" และมี " - "
        if (doc && typeof doc === 'string' && doc.startsWith('Cycle') && doc.includes(' - ')) {
            const parts = doc.split(' - ');
            if (parts.length > 1) {
                doc = parts[0]; // Cycle ID
                notes = parts.slice(1).join(' - '); // เหตุผล
            }
        }
    }
    
    return {
        id: log.id,
        date: formatDate(log.date || log.action_date),
        action: action,
        code: log.code || log.asset_code || '-',
        operator: log.operator || '-',
        doc: doc,
        notes: notes
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
    const headers = ['วันที่', 'รายการ', 'เลขครุภัณฑ์', 'ผู้ดำเนินการ', 'เอกสารอ้างอิง', 'เหตุผล'];
    const rows = logs.map(log => [
        log.date,
        log.action,
        log.code,
        log.operator,
        log.doc,
        log.notes || '-'
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
                                    <td className="px-6 sm:px-8 py-4 text-sm text-slate-600 group-hover:text-slate-700">
                                        {log.notes ? (
                                            <span className="italic text-slate-500">{log.notes}</span>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
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
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAction, setFilterAction] = useState('all');
    const [filterOperator, setFilterOperator] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    
    // Normalize all logs
    const normalizedLogs = useMemo(() => {
        return logs.map(normalizeLog).filter(Boolean);
    }, [logs]);
    
    // Filter and sort logs
    const filteredLogs = useMemo(() => {
        let filtered = normalizedLogs;
        
        // Search filter
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(log => 
                log.code.toLowerCase().includes(search) ||
                log.operator.toLowerCase().includes(search) ||
                log.doc.toLowerCase().includes(search) ||
                log.notes.toLowerCase().includes(search) ||
                log.action.toLowerCase().includes(search)
            );
        }
        
        // Action filter
        if (filterAction !== 'all') {
            filtered = filtered.filter(log => log.action === filterAction);
        }
        
        // Operator filter
        if (filterOperator !== 'all') {
            filtered = filtered.filter(log => log.operator === filterOperator);
        }
        
        // Date range filter
        if (dateRange.start) {
            filtered = filtered.filter(log => {
                const logDate = new Date(log.date.split('/').reverse().join('-'));
                const startDate = new Date(dateRange.start);
                return logDate >= startDate;
            });
        }
        if (dateRange.end) {
            filtered = filtered.filter(log => {
                const logDate = new Date(log.date.split('/').reverse().join('-'));
                const endDate = new Date(dateRange.end);
                endDate.setHours(23, 59, 59);
                return logDate <= endDate;
            });
        }
        
        // Sort
        filtered.sort((a, b) => {
            let aVal, bVal;
            if (sortBy === 'date') {
                aVal = new Date(a.date.split('/').reverse().join('-'));
                bVal = new Date(b.date.split('/').reverse().join('-'));
            } else if (sortBy === 'action') {
                aVal = a.action;
                bVal = b.action;
            } else if (sortBy === 'code') {
                aVal = a.code;
                bVal = b.code;
            } else {
                aVal = a[sortBy];
                bVal = b[sortBy];
            }
            
            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        return filtered;
    }, [normalizedLogs, searchTerm, filterAction, filterOperator, dateRange, sortBy, sortOrder]);
    
    // Statistics
    const statistics = useMemo(() => {
        const actionCounts = {};
        const operatorCounts = {};
        let totalActions = normalizedLogs.length;
        let todayActions = 0;
        const today = new Date().toISOString().split('T')[0];
        
        normalizedLogs.forEach(log => {
            // Count by action
            actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
            
            // Count by operator
            operatorCounts[log.operator] = (operatorCounts[log.operator] || 0) + 1;
            
            // Count today's actions
            const logDate = log.date.split('/').reverse().join('-');
            if (logDate === today) {
                todayActions++;
            }
        });
        
        const topAction = Object.entries(actionCounts).sort((a, b) => b[1] - a[1])[0];
        const topOperator = Object.entries(operatorCounts).sort((a, b) => b[1] - a[1])[0];
        
        return {
            total: totalActions,
            today: todayActions,
            topAction: topAction ? { name: topAction[0], count: topAction[1] } : null,
            topOperator: topOperator ? { name: topOperator[0], count: topOperator[1] } : null,
            actionCounts
        };
    }, [normalizedLogs]);
    
    // Get unique actions and operators for filters
    const uniqueActions = useMemo(() => {
        return Array.from(new Set(normalizedLogs.map(log => log.action))).sort();
    }, [normalizedLogs]);
    
    const uniqueOperators = useMemo(() => {
        return Array.from(new Set(normalizedLogs.map(log => log.operator))).sort();
    }, [normalizedLogs]);
    
    // Display logs (first 10)
    const displayLogs = useMemo(() => {
        return filteredLogs.slice(0, 10);
    }, [filteredLogs]);
    
    const handleExportCSV = () => {
        exportToCSV(filteredLogs);
    };
    
    const handleExportPDF = () => {
        // PDF export can be implemented with a library like jsPDF
        alert('การส่งออก PDF กำลังพัฒนา');
    };
    
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };
    
    const clearFilters = () => {
        setSearchTerm('');
        setFilterAction('all');
        setFilterOperator('all');
        setDateRange({ start: '', end: '' });
    };
    
    return (
        <>
            <div className="relative overflow-hidden">
                {/* Header Section */}
                <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <Database className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                                    Audit Trail
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                    ประวัติการดำเนินการทั้งหมด - ติดตามทุกการเปลี่ยนแปลงในระบบ
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
                            {filteredLogs.length > 10 && (
                                <button
                                    onClick={() => setShowAllModal(true)}
                                    className="text-xs text-indigo-600 hover:text-indigo-700 font-bold px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    ดูทั้งหมด ({filteredLogs.length})
                                    <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 border border-indigo-200">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">ทั้งหมด</p>
                                <Database className="w-4 h-4 text-indigo-600" />
                            </div>
                            <p className="text-2xl font-black text-indigo-700">{statistics.total}</p>
                            <p className="text-xs text-indigo-600 mt-0.5">รายการ</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border border-emerald-200">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">วันนี้</p>
                                <Clock className="w-4 h-4 text-emerald-600" />
                            </div>
                            <p className="text-2xl font-black text-emerald-700">{statistics.today}</p>
                            <p className="text-xs text-emerald-600 mt-0.5">รายการ</p>
                        </div>
                        {statistics.topAction && (
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 border border-purple-200">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">ประเภทยอดนิยม</p>
                                    <TrendingUp className="w-4 h-4 text-purple-600" />
                                </div>
                                <p className="text-sm font-black text-purple-700 line-clamp-1">{statistics.topAction.name}</p>
                                <p className="text-xs text-purple-600 mt-0.5">{statistics.topAction.count} ครั้ง</p>
                            </div>
                        )}
                        {statistics.topOperator && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">ผู้ดำเนินการ</p>
                                    <User className="w-4 h-4 text-blue-600" />
                                </div>
                                <p className="text-sm font-black text-blue-700 line-clamp-1">{statistics.topOperator.name}</p>
                                <p className="text-xs text-blue-600 mt-0.5">{statistics.topOperator.count} ครั้ง</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Search and Filters */}
                    <div className="space-y-3">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="ค้นหาเลขครุภัณฑ์, ผู้ดำเนินการ, เอกสารอ้างอิง..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                            />
                        </div>
                        
                        {/* Filters */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {/* Action Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={filterAction}
                                    onChange={(e) => setFilterAction(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm appearance-none"
                                >
                                    <option value="all">ทุกประเภทการดำเนินการ</option>
                                    {uniqueActions.map(action => (
                                        <option key={action} value={action}>{action}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Operator Filter */}
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={filterOperator}
                                    onChange={(e) => setFilterOperator(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm appearance-none"
                                >
                                    <option value="all">ทุกผู้ดำเนินการ</option>
                                    {uniqueOperators.map(operator => (
                                        <option key={operator} value={operator}>{operator}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Date Start */}
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                    placeholder="วันที่เริ่มต้น"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            
                            {/* Date End */}
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                    placeholder="วันที่สิ้นสุด"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                        </div>
                        
                        {/* Clear Filters Button */}
                        {(searchTerm || filterAction !== 'all' || filterOperator !== 'all' || dateRange.start || dateRange.end) && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-slate-600 hover:text-slate-800 font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                            >
                                ล้างตัวกรอง
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
                            <p className="text-slate-500 font-semibold text-sm sm:text-base">
                                {filteredLogs.length === 0 && normalizedLogs.length > 0 
                                    ? 'ไม่พบข้อมูลตามเงื่อนไขที่กรอง' 
                                    : 'ยังไม่มีประวัติการดำเนินการ'}
                            </p>
                            <p className="text-slate-400 text-xs mt-1">
                                {filteredLogs.length === 0 && normalizedLogs.length > 0
                                    ? 'ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง'
                                    : 'เมื่อมีการดำเนินการใดๆ จะแสดงที่นี่'}
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="px-6 sm:px-8 py-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 font-semibold">
                                แสดง {displayLogs.length} จาก {filteredLogs.length} รายการ
                                {filteredLogs.length !== normalizedLogs.length && ` (จากทั้งหมด ${normalizedLogs.length} รายการ)`}
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
                                    <tr>
                                        <th 
                                            className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                                            onClick={() => handleSort('date')}
                                        >
                                            <div className="flex items-center gap-2">
                                                วันที่
                                                {sortBy === 'date' && (
                                                    <span className="text-indigo-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                        <th 
                                            className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                                            onClick={() => handleSort('action')}
                                        >
                                            <div className="flex items-center gap-2">
                                                รายการ
                                                {sortBy === 'action' && (
                                                    <span className="text-indigo-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                        <th 
                                            className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                                            onClick={() => handleSort('code')}
                                        >
                                            <div className="flex items-center gap-2">
                                                เลขครุภัณฑ์
                                                {sortBy === 'code' && (
                                                    <span className="text-indigo-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">ผู้ดำเนินการ</th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">เอกสารอ้างอิง</th>
                                        <th className="px-6 sm:px-8 py-4 text-xs font-black text-slate-600 uppercase tracking-wider">เหตุผล</th>
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
                                            <td className="px-6 sm:px-8 py-4 text-sm text-slate-600 group-hover:text-slate-700">
                                                {log.notes ? (
                                                    <span className="italic text-slate-500">{log.notes}</span>
                                                ) : (
                                                    <span className="text-slate-300">-</span>
                                                )}
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
                logs={filteredLogs}
                isOpen={showAllModal}
                onClose={() => setShowAllModal(false)}
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
            />
        </>
    );
};

export default AuditTrailTable;
