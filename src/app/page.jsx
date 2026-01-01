'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, Plus, Package, QrCode, BarChart3, ClipboardCheck, ArrowRight } from 'lucide-react';
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

      if (catsData && catsData.length > 0) {
        const formattedCategories = catsData.map(cat => ({
          ...cat,
          usefulLife: cat.useful_life || cat.usefulLife || 5,
          iconName: cat.icon_name || cat.iconName || null
        }));
        setCategories(formattedCategories);
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

  const handleDashboardStatClick = (status) => {
    router.push(`/assets?filter=${status}`);
  };

  const handleCategoryClick = (category) => {
    // ส่ง category name แทน id เพราะ AssetRegistry ใช้ name ในการ filter
    const categoryName = category?.name || category;
    router.push(`/assets?category=${encodeURIComponent(categoryName)}`);
  };

  if (!user) {
    return null;
  }

  return (
    <Layout user={user}>
      {/* Notification Bell - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <NotificationBell
          assets={assets}
          onAlertClick={(asset) => router.push(`/assets?edit=${asset.id}`)}
          onStatClick={handleDashboardStatClick}
          onViewInventory={(cycle) => {
            router.push(`/inventory?cycle=${cycle.id}`);
          }}
          categories={categories}
        />
      </div>

      <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Welcome Header Section - Simplified */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    ยินดีต้อนรับกลับมา
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                    {user?.name || 'Staff Member'} • <span className="text-emerald-600">{user?.role || 'Asset Officer'}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>
                  {new Date().toLocaleDateString('th-TH', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-5 py-4 rounded-xl flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">สถานะระบบ</p>
                <p className="text-emerald-900 font-bold text-sm">พร้อมใช้งาน</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        

        {/* KPI Cards Section */}
        <div>
          <KPICards
            data={assets}
            onStatClick={handleDashboardStatClick}
          />
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => router.push('/assets?add=true')}
            className="group bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm mb-0.5">เพิ่มทรัพย์สิน</p>
              <p className="text-xs text-slate-500">เพิ่มรายการใหม่</p>
            </div>
          </button>
          
          <button
            onClick={() => router.push('/assets')}
            className="group bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm mb-0.5">ทะเบียนทรัพย์สิน</p>
              <p className="text-xs text-slate-500">จัดการทรัพย์สิน</p>
            </div>
          </button>
          
          <button
            onClick={() => router.push('/inventory')}
            className="group bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm mb-0.5">ตรวจนับ</p>
              <p className="text-xs text-slate-500">ตรวจสอบครุภัณฑ์</p>
            </div>
          </button>
          
          <button
            onClick={() => router.push('/reports')}
            className="group bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm mb-0.5">รายงาน</p>
              <p className="text-xs text-slate-500">ดูรายงาน</p>
            </div>
          </button>
        </div>

        {/* Financial Summary Section */}
        <div>
          <ValueStatusSection
            data={assets}
            onStatClick={handleDashboardStatClick}
            onCategoryClick={handleCategoryClick}
            categories={categories}
          />
        </div>

        {/* Audit Trail Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <AuditTrailTable logs={auditLogs} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}

