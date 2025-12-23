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
    FileText,
    Users,
    Upload,
    Lock,
    UserPlus,
    Download
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
        { id: 'users', label: 'ผู้ใช้งานและสิทธิ์', icon: Users },
        { id: 'database', label: 'ฐานข้อมูลและนำเข้า', icon: Database },
    ];

    const [users, setUsers] = useState([
        { id: 1, name: 'นิรุตติ์ มั่งมี', email: 'nirutti.m@coop.ku.ac.th', role: 'Admin', status: 'Active' },
        { id: 2, name: 'วิลาสินี รักงาน', email: 'wilasinee.r@coop.ku.ac.th', role: 'Staff', status: 'Active' },
        { id: 3, name: 'สมปอง สายฮา', email: 'sompong.s@coop.ku.ac.th', role: 'Viewer', status: 'Inactive' },
    ]);

    const roles = [
        { name: 'Admin', desc: 'เข้าถึงได้ทุกส่วนของระบบ', permissions: ['manage_assets', 'manage_users', 'view_reports', 'settings'] },
        { name: 'Staff', desc: 'จัดการทรัพย์สินและดูรายงาน', permissions: ['manage_assets', 'view_reports'] },
        { name: 'Viewer', desc: 'ดูข้อมูลได้อย่างเดียว', permissions: ['view_reports'] },
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

                    {activeSection === 'users' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-800">ผู้ใช้งานและสิทธิ์การเข้าถึง</h3>
                                <button className="flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    เพิ่มผู้ใช้ใหม่
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Users Table */}
                                <div className="overflow-hidden border border-slate-100 rounded-2xl">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold">
                                            <tr>
                                                <th className="px-6 py-3">ผู้ใช้งาน</th>
                                                <th className="px-6 py-3">สิทธิ์การใช้งาน</th>
                                                <th className="px-6 py-3">สถานะ</th>
                                                <th className="px-6 py-3 text-right">จัดการ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {users.map((user) => (
                                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mr-3">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-700 text-sm">{user.name}</p>
                                                                <p className="text-xs text-slate-400">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${user.role === 'Admin' ? 'bg-indigo-50 text-indigo-600' :
                                                                user.role === 'Staff' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`flex items-center gap-1.5 ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Roles and Permissions */}
                                <div className="mt-4">
                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                                        <Lock className="w-5 h-5 mr-4 text-emerald-600" />
                                        ระดับสิทธิ์และรายละเอียด
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {roles.map((role) => (
                                            <div key={role.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <h5 className="font-bold text-slate-700 mb-1">{role.name}</h5>
                                                <p className="text-xs text-slate-500 mb-4">{role.desc}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.map(p => (
                                                        <span key={p} className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">
                                                            {p.replace('_', ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'database' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">นำเข้าและจัดการข้อมูล</h3>
                                <p className="text-sm text-slate-500">สำรองข้อมูล ส่งออก หรือนำทรัพย์สินเข้าจากไฟล์ภายนอก</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button className="p-6 border-2 border-slate-50 rounded-3xl flex flex-col items-center hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group">
                                    <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <span className="font-bold text-slate-700">ส่งออกข้อมูลรวม</span>
                                    <span className="text-[11px] text-slate-400 mt-1 uppercase font-black tracking-widest">Master Export</span>
                                </button>

                                <button className="p-6 border-2 border-slate-50 rounded-3xl flex flex-col items-center hover:border-amber-100 hover:bg-amber-50/20 transition-all group">
                                    <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                        <Database className="w-7 h-7" />
                                    </div>
                                    <span className="font-bold text-slate-700">สำรองฐานข้อมูล</span>
                                    <span className="text-[11px] text-slate-400 mt-1 uppercase font-black tracking-widest">Backup & Archive</span>
                                </button>

                                <button className="p-6 border-2 border-slate-50 rounded-3xl flex flex-col items-center hover:border-rose-100 hover:bg-rose-50/20 transition-all group">
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
                                    <button className="text-emerald-600 text-xs font-black uppercase tracking-widest flex items-center hover:underline">
                                        <Download className="w-4 h-4 mr-1.5" />
                                        ดาวน์โหลด Template
                                    </button>
                                </div>

                                <div className="border-4 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center text-center group cursor-pointer hover:border-emerald-300 hover:bg-white transition-all">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                        <Upload className="w-10 h-10" />
                                    </div>
                                    <h5 className="text-xl font-black text-slate-700 mb-2 whitespace-pre-wrap">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</h5>
                                    <p className="text-sm text-slate-400 font-medium">รองรับไฟล์ .csv, .xlsx เท่านั้น (ขนาดสูงสุด 10MB)</p>

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
        </div>
    );
};

export default SettingsView;
