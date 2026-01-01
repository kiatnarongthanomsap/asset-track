'use client';

import React from 'react';
import { Package, Wrench, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';

const KPICards = ({ data, onStatClick }) => {
  // ฟังก์ชันสำหรับจัดรูปแบบตัวเลขให้สั้นลง
  const formatCompactNumber = (num) => {
    if (num === 0) return '0';
    if (num < 1000) return num.toString();
    if (num < 1000000) {
      // แสดงเป็น k (พัน) - ปัดลงเป็นจำนวนเต็ม
      const kValue = Math.floor(num / 1000);
      return `${kValue.toLocaleString()}k`;
    }
    // แสดงเป็น M (ล้าน)
    const mValue = num / 1000000;
    if (mValue % 1 === 0) {
      return `${mValue.toFixed(0)}M`;
    }
    return `${mValue.toFixed(1)}M`;
  };

  const stats = {
    total: data.length,
    normal: data.filter(a => a.status === 'Normal').length,
    repair: data.filter(a => a.status === 'Repair').length,
    check: data.filter(a => a.status === 'Check').length,
    totalValue: data.reduce((sum, a) => sum + (a.price || 0), 0),
  };

  const cards = [
    { 
      label: 'ทรัพย์สินทั้งหมด', 
      value: stats.total, 
      icon: Package, 
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100/50',
      borderColor: 'border-blue-200',
      shadowColor: 'shadow-blue-200',
      onClick: () => onStatClick('All') 
    },
    { 
      label: 'สถานะปกติ', 
      value: stats.normal, 
      icon: CheckCircle2, 
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100/50',
      borderColor: 'border-emerald-200',
      shadowColor: 'shadow-emerald-200',
      onClick: () => onStatClick('Normal') 
    },
    { 
      label: 'รอการซ่อม', 
      value: stats.repair, 
      icon: Wrench, 
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100/50',
      borderColor: 'border-amber-200',
      shadowColor: 'shadow-amber-200',
      onClick: () => onStatClick('Repair') 
    },
    { 
      label: 'มูลค่ารวม', 
      value: `฿${formatCompactNumber(stats.totalValue)}`, 
      icon: DollarSign, 
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200',
      shadowColor: 'shadow-purple-200',
      onClick: () => onStatClick('All'),
      fullValue: stats.totalValue // เก็บค่าเต็มไว้สำหรับ tooltip
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={card.onClick}
          className={`relative overflow-hidden bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 border-2 ${card.borderColor} shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group flex flex-col`}
        >
          <div className="relative z-10">
            {/* Header: Icon ซ้าย, ตัวเลขขวา */}
            <div className="flex items-start justify-between mb-4">
              <div className={`relative group-hover:scale-110 transition-transform duration-300`}>
                <div className={`relative bg-gradient-to-br ${card.gradient} p-3 rounded-xl text-white shadow-md`}>
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  {card.value}
                </h3>
                {card.fullValue && (
                  <p className="text-xs text-slate-500 font-medium mt-1" title={`มูลค่าเต็ม: ฿${card.fullValue.toLocaleString()}`}>
                    ฿{card.fullValue.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            {/* Label ด้านล่าง */}
            <div className="mt-auto">
              <p className="text-sm font-bold text-slate-700">
                {card.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
