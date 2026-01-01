'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import InventoryCycleManager from '@/components/InventoryCycleManager';
import InventoryCountingView from '@/components/InventoryCountingView';
import InventoryReconciliation from '@/components/InventoryReconciliation';
import InventoryReport from '@/components/InventoryReport';
import * as supabaseService from '@/services/supabaseService';

function InventoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [inventoryView, setInventoryView] = useState('manager');
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
    const cycleId = searchParams.get('cycle');
    if (cycleId && user) {
      loadCycle(cycleId);
    }
  }, [searchParams, user]);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const loadCycle = async (cycleId) => {
    try {
      const result = await supabaseService.fetchInventoryCycle(parseInt(cycleId));
      if (result.status === 'success') {
        setSelectedCycle(result.data);
        setInventoryView('counting');
      }
    } catch (error) {
      console.error('Failed to load cycle:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const catsData = await supabaseService.fetchCategories();
      if (catsData && catsData.length > 0) {
        const formattedCategories = catsData.map(cat => ({
          ...cat,
          usefulLife: cat.useful_life || cat.usefulLife || 5,
          iconName: cat.icon_name || cat.iconName || null
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  if (!user) return null;

  return (
    <Layout user={user}>
      {inventoryView === 'manager' && (
        <InventoryCycleManager
          user={user}
          onCycleSelect={(cycle) => {
            setSelectedCycle(cycle);
            setInventoryView('counting');
            router.push(`/inventory?cycle=${cycle.id}`);
          }}
          onViewChange={(view) => {
            setInventoryView(view);
          }}
        />
      )}
      {inventoryView === 'counting' && selectedCycle && (
        <InventoryCountingView
          cycle={selectedCycle}
          user={user}
          categories={categories}
          onBack={() => {
            setSelectedCycle(null);
            setInventoryView('manager');
            router.push('/inventory');
          }}
          onCountSaved={async () => {
            // Refresh data if needed
          }}
        />
      )}
      {inventoryView === 'reconciliation' && selectedCycle && (
        <InventoryReconciliation
          cycle={selectedCycle}
          user={user}
          onBack={() => {
            setSelectedCycle(null);
            setInventoryView('manager');
            router.push('/inventory');
          }}
        />
      )}
      {inventoryView === 'report' && selectedCycle && (
        <InventoryReport
          cycle={selectedCycle}
          onBack={() => {
            setSelectedCycle(null);
            setInventoryView('manager');
            router.push('/inventory');
          }}
        />
      )}
    </Layout>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <InventoryContent />
    </Suspense>
  );
}

