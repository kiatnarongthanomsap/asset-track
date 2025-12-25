import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, MoreVertical, LayoutGrid, List, Edit2, Wrench, X, Tag, ChevronDown, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { calculateDepreciation } from '../utils/calculations';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import { hasRealImage } from '../utils/assetManager';

const AssetRegistry = ({ data, onEditAsset, onAddAsset, onRepairRequest, initialFilter = 'All', onFilterChange, initialCategoryFilter = null, onCategoryFilterChange, categories = [], user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState(initialFilter);
    const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // Sync state if prop changes (e.g. navigation from dashboard)
    React.useEffect(() => {
        setFilterStatus(initialFilter);
    }, [initialFilter]);

    React.useEffect(() => {
        setCategoryFilter(initialCategoryFilter);
    }, [initialCategoryFilter]);

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        onFilterChange?.(status);
    };

    const filteredAssets = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        
        return data.filter(asset => {
            // Filter by category
            if (categoryFilter && (asset.category || 'ไม่ระบุ') !== categoryFilter) {
                return false;
            }

            // Filter by status
            const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
            if (!matchesStatus) {
                return false;
            }

            // ถ้ามี search query ให้ค้นหา
            let matchesSearch = true;
            if (query) {
                const searchFields = [
                    asset.code || '',
                    asset.name || '',
                    asset.brand || '',
                    asset.color || '',
                    asset.serial || '',
                    asset.location || '',
                    asset.category || '',
                    asset.custodian || '',
                    asset.vendor || ''
                ];
                
                matchesSearch = searchFields.some(field => 
                    field.toLowerCase().includes(query)
                );
            }
            
            return matchesSearch;
        });
    }, [data, searchQuery, filterStatus, categoryFilter]);

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">ทะเบียนทรัพย์สิน</h2>
                    <p className="text-slate-500 mt-1">จัดการข้อมูลทรัพย์สินและอุปกรณ์สำนักงาน</p>
                </div>
                <button
                    onClick={onAddAsset}
                    className="flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    เพิ่มทรัพย์สินใหม่
                </button>
            </div>

            {/* Active Filters Display */}
            {(categoryFilter || filterStatus !== 'All') && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-bold text-emerald-800">แสดงรายการที่มี:</span>
                        {categoryFilter && (
                            <span className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    {(() => {
                                        const iconName = getIconNameFromCategories(categoryFilter, categories);
                                        const IconComponent = getCategoryIcon(categoryFilter, iconName);
                                        return <IconComponent className="w-4 h-4" strokeWidth={2} />;
                                    })()}
                                </div>
                                หมวดหมู่: {categoryFilter}
                                <button
                                    onClick={() => {
                                        setCategoryFilter(null);
                                        onCategoryFilterChange?.(null);
                                    }}
                                    className="hover:bg-emerald-700 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                        )}
                        {filterStatus !== 'All' && (
                            <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
                                สถานะ: {filterStatus === 'Normal' ? 'ปกติ' : filterStatus === 'Repair' ? 'ชำรุด' : filterStatus === 'Check' ? 'รอตรวจสอบ' : 'จำหน่ายออก'}
                                <button
                                    onClick={() => handleFilterChange('All')}
                                    className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setCategoryFilter(null);
                            onCategoryFilterChange?.(null);
                            handleFilterChange('All');
                        }}
                        className="text-sm font-bold text-emerald-700 hover:text-emerald-900 underline"
                    >
                        ล้างทั้งหมด
                    </button>
                </div>
            )}

            {/* Filters Toolbar */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col gap-4">
                {/* Top Row: Search and View Mode */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="ค้นหาตาม รหัส, ชื่อ, ยี่ห้อ, สี, Serial, สถานที่, หมวดหมู่..."
                            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none focus:bg-slate-50 text-slate-700 placeholder:text-slate-400 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 items-center w-full md:w-auto">
                        <div className="flex bg-slate-100/50 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Category and Status Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    {/* Category Filter */}
                    <div className="relative flex-1 md:flex-initial">
                        <div className="relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <select
                                value={categoryFilter || ''}
                                onChange={(e) => {
                                    const value = e.target.value || null;
                                    setCategoryFilter(value);
                                    onCategoryFilterChange?.(value);
                                }}
                                className="w-full md:w-64 pl-12 pr-10 py-3 bg-transparent border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 font-medium appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <option value="">ทั้งหมดหมวดหมู่</option>
                                {categories.map((cat) => (
                                    <option key={cat.id || cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center space-x-1 flex-wrap gap-2">
                        {['All', 'Normal', 'Repair', 'Check', 'Disposed'].map((status) => (
                            <button
                                key={status}
                                onClick={() => handleFilterChange(status)}
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${filterStatus === status
                                    ? 'bg-slate-800 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                    }`}
                            >
                                {status === 'All' ? 'ทั้งหมด' :
                                    status === 'Normal' ? 'ปกติ' :
                                        status === 'Repair' ? 'แจ้งซ่อม' :
                                            status === 'Check' ? 'รอตรวจ' : 'จำหน่าย'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredAssets.map(asset => {
                        const dep = calculateDepreciation(asset.price, asset.purchaseDate, asset.usefulLife);
                        return (
                            <div key={asset.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer" onClick={() => onEditAsset(asset)}>
                                <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
                                    {hasRealImage(asset.image) ? (
                                        <img 
                                            src={asset.image} 
                                            alt={asset.name} 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                // ซ่อนรูปภาพและแสดง icon แทน
                                                e.target.style.display = 'none';
                                                const iconContainer = e.target.nextElementSibling;
                                                if (iconContainer) {
                                                    iconContainer.style.display = 'flex';
                                                }
                                            }}
                                        />
                                    ) : null}
                                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${hasRealImage(asset.image) ? 'hidden' : 'flex'}`}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                                {(() => {
                                                    const iconName = getIconNameFromCategories(asset.category, categories);
                                                    const IconComponent = getCategoryIcon(asset.category, iconName);
                                                    return <IconComponent className="w-8 h-8 text-slate-600" strokeWidth={2} />;
                                                })()}
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium">ไม่มีรูปภาพ</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3 backdrop-blur-md bg-white/80 p-1 rounded-lg shadow-sm">
                                        <StatusBadge status={asset.status} />
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                                        <div
                                            onClick={(e) => { e.stopPropagation(); onEditAsset(asset); }}
                                            className="bg-white/90 p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform hover:bg-white"
                                        >
                                            <Edit2 className="w-6 h-6 text-slate-700" />
                                        </div>
                                        <div
                                            onClick={(e) => { e.stopPropagation(); onRepairRequest(asset); }}
                                            className="bg-white/90 p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform hover:bg-blue-50"
                                        >
                                            <Wrench className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-800 line-clamp-1 text-lg group-hover:text-emerald-600 transition-colors">{asset.name}</h3>
                                            <p className="text-xs text-slate-400 font-mono mt-1">{asset.code}</p>
                                        </div>
                                    </div>
                                    {asset.location && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3 mt-2">
                                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="line-clamp-1">{asset.location}</span>
                                        </div>
                                    )}
                                    <div className="space-y-3 mt-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">มูลค่าปัจจุบัน</span>
                                            <span className="font-bold text-slate-800">{Math.round(dep.bookValue).toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div
                                                className="bg-emerald-500 h-2 rounded-full"
                                                style={{ width: `${(dep.bookValue / asset.price) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="flex-1 overflow-visible">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-2">รูปภาพ</th>
                                <th className="px-6 py-2">รหัสทรัพย์สิน</th>
                                <th className="px-6 py-2">รายละเอียด</th>
                                <th className="px-6 py-2">สถานที่ตั้ง</th>
                                <th className="px-6 py-2 text-right">ราคาทุน</th>
                                <th className="px-6 py-2 text-right">มูลค่าปัจจุบัน</th>
                                <th className="px-6 py-2">สถานะ</th>
                                <th className="px-6 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.length > 0 ? (
                                filteredAssets.map((asset) => {
                                    const dep = calculateDepreciation(asset.price, asset.purchaseDate, asset.usefulLife);
                                    return (
                                        <tr key={asset.id} className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 group rounded-2xl">
                                            <td className="p-4 rounded-l-2xl border-y border-l border-slate-50 group-hover:border-slate-100">
                                                {hasRealImage(asset.image) ? (
                                                    <img 
                                                        src={asset.image} 
                                                        alt="" 
                                                        className="w-14 h-14 rounded-xl object-cover shadow-sm"
                                                        onError={(e) => {
                                                            // ซ่อนรูปภาพและแสดง icon แทน
                                                            e.target.style.display = 'none';
                                                            const iconContainer = e.target.nextElementSibling;
                                                            if (iconContainer) {
                                                                iconContainer.style.display = 'flex';
                                                            }
                                                        }}
                                                    />
                                                ) : null}
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-sm ${hasRealImage(asset.image) ? 'hidden' : 'flex'}`}>
                                                    {(() => {
                                                        const iconName = getIconNameFromCategories(asset.category, categories);
                                                        const IconComponent = getCategoryIcon(asset.category, iconName);
                                                        return <IconComponent className="w-6 h-6 text-slate-600" strokeWidth={2} />;
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100">
                                                <span className="font-mono text-sm font-semibold text-emerald-700 bg-emerald-50/50 px-2 py-1 rounded-md">{asset.code}</span>
                                                <div className="text-xs text-slate-400 mt-1">S/N: {asset.serial}</div>
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100">
                                                <div className="font-bold text-slate-700">{asset.name}</div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                                    <span>{asset.brand}</span>
                                                    {asset.category && (
                                                        <>
                                                            <span>•</span>
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="w-3.5 h-3.5 flex items-center justify-center">
                                                                    {(() => {
                                                                        const iconName = getIconNameFromCategories(asset.category, categories);
                                                                        const IconComponent = getCategoryIcon(asset.category, iconName);
                                                                        return <IconComponent className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />;
                                                                    })()}
                                                                </div>
                                                                <span>{asset.category}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100">
                                                <div className="text-sm text-slate-600 font-medium">
                                                    {asset.location}
                                                </div>
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100 font-mono text-sm text-slate-500 text-right">
                                                {asset.price.toLocaleString()}
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100 text-right">
                                                <div className="font-mono text-sm font-bold text-slate-800">{Math.round(dep.bookValue).toLocaleString()}</div>
                                                <div className="text-[10px] text-slate-400">เสื่อม: {Math.round(dep.accumulatedDepreciation).toLocaleString()}</div>
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100">
                                                <StatusBadge status={asset.status} />
                                            </td>
                                            <td className="p-4 rounded-r-2xl border-y border-r border-slate-50 group-hover:border-slate-100 text-center">
                                                <div className="flex justify-center gap-1">
                                                    <button onClick={() => onRepairRequest(asset)} className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-400 transition-colors" title="ขออนุมัติซ่อม">
                                                        <Wrench className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => onEditAsset(asset)} className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg text-slate-400 transition-colors" title="แก้ไข">
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="w-12 h-12 mb-4 text-gray-200" />
                                            <p>ไม่พบข้อมูลที่ค้นหา</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssetRegistry;
