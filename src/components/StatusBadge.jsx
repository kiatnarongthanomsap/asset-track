'use client';

import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Normal': { label: 'ปกติ', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    'Repair': { label: 'ชำรุด', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    'Check': { label: 'รอตรวจสอบ', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    'Disposed': { label: 'จำหน่ายออก', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  };

  const config = statusConfig[status] || statusConfig['Normal'];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
