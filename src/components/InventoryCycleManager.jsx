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
    AlertCircle
} from 'lucide-react';
import * as supabaseService from '../services/supabaseService';

const InventoryCycleManager = ({ user, onCycleSelect, onViewChange }) => {
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
                setCycles(cyclesResult.data);
            }

            if (usersResult.status === 'success') {
                setUsers(usersResult.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCycle = async () => {
        // Validation
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
            // ดึงทรัพย์สินทั้งหมด
            const assets = await supabaseService.fetchAssets();

            const result = await supabaseService.createInventoryCycle({
                ...formData,
                status: 'Planning',
                created_by: user.id,
                assets: assets
            });

            if (result.status === 'success') {
                setShowCreateModal(false);
                setError(null);
                setFormData({
                    year: new Date().getFullYear() + 543,
                    cycle_name: '',
                    start_date: '',
                    end_date: '',
                    assigned_to: null,
                    notes: ''
                });
                fetchData();
                alert('สร้างรอบการตรวจนับสำเร็จ');
            } else {
                setError('เกิดข้อผิดพลาด: ' + result.message);
            }
        } catch (error) {
            console.error('Error creating cycle:', error);
            setError('เกิดข้อผิดพลาดในการสร้างรอบการตรวจนับ: ' + (error.message || 'Unknown error'));
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
                fetchData();
                alert(`อัพเดทสถานะเป็น "${statusLabels[newStatus]}" สำเร็จ`);
            } else {
                alert('เกิดข้อผิดพลาด: ' + result.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            Planning: { color: 'bg-slate-100 text-slate-700', icon: Clock, label: 'วางแผน' },
            'In Progress': { color: 'bg-blue-100 text-blue-700', icon: Play, label: 'กำลังดำเนินการ' },
            Completed: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2, label: 'เสร็จสิ้น' },
            Cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'ยกเลิก' }
        };

        const config = statusConfig[status] || statusConfig.Planning;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
            </span>
        );
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
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">จัดการรอบการตรวจนับ</h2>
                    <p className="text-slate-500 mt-1">สร้างและจัดการรอบการตรวจนับครุภัณฑ์ประจำปี</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    สร้างรอบใหม่
                </button>
            </div>

            {/* Cycles List */}
            <div className="grid grid-cols-1 gap-4">
                {cycles.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                        <Calendar className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 font-bold">ยังไม่มีรอบการตรวจนับ</p>
                        <p className="text-slate-400 text-sm mt-2">คลิกปุ่ม "สร้างรอบใหม่" เพื่อเริ่มต้น</p>
                    </div>
                ) : (
                    cycles.map((cycle) => (
                        <div
                            key={cycle.id}
                            className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-slate-800">{cycle.cycle_name}</h3>
                                        {getStatusBadge(cycle.status)}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center text-slate-600">
                                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                            <span className="font-medium">ปี {cycle.year}</span>
                                        </div>
                                        <div className="flex items-center text-slate-600">
                                            <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                            <span>
                                                {new Date(cycle.start_date).toLocaleDateString('th-TH')} - {new Date(cycle.end_date).toLocaleDateString('th-TH')}
                                            </span>
                                        </div>
                                        {cycle.assigned_to_user && (
                                            <div className="flex items-center text-slate-600">
                                                <Users className="w-4 h-4 mr-2 text-slate-400" />
                                                <span>{cycle.assigned_to_user.name}</span>
                                            </div>
                                        )}
                                        {cycle.notes && (
                                            <div className="flex items-center text-slate-600">
                                                <FileText className="w-4 h-4 mr-2 text-slate-400" />
                                                <span className="truncate">{cycle.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {cycle.status === 'Planning' && (
                                        <button
                                            onClick={() => handleUpdateStatus(cycle.id, 'In Progress', cycle.cycle_name)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                                            title="หมายเหตุ: สถานะจะเปลี่ยนเป็น 'In Progress' อัตโนมัติเมื่อมีการบันทึกการตรวจนับครั้งแรก"
                                        >
                                            <Play className="w-4 h-4 inline mr-1" />
                                            เริ่มตรวจนับ
                                        </button>
                                    )}
                                    {cycle.status === 'In Progress' && (
                                        <button
                                            onClick={() => handleUpdateStatus(cycle.id, 'Completed', cycle.cycle_name)}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all"
                                            title="เสร็จสิ้นรอบการตรวจนับ (สามารถทำได้แม้ยังไม่ครบทุกรายการ)"
                                        >
                                            <CheckCircle2 className="w-4 h-4 inline mr-1" />
                                            เสร็จสิ้น
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onCycleSelect?.(cycle)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                                    >
                                        <FileText className="w-4 h-4 inline mr-1" />
                                        ตรวจนับ
                                    </button>
                                    {cycle.status === 'In Progress' && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    onCycleSelect?.(cycle);
                                                    onViewChange?.('reconciliation');
                                                }}
                                                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-amber-700 transition-all"
                                            >
                                                <AlertCircle className="w-4 h-4 inline mr-1" />
                                                แก้ไข
                                            </button>
                                            <button
                                                onClick={() => {
                                                    onCycleSelect?.(cycle);
                                                    onViewChange?.('report');
                                                }}
                                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                                            >
                                                <FileText className="w-4 h-4 inline mr-1" />
                                                รายงาน
                                            </button>
                                        </>
                                    )}
                                    {cycle.status === 'Completed' && (
                                        <button
                                            onClick={() => {
                                                onCycleSelect?.(cycle);
                                                onViewChange?.('report');
                                            }}
                                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                                        >
                                            <FileText className="w-4 h-4 inline mr-1" />
                                            รายงาน
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">สร้างรอบการตรวจนับใหม่</h3>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-red-800">{error}</p>
                                    </div>
                                    <button
                                        onClick={() => setError(null)}
                                        className="ml-4 text-red-600 hover:text-red-800"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">ชื่อรอบการตรวจนับ</label>
                                <input
                                    type="text"
                                    value={formData.cycle_name}
                                    onChange={(e) => setFormData({ ...formData, cycle_name: e.target.value })}
                                    placeholder="เช่น การตรวจนับครุภัณฑ์ประจำปี 2568"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">ปี (พ.ศ.)</label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">มอบหมายให้</label>
                                    <select
                                        value={formData.assigned_to || ''}
                                        onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value ? parseInt(e.target.value) : null })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">-- เลือกผู้รับผิดชอบ --</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} ({u.role})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">วันที่เริ่มต้น</label>
                                    <input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">วันที่สิ้นสุด</label>
                                    <input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">หมายเหตุ</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                    placeholder="หมายเหตุเพิ่มเติม..."
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleCreateCycle}
                                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
                            >
                                สร้างรอบการตรวจนับ
                            </button>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setError(null);
                                    setFormData({
                                        year: new Date().getFullYear() + 543,
                                        cycle_name: '',
                                        start_date: '',
                                        end_date: '',
                                        assigned_to: null,
                                        notes: ''
                                    });
                                }}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryCycleManager;

