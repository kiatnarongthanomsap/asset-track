import React, { useState, useEffect } from 'react';
import { ClipboardCheck, AlertCircle, ArrowRight } from 'lucide-react';
import * as supabaseService from '../services/supabaseService';

const InventoryAlertSection = ({ onViewInventory }) => {
    const [activeCycles, setActiveCycles] = useState([]);
    const [cycleProgress, setCycleProgress] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveCycles();
    }, []);

    const fetchActiveCycles = async () => {
        setLoading(true);
        try {
            const result = await supabaseService.fetchInventoryCycles();
            if (result.status === 'success') {
                // ดึงเฉพาะ cycles ที่กำลังดำเนินการ
                const inProgress = result.data.filter(c => c.status === 'In Progress');
                setActiveCycles(inProgress);
                
                // ดึงข้อมูล progress สำหรับแต่ละ cycle
                const progressData = {};
                for (const cycle of inProgress) {
                    try {
                        const summaryResult = await supabaseService.getInventorySummary(cycle.id);
                        if (summaryResult.status === 'success') {
                            progressData[cycle.id] = summaryResult.data.progressPercent || 0;
                        }
                    } catch (error) {
                        console.error(`Error fetching progress for cycle ${cycle.id}:`, error);
                        progressData[cycle.id] = 0;
                    }
                }
                setCycleProgress(progressData);
            }
        } catch (error) {
            console.error('Error fetching inventory cycles:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return null;
    }

    if (activeCycles.length === 0) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-100 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                            <ClipboardCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800">มีการตรวจนับกำลังดำเนินการ</h3>
                            <p className="text-sm text-slate-600 mt-1">
                                มี {activeCycles.length} รอบการตรวจนับที่ต้องดำเนินการ
                            </p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {activeCycles.slice(0, 3).map((cycle) => {
                            const progress = cycleProgress[cycle.id] || 0;
                            return (
                                <div
                                    key={cycle.id}
                                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800">{cycle.cycle_name}</p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {new Date(cycle.start_date).toLocaleDateString('th-TH')} - {new Date(cycle.end_date).toLocaleDateString('th-TH')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => onViewInventory?.(cycle)}
                                            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center shrink-0"
                                        >
                                            ดูรายละเอียด
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="mt-3 pt-3 border-t border-blue-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-slate-600">ความคืบหน้า</span>
                                            <span className="text-xs font-bold text-blue-600">{progress.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 shadow-sm"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryAlertSection;

