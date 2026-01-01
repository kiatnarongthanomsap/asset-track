'use client';

import React from 'react';

const InventoryReport = ({ cycle, onBack }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">รายงาน: {cycle?.cycle_name || 'N/A'}</h2>
        <button onClick={onBack} className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300">
          กลับ
        </button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <p className="text-slate-600">Inventory Report</p>
      </div>
    </div>
  );
};

export default InventoryReport;
