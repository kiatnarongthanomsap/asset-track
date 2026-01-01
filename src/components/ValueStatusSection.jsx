'use client';

import React from 'react';
import { getCategoryIcon, getIconNameFromCategories } from '@/utils/categoryIcons';
import { calculateDepreciation } from '@/utils/calculations';
import { ArrowRight, TrendingUp } from 'lucide-react';

const ValueStatusSection = ({ data, onCategoryClick, categories }) => {
  const normalizeName = (name) => name ? String(name).trim() : '';

  const totalBookValue = data.reduce((sum, a) => {
    const dep = calculateDepreciation(a.price || 0, a.purchaseDate, a.usefulLife || 5);
    return sum + dep.bookValue;
  }, 0);

  const categoryStats = categories
    .filter(cat => cat?.name)
    .map(cat => {
      const normalizedName = normalizeName(cat.name);
      const catAssets = data.filter(a => normalizeName(a.category) === normalizedName);
      const totalValue = catAssets.reduce((sum, a) => {
        const dep = calculateDepreciation(a.price || 0, a.purchaseDate, a.usefulLife || 5);
        return sum + dep.bookValue;
      }, 0);
      return { ...cat, name: normalizedName, count: catAssets.length, totalValue };
    })
    .filter(cat => cat.count > 0)
    .sort((a, b) => b.totalValue - a.totalValue);

  const maxValue = categoryStats.length > 0 ? Math.max(...categoryStats.map(c => c.totalValue)) : 1;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="min-w-0">
          <h3 className="text-base sm:text-xl font-bold text-slate-900">มูลค่าตามหมวดหมู่</h3>
          <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">สรุปมูลค่าปัจจุบันของทรัพย์สินแต่ละหมวด</p>
        </div>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
        {categoryStats.length > 0 ? (
          categoryStats.map((cat, index) => {
            const iconName = getIconNameFromCategories(cat.name, categories);
            const IconComponent = getCategoryIcon(cat.name, iconName);
            const percentage = (cat.totalValue / maxValue) * 100;

            return (
              <div
                key={cat.id || cat.name || index}
                onClick={() => onCategoryClick?.(cat)}
                className="group flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-300 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-emerald-300 transition-colors">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      {cat.name}
                    </p>
                    <span className="text-xs text-slate-500">{cat.count} รายการ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    ฿{Math.round(cat.totalValue).toLocaleString()}
                  </p>
                  <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-emerald-600 transition-all hidden sm:block" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-slate-400">
            <p className="text-sm">ยังไม่มีข้อมูลหมวดหมู่</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValueStatusSection;
