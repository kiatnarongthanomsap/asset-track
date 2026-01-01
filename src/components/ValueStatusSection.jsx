'use client';

import React from 'react';
import { getCategoryIcon, getIconNameFromCategories } from '@/utils/categoryIcons';
import { calculateDepreciation } from '@/utils/calculations';

const ValueStatusSection = ({ data, onStatClick, onCategoryClick, categories }) => {
  const categoryStats = categories.map(cat => {
    const catAssets = data.filter(a => a.category === cat.name);
    const totalValue = catAssets.reduce((sum, a) => {
      const dep = calculateDepreciation(a.price || 0, a.purchaseDate, a.usefulLife || 5);
      return sum + dep.bookValue;
    }, 0);
    return { ...cat, count: catAssets.length, totalValue };
  }).sort((a, b) => b.totalValue - a.totalValue);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6">มูลค่าตามหมวดหมู่</h3>
      <div className="space-y-4">
        {categoryStats.map((cat) => {
          const iconName = getIconNameFromCategories(cat.name, categories);
          const IconComponent = getCategoryIcon(cat.name, iconName);
          return (
            <div
              key={cat.id || cat.name}
              onClick={() => onCategoryClick(cat)}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{cat.name}</p>
                  <p className="text-sm text-slate-500">{cat.count} รายการ</p>
                </div>
              </div>
              <p className="font-bold text-slate-800">{Math.round(cat.totalValue).toLocaleString()} บาท</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ValueStatusSection;
