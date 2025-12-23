import React from 'react';
import {
    PlusCircle,
    Printer,
    FileSpreadsheet,
    History,
    Settings,
    ArrowRight
} from 'lucide-react';

const ActionZone = () => {
    const actions = [
        {
            title: 'เพิ่มครุภัณฑ์ใหม่',
            desc: 'ลงทะเบียนทรัพย์สินเข้าระบบ',
            icon: PlusCircle,
            color: 'bg-emerald-600',
            shadow: 'shadow-emerald-200',
            hover: 'hover:bg-emerald-700'
        },
        {
            title: 'พิมพ์บาร์โค้ด',
            desc: 'สร้าง QR Code ติดทรัพย์สิน',
            icon: Printer,
            color: 'bg-blue-600',
            shadow: 'shadow-blue-200',
            hover: 'hover:bg-blue-700'
        },
        {
            title: 'ส่งออก Excel',
            desc: 'รายงานสรุปตามหมวดหมู่',
            icon: FileSpreadsheet,
            color: 'bg-indigo-600',
            shadow: 'shadow-indigo-200',
            hover: 'hover:bg-indigo-700'
        },
        {
            title: 'ประวัติธุรกรรม',
            desc: 'ตรวจสอบการโอนย้ายล่าสุด',
            icon: History,
            color: 'bg-rose-500',
            shadow: 'shadow-rose-200',
            hover: 'hover:bg-rose-600'
        },
        {
            title: 'ตั้งค่าระบบ',
            desc: 'ปรับจูนรหัสและการรันเลข',
            icon: Settings,
            color: 'bg-slate-700',
            shadow: 'shadow-slate-300',
            hover: 'hover:bg-slate-800'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {actions.map((action, index) => (
                <button
                    key={index}
                    className={`group relative overflow-hidden flex flex-col items-start p-6 rounded-3xl transition-all duration-300 shadow-lg ${action.shadow} ${action.color} ${action.hover} hover:-translate-y-1`}
                >
                    {/* Background Pattern Detail */}
                    <div className="absolute -right-2 -bottom-2 opacity-10 transform scale-150 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-[1.7]">
                        <action.icon className="w-20 h-20 text-white" />
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <action.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-left relative z-10 w-full">
                        <h3 className="text-white font-black text-lg leading-tight mb-1">{action.title}</h3>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{action.desc}</p>
                    </div>

                    <div className="mt-6 w-full flex justify-end opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                </button>
            ))}
        </div>
    );
};

export default ActionZone;
