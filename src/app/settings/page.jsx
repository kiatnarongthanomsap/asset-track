'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import SettingsView from '@/components/SettingsView';
import * as supabaseService from '@/services/supabaseService';

export default function SettingsPage() {
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
      const userData = JSON.parse(storedUser);
      if (!supabaseService.canAccessSettings(userData)) {
        router.push('/');
        return;
      }
      setUser(userData);
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

  if (!user) return null;

  return (
    <Layout user={user}>
      <SettingsView
        user={user}
        categories={categories}
        setCategories={setCategories}
        assets={assets}
        setAssets={setAssets}
        onDataChange={fetchData}
      />
    </Layout>
  );
}

