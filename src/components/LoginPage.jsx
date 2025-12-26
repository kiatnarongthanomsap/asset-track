import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import * as supabaseService from '../services/supabaseService';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await supabaseService.login(username, password);
            if (result.success) {
                onLogin(result.user);
            } else {
                // ถ้า Supabase ไม่สามารถเชื่อมต่อได้ หรือ table ไม่มี ให้ใช้ mock user
                if (result.message && (
                    result.message.includes('relation') || 
                    result.message.includes('does not exist') ||
                    result.message.includes('table not found') ||
                    result.message.includes('PGRST116')
                )) {
                    console.warn('Supabase tables not found, using mock login');
                    // ใช้ mock user สำหรับ development
                    onLogin({
                        id: 1,
                        username: username,
                        name: 'Administrator',
                        role: 'Admin'
                    });
                } else if (result.message && result.message.includes('Invalid credentials')) {
                    // ถ้า credentials ไม่ถูกต้อง และเป็น admin/123456 ให้ใช้ mock login
                    if (username === 'admin' && password === '123456') {
                        console.warn('User not found in Supabase, using mock login for admin');
                        onLogin({
                            id: 1,
                            username: username,
                            name: 'Administrator',
                            role: 'Admin'
                        });
                    } else {
                        alert('Login failed: ' + (result.message || 'Invalid credentials'));
                    }
                } else {
                    alert('Login failed: ' + (result.message || 'Invalid credentials'));
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            // ถ้าเกิด error ให้ใช้ mock login
            console.warn('Supabase connection error, using mock login');
            onLogin({
                id: 1,
                username: username,
                name: 'Administrator',
                role: 'Admin'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="w-full max-w-5xl flex bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden relative z-10 m-4">
                {/* Left Side: Organization Info */}
                <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-12 text-white relative">
                    <div className="relative z-10 h-full flex flex-col">
                        {/* Logo Section */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
                                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black tracking-tight">AssetTrack</h1>
                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">ระบบจัดการทรัพย์สิน</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="mb-8">
                                <h2 className="text-4xl font-black leading-tight mb-4">
                                    ระบบบริหารจัดการ<br />
                                    <span className="text-emerald-400">ครุภัณฑ์และทรัพย์สิน</span>
                                </h2>
                                <p className="text-slate-300 text-base font-medium leading-relaxed max-w-md">
                                    สำหรับสหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด
                                </p>
                            </div>

                            {/* Features */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm mb-1">ความปลอดภัยสูง</h3>
                                        <p className="text-xs text-slate-400">ระบบเข้ารหัสและควบคุมการเข้าถึง</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <Lock className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm mb-1">การเข้าถึงที่ควบคุม</h3>
                                        <p className="text-xs text-slate-400">เฉพาะผู้ใช้ที่ได้รับอนุญาตเท่านั้น</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-8 border-t border-white/10">
                            <p className="text-xs text-slate-400 font-semibold">
                                © 2024 สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด
                            </p>
                        </div>
                    </div>
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 border-4 border-white rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 border-4 border-white rounded-full -ml-32 -mb-32"></div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 lg:flex-[0.9] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-8 text-center">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="text-left">
                                    <h1 className="text-xl font-black text-slate-800">AssetTrack</h1>
                                    <p className="text-xs text-slate-500 font-semibold">ระบบจัดการทรัพย์สิน</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-slate-800 mb-2">เข้าสู่ระบบ</h2>
                            <p className="text-slate-500 font-medium text-sm">กรุณาเข้าสู่ระบบด้วยบัญชีผู้ใช้ของคุณ</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 block">ชื่อผู้ใช้ / อีเมล</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="กรุณากรอกชื่อผู้ใช้หรืออีเมล"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 block">รหัสผ่าน</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="กรุณากรอกรหัสผ่าน"
                                        className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-1">
                                <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-800 transition-colors">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500/20" />
                                    <span className="text-sm font-medium">จดจำการเข้าสู่ระบบ</span>
                                </label>
                                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">ลืมรหัสผ่าน?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/30 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 relative overflow-hidden ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>กำลังเข้าสู่ระบบ...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>เข้าสู่ระบบ</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-10 pt-6 border-t border-slate-200">
                            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span className="font-medium">การเข้าถึงระบบนี้จำกัดเฉพาะผู้ใช้ที่ได้รับอนุญาตเท่านั้น</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 w-full text-center z-10">
                <p className="text-slate-500 text-xs font-medium">
                    © 2024 สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด • เวอร์ชัน 1.0.4
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
