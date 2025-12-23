import React from 'react';
import {
    CheckCircle2,
    Wrench,
    Archive,
    AlertCircle
} from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        Normal: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
        Repair: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
        Disposed: 'bg-slate-50 text-slate-600 ring-1 ring-slate-500/20',
        Check: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    };

    const labels = {
        Normal: 'ปกติ',
        Repair: 'รอซ่อม',
        Disposed: 'จำหน่ายออก',
        Check: 'รอตรวจสอบ'
    };

    const icons = {
        Normal: <CheckCircle2 className="w-3 h-3 mr-1.5" />,
        Repair: <Wrench className="w-3 h-3 mr-1.5" />,
        Disposed: <Archive className="w-3 h-3 mr-1.5" />,
        Check: <AlertCircle className="w-3 h-3 mr-1.5" />
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm ${styles[status] || styles.Normal}`}>
            {icons[status]}
            {labels[status]}
        </span>
    );
};

export default StatusBadge;
