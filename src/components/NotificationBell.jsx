'use client';

import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = ({ assets, onAlertClick, onStatClick, onViewInventory, categories }) => {
  const alerts = assets?.filter(a => a.status === 'Repair' || a.status === 'Check') || [];
  
  return (
    <div className="relative">
      <button className="p-2 rounded-lg bg-white shadow-md hover:bg-slate-50 transition-colors">
        <Bell className="w-5 h-5 text-slate-600" />
        {alerts.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;
