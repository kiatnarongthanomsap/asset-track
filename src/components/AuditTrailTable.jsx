import React from 'react';
import { Database, File as FileIcon, FileSpreadsheet } from 'lucide-react';
import { AUDIT_LOGS } from '../data/mockData';

const AuditTrailTable = ({ logs = [] }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center">
                <Database className="w-5 h-5 mr-2 text-indigo-600" />
                Audit Trail (ประวัติการดำเนินการล่าสุด)
            </h3>
            <div className="flex gap-2">
                <button className="text-xs flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition">
                    <FileIcon className="w-3 h-3 mr-1" /> PDF
                </button>
                <button className="text-xs flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition">
                    <FileSpreadsheet className="w-3 h-3 mr-1" /> Excel
                </button>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2">ดูทั้งหมด</button>
            </div>
        </div>
        <div className="overflow-x-auto">
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
                    {(logs.length > 0 ? logs : AUDIT_LOGS).slice(0, 10).map((log) => (
                        <tr key={log.id} className="hover:bg-blue-50/50">
                            <td className="px-6 py-3 font-mono text-gray-600">{log.date}</td>
                            <td className="px-6 py-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                           ${log.action === 'ตรวจนับ' ? 'bg-green-100 text-green-700' :
                                        log.action === 'ซ่อม' ? 'bg-yellow-100 text-yellow-700' :
                                            log.action === 'จำหน่าย' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
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
);

export default AuditTrailTable;
