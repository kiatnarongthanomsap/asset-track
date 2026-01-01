'use client';

import React from 'react';
import { Package, Wrench, CheckCircle2, DollarSign } from 'lucide-react';

const KPICards = ({ data, onStatClick }) => {
  const stats = {
    total: data.length,
    normal: data.filter(a => a.status === 'Normal').length,
    repair: data.filter(a => a.status === 'Repair').length,
    check: data.filter(a => a.status === 'Check').length,
    totalValue: data.reduce((sum, a) => sum + (a.price || 0), 0),
  };

  const cards = [
    { label: 'ทรัพย์สินทั้งหมด', value: stats.total, icon: Package, color: 'bg-blue-500', onClick: () => onStatClick('All') },
    { label: 'สถานะปกติ', value: stats.normal, icon: CheckCircle2, color: 'bg-emerald-500', onClick: () => onStatClick('Normal') },
    { label: 'รอการซ่อม', value: stats.repair, icon: Wrench, color: 'bg-amber-500', onClick: () => onStatClick('Repair') },
    { label: 'มูลค่ารวม', value: stats.totalValue.toLocaleString(), icon: DollarSign, color: 'bg-purple-500', onClick: () => onStatClick('All') },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={card.onClick}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.color} p-3 rounded-xl text-white`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">{card.value}</h3>
          <p className="text-sm text-slate-600">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
