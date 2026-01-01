'use client';

import React from 'react';
import { Clock, User, FileText, ArrowRight, Plus, Edit, Trash2, CheckCircle2, AlertCircle, Package, FileCheck, Tag } from 'lucide-react';

const AuditTrailTable = ({ logs, isLoading = false }) => {
  const getActionIcon = (action) => {
    if (!action) return { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' };

    const a = action.toLowerCase();
    if (a.includes('เพิ่ม') || a.includes('create') || a.includes('add')) {
      return { icon: Plus, color: 'text-emerald-600', bg: 'bg-emerald-100' };
    }
    if (a.includes('แก้ไข') || a.includes('update') || a.includes('edit')) {
      return { icon: Edit, color: 'text-blue-600', bg: 'bg-blue-100' };
    }
    if (a.includes('ลบ') || a.includes('delete') || a.includes('remove')) {
      return { icon: Trash2, color: 'text-red-600', bg: 'bg-red-100' };
    }
    if (a.includes('อนุมัติ') || a.includes('approve') || a.includes('ยืนยัน')) {
      return { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' };
    }
    if (a.includes('แจ้งเตือน') || a.includes('alert') || a.includes('warning')) {
      return { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' };
    }
    if (a.includes('ตรวจนับ') || a.includes('inventory') || a.includes('count')) {
      return { icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' };
    }
    if (a.includes('สถานะ') || a.includes('status')) {
      return { icon: Tag, color: 'text-indigo-600', bg: 'bg-indigo-100' };
    }
    return { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' };
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'เมื่อสักครู่';
      if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
      if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
      if (diffDays < 7) return `${diffDays} วันที่แล้ว`;

      return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="min-w-0">
          <h3 className="text-base sm:text-xl font-bold text-slate-900">ประวัติการทำงาน</h3>
          <p className="text-xs sm:text-sm text-slate-500">รายการล่าสุด 10 รายการ</p>
        </div>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600" />
          <p className="mt-3 text-slate-500 text-sm">กำลังโหลด...</p>
        </div>
      ) : logs?.length > 0 ? (
        <div className="space-y-1.5 sm:space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
          {logs.slice(0, 50).map((log, idx) => {
            const { icon: ActionIcon, color, bg } = getActionIcon(log.action);
            return (
              <div
                key={log.id || idx}
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                  <ActionIcon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-semibold text-xs sm:text-sm text-slate-900">{log.action || '-'}</span>
                    {log.asset_code && (
                      <span className="font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded truncate max-w-[120px] sm:max-w-none">
                        {log.asset_code}
                      </span>
                    )}
                  </div>
                  {log.document_ref && (
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <FileCheck className="w-3 h-3 shrink-0" />
                      <span className="truncate">{log.document_ref}</span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-500">{formatDateTime(log.action_date)}</p>
                  {log.operator && (
                    <p className="text-xs text-slate-400 hidden sm:flex items-center gap-1 justify-end mt-0.5">
                      <User className="w-3 h-3" />
                      {log.operator}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">ยังไม่มีประวัติการทำงาน</p>
        </div>
      )}
    </div>
  );
};

export default AuditTrailTable;
