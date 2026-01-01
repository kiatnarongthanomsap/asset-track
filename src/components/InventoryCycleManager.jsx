'use client';

import React, { useState, useEffect } from 'react';
import {
    Calendar,
    Plus,
    Edit,
    Trash2,
    Play,
    CheckCircle2,
    XCircle,
    Clock,
    Users,
    FileText,
    AlertCircle,
    X,
    Save
} from 'lucide-react';
import * as supabaseService from '@/services/supabaseService';
import { useToast } from '@/components/Toast';

const InventoryCycleManager = ({ user, onCycleSelect, onViewChange }) => {
    const toast = useToast();
    const [cycles, setCycles] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCycle, setEditingCycle] = useState(null);
    const [formData, setFormData] = useState({
        year: new Date().getFullYear() + 543, // ปี พ.ศ.
        cycle_name: '',
        start_date: '',
        end_date: '',
        assigned_to: null,
        notes: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cyclesResult, usersResult] = await Promise.all([
                supabaseService.fetchInventoryCycles(),
                supabaseService.fetchUsers()
            ]);

            if (cyclesResult.status === 'success') {
                setCycles(cyclesResult.data || []);
            }

            if (usersResult.status === 'success') {
                setUsers(usersResult.data || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCycle = async () => {
        setError(null);
        
        if (!formData.cycle_name.trim()) {
            setError('กรุณากรอกชื่อรอบการตรวจนับ');
            return;
        }

        if (!formData.start_date) {
            setError('กรุณาเลือกวันที่เริ่มต้น');
            return;
        }

        if (!formData.end_date) {
            setError('กรุณาเลือกวันที่สิ้นสุด');
            return;
        }

        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setError('วันที่เริ่มต้นต้องมาก่อนวันที่สิ้นสุด');
            return;
        }

        try {
            const assets = await supabaseService.fetchAssets();
            
            if (!assets || assets.length === 0) {
                setError('ไม่พบทรัพย์สินในระบบ กรุณาเพิ่มทรัพย์สินก่อนสร้างรอบการตรวจนับ');
                return;
            }

            const result = await supabaseService.createInventoryCycle({
                ...formData,
                status: 'Planning',
                created_by: user.id,
                assets: assets
            });

            if (result.status === 'success') {
                toast.success('สร้างรอบการตรวจนับสำเร็จ');
                setShowCreateModal(false);
                setFormData({
                    year: new Date().getFullYear() + 543,
                    cycle_name: '',
                    start_date: '',
                    end_date: '',
                    assigned_to: null,
                    notes: ''
                });
                fetchData();
            } else {
                setError(result.message || 'เกิดข้อผิดพลาดในการสร้างรอบการตรวจนับ');
            }
        } catch (error) {
            console.error('Error creating cycle:', error);
            setError('เกิดข้อผิดพลาดในการสร้างรอบการตรวจนับ: ' + error.message);
        }
    };

    const handleUpdateCycle = async () => {
        if (!editingCycle) return;

        setError(null);
        
        if (!formData.cycle_name.trim()) {
            setError('กรุณากรอกชื่อรอบการตรวจนับ');
            return;
        }

        if (!formData.start_date) {
            setError('กรุณาเลือกวันที่เริ่มต้น');
            return;
        }

        if (!formData.end_date) {
            setError('กรุณาเลือกวันที่สิ้นสุด');
            return;
        }

        try {
            const result = await supabaseService.updateInventoryCycle(editingCycle.id, formData);
            
            if (result.status === 'success') {
                toast.success('อัพเดทรอบการตรวจนับสำเร็จ');
                setEditingCycle(null);
                setFormData({
                    year: new Date().getFullYear() + 543,
                    cycle_name: '',
                    start_date: '',
                    end_date: '',
                    assigned_to: null,
                    notes: ''
                });
                fetchData();
            } else {
                setError(result.message || 'เกิดข้อผิดพลาดในการอัพเดท');
            }
        } catch (error) {
            console.error('Error updating cycle:', error);
            setError('เกิดข้อผิดพลาดในการอัพเดท: ' + error.message);
        }
    };

    const handleDeleteCycle = async (cycleId) => {
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรอบการตรวจนับนี้?')) {
            return;
        }

        try {
            const result = await supabaseService.deleteInventoryCycle(cycleId);
            
            if (result.status === 'success') {
                toast.success('ลบรอบการตรวจนับสำเร็จ');
                fetchData();
            } else {
                toast.error(result.message || 'เกิดข้อผิดพลาดในการลบ');
            }
        } catch (error) {
            console.error('Error deleting cycle:', error);
            toast.error('เกิดข้อผิดพลาดในการลบ: ' + error.message);
        }
    };

    const handleStartCycle = async (cycleId) => {
        try {
            const result = await supabaseService.updateInventoryCycle(cycleId, { status: 'In Progress' });
            
            if (result.status === 'success') {
                toast.success('เริ่มรอบการตรวจนับสำเร็จ');
                fetchData();
            } else {
                toast.error(result.message || 'เกิดข้อผิดพลาด');
            }
        } catch (error) {
            console.error('Error starting cycle:', error);
            toast.error('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleUpdateStatus = async (cycleId, newStatus, cycleName) => {
        const statusLabels = {
            'In Progress': 'เริ่มตรวจนับ',
            'Completed': 'เสร็จสิ้น',
            'Cancelled': 'ยกเลิก'
        };

        const confirmMessage = newStatus === 'Completed' 
            ? `คุณแน่ใจหรือไม่ว่าต้องการเสร็จสิ้นรอบการตรวจนับ "${cycleName}"?\n\nหลังจากเสร็จสิ้นแล้ว จะไม่สามารถแก้ไขข้อมูลได้อีก`
            : `คุณแน่ใจหรือไม่ว่าต้องการ${statusLabels[newStatus]}รอบการตรวจนับ "${cycleName}"?`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const result = await supabaseService.updateInventoryCycle(cycleId, {
                status: newStatus
            });

            if (result.status === 'success') {
                toast.success(`อัพเดทสถานะเป็น "${statusLabels[newStatus]}" สำเร็จ`);
                fetchData();
            } else {
                toast.error('เกิดข้อผิดพลาด: ' + result.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
        }
    };

    const getStatusBadge = (status) => {
        const configs = {
            'Planning': { label: 'วางแผน', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
            'In Progress': { label: 'กำลังดำเนินการ', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Play },
            'Completed': { label: 'เสร็จสิ้น', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
            'Cancelled': { label: 'ยกเลิก', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle }
        };
        
        const config = configs[status] || configs['Planning'];
        const Icon = config.icon;
        
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />
                {config.label}
            </span>
        );
    };

    const openCreateModal = () => {
        setFormData({
            year: new Date().getFullYear() + 543,
            cycle_name: '',
            start_date: '',
            end_date: '',
            assigned_to: null,
            notes: ''
        });
        setError(null);
        setShowCreateModal(true);
    };

    const openEditModal = (cycle) => {
        setEditingCycle(cycle);
        setFormData({
            year: cycle.year || new Date().getFullYear() + 543,
            cycle_name: cycle.cycle_name || '',
            start_date: cycle.start_date || '',
            end_date: cycle.end_date || '',
            assigned_to: cycle.assigned_to || null,
            notes: cycle.notes || ''
        });
        setError(null);
        setShowCreateModal(true);
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
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">จัดการรอบการตรวจนับ</h2>
                    <p className="text-slate-500 mt-1">สร้างและจัดการรอบการตรวจนับครุภัณฑ์ประจำปี</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center px-4 sm:px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                    style={{ color: '#ffffff' }}
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" style={{ color: '#ffffff', stroke: '#ffffff' }} />
                    <span style={{ color: '#ffffff' }}>สร้างรอบใหม่</span>
                </button>
            </div>

            {cycles.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                    <Calendar className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-bold mb-2">ยังไม่มีรอบการตรวจนับ</p>
                    <p className="text-sm text-slate-400 mb-6">สร้างรอบการตรวจนับใหม่เพื่อเริ่มต้นการตรวจนับครุภัณฑ์</p>
                    <button
                        onClick={openCreateModal}
                        className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all"
                        style={{ color: '#ffffff' }}
                    >
                        สร้างรอบใหม่
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {cycles.map((cycle) => (
                        <div
                            key={cycle.id}
                            className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => onCycleSelect(cycle)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">{cycle.cycle_name}</h3>
                                    <p className="text-sm text-slate-500">ปี {cycle.year}</p>
                                </div>
                                {getStatusBadge(cycle.status)}
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>
                                        {new Date(cycle.start_date).toLocaleDateString('th-TH')} - {new Date(cycle.end_date).toLocaleDateString('th-TH')}
                                    </span>
                                </div>
                                {cycle.assigned_to && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        <span>
                                            {users.find(u => u.id === cycle.assigned_to)?.name || 'ไม่ระบุ'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                                {cycle.status === 'Planning' && (
                                    <button
                                        onClick={() => handleUpdateStatus(cycle.id, 'In Progress', cycle.cycle_name)}
                                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                                        title="หมายเหตุ: สถานะจะเปลี่ยนเป็น 'In Progress' อัตโนมัติเมื่อมีการบันทึกการตรวจนับครั้งแรก"
                                        style={{ color: '#ffffff' }}
                                    >
                                        <Play className="w-4 h-4" style={{ color: '#ffffff', stroke: '#ffffff' }} />
                                        เริ่มตรวจนับ
                                    </button>
                                )}
                                {cycle.status === 'In Progress' && (
                                    <button
                                        onClick={() => handleUpdateStatus(cycle.id, 'Completed', cycle.cycle_name)}
                                        className="flex-1 px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                                        title="เสร็จสิ้นรอบการตรวจนับ (สามารถทำได้แม้ยังไม่ครบทุกรายการ)"
                                        style={{ color: '#ffffff' }}
                                    >
                                        <CheckCircle2 className="w-4 h-4" style={{ color: '#ffffff', stroke: '#ffffff' }} />
                                        เสร็จสิ้น
                                    </button>
                                )}
                                <button
                                    onClick={() => openEditModal(cycle)}
                                    className="px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteCycle(cycle.id)}
                                    className="px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-slate-800">
                                {editingCycle ? 'แก้ไขรอบการตรวจนับ' : 'สร้างรอบการตรวจนับใหม่'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingCycle(null);
                                    setError(null);
                                }}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700 font-medium">{error}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ปี (พ.ศ.)</label>
                                <input
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() + 543 })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อรอบการตรวจนับ *</label>
                                <input
                                    type="text"
                                    value={formData.cycle_name}
                                    onChange={(e) => setFormData({ ...formData, cycle_name: e.target.value })}
                                    placeholder="เช่น การตรวจนับครุภัณฑ์ประจำปี 2568"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">วันที่เริ่มต้น *</label>
                                    <input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">วันที่สิ้นสุด *</label>
                                    <input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ผู้รับผิดชอบ</label>
                                <select
                                    value={formData.assigned_to || ''}
                                    onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value || null })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                >
                                    <option value="">ไม่ระบุ</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name} ({u.role})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">หมายเหตุ</label>
                                <textarea
                                    value={formData.notes || ''}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                    placeholder="หมายเหตุเพิ่มเติม..."
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingCycle(null);
                                    setError(null);
                                }}
                                className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={editingCycle ? handleUpdateCycle : handleCreateCycle}
                                className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                                style={{ color: '#ffffff' }}
                            >
                                <Save className="w-4 h-4" style={{ color: '#ffffff', stroke: '#ffffff' }} />
                                {editingCycle ? 'บันทึกการแก้ไข' : 'สร้างรอบการตรวจนับ'}
                            </button>
                        </div>
      </div>
                </div>
            )}
    </div>
  );
};

export default InventoryCycleManager;
