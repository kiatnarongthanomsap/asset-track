import React, { useState } from 'react';
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
    Edit3,
    X,
    Check,
    FileText
} from 'lucide-react';

const SettingsView = ({ categories, setCategories }) => {
    const [activeSection, setActiveSection] = useState('categories');
    const [editingCategory, setEditingCategory] = useState(null);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', prefix: '', usefulLife: 5 });

    const [numbering, setNumbering] = useState({
        pattern: '{PREFIX}-{YEAR}-{RUNNING}',
        startNumber: 1,
        padding: 4,
    });

    const [depreciation, setDepreciation] = useState({
        method: 'Straight-Line',
        scrapValue: 1,
        rounding: '2-decimal',
    });

    const sidebarItems = [
        { id: 'general', label: 'ตั้งค่าทั่วไป', icon: Globe },
        { id: 'categories', label: 'หมวดหมู่ทรัพย์สิน', icon: Tag },
        { id: 'numbering', label: 'รหัสทรัพย์สิน', icon: Hash },
        { id: 'depreciation', label: 'การคำนวณค่าเสื่อม', icon: Calculator },
        { id: 'database', label: 'ฐานข้อมูล', icon: Database },
    ];

    const handleAddCategory = () => {
        if (!newCategory.name || !newCategory.prefix) return;
        setCategories([...categories, { ...newCategory, id: Date.now() }]);
        setNewCategory({ name: '', prefix: '', usefulLife: 5 });
        setIsAddingCategory(false);
    };

    const handleUpdateCategory = (cat) => {
        setCategories(categories.map(c => c.id === cat.id ? cat : c));
        setEditingCategory(null);
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">ตั้งค่าระบบ</h2>
                    <p className="text-slate-500 mt-1">กำหนดค่าการรันเลข หมวดหมู่ และนโยบายบัญชี</p>
                </div>
                <button className="flex items-center px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                    <Save className="w-4 h-4 mr-2" />
                    บันทึกการตั้งค่า
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

                    {activeSection === 'general' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">ตั้งค่าทั่วไป</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อสหกรณ์ / หน่วยงาน</label>
                                    <input type="text" defaultValue="สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">ปีระบบ (ปัจจุบัน)</label>
                                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all">
                                        <option>2567</option>
                                        <option>2568</option>
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                                            <th className="px-6 py-3 text-right">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {categories.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-6 py-4 font-semibold text-slate-700">
                                                    {editingCategory?.id === cat.id ? (
                                                        <input
                                                            className="w-full px-2 py-1 border rounded"
                                                            value={editingCategory.name}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                        />
                                                    ) : cat.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editingCategory?.id === cat.id ? (
                                                        <input
                                                            className="w-20 px-2 py-1 border rounded font-mono uppercase"
                                                            value={editingCategory.prefix}
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
                                                            value={editingCategory.usefulLife}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, usefulLife: Number(e.target.value) })}
                                                        />
                                                    ) : `${cat.usefulLife} ปี`}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {editingCategory?.id === cat.id ? (
                                                        <div className="flex justify-end gap-1">
                                                            <button onClick={() => setEditingCategory(null)} className="p-1.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                                                            <button onClick={() => handleUpdateCategory(editingCategory)} className="p-1.5 text-emerald-600 hover:text-emerald-700"><Check className="w-4 h-4" /></button>
                                                        </div>
                                                    ) : (
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                                                            <button onClick={() => setEditingCategory({ ...cat })} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
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
                                    {numbering.pattern.replace('{PREFIX}', 'COM').replace('{YEAR}', '2567').replace('{RUNNING}', '0001')}
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
                                        <p className="text-[10px] text-slate-400 mt-2 italic">ตัวเลือก: {"{PREFIX}, {YEAR}, {MONTH}, {RUNNING}"}</p>
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
                                    <select className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none bg-white">
                                        <option>เส้นตรง (Straight-Line)</option>
                                        <option>ยอดลดลง (Declining Balance)</option>
                                    </select>
                                    <p className="text-xs text-slate-500 mt-2">คำนวณแบบกระจายมูลค่าเท่ากันทุกปี ตามมาตรฐานบัญชีสหกรณ์</p>
                                </div>
                                <div className="space-y-2 p-6 bg-slate-50 rounded-2xl">
                                    <label className="block text-sm font-bold text-slate-700">มูลค่าซากขั้นต่ำ (Baht)</label>
                                    <input
                                        type="number"
                                        value={depreciation.scrapValue}
                                        onChange={(e) => setDepreciation({ ...depreciation, scrapValue: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">ระบุเป็น 1 บาท เพื่อให้ทรัพย์สินยังคงมีสถานะในระบบเมื่อค่าเสื่อมครบแล้ว</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'database' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">จัดการฐานข้อมูล</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="p-4 border-2 border-slate-50 rounded-2xl flex flex-col items-center hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-700">ส่งออกข้อมูลรวม</span>
                                    <span className="text-xs text-slate-400 mt-1">Export to Excel / CSV</span>
                                </button>
                                <button className="p-4 border-2 border-slate-50 rounded-2xl flex flex-col items-center hover:border-amber-100 hover:bg-amber-50/20 transition-all group">
                                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-700">สำรองข้อมูลระบบ</span>
                                    <span className="text-xs text-slate-400 mt-1">Manual Database Backup</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
