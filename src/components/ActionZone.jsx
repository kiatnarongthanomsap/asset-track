import {
    PlusCircle,
    Printer,
    FileSpreadsheet,
    History,
    Settings,
    ArrowRight,
    Tag
} from 'lucide-react';
import { exportAssetsToCSV, exportPendingStickersCSV } from '../utils/assetManager';

const ActionZone = ({ assets, onAddAsset, onTabChange, onPrintStickers, onImportExcel, user }) => {
    const actions = [
        {
            title: 'เพิ่มครุภัณฑ์ใหม่',
            desc: 'ลงทะเบียนทรัพย์สินเข้าระบบ',
            icon: PlusCircle,
            color: 'bg-emerald-600',
            shadow: 'shadow-emerald-200',
            hover: 'hover:bg-emerald-700',
            onClick: () => {
                if (user && !supabaseService.canManageAssets(user)) {
                    alert('คุณไม่มีสิทธิ์เพิ่มทรัพย์สิน');
                    return;
                }
                onAddAsset();
            }
        },
        {
            title: 'พิมพ์สติ๊กเกอร์',
            desc: 'พิมพ์ QR Code และรหัสทรัพย์สิน',
            icon: Tag,
            color: 'bg-amber-500',
            shadow: 'shadow-amber-200',
            hover: 'hover:bg-amber-600',
            onClick: onPrintStickers
        },
        {
            title: 'รายงาน Excel',
            desc: 'สรุปทรัพย์สินตามหมวดหมู่',
            icon: FileSpreadsheet,
            color: 'bg-indigo-600',
            shadow: 'shadow-indigo-200',
            hover: 'hover:bg-indigo-700',
            onClick: () => exportAssetsToCSV(assets)
        },
        {
            title: 'ประวัติธุรกรรม',
            desc: 'ตรวจสอบการโอนย้ายล่าสุด',
            icon: History,
            color: 'bg-rose-500',
            shadow: 'shadow-rose-200',
            hover: 'hover:bg-rose-600',
            onClick: () => onTabChange('reports')
        },
        {
            title: 'ตั้งค่าระบบ',
            desc: 'ปรับจูนรหัสและการรันเลข',
            icon: Settings,
            color: 'bg-slate-700',
            shadow: 'shadow-slate-300',
            hover: 'hover:bg-slate-800',
            onClick: () => {
                if (user && !supabaseService.canAccessSettings(user)) {
                    alert('คุณไม่มีสิทธิ์เข้าถึงการตั้งค่า');
                    return;
                }
                onTabChange('settings');
            }
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    className={`group relative overflow-hidden flex flex-col items-start p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-lg ${action.shadow} ${action.color} ${action.hover} hover:-translate-y-1`}
                >
                    {/* Background Pattern Detail */}
                    <div className="absolute -right-2 -bottom-2 opacity-10 transform scale-150 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-[1.7]">
                        <action.icon className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                    </div>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                        <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>

                    <div className="text-left relative z-10 w-full">
                        <h3 className="text-white font-black text-base sm:text-lg leading-tight mb-1">{action.title}</h3>
                        <p className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest line-clamp-2">{action.desc}</p>
                    </div>

                    <div className="mt-4 sm:mt-6 w-full flex justify-end opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                </button>
            ))}
        </div>
    );
};

export default ActionZone;
