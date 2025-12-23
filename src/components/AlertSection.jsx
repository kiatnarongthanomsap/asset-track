import React, { useMemo } from 'react';
import { AlertTriangle, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

const AlertSection = ({ assets }) => {
    const alerts = useMemo(() => {
        const now = new Date();
        const results = [];

        assets.forEach(asset => {
            // 1. Useful Life Alert (e.g., if > 90% of useful life has passed)
            const purchaseDate = new Date(asset.purchaseDate);
            const yearsPassed = (now - purchaseDate) / (1000 * 60 * 60 * 24 * 365.25);

            if (yearsPassed >= asset.usefulLife - 1) { // 1 year before or already passed
                results.push({
                    id: `life-${asset.id}`,
                    type: 'life',
                    level: yearsPassed >= asset.usefulLife ? 'critical' : 'warning',
                    title: yearsPassed >= asset.usefulLife ? 'ครบอายุการใช้งาน' : 'ใกล้ครบอายุการใช้งาน',
                    assetName: asset.name,
                    code: asset.code,
                    desc: yearsPassed >= asset.usefulLife
                        ? `ใช้งานมาแล้ว ${yearsPassed.toFixed(1)} ปี (กำหนด ${asset.usefulLife} ปี)`
                        : `จะครบกำหนดในอีก ${(asset.usefulLife - yearsPassed).toFixed(1)} ปี`,
                    icon: Clock
                });
            }

            // 2. High Value Repair Alert
            if (asset.status === 'Repair' && asset.price > 50000) {
                results.push({
                    id: `repair-${asset.id}`,
                    type: 'repair',
                    level: 'critical',
                    title: 'ทรัพย์สินราคาสูงชำรุด',
                    assetName: asset.name,
                    code: asset.code,
                    desc: 'ครุภัณฑ์มูลค่าสูงกำลังรอการซ่อมแซม โปรดติดตามความคืบหน้า',
                    icon: AlertTriangle
                });
            }
        });

        return results.slice(0, 3); // Show top 3 alerts
    }, [assets]);

    if (alerts.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center">
                    <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" />
                    การแจ้งเตือนและการเฝ้าระวัง
                </h3>
                <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                    {alerts.length} รายการวิกฤต
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {alerts.map(alert => (
                    <div
                        key={alert.id}
                        className={`p-5 rounded-[2rem] border-2 transition-all hover:scale-[1.02] cursor-pointer group flex flex-col ${alert.level === 'critical'
                                ? 'bg-rose-50/50 border-rose-100 hover:border-rose-200'
                                : 'bg-amber-50/50 border-amber-100 hover:border-amber-200'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${alert.level === 'critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                <alert.icon className="w-5 h-5" />
                            </div>
                            <div className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 transition-colors">
                                {alert.code}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h4 className={`text-sm font-black mb-1 ${alert.level === 'critical' ? 'text-rose-900' : 'text-amber-900'
                                }`}>{alert.title}</h4>
                            <p className="text-[11px] font-black text-slate-700 leading-tight mb-2 line-clamp-1">{alert.assetName}</p>
                            <p className="text-[10px] font-medium text-slate-500 line-clamp-2">{alert.desc}</p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">View Details</span>
                            <ArrowRight className={`w-4 h-4 ${alert.level === 'critical' ? 'text-rose-400' : 'text-amber-400'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertSection;
