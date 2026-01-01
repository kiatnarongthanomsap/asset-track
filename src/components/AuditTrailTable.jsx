'use client';

import React from 'react';

const AuditTrailTable = ({ logs }) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Audit Trail</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-slate-600 border-b">
              <th className="pb-3">วันที่</th>
              <th className="pb-3">การกระทำ</th>
              <th className="pb-3">รหัสทรัพย์สิน</th>
              <th className="pb-3">ผู้ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {logs && logs.length > 0 ? (
              logs.slice(0, 10).map((log, idx) => (
                <tr key={idx} className="border-b text-sm">
                  <td className="py-3 text-slate-600">{log.action_date || '-'}</td>
                  <td className="py-3 text-slate-800">{log.action || '-'}</td>
                  <td className="py-3 text-slate-600">{log.asset_code || '-'}</td>
                  <td className="py-3 text-slate-600">{log.operator || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400">ไม่มีข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrailTable;
