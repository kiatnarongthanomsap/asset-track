'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditAssetModal = ({ isOpen, onClose, asset, onSave, categories }) => {
  const [formData, setFormData] = useState(asset || {});

  useEffect(() => {
    setFormData(asset || {});
  }, [asset]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">แก้ไขทรัพย์สิน</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">รหัสทรัพย์สิน</label>
            <input
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อทรัพย์สิน</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
              บันทึก
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300">
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;
