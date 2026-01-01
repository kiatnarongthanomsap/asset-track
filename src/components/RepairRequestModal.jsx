'use client';

import React from 'react';
import { X } from 'lucide-react';

const RepairRequestModal = ({ asset, onClose, categories, user }) => {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">ขออนุมัติซ่อม</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-slate-600 mb-4">ทรัพย์สิน: {asset.name}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
            ส่งคำขอ
          </button>
          <button onClick={onClose} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepairRequestModal;
