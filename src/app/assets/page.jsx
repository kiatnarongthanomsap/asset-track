'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import AssetRegistry from '@/components/AssetRegistry';
import EditAssetModal from '@/components/EditAssetModal';
import RepairRequestModal from '@/components/RepairRequestModal';
import * as supabaseService from '@/services/supabaseService';
import { useToast } from '@/components/Toast';

function AssetsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [repairAsset, setRepairAsset] = useState(null);
  const [assetFilter, setAssetFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const toast = useToast();

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
    const filter = searchParams.get('filter');
    const category = searchParams.get('category');
    const editId = searchParams.get('edit');
    
    if (filter) {
      setAssetFilter(filter);
    }
    if (category) {
      // Decode category name จาก URL
      const decodedCategory = decodeURIComponent(category);
      setCategoryFilter(decodedCategory);
    }
    if (editId && assets.length > 0) {
      const asset = assets.find(a => a.id === parseInt(editId));
      if (asset) {
        setCurrentAsset(asset);
        setIsEditModalOpen(true);
      }
    }
  }, [searchParams, assets]);

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

  const handleAddAsset = () => {
    if (!supabaseService.canManageAssets(user)) {
      toast.error('คุณไม่มีสิทธิ์เพิ่มทรัพย์สิน');
      return;
    }
    const newAsset = {
      id: Date.now(),
      code: '',
      name: '',
      brand: '',
      color: '',
      category: '',
      serial: '',
      price: 0,
      purchaseDate: '',
      usefulLife: 5,
      location: '',
      status: 'Normal',
      custodian: '',
      vendor: '',
      warrantyExpiry: '',
      notes: '',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'
    };
    setCurrentAsset(newAsset);
    setIsEditModalOpen(true);
  };

  const handleEditAsset = (asset) => {
    setCurrentAsset(asset);
    setIsEditModalOpen(true);
  };

  const handleRepairRequest = (asset) => {
    setRepairAsset(asset);
  };

  const handleSaveAsset = async (savedAsset) => {
    try {
      const result = await supabaseService.saveAsset(savedAsset, user);
      if (result.status === 'success') {
        fetchData();
        setIsEditModalOpen(false);
        toast.success('บันทึกข้อมูลสำเร็จ');
      } else {
        toast.error('ไม่สามารถบันทึกข้อมูลได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
      }
    } catch (error) {
      console.error('Failed to save asset:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  if (!user) return null;

  return (
    <Layout user={user}>
      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        asset={currentAsset}
        onSave={handleSaveAsset}
        categories={categories}
      />
      {repairAsset && (
        <RepairRequestModal
          asset={repairAsset}
          onClose={() => setRepairAsset(null)}
          categories={categories}
          user={user}
        />
      )}
      <AssetRegistry
        user={user}
        data={assets}
        onEditAsset={handleEditAsset}
        onAddAsset={handleAddAsset}
        onRepairRequest={handleRepairRequest}
        initialFilter={assetFilter}
        onFilterChange={setAssetFilter}
        initialCategoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        categories={categories}
      />
    </Layout>
  );
}

export default function AssetsPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <AssetsContent />
    </Suspense>
  );
}
