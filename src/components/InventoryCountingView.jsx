import React, { useState, useEffect } from 'react';
import {
    Search,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    MapPin,
    Filter,
    Save,
    ArrowLeft,
    Package,
    QrCode
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import QRCodeScanner from './QRCodeScanner';
import * as supabaseService from '../services/supabaseService';
import { hasRealImage } from '../utils/assetManager';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import { ToastContainer, useToast } from './Toast';

const InventoryCountingView = ({ cycle, user, onBack, categories = [] }) => {
    const toast = useToast();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, pending, found, not_found, damaged, moved
    const [saving, setSaving] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [countData, setCountData] = useState({
        counted_status: null,
        counted_location: '',
        counted_notes: ''
    });
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (cycle) {
            fetchAssets();
        }
    }, [cycle, statusFilter]);

    useEffect(() => {
        // ตรวจสอบว่าเป็นมือถือหรือไม่
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            const filters = {};
            if (statusFilter === 'pending') {
                filters.pending_only = true;
            } else if (statusFilter !== 'all') {
                filters.counted_status = statusFilter === 'found' ? 'Found' :
                    statusFilter === 'not_found' ? 'Not Found' :
                    statusFilter === 'damaged' ? 'Damaged' : 'Moved';
            }

            // ดึงข้อมูล assets และ summary พร้อมกัน
            const [result, summaryResult] = await Promise.all([
                supabaseService.fetchAssetsForCounting(cycle.id, filters),
                supabaseService.getInventorySummary(cycle.id)
            ]);

            if (result.status === 'success') {
                setAssets(result.data);
            }

            if (summaryResult.status === 'success') {
                setSummary(summaryResult.data);
            }
        } catch (error) {
            console.error('Error fetching assets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCount = async () => {
        if (!selectedAsset || !countData.counted_status) {
            alert('กรุณาเลือกสถานะการตรวจนับ');
            return;
        }

        setSaving(true);
        try {
            const asset = selectedAsset.asset;
            if (!asset || !asset.id) {
                alert('ไม่พบข้อมูลทรัพย์สิน');
                return;
            }

            const result = await supabaseService.saveInventoryCount({
                id: selectedAsset.id, // inventory_count id ถ้ามี (สำหรับ update)
                cycle_id: cycle.id,
                asset_id: asset.id,
                asset_code: asset.code,
                asset: asset, // ส่ง asset object ไปด้วยเพื่อตรวจสอบ location_match
                counted_status: countData.counted_status,
                counted_location: countData.counted_location || asset.location || '',
                counted_by: user.id,
                counted_date: new Date().toISOString().split('T')[0],
                counted_notes: countData.counted_notes,
                location_match: (countData.counted_location || asset.location) === asset.location,
                status_match: true,
                condition_match: countData.counted_status === 'Found' || countData.counted_status === 'Damaged',
                requires_adjustment: false
            });

            if (result.status === 'success') {
                setSelectedAsset(null);
                setCountData({
                    counted_status: null,
                    counted_location: '',
                    counted_notes: ''
                });
                // Refresh data to update summary
                await fetchAssets();
                toast.success('บันทึกผลการตรวจนับสำเร็จ');
            } else {
                toast.error('เกิดข้อผิดพลาด: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving count:', error);
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        } finally {
            setSaving(false);
        }
    };

    const handleAssetClick = (assetCount) => {
        const asset = assetCount.asset;
        setSelectedAsset(assetCount);
        setCountData({
            counted_status: assetCount.counted_status || null,
            counted_location: assetCount.counted_location || asset?.location || '',
            counted_notes: assetCount.counted_notes || ''
        });
    };

    const handleQRScan = (scannedCode) => {
        // ค้นหา asset ที่มี code ตรงกับที่สแกนได้
        const scannedCodeClean = scannedCode.trim().toUpperCase();
        const foundAsset = assets.find(item => {
            const asset = item.asset;
            if (!asset) return false;
            return asset.code.toUpperCase() === scannedCodeClean;
        });

        if (foundAsset) {
            handleAssetClick(foundAsset);
            setShowQRScanner(false);
            // Scroll to selected asset
            setTimeout(() => {
                const element = document.getElementById(`asset-${foundAsset.id}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            toast.success(`พบครุภัณฑ์รหัส "${scannedCodeClean}"`);
        } else {
            toast.warning(`ไม่พบครุภัณฑ์รหัส "${scannedCodeClean}" ในรอบการตรวจนับนี้`);
            setShowQRScanner(false);
        }
    };

    const filteredAssets = assets.filter(item => {
        const asset = item.asset;
        if (!asset) return false;

        const matchesSearch = searchTerm === '' ||
            asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (asset.location || '').toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Found':
                return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
            case 'Not Found':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'Damaged':
                return <AlertTriangle className="w-5 h-5 text-amber-600" />;
            case 'Moved':
                return <MapPin className="w-5 h-5 text-blue-600" />;
            default:
                return <Package className="w-5 h-5 text-slate-400" />;
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'Found': 'พบ',
            'Not Found': 'ไม่พบ',
            'Damaged': 'สภาพเปลี่ยน',
            'Moved': 'ย้ายที่'
        };
        return labels[status] || 'ยังไม่ตรวจนับ';
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="mt-4 text-slate-500">กำลังโหลดข้อมูล...</p>
            </div>
        );
    }

    if (!cycle) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">ไม่พบข้อมูลรอบการตรวจนับ</p>
            </div>
        );
    }

    // คำนวณ progress percent
    const progressPercent = summary && summary.total > 0 
        ? Math.round((summary.counted / summary.total) * 100) 
        : 0;

    return (
        <>
            <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
            <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
                {/* Header */}
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center text-slate-600 hover:text-slate-800 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    กลับ
                </button>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{cycle.cycle_name}</h2>
                <p className="text-slate-500 mt-1">ตรวจนับครุภัณฑ์ - {summary ? summary.total : filteredAssets.length} รายการ</p>
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ทั้งหมด</p>
                            <Package className="w-4 h-4 text-slate-400" />
                        </div>
                        <p className="text-2xl font-black text-slate-800">{summary.total}</p>
                        <p className="text-xs text-slate-500 mt-1">รายการ</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ตรวจนับแล้ว</p>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <p className="text-2xl font-black text-emerald-600">{summary.counted}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                                <div
                                    className="bg-emerald-500 h-1.5 rounded-full transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <span className="text-xs font-bold text-slate-600">{progressPercent}%</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-emerald-100 bg-emerald-50/50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">พบ</p>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-2xl font-black text-emerald-700">{summary.found || 0}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-red-100 bg-red-50/50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">ไม่พบ</p>
                            <XCircle className="w-4 h-4 text-red-600" />
                        </div>
                        <p className="text-2xl font-black text-red-700">{summary.notFound || 0}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-amber-100 bg-amber-50/50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">สภาพเปลี่ยน</p>
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                        </div>
                        <p className="text-2xl font-black text-amber-700">{summary.damaged || 0}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-blue-100 bg-blue-50/50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">ย้ายที่</p>
                            <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-2xl font-black text-blue-700">{summary.moved || 0}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Asset List */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search and Filter */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="ค้นหารหัส, ชื่อ, หรือสถานที่..."
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                {isMobile && (
                                    <button
                                        onClick={() => setShowQRScanner(true)}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center"
                                        title="สแกน QR Code"
                                    >
                                        <QrCode className="w-5 h-5" />
                                    </button>
                                )}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="all">ทั้งหมด</option>
                                    <option value="pending">ยังไม่ตรวจนับ</option>
                                    <option value="found">พบ</option>
                                    <option value="not_found">ไม่พบ</option>
                                    <option value="damaged">สภาพเปลี่ยน</option>
                                    <option value="moved">ย้ายที่</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Asset List */}
                    <div className="space-y-2">
                        {filteredAssets.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                                <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-500 font-bold">ไม่พบข้อมูล</p>
                            </div>
                        ) : (
                            filteredAssets.map((item) => {
                                const asset = item.asset;
                                if (!asset) return null;

                                return (
                                    <div
                                        id={`asset-${item.id}`}
                                        key={item.id}
                                        onClick={() => handleAssetClick(item)}
                                        className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
                                            selectedAsset?.id === item.id
                                                ? 'border-emerald-500 shadow-lg'
                                                : 'border-slate-100 hover:border-emerald-200'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Image/Icon */}
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {hasRealImage(asset.image) ? (
                                                    <img 
                                                        src={asset.image} 
                                                        alt={asset.name} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            const iconContainer = e.target.nextElementSibling;
                                                            if (iconContainer) {
                                                                iconContainer.style.display = 'flex';
                                                            }
                                                        }}
                                                    />
                                                ) : null}
                                                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${hasRealImage(asset.image) ? 'hidden' : 'flex'}`}>
                                                    {(() => {
                                                        try {
                                                            const iconName = getIconNameFromCategories(asset.category, categories || []);
                                                            const IconComponent = getCategoryIcon(asset.category, iconName);
                                                            return <IconComponent className="w-8 h-8 text-slate-500" strokeWidth={2} />;
                                                        } catch (error) {
                                                            console.error('Error rendering icon:', error);
                                                            return <Package className="w-8 h-8 text-slate-500" strokeWidth={2} />;
                                                        }
                                                    })()}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                        {asset.code}
                                                    </span>
                                                    {/* แสดงสถานะการตรวจนับ */}
                                                    {item.counted_status ? (
                                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border-2" style={{
                                                            borderColor: item.counted_status === 'Found' ? '#10b981' :
                                                                         item.counted_status === 'Not Found' ? '#ef4444' :
                                                                         item.counted_status === 'Damaged' ? '#f59e0b' :
                                                                         '#3b82f6',
                                                            backgroundColor: item.counted_status === 'Found' ? '#ecfdf5' :
                                                                             item.counted_status === 'Not Found' ? '#fef2f2' :
                                                                             item.counted_status === 'Damaged' ? '#fffbeb' :
                                                                             '#eff6ff'
                                                        }}>
                                                            {getStatusIcon(item.counted_status)}
                                                            <span className="text-xs font-bold" style={{
                                                                color: item.counted_status === 'Found' ? '#059669' :
                                                                       item.counted_status === 'Not Found' ? '#dc2626' :
                                                                       item.counted_status === 'Damaged' ? '#d97706' :
                                                                       '#2563eb'
                                                            }}>
                                                                {getStatusLabel(item.counted_status)}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
                                                            <Package className="w-4 h-4 text-slate-400" />
                                                            <span className="text-xs font-bold text-slate-500">ยังไม่ตรวจนับ</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-slate-800 mb-1 line-clamp-2">{asset.name}</h4>
                                                <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                                                    {asset.brand && <span>{asset.brand}</span>}
                                                    <span className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-1 shrink-0" />
                                                        <span className="line-clamp-1">{asset.location}</span>
                                                    </span>
                                                </div>
                                                {/* แสดงข้อมูลการตรวจนับ */}
                                                {item.counted_status && (
                                                    <div className="mt-2 space-y-1">
                                                        {item.counted_location && item.counted_location !== asset.location && (
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3 text-amber-600" />
                                                                <span className="text-xs text-amber-600 font-medium">
                                                                    พบที่: {item.counted_location}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {item.counted_date && (
                                                            <div className="text-xs text-slate-500">
                                                                วันที่ตรวจนับ: {new Date(item.counted_date).toLocaleDateString('th-TH')}
                                                            </div>
                                                        )}
                                                        {item.counted_notes && (
                                                            <div className="text-xs text-slate-600 italic line-clamp-1">
                                                                หมายเหตุ: {item.counted_notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Badge - สถานะทรัพย์สินในระบบ */}
                                            <div className="shrink-0">
                                                <StatusBadge status={asset.status} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Count Form */}
                <div className="lg:col-span-1">
                    {selectedAsset ? (
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 sticky top-4">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">บันทึกผลการตรวจนับ</h3>
                            {selectedAsset.asset && (
                                <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                                    <p className="font-mono text-sm font-bold text-blue-600 mb-1">
                                        {selectedAsset.asset.code}
                                    </p>
                                    <p className="font-bold text-slate-800">{selectedAsset.asset.name}</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        สถานที่ในระบบ: {selectedAsset.asset.location}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        สถานะการตรวจนับ *
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Found', 'Not Found', 'Damaged', 'Moved'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => setCountData({ ...countData, counted_status: status })}
                                                className={`p-3 rounded-xl border-2 transition-all ${
                                                    countData.counted_status === status
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                        : 'border-slate-200 hover:border-emerald-200'
                                                }`}
                                            >
                                                <div className="flex items-center justify-center mb-1">
                                                    {getStatusIcon(status)}
                                                </div>
                                                <div className="text-xs font-bold">{getStatusLabel(status)}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {countData.counted_status && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                สถานที่ที่พบจริง
                                            </label>
                                            <input
                                                type="text"
                                                value={countData.counted_location}
                                                onChange={(e) => setCountData({ ...countData, counted_location: e.target.value })}
                                                placeholder="กรอกสถานที่ที่พบจริง"
                                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                หมายเหตุ
                                            </label>
                                            <textarea
                                                value={countData.counted_notes}
                                                onChange={(e) => setCountData({ ...countData, counted_notes: e.target.value })}
                                                rows={3}
                                                placeholder="หมายเหตุเพิ่มเติม..."
                                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={handleSaveCount}
                                    disabled={!countData.counted_status || saving}
                                    className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            กำลังบันทึก...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            บันทึกผลการตรวจนับ
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center">
                            <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-bold">เลือกทรัพย์สินเพื่อบันทึกผล</p>
                        </div>
                    )}
                </div>
            </div>

            {/* QR Code Scanner Modal */}
            {showQRScanner && (
                <QRCodeScanner
                    onScan={handleQRScan}
                    onClose={() => setShowQRScanner(false)}
                />
            )}
            </div>
        </>
    );
};

export default InventoryCountingView;

