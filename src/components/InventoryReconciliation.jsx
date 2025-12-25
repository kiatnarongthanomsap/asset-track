import React, { useState, useEffect } from 'react';
import {
    AlertCircle,
    CheckCircle2,
    XCircle,
    MapPin,
    ArrowLeft,
    Save,
    Filter,
    AlertTriangle
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import * as supabaseService from '../services/supabaseService';

const InventoryReconciliation = ({ cycle, user, onBack }) => {
    const [discrepancies, setDiscrepancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [adjustmentData, setAdjustmentData] = useState({
        new_location: '',
        new_status: '',
        reason: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (cycle) {
            fetchDiscrepancies();
        }
    }, [cycle]);

    const fetchDiscrepancies = async () => {
        setLoading(true);
        try {
            const result = await supabaseService.fetchDiscrepancies(cycle.id);
            if (result.status === 'success') {
                setDiscrepancies(result.data);
            }
        } catch (error) {
            console.error('Error fetching discrepancies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyAdjustment = async () => {
        if (!selectedItem) {
            alert('กรุณาเลือกรายการที่ต้องการแก้ไข');
            return;
        }

        if (!adjustmentData.reason || adjustmentData.reason.trim() === '') {
            alert('กรุณากรอกเหตุผลในการแก้ไข');
            return;
        }

        // ตรวจสอบว่ามีข้อมูลที่ต้องแก้ไขหรือไม่
        const discrepancyType = getDiscrepancyType(selectedItem);
        if (discrepancyType === 'location' && (!adjustmentData.new_location || adjustmentData.new_location.trim() === '')) {
            alert('กรุณากรอกสถานที่ใหม่');
            return;
        }

        setSaving(true);
        try {
            const result = await supabaseService.applyInventoryAdjustment({
                count_id: selectedItem.id,
                cycle_id: cycle.id,
                asset_id: selectedItem.asset?.id || selectedItem.asset_id,
                asset_code: selectedItem.asset?.code || selectedItem.asset_code,
                new_location: adjustmentData.new_location?.trim() || null,
                new_status: adjustmentData.new_status || null,
                reason: adjustmentData.reason.trim(),
                approved_by: user?.id || null
            });

            if (result.status === 'success') {
                setSelectedItem(null);
                setAdjustmentData({
                    new_location: '',
                    new_status: '',
                    reason: ''
                });
                await fetchDiscrepancies();
                alert('แก้ไขข้อมูลสำเร็จ');
            } else {
                alert('เกิดข้อผิดพลาด: ' + (result.message || 'ไม่ทราบสาเหตุ'));
            }
        } catch (error) {
            console.error('Error applying adjustment:', error);
            alert('เกิดข้อผิดพลาดในการแก้ไข: ' + (error.message || 'ไม่ทราบสาเหตุ'));
        } finally {
            setSaving(false);
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        const asset = item.asset;
        // ตั้งค่า initial values สำหรับการแก้ไข
        // ถ้ามี counted_location และไม่ตรงกับ location ในระบบ ให้ใช้ counted_location
        // ถ้าไม่มี ให้ใช้ location จากระบบ
        const initialLocation = (item.counted_location && item.counted_location !== asset?.location) 
            ? item.counted_location 
            : (asset?.location || '');
        
        // สำหรับสถานะ: ถ้า counted_status เป็น Damaged ให้ตั้งเป็น Repair หรือ Check
        let initialStatus = asset?.status || 'Normal';
        if (item.counted_status === 'Damaged') {
            initialStatus = asset?.status === 'Repair' ? 'Repair' : 'Check';
        }
        
        setAdjustmentData({
            new_location: initialLocation,
            new_status: initialStatus,
            reason: item.adjustment_reason || ''
        });
    };

    const getDiscrepancyType = (item) => {
        const asset = item.asset;
        if (!asset) return 'Unknown';

        if (item.counted_status === 'Not Found') {
            return 'missing';
        }
        if (item.counted_status === 'Moved' || !item.location_match) {
            return 'location';
        }
        if (item.counted_status === 'Damaged') {
            return 'condition';
        }
        return 'other';
    };

    const getDiscrepancyIcon = (type) => {
        switch (type) {
            case 'missing':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'location':
                return <MapPin className="w-5 h-5 text-blue-600" />;
            case 'condition':
                return <AlertTriangle className="w-5 h-5 text-amber-600" />;
            default:
                return <AlertCircle className="w-5 h-5 text-slate-600" />;
        }
    };

    const getDiscrepancyLabel = (type) => {
        const labels = {
            'missing': 'ไม่พบทรัพย์สิน',
            'location': 'สถานที่เปลี่ยน',
            'condition': 'สภาพเปลี่ยน',
            'other': 'ความแตกต่างอื่นๆ'
        };
        return labels[type] || 'ไม่ทราบ';
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="mt-4 text-slate-500">กำลังโหลดข้อมูล...</p>
            </div>
        );
    }

    return (
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
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">เปรียบเทียบและแก้ไข</h2>
                <p className="text-slate-500 mt-1">
                    {cycle.cycle_name} - {discrepancies.length} รายการที่ต้องแก้ไข
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Discrepancies List */}
                <div className="lg:col-span-2 space-y-4">
                    {discrepancies.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                            <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                            <p className="text-slate-500 font-bold">ไม่มีความแตกต่าง</p>
                            <p className="text-slate-400 text-sm mt-2">ข้อมูลทั้งหมดตรงกับระบบ</p>
                        </div>
                    ) : (
                        discrepancies.map((item) => {
                            const asset = item.asset;
                            if (!asset) return null;

                            const discrepancyType = getDiscrepancyType(item);

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
                                        selectedItem?.id === item.id
                                            ? 'border-emerald-500 shadow-lg'
                                            : 'border-slate-100 hover:border-emerald-200'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                    {asset.code}
                                                </span>
                                                {getDiscrepancyIcon(discrepancyType)}
                                                <span className="text-xs font-bold text-slate-600">
                                                    {getDiscrepancyLabel(discrepancyType)}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-slate-800 mb-1">{asset.name}</h4>
                                            <div className="space-y-1 text-sm text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">สถานที่ในระบบ:</span>
                                                    <span>{asset.location}</span>
                                                </div>
                                                {item.counted_location && item.counted_location !== asset.location && (
                                                    <div className="flex items-center gap-2 text-amber-600">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="font-medium">สถานที่ที่พบจริง:</span>
                                                        <span>{item.counted_location}</span>
                                                    </div>
                                                )}
                                                {item.counted_status && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">สถานะการตรวจนับ:</span>
                                                        <span>{item.counted_status}</span>
                                                    </div>
                                                )}
                                                {item.counted_notes && (
                                                    <div className="text-xs text-slate-500 mt-2">
                                                        หมายเหตุ: {item.counted_notes}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <StatusBadge status={asset.status} />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Adjustment Form */}
                <div className="lg:col-span-1">
                    {selectedItem ? (
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 sticky top-4">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">แก้ไขข้อมูล</h3>
                            {selectedItem.asset && (
                                <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                                    <p className="font-mono text-sm font-bold text-blue-600 mb-1">
                                        {selectedItem.asset.code}
                                    </p>
                                    <p className="font-bold text-slate-800">{selectedItem.asset.name}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* แสดงข้อมูลความแตกต่าง */}
                                <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                                    {selectedItem.counted_location && selectedItem.counted_location !== selectedItem.asset?.location && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-medium text-slate-700">สถานที่:</span>
                                                <p className="text-slate-500">ระบบ: {selectedItem.asset?.location || 'ไม่ระบุ'}</p>
                                                <p className="text-amber-600 font-medium">พบจริง: {selectedItem.counted_location}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedItem.counted_status && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <AlertCircle className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-medium text-slate-700">สถานะการตรวจนับ:</span>
                                                <p className="text-slate-600">{selectedItem.counted_status}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Form สำหรับแก้ไข */}
                                {getDiscrepancyType(selectedItem) === 'location' && (
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">
                                            สถานที่ใหม่ *
                                        </label>
                                        <input
                                            type="text"
                                            value={adjustmentData.new_location}
                                            onChange={(e) => setAdjustmentData({ ...adjustmentData, new_location: e.target.value })}
                                            placeholder="กรอกสถานที่ใหม่"
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            เดิม: {selectedItem.asset?.location || 'ไม่ระบุ'}
                                        </p>
                                    </div>
                                )}

                                {(getDiscrepancyType(selectedItem) === 'condition' || selectedItem.counted_status === 'Damaged') && (
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">
                                            สถานะใหม่
                                        </label>
                                        <select
                                            value={adjustmentData.new_status}
                                            onChange={(e) => setAdjustmentData({ ...adjustmentData, new_status: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            <option value="Normal">ปกติ</option>
                                            <option value="Repair">ส่งซ่อม</option>
                                            <option value="Check">ตรวจสอบ</option>
                                            <option value="Disposed">จำหน่าย</option>
                                        </select>
                                        <p className="text-xs text-slate-500 mt-1">
                                            เดิม: {selectedItem.asset?.status || 'ไม่ระบุ'}
                                        </p>
                                    </div>
                                )}

                                {getDiscrepancyType(selectedItem) === 'missing' && (
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                        <p className="text-sm font-bold text-amber-800">
                                            ⚠️ ทรัพย์สินนี้ไม่พบในการตรวจนับ
                                        </p>
                                        <p className="text-xs text-amber-700 mt-2">
                                            กรุณาตรวจสอบและกรอกเหตุผลในการแก้ไข
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        เหตุผลในการแก้ไข *
                                    </label>
                                    <textarea
                                        value={adjustmentData.reason}
                                        onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                                        rows={4}
                                        placeholder="อธิบายเหตุผลในการแก้ไขข้อมูล..."
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <button
                                    onClick={handleApplyAdjustment}
                                    disabled={!adjustmentData.reason || saving}
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
                                            บันทึกการแก้ไข
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center">
                            <AlertCircle className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-bold">เลือกรายการเพื่อแก้ไข</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryReconciliation;

