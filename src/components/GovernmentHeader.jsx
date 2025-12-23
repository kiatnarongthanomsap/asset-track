import React from 'react';
import { Globe, ChevronDown, Calendar, UserCircle } from 'lucide-react';

const GovernmentHeader = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    <Globe className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">มหาวิทยาลัยเกษตรศาสตร์</h1>
                    <p className="text-sm text-gray-500 font-medium">Dashboard บริหารจัดการครุภัณฑ์</p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <span className="text-sm font-semibold text-gray-700">ปีงบประมาณ</span>
                    <div className="flex items-center text-blue-600 font-bold bg-white px-2 py-0.5 rounded border border-blue-100 shadow-sm">
                        2567 <ChevronDown className="w-3 h-3 ml-1" />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>ข้อมูล ณ วันที่ 31/03/2567 14:30</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mt-1">
                    <UserCircle className="w-3 h-3" />
                    <span>ผู้ใช้งาน: Admin (เจ้าหน้าที่พัสดุ)</span>
                </div>
            </div>
        </div>
    </div>
);

export default GovernmentHeader;
