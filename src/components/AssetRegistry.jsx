import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, MoreVertical, LayoutGrid, List, Edit2, Wrench } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { calculateDepreciation } from '../utils/calculations';

const AssetRegistry = ({ data, onEditAsset, onAddAsset, onRepairRequest, initialFilter = 'All', onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState(initialFilter);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // Sync state if prop changes (e.g. navigation from dashboard)
    React.useEffect(() => {
        setFilterStatus(initialFilter);
    }, [initialFilter]);

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        onFilterChange?.(status);
    };

    const filteredAssets = useMemo(() => {
        return data.filter(asset => {
            const matchesSearch =
                asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [data, searchQuery, filterStatus]);

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

            {/* Filters Toolbar */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center pr-2">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="ค้นหาตาม รหัส, ชื่อ, หรือสถานที่..."
                        className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none focus:bg-slate-50 text-slate-700 placeholder:text-slate-400 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 items-center w-full md:w-auto p-2">
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

                    <div className="flex items-center space-x-1">
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
                                    <img src={asset.image} alt={asset.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
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
                                        <div>
                                            <h3 className="font-bold text-slate-800 line-clamp-1 text-lg group-hover:text-emerald-600 transition-colors">{asset.name}</h3>
                                            <p className="text-xs text-slate-400 font-mono mt-1">{asset.code}</p>
                                        </div>
                                    </div>
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
                                                <img src={asset.image} alt="" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100">
                                                <span className="font-mono text-sm font-semibold text-emerald-700 bg-emerald-50/50 px-2 py-1 rounded-md">{asset.code}</span>
                                                <div className="text-xs text-slate-400 mt-1">S/N: {asset.serial}</div>
                                            </td>
                                            <td className="p-4 border-y border-slate-50 group-hover:border-slate-100">
                                                <div className="font-bold text-slate-700">{asset.name}</div>
                                                <div className="text-xs text-slate-400">{asset.brand} • {asset.category}</div>
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
