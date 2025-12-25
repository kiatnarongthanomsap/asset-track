import React, { useState, useEffect } from 'react';
import {
    Save,
    Globe,
    Shield,
    Database,
    Tag,
    Hash,
    Calculator,
    Plus,
    Trash2,
    Settings as SettingsIcon,
    ChevronRight,
    ChevronDown,
    Edit3,
    X,
    Check,
    FileText,
    Users,
    Upload,
    Lock,
    UserPlus,
    Download
} from 'lucide-react';

import {
    exportAssetsToCSV,
    downloadCSVTemplate,
    parseAssetCSV
} from '../utils/assetManager';
import { getCategoryIcon, getIconNameFromCategories, getIconByName } from '../utils/categoryIcons';
import UserManagementSection from './UserManagementSection';
import * as supabaseService from '../services/supabaseService';

// List of available icons
const AVAILABLE_ICONS = [
    'Monitor', 'Printer', 'Sofa', 'Speaker', 'Tablet', 'HardDrive', 'Keyboard', 'Mouse',
    'Headphones', 'Camera', 'Video', 'Laptop', 'Package', 'Box', 'FileText', 'ImageIcon',
    'Folder', 'Database', 'Server', 'Wifi', 'Smartphone', 'Watch', 'Gamepad2', 'Mic',
    'Tv', 'Radio', 'Car', 'Building2', 'Hammer', 'Wrench', 'Palette', 'Music',
    'Clock', 'Lightbulb', 'Fan', 'AirVent', 'Lamp', 'Book', 'Archive', 'Calculator', 'Thermometer'
];

