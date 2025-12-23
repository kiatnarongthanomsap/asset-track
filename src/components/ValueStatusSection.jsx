import React, { useMemo } from 'react';
import { FileText, Shield, CheckSquare, AlertCircle, Calendar, AlertTriangle } from 'lucide-react';
import { calculateDepreciation } from '../utils/calculations';

const ValueStatusSection = ({ data }) => {

    // Calculate real financial totals
    const financials = useMemo(() => {
        let totalCapital = 0;
        let totalBookValue = 0;
        let totalAccumulatedDepreciation = 0;
        let totalDisposalValue = 0;

        if (data) {
            data.forEach(asset => {
                const dep = calculateDepreciation(asset.price, asset.purchaseDate, asset.usefulLife);
                totalCapital += asset.price;
                totalBookValue += dep.bookValue;
                totalAccumulatedDepreciation += dep.accumulatedDepreciation;

                if (['Disposed', 'Repair'].includes(asset.status)) {
                    totalDisposalValue += dep.bookValue;
                }
            });
        }

        return { totalCapital, totalBookValue, totalAccumulatedDepreciation, totalDisposalValue };
    }, [data]);

    // Calculate real status counts
    const statusCounts = useMemo(() => {
        const counts = { Normal: 0, Repair: 0, Check: 0, Disposed: 0 };
        if (data) {
            data.forEach(asset => {
                if (counts[asset.status] !== undefined) counts[asset.status]++;
            });
        }
        return counts;
    }, [data]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left: Financials */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    ข้อมูลมูลค่าทรัพย์สิน
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-600">ราคาทุนรวม</span>
                        <span className="text-lg font-bold text-blue-800">{financials.totalCapital.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center px-3">
                        <span className="text-sm text-gray-500">มูลค่าทางบัญชี (Book Value)</span>
                        <span className="text-sm font-semibold text-gray-700">{Math.round(financials.totalBookValue).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center px-3">
                        <span className="text-sm text-gray-500">ค่าเสื่อมสะสม</span>
                        <span className="text-sm font-semibold text-gray-700">{Math.round(financials.totalAccumulatedDepreciation).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                        <span className="text-sm font-medium text-orange-800">รอตัดจำหน่าย</span>
                        <span className="text-base font-bold text-orange-700">{Math.round(financials.totalDisposalValue).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Right: Asset Status */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                    สรุปสถานะทรัพย์สิน
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckSquare className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">ปกติ</span>
                        </div>
                        <p className="text-2xl font-bold text-green-700">{statusCounts.Normal} <span className="text-xs font-normal text-green-600">รายการ</span></p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <span className="text-sm font-semibold text-yellow-800">รอซ่อม</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-700">{statusCounts.Repair} <span className="text-xs font-normal text-yellow-600">รายการ</span></p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-semibold text-orange-800">รอตรวจสอบ</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-700">{statusCounts.Check} <span className="text-xs font-normal text-orange-600">รายการ</span></p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-semibold text-red-800">จำหน่ายแล้ว</span>
                        </div>
                        <p className="text-2xl font-bold text-red-700">{statusCounts.Disposed} <span className="text-xs font-normal text-red-600">รายการ</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValueStatusSection;
