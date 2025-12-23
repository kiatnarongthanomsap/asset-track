import React from 'react';
import { Building2, ChevronDown, Calendar, UserCircle } from 'lucide-react';

const CoopHeader = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                    <Building2 className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด</h1>
                    <p className="text-sm text-gray-500 font-medium">ระบบบริหารจัดการทรัพย์สิน (Asset Management)</p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>ข้อมูล ณ วันที่ 31/03/2567 14:30</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mt-1">
                    <UserCircle className="w-3 h-3" />
                    <span>ผู้ใช้งาน: เจ้าหน้าที่พัสดุ</span>
                </div>
            </div>
        </div>
    </div>
);

export default CoopHeader;
