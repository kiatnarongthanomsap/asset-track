'use client';

import React from 'react';
import { Clock, User, FileText, ArrowRight, Plus, Edit, Trash2, CheckCircle2, AlertCircle, Package, FileCheck, Tag } from 'lucide-react';

const AuditTrailTable = ({ logs, isLoading = false }) => {
  // ฟังก์ชันสำหรับเลือก icon และสีตามประเภท action
  const getActionIcon = (action) => {
    if (!action) return { icon: FileText, color: 'text-slate-600', bgColor: 'bg-slate-100' };
    
    const actionLower = action.toLowerCase();
    if (actionLower.includes('เพิ่ม') || actionLower.includes('create') || actionLower.includes('add')) {
      return { icon: Plus, color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
    } else if (actionLower.includes('แก้ไข') || actionLower.includes('update') || actionLower.includes('edit')) {
      return { icon: Edit, color: 'text-blue-600', bgColor: 'bg-blue-100' };
    } else if (actionLower.includes('ลบ') || actionLower.includes('delete') || actionLower.includes('remove')) {
      return { icon: Trash2, color: 'text-red-600', bgColor: 'bg-red-100' };
    } else if (actionLower.includes('อนุมัติ') || actionLower.includes('approve') || actionLower.includes('ยืนยัน')) {
      return { icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
    } else if (actionLower.includes('แจ้งเตือน') || actionLower.includes('alert') || actionLower.includes('warning')) {
      return { icon: AlertCircle, color: 'text-amber-600', bgColor: 'bg-amber-100' };
    } else if (actionLower.includes('ตรวจนับ') || actionLower.includes('inventory') || actionLower.includes('count')) {
      return { icon: Package, color: 'text-purple-600', bgColor: 'bg-purple-100' };
    } else if (actionLower.includes('สถานะ') || actionLower.includes('status')) {
      return { icon: Tag, color: 'text-indigo-600', bgColor: 'bg-indigo-100' };
    }
    return { icon: FileText, color: 'text-slate-600', bgColor: 'bg-slate-100' };
  };

  // ฟังก์ชันสำหรับจัดรูปแบบวันที่และเวลา
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      // แสดงเวลาที่ผ่านมา
      if (diffMins < 1) return 'เมื่อสักครู่';
      if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
      if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
      if (diffDays < 7) return `${diffDays} วันที่แล้ว`;

      // แสดงวันที่และเวลาแบบเต็ม
      const thaiDate = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const time = date.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${thaiDate} ${time}`;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">ประวัติการทำงาน</h3>
          <p className="text-sm text-slate-500">รายการล่าสุด 10 รายการ</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Clock className="w-5 h-5 text-slate-600" />
        </div>
      </div>
      
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-slate-500 text-sm">กำลังโหลดข้อมูล...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {logs && logs.length > 0 ? (
            <div className="space-y-3">
              {logs.slice(0, 10).map((log, idx) => {
                const { icon: ActionIcon, color, bgColor } = getActionIcon(log.action);
                
                return (
                  <div
                    key={log.id || idx}
                    className="bg-white rounded-xl p-4 sm:p-5 border-2 border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Action Icon */}
                      <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <ActionIcon className={`w-6 h-6 ${color}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Action & Asset Code */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <p className="font-black text-base text-slate-900">{log.action || '-'}</p>
                              {log.asset_code && (
                                <>
                                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                                  <span className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                                    {log.asset_code}
                                  </span>
                                </>
                              )}
                            </div>
                            
                            {/* Document Reference */}
                            {log.document_ref && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                                <FileCheck className="w-3.5 h-3.5" />
                                <span className="font-medium">เอกสารอ้างอิง: {log.document_ref}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                          {/* Date & Time */}
                          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-medium">{formatDateTime(log.action_date)}</span>
                            {log.action_date && (
                              <span className="text-slate-400 ml-1 hidden sm:inline">
                                ({new Date(log.action_date).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })})
                              </span>
                            )}
                          </div>
                          
                          {/* Operator */}
                          {log.operator && (
                            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                              <User className="w-3.5 h-3.5 text-slate-500" />
                              <span className="font-medium">{log.operator}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">ยังไม่มีประวัติการทำงาน</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuditTrailTable;
