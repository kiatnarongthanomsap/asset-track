import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300);
    };

    if (!isVisible) return null;

    const config = {
        success: {
            icon: CheckCircle2,
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            iconColor: 'text-emerald-600',
            textColor: 'text-emerald-800',
            iconBg: 'bg-emerald-100',
            shadow: 'shadow-emerald-500/20'
        },
        error: {
            icon: XCircle,
            bg: 'bg-rose-50',
            border: 'border-rose-200',
            iconColor: 'text-rose-600',
            textColor: 'text-rose-800',
            iconBg: 'bg-rose-100',
            shadow: 'shadow-rose-500/20'
        },
        warning: {
            icon: AlertTriangle,
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            iconColor: 'text-amber-600',
            textColor: 'text-amber-800',
            iconBg: 'bg-amber-100',
            shadow: 'shadow-amber-500/20'
        },
        info: {
            icon: Info,
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-800',
            iconBg: 'bg-blue-100',
            shadow: 'shadow-blue-500/20'
        }
    };

    const toastConfig = config[type] || config.success;
    const IconComponent = toastConfig.icon;

    return (
        <div
            className={`fixed top-4 right-4 z-[9999] transform transition-all duration-300 ${
                isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
        >
            <div
                className={`${toastConfig.bg} ${toastConfig.border} border-2 rounded-xl p-4 shadow-xl ${toastConfig.shadow} min-w-[320px] max-w-md backdrop-blur-sm`}
            >
                <div className="flex items-start gap-3">
                    <div className={`${toastConfig.iconBg} p-2 rounded-lg shrink-0`}>
                        <IconComponent className={`w-5 h-5 ${toastConfig.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`${toastConfig.textColor} font-semibold text-sm leading-relaxed`}>
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className={`${toastConfig.iconColor} hover:opacity-70 transition-opacity shrink-0 p-1 rounded-lg hover:bg-white/50`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
};

// Hook for managing toasts
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type, duration };
        setToasts((prev) => [...prev, newToast]);
        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const success = (message, duration) => showToast(message, 'success', duration);
    const error = (message, duration) => showToast(message, 'error', duration);
    const warning = (message, duration) => showToast(message, 'warning', duration);
    const info = (message, duration) => showToast(message, 'info', duration);

    return {
        toasts,
        showToast,
        removeToast,
        success,
        error,
        warning,
        info
    };
};

export default Toast;

