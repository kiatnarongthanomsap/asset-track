'use client';

import React from 'react';
import { Package, Wrench, CheckCircle2, DollarSign } from 'lucide-react';

const KPICards = ({ data, onStatClick }) => {
  const formatCompactNumber = (num) => {
    if (num === 0) return '0';
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${Math.floor(num / 1000).toLocaleString()}k`;
    const mValue = num / 1000000;
    return mValue % 1 === 0 ? `${mValue.toFixed(0)}M` : `${mValue.toFixed(1)}M`;
  };

  const stats = {
    total: data.length,
    normal: data.filter(a => a.status === 'Normal').length,
    repair: data.filter(a => a.status === 'Repair').length,
    totalValue: data.reduce((sum, a) => sum + (a.price || 0), 0),
  };

  const cards = [
    { label: 'ทรัพย์สินทั้งหมด', value: stats.total, icon: Package, color: 'blue', onClick: () => onStatClick('All') },
    { label: 'สถานะปกติ', value: stats.normal, icon: CheckCircle2, color: 'emerald', onClick: () => onStatClick('Normal') },
    { label: 'รอการซ่อม', value: stats.repair, icon: Wrench, color: 'amber', onClick: () => onStatClick('Repair') },
    { label: 'มูลค่ารวม', value: `฿${formatCompactNumber(stats.totalValue)}`, icon: DollarSign, color: 'purple', onClick: () => onStatClick('All'), fullValue: stats.totalValue },
  ];

  const colorStyles = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-500' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-500' },
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => {
        const style = colorStyles[card.color];
        return (
          <div
            key={idx}
            onClick={card.onClick}
            className={`${style.bg} rounded-xl p-4 sm:p-5 border ${style.border} hover:shadow-md cursor-pointer transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${style.icon} p-2.5 rounded-lg text-white`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{card.value}</p>
                {card.fullValue && (
                  <p className="text-xs text-slate-500" title={`฿${card.fullValue.toLocaleString()}`}>
                    ฿{card.fullValue.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-700">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
