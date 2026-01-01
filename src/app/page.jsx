'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, Plus, Package, ClipboardCheck, BarChart3 } from 'lucide-react';
import Layout from '@/components/Layout';
import KPICards from '@/components/KPICards';
import ValueStatusSection from '@/components/ValueStatusSection';
import AuditTrailTable from '@/components/AuditTrailTable';
import NotificationBell from '@/components/NotificationBell';
import * as supabaseService from '@/services/supabaseService';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [assetsData, logsData, catsData] = await Promise.all([
        supabaseService.fetchAssets(),
        supabaseService.fetchAuditLogs(),
        supabaseService.fetchCategories()
      ]);

      setAssets(assetsData || []);
      setAuditLogs(logsData || []);

      if (catsData?.length > 0) {
        setCategories(catsData.map(cat => ({
          ...cat,
          usefulLife: cat.useful_life || cat.usefulLife || 5,
          iconName: cat.icon_name || cat.iconName || null
        })));
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setAssets([]);
      setAuditLogs([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatClick = (status) => router.push(`/assets?filter=${status}`);

  const handleCategoryClick = (category) => {
    const categoryName = category?.name || category;
    router.push(`/assets?category=${encodeURIComponent(categoryName)}`);
  };

  if (!user) return null;

  const quickActions = [
    { label: 'เพิ่มทรัพย์สิน', desc: 'เพิ่มรายการใหม่', icon: Plus, color: 'emerald', href: '/assets?add=true' },
    { label: 'ทะเบียนทรัพย์สิน', desc: 'จัดการทรัพย์สิน', icon: Package, color: 'blue', href: '/assets' },
    { label: 'ตรวจนับ', desc: 'ตรวจสอบครุภัณฑ์', icon: ClipboardCheck, color: 'amber', href: '/inventory' },
    { label: 'รายงาน', desc: 'ดูรายงาน', icon: BarChart3, color: 'purple', href: '/reports' },
  ];

  const colorStyles = {
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', hover: 'hover:border-emerald-300', hoverBg: 'group-hover:bg-emerald-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:border-blue-300', hoverBg: 'group-hover:bg-blue-600' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', hover: 'hover:border-amber-300', hoverBg: 'group-hover:bg-amber-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:border-purple-300', hoverBg: 'group-hover:bg-purple-600' },
  };

  return (
    <Layout
      user={user}
      headerAction={
        <NotificationBell
          assets={assets}
          onAlertClick={(asset) => router.push(`/assets?edit=${asset.id}`)}
          onStatClick={handleStatClick}
          onViewInventory={(cycle) => router.push(`/inventory?cycle=${cycle.id}`)}
          categories={categories}
        />
      }
    >
      {/* Notification Bell - Moved to headerAction */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <NotificationBell
          assets={assets}
          onAlertClick={(asset) => router.push(`/assets?edit=${asset.id}`)}
          onStatClick={handleStatClick}
          onViewInventory={(cycle) => router.push(`/inventory?cycle=${cycle.id}`)}
          categories={categories}
        />
      </div>

      <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">ยินดีต้อนรับ</h1>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  {user?.name || 'Staff'} • <span className="text-emerald-600">{user?.role || 'Officer'}</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <KPICards data={assets} onStatClick={handleStatClick} />

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 lg:gap-3">
          {quickActions.map((action) => {
            const style = colorStyles[action.color];
            return (
              <button
                key={action.label}
                onClick={() => router.push(action.href)}
                className={`group bg-white rounded-xl p-3 lg:p-4 border border-slate-200 ${style.hover} hover:shadow-sm transition-all`}
              >
                <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
                  <div className={`w-10 h-10 rounded-lg ${style.bg} ${style.text} flex items-center justify-center shrink-0 ${style.hoverBg} group-hover:text-white transition-colors`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 text-center lg:text-left">
                    <p className="font-semibold text-slate-800 text-xs lg:text-sm">{action.label}</p>
                    <p className="text-xs text-slate-500 truncate hidden lg:block">{action.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Value by Category */}
        <ValueStatusSection
          data={assets}
          onStatClick={handleStatClick}
          onCategoryClick={handleCategoryClick}
          categories={categories}
        />

        {/* Audit Trail */}
        <div className="bg-white rounded-xl border border-slate-200">
          <AuditTrailTable logs={auditLogs} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}
