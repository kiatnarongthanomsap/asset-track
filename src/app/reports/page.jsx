'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import ReportsView from '@/components/ReportsView';
import * as supabaseService from '@/services/supabaseService';

export default function ReportsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
        return;
      }
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [assetsData, catsData] = await Promise.all([
        supabaseService.fetchAssets(),
        supabaseService.fetchCategories()
      ]);
      setAssets(assetsData || []);
      if (catsData && catsData.length > 0) {
        const formattedCategories = catsData.map(cat => ({
          ...cat,
          usefulLife: cat.useful_life || cat.usefulLife || 5,
          iconName: cat.icon_name || cat.iconName || null
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleUpdateStatus = async (assetId, newStatus) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    try {
      const result = await supabaseService.updateAssetStatus(assetId, newStatus, user);
      if (result.status === 'success') {
        fetchData();
      } else {
        console.error('Failed to update status:', result.message);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (!user) return null;

  return (
    <Layout user={user}>
      <ReportsView
        data={assets}
        onUpdateStatus={handleUpdateStatus}
        categories={categories}
      />
    </Layout>
  );
}

