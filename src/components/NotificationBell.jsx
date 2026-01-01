'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Wrench, Search, CheckCircle2 } from 'lucide-react';

const NotificationBell = ({ assets, onAlertClick, onStatClick, onViewInventory, categories }) => {
  const alerts = assets?.filter(a => a.status === 'Repair' || a.status === 'Check') || [];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAlertClick = (asset) => {
    onAlertClick?.(asset);
    setIsOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Repair': return { icon: Wrench, color: 'text-red-500', bg: 'bg-red-50' };
      case 'Check': return { icon: Search, color: 'text-amber-500', bg: 'bg-amber-50' };
      default: return { icon: Bell, color: 'text-slate-500', bg: 'bg-slate-50' };
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all relative"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
            {alerts.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-[100] overflow-hidden">
          <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-sm text-slate-900">การแจ้งเตือน</h3>
            <span className="text-xs text-slate-500">{alerts.length} รายการ</span>
          </div>

          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {alerts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {alerts.map((asset) => {
                  const { icon: Icon, color, bg } = getStatusIcon(asset.status);
                  return (
                    <div
                      key={asset.id}
                      onClick={() => handleAlertClick(asset)}
                      className="p-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-900 truncate">
                          {asset.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {asset.code}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${asset.status === 'Repair'
                              ? 'bg-red-50 text-red-600 border-red-100'
                              : 'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>
                            {asset.status === 'Repair' ? 'ส่งซ่อม' : 'รอตรวจสอบ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500">ไม่มีการแจ้งเตือนใหม่</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
