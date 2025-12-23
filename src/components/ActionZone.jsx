import React from 'react';
import { CheckSquare, Printer, Wrench, Archive, FileText, CheckCircle2 } from 'lucide-react';

const ActionZone = () => {
    const actions = [
        { label: 'เริ่มการตรวจนับประจำปี', icon: CheckSquare, gradient: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-200' },
        { label: 'พิมพ์รายงานการตรวจนับ', icon: Printer, gradient: 'from-teal-500 to-cyan-600', shadow: 'shadow-teal-200' },
        { label: 'แจ้งซ่อม/รายงานความเสียหาย', icon: Wrench, gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-200' },
        { label: 'จำหน่ายทรัพย์สิน', icon: Archive, gradient: 'from-red-500 to-rose-600', shadow: 'shadow-red-200' },
        { label: 'ส่งรายงานผู้สอบบัญชี', icon: FileText, gradient: 'from-indigo-500 to-blue-600', shadow: 'shadow-indigo-200' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center text-lg">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                Action Zone
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {actions.map((action, index) => (
                    <button key={index} className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border border-slate-100 bg-white hover:border-transparent hover:shadow-xl transition-all duration-300 group relative overflow-hidden min-h-[140px]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                        <div className={`p-4 rounded-2xl text-white mb-4 shadow-lg bg-gradient-to-br ${action.gradient} transform group-hover:scale-110 transition-transform duration-300`}>
                            <action.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="text-xs md:text-sm font-bold text-slate-700 text-center z-10 leading-tight">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ActionZone;
