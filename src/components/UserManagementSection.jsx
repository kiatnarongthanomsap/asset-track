import React, { useState, useEffect } from 'react';
import { UserPlus, Edit3, Trash2, X, Save, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import * as supabaseService from '../services/supabaseService';

const UserManagementSection = ({ currentUser }) => {
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUser, setNewUser] = useState({ 
        username: '', 
        password: '', 
        name: '', 
        email: '', 
        role: 'Viewer', 
        status: 'Active' 
    });
    const [showPassword, setShowPassword] = useState(false);

    const roles = [
        { name: 'Admin', desc: 'เข้าถึงได้ทุกส่วนของระบบ', permissions: ['manage_assets', 'manage_users', 'view_reports', 'settings', 'delete_assets', 'import_assets'] },
        { name: 'Manager', desc: 'จัดการทรัพย์สิน ดูรายงาน และนำเข้าข้อมูล', permissions: ['manage_assets', 'view_reports', 'import_assets'] },
        { name: 'Staff', desc: 'จัดการทรัพย์สินและดูรายงาน', permissions: ['manage_assets', 'view_reports'] },
        { name: 'Viewer', desc: 'ดูข้อมูลได้อย่างเดียว', permissions: ['view_reports'] },
    ];

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const result = await supabaseService.fetchUsers();
            if (result.status === 'success') {
                setUsers(result.data || []);
            } else {
                console.error('Failed to load users:', result.message);
                // Fallback to empty array
                setUsers([]);
            }
        } catch (error) {
            console.error('Error loading users:', error);
            setUsers([]);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleAddUser = async () => {
        if (!newUser.username || !newUser.password || !newUser.name) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน (Username, Password, Name)');
            return;
        }
        
        try {
            const result = await supabaseService.saveUser(newUser);
            if (result.status === 'success') {
                await loadUsers();
                setNewUser({ username: '', password: '', name: '', email: '', role: 'Viewer', status: 'Active' });
                setIsAddingUser(false);
                alert('เพิ่มผู้ใช้สำเร็จ');
            } else {
                alert('ไม่สามารถเพิ่มผู้ใช้ได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
        }
    };

    const handleUpdateUser = async (user) => {
        try {
            const result = await supabaseService.saveUser(user);
            if (result.status === 'success') {
                await loadUsers();
                setEditingUser(null);
                alert('อัพเดตผู้ใช้สำเร็จ');
            } else {
                alert('ไม่สามารถอัพเดตผู้ใช้ได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('เกิดข้อผิดพลาดในการอัพเดตผู้ใช้');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (userId === currentUser?.id) {
            alert('ไม่สามารถลบบัญชีของตัวเองได้');
            return;
        }
        
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
            return;
        }
        
        try {
            const result = await supabaseService.deleteUser(userId);
            if (result.status === 'success') {
                await loadUsers();
                alert('ลบผู้ใช้สำเร็จ');
            } else {
                alert('ไม่สามารถลบผู้ใช้ได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('เกิดข้อผิดพลาดในการลบผู้ใช้');
        }
    };

    const canManageUsers = supabaseService.canManageUsers(currentUser);

    if (!canManageUsers) {
        return (
            <div className="p-8 text-center">
                <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">คุณไม่มีสิทธิ์เข้าถึงส่วนนี้</p>
                <p className="text-sm text-slate-400 mt-2">ต้องมีสิทธิ์ Admin เท่านั้น</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">ผู้ใช้งานและสิทธิ์การเข้าถึง</h3>
                <button 
                    onClick={() => setIsAddingUser(true)}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md"
                >
                    <UserPlus className="w-4 h-4 mr-2" />
                    เพิ่มผู้ใช้ใหม่
                </button>
            </div>

            {isLoadingUsers ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="text-slate-500 mt-4">กำลังโหลดข้อมูล...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {/* Users Table */}
                    <div className="overflow-hidden border border-slate-100 rounded-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-3">ผู้ใช้งาน</th>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">สิทธิ์การใช้งาน</th>
                                    <th className="px-6 py-3">สถานะ</th>
                                    <th className="px-6 py-3 text-right">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                            ไม่พบข้อมูลผู้ใช้
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mr-3">
                                                        {(user.name || user.username || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-700 text-sm">{user.name || user.username}</p>
                                                        {user.email && (
                                                            <p className="text-xs text-slate-400">{user.email}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                                    user.role === 'Admin' ? 'bg-indigo-50 text-indigo-600' :
                                                    user.role === 'Manager' ? 'bg-purple-50 text-purple-600' :
                                                    user.role === 'Staff' ? 'bg-blue-50 text-blue-600' : 
                                                    'bg-slate-50 text-slate-600'
                                                }`}>
                                                    {user.role || 'Viewer'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`flex items-center gap-1.5 ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                                    {user.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => setEditingUser(user)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors mr-2"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                {user.id !== currentUser?.id && (
                                                    <button 
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Roles and Permissions */}
                    <div className="mt-4">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                            <Lock className="w-5 h-5 mr-4 text-emerald-600" />
                            ระดับสิทธิ์และรายละเอียด
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {roles.map((role) => (
                                <div key={role.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h5 className="font-bold text-slate-700 mb-1">{role.name}</h5>
                                    <p className="text-xs text-slate-500 mb-4">{role.desc}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.map(p => (
                                            <span key={p} className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">
                                                {p.replace(/_/g, ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {isAddingUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">เพิ่มผู้ใช้ใหม่</h3>
                            <button onClick={() => setIsAddingUser(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Username *</label>
                                <input
                                    type="text"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="ชื่อ-นามสกุล"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    {roles.map(role => (
                                        <option key={role.name} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                                <select
                                    value={newUser.status}
                                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddingUser(false)}
                                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">แก้ไขผู้ใช้</h3>
                            <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={editingUser.username || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    disabled
                                />
                                <p className="text-xs text-slate-400 mt-1">ไม่สามารถแก้ไข username ได้</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password (เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={editingUser.password || ''}
                                        onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={editingUser.name || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                                <select
                                    value={editingUser.role || 'Viewer'}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    {roles.map(role => (
                                        <option key={role.name} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                                <select
                                    value={editingUser.status || 'Active'}
                                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={() => handleUpdateUser(editingUser)}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementSection;

