'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LayoutDashboard } from 'lucide-react';
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
    router.push(`/assets?category=${category.id || category}`);
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

      <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6 sm:space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Welcome Header Section */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    ยินดีต้อนรับกลับมา
                  </h2>
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    {user?.name || 'Staff Member'} • {user?.role || 'Asset Officer'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
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
            <div className="bg-primary-50 border border-primary-200 px-6 py-4 rounded-lg flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-medium text-primary-700 uppercase tracking-wide leading-none mb-1">สถานะระบบ</p>
                <p className="text-primary-900 font-semibold text-sm">พร้อมใช้งาน</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
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
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <AuditTrailTable logs={auditLogs} />
        </div>
      </div>
    </Layout>
  );
}

