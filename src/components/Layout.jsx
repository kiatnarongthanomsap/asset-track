'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  ClipboardCheck,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { useState } from 'react';
import * as supabaseService from '@/services/supabaseService';
import { ToastContainer, useToast } from '@/components/Toast';
import StickerPrintModal from '@/components/StickerPrintModal';

export default function Layout({ children, user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toast = useToast();

  const navItems = [
    { id: 'dashboard', label: 'ภาพรวม (Dashboard)', icon: LayoutDashboard, path: '/' },
    { id: 'assets', label: 'ทะเบียนทรัพย์สิน', icon: Package, path: '/assets' },
    { id: 'inventory', label: 'ตรวจนับครุภัณฑ์', icon: ClipboardCheck, path: '/inventory' },
    { id: 'reports', label: 'รายงานธุรกรรม', icon: BarChart3, path: '/reports' },
    { id: 'sticker', label: 'พิมพ์สติ๊กเกอร์', icon: QrCode, action: 'modal' },
    { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [stickerAssets, setStickerAssets] = useState([]);
  const [stickerCategories, setStickerCategories] = useState([]);

  const handleNavClick = (item) => {
    if (item.action === 'modal' && item.id === 'sticker') {
      // Load assets and categories for sticker modal
      loadStickerData();
      setIsStickerModalOpen(true);
      return;
    }
    if (item.id === 'settings' && user && !supabaseService.canAccessSettings(user)) {
      toast.error('คุณไม่มีสิทธิ์เข้าถึงการตั้งค่า');
      return;
    }
    if (item.path) {
      router.push(item.path);
      setIsMobileMenuOpen(false);
    }
  };

  const loadStickerData = async () => {
    try {
      const [assetsData, catsData] = await Promise.all([
        supabaseService.fetchAssets(),
        supabaseService.fetchCategories()
      ]);
      setStickerAssets(assetsData || []);
      if (catsData && catsData.length > 0) {
        const formattedCategories = catsData.map(cat => ({
          ...cat,
          usefulLife: cat.useful_life || cat.usefulLife || 5,
          iconName: cat.icon_name || cat.iconName || null
        }));
        setStickerCategories(formattedCategories);
      }
    } catch (error) {
      console.error('Failed to load sticker data:', error);
    }
  };

  const handleStickerDataChange = async () => {
    await loadStickerData();
  };

  const isActive = (item) => {
    if (item.path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(item.path);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col md:flex-row relative bg-gray-50">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <StickerPrintModal
        isOpen={isStickerModalOpen}
        onClose={() => setIsStickerModalOpen(false)}
        assets={stickerAssets}
        categories={stickerCategories}
        onDataChange={handleStickerDataChange}
      />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl border-r border-slate-800`}>
        <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">AssetTrack</h1>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">ระบบจัดการทรัพย์สิน</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            if (item.id === 'settings' && user && !supabaseService.canAccessSettings(user)) {
              return null;
            }
            const active = isActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${active
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-400 rounded-l-lg"></div>
                )}
                <item.icon className={`w-5 h-5 mr-3 transition-all duration-300 group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} strokeWidth={active ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-white">
                  {user?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div className="ml-3 overflow-hidden flex-1">
                <p className="text-sm font-semibold text-white truncate">{user?.name || 'Staff Member'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.role || 'Asset Officer'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                title="ออกจากระบบ"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto h-screen flex flex-col relative z-10 w-full">
        <header className="bg-white border-b border-slate-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">AssetTrack</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {children}
      </main>
    </div>
  );
}