const SettingsView = ({ categories = [], setCategories, assets = [], setAssets, user, onDataChange }) => {
    const [activeSection, setActiveSection] = useState('categories');
    const [editingCategory, setEditingCategory] = useState(null);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', prefix: '', usefulLife: 5, icon_name: null });
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [iconPickerTarget, setIconPickerTarget] = useState(null); // 'new' or category id

    const [numbering, setNumbering] = useState({
        pattern: '{PREFIX}{RUNNING}-{DD}-{MM}-{YYYY}',
        startNumber: 1,
        padding: 3,
    });

    const [depreciation, setDepreciation] = useState({
        method: 'Straight-Line',
        scrapValue: 1,
        rounding: '2-decimal',
    });

    const [generalSettings, setGeneralSettings] = useState({
        organizationName: '',
        currentYear: '2568',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);

    const sidebarItems = [
        { id: 'general', label: 'ตั้งค่าทั่วไป', icon: Globe },
        { id: 'categories', label: 'หมวดหมู่ทรัพย์สิน', icon: Tag },
        { id: 'numbering', label: 'รหัสทรัพย์สิน', icon: Hash },
        { id: 'depreciation', label: 'การคำนวณค่าเสื่อม', icon: Calculator },
        { id: 'users', label: 'ผู้ใช้งานและสิทธิ์', icon: Users },
        { id: 'database', label: 'ฐานข้อมูลและนำเข้า', icon: Database },
    ];


    const handleAddCategory = async () => {
        if (!newCategory.name || !newCategory.prefix) {
            alert('กรุณากรอกชื่อหมวดและ Prefix');
            return;
        }

        try {
            const result = await supabaseService.saveCategory(newCategory);
            if (result.status === 'success') {
                // Refresh categories
                if (onDataChange) {
                    await onDataChange();
                } else {
                    // Fallback: reload from service
                    const updatedCategories = await supabaseService.fetchCategories();
                    setCategories(updatedCategories);
                }
                setNewCategory({ name: '', prefix: '', usefulLife: 5, icon_name: null });
        setIsAddingCategory(false);
                alert('เพิ่มหมวดหมู่สำเร็จ');
            } else {
                alert('ไม่สามารถเพิ่มหมวดหมู่ได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error adding category:', error);
            alert('เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่');
        }
    };

    const handleUpdateCategory = async (cat) => {
        try {
            const result = await supabaseService.saveCategory(cat);
            if (result.status === 'success') {
                // Refresh categories
                if (onDataChange) {
                    await onDataChange();
                } else {
                    const updatedCategories = await supabaseService.fetchCategories();
                    setCategories(updatedCategories);
                }
        setEditingCategory(null);
                alert('อัพเดทหมวดหมู่สำเร็จ');
            } else {
                alert('ไม่สามารถอัพเดทหมวดหมู่ได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('เกิดข้อผิดพลาดในการอัพเดทหมวดหมู่');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?')) {
            return;
        }

        try {
            const result = await supabaseService.deleteCategory(id);
            if (result.status === 'success') {
                // Refresh categories
                if (onDataChange) {
                    await onDataChange();
                } else {
                    const updatedCategories = await supabaseService.fetchCategories();
                    setCategories(updatedCategories);
                }
                alert('ลบหมวดหมู่สำเร็จ');
            } else {
                alert('ไม่สามารถลบหมวดหมู่ได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('เกิดข้อผิดพลาดในการลบหมวดหมู่');
        }
    };

    const handleSaveAllSettings = async () => {
        setIsSaving(true);
        setSaveMessage(null);

        try {
            // Save general settings to database (if you have a settings table)
            // For now, we'll just save numbering and depreciation patterns
            // This is a placeholder - adjust based on your database schema
            const { supabase } = await import('../config/supabase');
            
            // Save settings to a settings table if it exists
            // Example: await supabase.from('settings').upsert({...})
            
            setSaveMessage({
                type: 'success',
                text: 'บันทึกการตั้งค่าสำเร็จ'
            });
            
            // Clear message after 3 seconds
            setTimeout(() => {
                setSaveMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setSaveMessage({
                type: 'error',
                text: 'เกิดข้อผิดพลาดในการบันทึกการตั้งค่า: ' + error.message
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Check permission before rendering
    if (user && !supabaseService.canAccessSettings(user)) {
        return (
            <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-rose-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-rose-800 mb-2">ไม่มีสิทธิ์เข้าถึง</h2>
                    <p className="text-rose-600">คุณไม่มีสิทธิ์เข้าถึงหน้าการตั้งค่าระบบ กรุณาติดต่อผู้ดูแลระบบ</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">ตั้งค่าระบบ</h2>
                    <p className="text-slate-500 mt-1">กำหนดค่าการรันเลข หมวดหมู่ และนโยบายบัญชี</p>
                </div>
                <button 
                    onClick={handleSaveAllSettings}
                    disabled={isSaving}
                    className={`flex items-center px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                            กำลังบันทึก...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            บันทึกการตั้งค่า
                        </>
                    )}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Internal Sidebar */}
                <div className="w-full lg:w-64 space-y-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeSection === item.id
                                ? 'bg-white shadow-sm text-emerald-700 border border-emerald-100'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                }`}
                        >
                            <div className="flex items-center">
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </div>
                            <ChevronRight className={`w-4 h-4 ${activeSection === item.id ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                    ))}
                </div>

                {/* Section Content */}
                <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    {/* Save Message */}
                    {saveMessage && (
                        <div className={`mb-4 p-4 rounded-xl ${
                            saveMessage.type === 'success' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                            <p className="font-medium">{saveMessage.text}</p>
                        </div>
                    )}

                    {activeSection === 'general' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">ตั้งค่าทั่วไป</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">ปีระบบ (ปัจจุบัน)</label>
                                    <select 
                                        value={generalSettings.currentYear}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, currentYear: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="2565">2565</option>
                                        <option value="2566">2566</option>
                                        <option value="2567">2567</option>
                                        <option value="2568">2568</option>
                                        <option value="2569">2569</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'categories' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-800">หมวดหมู่ทรัพย์สิน</h3>
                                {!isAddingCategory && (
                                    <button
                                        onClick={() => setIsAddingCategory(true)}
                                        className="flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> เพิ่มหมวดใหม่
                                    </button>
                                )}
                            </div>

                            {isAddingCategory && (
                                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 mb-6 animate-in slide-in-from-top-2">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">ชื่อหมวด</label>
                                            <input
                                                type="text"
                                                placeholder="เช่น เครื่องใช้สำนักงาน"
                                                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                                value={newCategory.name}
                                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Prefix</label>
                                            <input
                                                type="text"
                                                placeholder="เช่น OFF"
                                                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-mono uppercase"
                                                value={newCategory.prefix}
                                                onChange={(e) => setNewCategory({ ...newCategory, prefix: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">อายุใช้งาน (ปี)</label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                                value={newCategory.usefulLife}
                                                onChange={(e) => setNewCategory({ ...newCategory, usefulLife: Number(e.target.value) })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Icon</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIconPickerTarget('new');
                                                    setShowIconPicker(true);
                                                }}
                                                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-between"
                                            >
                                                            <div className="flex items-center gap-2">
                                                                {newCategory.icon_name ? (
                                                                    <>
                                                                        {(() => {
                                                                            try {
                                                                                const IconComponent = getIconByName(newCategory.icon_name);
                                                                                if (IconComponent) {
                                                                                    return <IconComponent className="w-4 h-4 text-emerald-600" strokeWidth={2} />;
                                                                                }
                                                                                return null;
                                                                            } catch (error) {
                                                                                console.error('Error rendering icon:', error);
                                                                                return null;
                                                                            }
                                                                        })()}
                                                                        <span className="text-xs font-medium text-slate-700">{newCategory.icon_name}</span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-xs text-slate-400">เลือก Icon</span>
                                                                )}
                                                            </div>
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setIsAddingCategory(false)} className="px-4 py-2 text-sm text-slate-500 font-medium hover:bg-slate-100 rounded-lg">ยกเลิก</button>
                                        <button onClick={handleAddCategory} className="px-4 py-2 text-sm bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-md">เพิ่มหมวดหมู่</button>
                                    </div>
                                </div>
                            )}

                            <div className="overflow-hidden border border-slate-100 rounded-2xl">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="px-6 py-3">ชื่อหมวด</th>
                                            <th className="px-6 py-3">Prefix</th>
                                            <th className="px-6 py-3">อายุใช้งาน (ปี)</th>
                                            <th className="px-6 py-3">Icon</th>
                                            <th className="px-6 py-3 text-right">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {categories.map((cat) => (
                                            <tr key={cat.id || cat.name} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-6 py-4 font-semibold text-slate-700">
                                                    {editingCategory?.id === cat.id ? (
                                                        <input
                                                            className="w-full px-2 py-1 border rounded"
                                                            value={editingCategory.name || ''}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                        />
                                                    ) : (
                                                            <span>{cat.name}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editingCategory?.id === cat.id ? (
                                                        <input
                                                            className="w-20 px-2 py-1 border rounded font-mono uppercase"
                                                            value={editingCategory.prefix || ''}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, prefix: e.target.value })}
                                                        />
                                                    ) : (
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-mono text-xs font-bold">{cat.prefix}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {editingCategory?.id === cat.id ? (
                                                        <input
                                                            type="number"
                                                            className="w-20 px-2 py-1 border rounded"
                                                            value={editingCategory.usefulLife || editingCategory.useful_life || 5}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, usefulLife: Number(e.target.value) || 5 })}
                                                        />
                                                    ) : (
                                                        `${cat.usefulLife || cat.useful_life || 5} ปี`
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editingCategory?.id === cat.id ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setIconPickerTarget(cat.id);
                                                                setShowIconPicker(true);
                                                            }}
                                                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs hover:bg-slate-50 transition-colors flex items-center justify-between gap-2"
                                                        >
                                                            <div className="flex items-center gap-1.5">
                                                                {editingCategory.icon_name ? (
                                                                    <>
                                                                        {(() => {
                                                                            const IconComponent = getIconByName(editingCategory.icon_name);
                                                                            return <IconComponent className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />;
                                                                        })()}
                                                                        <span className="text-xs text-slate-600">{editingCategory.icon_name}</span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-xs text-slate-400">เลือก Icon</span>
                                                                )}
                                                            </div>
                                                            <ChevronDown className="w-3 h-3 text-slate-400" />
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                                                                {(() => {
                                                                    const iconName = getIconNameFromCategories(cat.name, categories);
                                                                    const IconComponent = getCategoryIcon(cat.name, iconName);
                                                                    return <IconComponent className="w-4 h-4 text-slate-600 group-hover:text-emerald-600 transition-colors" strokeWidth={2} />;
                                                                })()}
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {editingCategory?.id === cat.id ? (
                                                        <div className="flex justify-end gap-1">
                                                            <button 
                                                                onClick={() => setEditingCategory(null)} 
                                                                className="p-1.5 text-slate-400 hover:text-slate-600"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleUpdateCategory(editingCategory)} 
                                                                className="p-1.5 text-emerald-600 hover:text-emerald-700"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                                                            <button 
                                                                onClick={() => setEditingCategory({ ...cat })} 
                                                                className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                                                            >
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteCategory(cat.id)} 
                                                                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'numbering' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">การกำหนดรหัสทรัพย์สิน</h3>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <label className="block text-sm font-semibold text-slate-600 mb-3">รูปแบบตัวอย่าง (Preview)</label>
                                <div className="text-2xl font-mono font-bold text-emerald-700 tracking-wider">
                                    {numbering.pattern
                                        .replace('{PREFIX}', 'A')
                                        .replace('{RUNNING}', String(numbering.startNumber).padStart(numbering.padding, '0'))
                                        .replace('{DD}', '09')
                                        .replace('{MM}', '04')
                                        .replace('{YYYY}', '2557')
                                        .replace('{YEAR}', '2557')}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">รูปแบบ (Pattern)</label>
                                        <input
                                            type="text"
                                            value={numbering.pattern}
                                            onChange={(e) => setNumbering({ ...numbering, pattern: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-2 italic">ตัวเลือก: {"{PREFIX}, {RUNNING}, {DD}, {MM}, {YYYY} หรือ {YEAR}"}</p>
                                        <p className="text-xs text-slate-500 mt-1">รูปแบบมาตรฐาน: {"{PREFIX}{RUNNING}-{DD}-{MM}-{YYYY}"} (เช่น A004-09-04-2557)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">จำนวนหลักเลขรัน (Padding)</label>
                                        <input
                                            type="number"
                                            value={numbering.padding}
                                            onChange={(e) => setNumbering({ ...numbering, padding: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                                    <h4 className="font-bold text-emerald-800 mb-4 flex items-center">
                                        <Shield className="w-4 h-4 mr-2" /> คำแนะนำการรันเลข
                                    </h4>
                                    <ul className="text-sm text-emerald-700 space-y-2">
                                        <li>• การใส่ปี จะช่วยให้แยกอายุทรัพย์สินได้ง่าย</li>
                                        <li>• ควรใช้ Prefix ที่สื่อถึงหมวดหมู่</li>
                                        <li>• เลขรันจะถูกรีเซ็ตทุกปี (ขึ้นอยู่กับนโยบาย)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'depreciation' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">นโยบายการคำนวณค่าเสื่อม</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2 p-6 bg-slate-50 rounded-2xl">
                                    <label className="block text-sm font-bold text-slate-700">วิธีคำนวณ (Method)</label>
                                    <select 
                                        value={depreciation.method}
                                        onChange={(e) => setDepreciation({ ...depreciation, method: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="Straight-Line">เส้นตรง (Straight-Line)</option>
                                        <option value="Declining Balance">ยอดลดลง (Declining Balance)</option>
                                    </select>
                                    <p className="text-xs text-slate-500 mt-2">คำนวณแบบกระจายมูลค่าเท่ากันทุกปี ตามมาตรฐานบัญชีสหกรณ์</p>
                                </div>
                                <div className="space-y-2 p-6 bg-slate-50 rounded-2xl">
                                    <label className="block text-sm font-bold text-slate-700">มูลค่าซากขั้นต่ำ (Baht)</label>
                                    <input
                                        type="number"
                                        value={depreciation.scrapValue}
                                        onChange={(e) => setDepreciation({ ...depreciation, scrapValue: Number(e.target.value) || 1 })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">ระบุเป็น 1 บาท เพื่อให้ทรัพย์สินยังคงมีสถานะในระบบเมื่อค่าเสื่อมครบแล้ว</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'users' && (
                        <UserManagementSection currentUser={user} />
                    )}

                    {activeSection === 'database' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">นำเข้าและจัดการข้อมูล</h3>
                                <p className="text-sm text-slate-500">สำรองข้อมูล ส่งออก หรือนำทรัพย์สินเข้าจากไฟล์ภายนอก</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => exportAssetsToCSV(assets)}
                                    className="p-6 border-2 border-slate-50 rounded-3xl flex flex-col items-center hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group"
                                >
                                    <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <span className="font-bold text-slate-700">ส่งออกข้อมูลรวม</span>
                                    <span className="text-[11px] text-slate-400 mt-1 uppercase font-black tracking-widest">Master Export</span>
                                </button>

                                <button
                                    className="p-6 border-2 border-slate-50 rounded-3xl flex flex-col items-center hover:border-amber-100 hover:bg-amber-50/20 transition-all group opacity-50 cursor-not-allowed"
                                    title="ฟีเจอร์นี้ยังไม่เปิดใช้งาน"
                                >
                                    <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                        <Database className="w-7 h-7" />
                                    </div>
                                    <span className="font-bold text-slate-700">สำรองฐานข้อมูล</span>
                                    <span className="text-[11px] text-slate-400 mt-1 uppercase font-black tracking-widest">Backup & Archive</span>
                                </button>

                                <button
                                    onClick={async () => {
                                        if (!supabaseService.canManageAssets(user)) {
                                            alert('คุณไม่มีสิทธิ์ล้างข้อมูล');
                                            return;
                                        }
                                        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลทรัพย์สินทั้งหมด? การดำเนินการนี้ไม่สามารถย้อนกลับได้')) {
                                            try {
                                                // Delete all assets from database
                                                const { supabase: supabaseClient } = await import('../config/supabase');
                                                const { error } = await supabaseClient
                                                    .from('assets')
                                                    .delete()
                                                    .gte('id', 0); // Delete all
                                                
                                                if (error) throw error;
                                                
                                                setAssets([]);
                                                if (onDataChange) await onDataChange();
                                                alert('ล้างข้อมูลสำเร็จ');
                                            } catch (error) {
                                                console.error('Error clearing assets:', error);
                                                alert('เกิดข้อผิดพลาดในการล้างข้อมูล: ' + error.message);
                                            }
                                        }
                                    }}
                                    className="p-6 border-2 border-slate-50 rounded-3xl flex flex-col items-center hover:border-rose-100 hover:bg-rose-50/20 transition-all group"
                                >
                                    <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                        <Trash2 className="w-7 h-7" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-rose-600">ล้างฐานข้อมูล</span>
                                    <span className="text-[11px] text-slate-400 mt-1 uppercase font-black tracking-widest text-rose-300">Danger Zone</span>
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="font-black text-slate-800 flex items-center">
                                        <Upload className="w-6 h-6 mr-3 text-emerald-600" />
                                        นำเข้าข้อมูลทรัพย์สิน (Excel / CSV)
                                    </h4>
                                    <button
                                        onClick={downloadCSVTemplate}
                                        className="text-emerald-600 text-xs font-black uppercase tracking-widest flex items-center hover:underline"
                                    >
                                        <Download className="w-4 h-4 mr-1.5" />
                                        ดาวน์โหลด Template
                                    </button>
                                </div>

                                <div className="relative border-4 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center text-center group cursor-pointer hover:border-emerald-300 hover:bg-white transition-all overflow-hidden">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                try {
                                                    const importedAssets = await parseAssetCSV(file);
                                                    if (importedAssets.length > 0) {
                                                        if (confirm(`พบข้อมูล ${importedAssets.length} รายการ ต้องการนำเข้าและรวมกับข้อมูลเดิมหรือไม่?`)) {
                                                            setAssets([...assets, ...importedAssets]);
                                                            alert('นำเข้าข้อมูลสำเร็จ!');
                                                        }
                                                    } else {
                                                        alert('ไม่พบข้อมูลที่สามารถนำเข้าได้ หรือรูปแบบไฟล์ไม่ถูกต้อง');
                                                    }
                                                } catch (err) {
                                                    alert('เกิดข้อผิดพลาดในการประมวลผลไฟล์');
                                                }
                                                e.target.value = ''; // Reset input
                                            }
                                        }}
                                    />
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                        <Upload className="w-10 h-10" />
                                    </div>
                                    <h5 className="text-xl font-black text-slate-700 mb-2 whitespace-pre-wrap">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</h5>
                                    <p className="text-sm text-slate-400 font-medium">รองรับไฟล์ .csv เท่านั้น (ขนาดสูงสุด 10MB)</p>

                                    <div className="mt-8 flex gap-3">
                                        <div className="flex items-center text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100">
                                            <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> ตรวจสอบรหัสซ้ำ
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100">
                                            <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> ตรวจสอบหมวดหมู่
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Icon Picker Modal */}
            {showIconPicker && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">เลือก Icon</h3>
                                <p className="text-sm text-slate-500">เลือก icon สำหรับหมวดหมู่ทรัพย์สิน</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowIconPicker(false);
                                    setIconPickerTarget(null);
                                }}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-6 sm:grid-cols-8 gap-4">
                                {AVAILABLE_ICONS.map((iconName) => {
                                    try {
                                        const IconComponent = getIconByName(iconName);
                                        if (!IconComponent) {
                                            return null;
                                        }
                                        
                                        const isSelected = iconPickerTarget === 'new' 
                                            ? newCategory.icon_name === iconName
                                            : editingCategory?.icon_name === iconName;
                                        
                                        return (
                                            <button
                                                key={iconName}
                                                onClick={() => {
                                                    if (iconPickerTarget === 'new') {
                                                        setNewCategory({ ...newCategory, icon_name: iconName });
                                                    } else if (editingCategory) {
                                                        setEditingCategory({ ...editingCategory, icon_name: iconName });
                                                    }
                                                    setShowIconPicker(false);
                                                    setIconPickerTarget(null);
                                                }}
                                                className={`p-4 rounded-xl border-2 transition-all hover:scale-110 ${
                                                    isSelected
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                                                }`}
                                            >
                                                <IconComponent className={`w-6 h-6 mx-auto ${isSelected ? 'text-emerald-600' : 'text-slate-600'}`} strokeWidth={2} />
                                                <p className="text-[10px] text-slate-500 mt-2 text-center truncate">{iconName}</p>
                                            </button>
                                        );
                                    } catch (error) {
                                        console.error(`Error rendering icon ${iconName}:`, error);
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => {
                                    if (iconPickerTarget === 'new') {
                                        setNewCategory({ ...newCategory, icon_name: null });
                                    } else {
                                        setEditingCategory({ ...editingCategory, icon_name: null });
                                    }
                                    setShowIconPicker(false);
                                    setIconPickerTarget(null);
                                }}
                                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                ล้าง Icon
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsView;
