'use client';

import React from 'react';
import { getCategoryIcon, getIconNameFromCategories } from '@/utils/categoryIcons';
import { calculateDepreciation } from '@/utils/calculations';
import { ArrowRight, TrendingUp } from 'lucide-react';

const ValueStatusSection = ({ data, onStatClick, onCategoryClick, categories }) => {
  // Normalize function สำหรับ category name
  const normalizeCategoryName = (name) => {
    if (!name) return '';
    return String(name).trim();
  };

  // คำนวณ total book value ของทั้งหมด
  const totalBookValue = data.reduce((sum, a) => {
    const dep = calculateDepreciation(a.price || 0, a.purchaseDate, a.usefulLife || 5);
    return sum + dep.bookValue;
  }, 0);

  // สร้าง category stats โดย normalize category name
  const categoryStats = categories
    .filter(cat => cat && cat.name) // กรอง category ที่ไม่มี name
    .map(cat => {
      const normalizedCatName = normalizeCategoryName(cat.name);
      // Filter assets โดย normalize category name ทั้งสองฝั่ง
      const catAssets = data.filter(a => {
        const assetCategory = normalizeCategoryName(a.category);
        return assetCategory === normalizedCatName;
      });
      
      const totalValue = catAssets.reduce((sum, a) => {
        const dep = calculateDepreciation(a.price || 0, a.purchaseDate, a.usefulLife || 5);
        return sum + dep.bookValue;
      }, 0);
      
      return { 
        ...cat, 
        name: normalizedCatName, // ใช้ normalized name
        count: catAssets.length, 
        totalValue 
      };
    })
    .filter(cat => cat.count > 0 || cat.totalValue > 0) // แสดงเฉพาะ category ที่มี assets
    .sort((a, b) => b.totalValue - a.totalValue);

  const maxValue = categoryStats.length > 0 ? Math.max(...categoryStats.map(c => c.totalValue)) : 1;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">มูลค่าตามหมวดหมู่</h3>
            <p className="text-sm text-slate-500">สรุปมูลค่าปัจจุบันของทรัพย์สินแต่ละหมวด</p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
        </div>
        
        <div className="space-y-3">
          {categoryStats.length > 0 ? (
            categoryStats.map((cat, index) => {
              const iconName = getIconNameFromCategories(cat.name, categories);
              const IconComponent = getCategoryIcon(cat.name, iconName);
              const percentage = (cat.totalValue / maxValue) * 100;
              
              return (
                <div
                  key={cat.id || cat.name || index}
                  onClick={() => onCategoryClick && onCategoryClick(cat)}
                  className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-emerald-300 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 group-hover:border-emerald-300 transition-colors">
                      <IconComponent className="w-6 h-6 text-slate-700 group-hover:text-emerald-600 transition-colors" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {cat.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-slate-600">
                          {cat.count} รายการ
                        </p>
                        <div className="hidden sm:block flex-1 max-w-xs">
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        ฿{Math.round(cat.totalValue).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 font-medium hidden sm:block">
                        {totalBookValue > 0 ? ((cat.totalValue / totalBookValue) * 100).toFixed(1) : '0.0'}% ของทั้งหมด
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="font-semibold">ยังไม่มีข้อมูลหมวดหมู่</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default ValueStatusSection;
