import React, { useRef, useState } from 'react';
import { X, Printer, Download, Edit2, Save } from 'lucide-react';

const RepairApprovalDocument = ({ 
    isOpen, 
    onClose, 
    asset, 
    formData, 
    user,
    department = '' 
}) => {
    const printRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({
        recipient: '',
        department: department || '',
        approvalDate: ''
    });

    if (!isOpen) return null;

    const currentDate = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        // Temporarily disable editing mode for print
        const wasEditing = isEditing;
        if (wasEditing) {
            setIsEditing(false);
            // Wait for DOM update
            setTimeout(() => {
                printDocument();
                if (wasEditing) {
                    setTimeout(() => setIsEditing(true), 100);
                }
            }, 100);
        } else {
            printDocument();
        }
    };

    const printDocument = () => {
        const printWindow = window.open('', '_blank');
        const printContent = printRef.current.innerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>หนังสือขออนุมัติซ่อมครุภัณฑ์</title>
                <style>
                    @page {
                        size: A4;
                        margin: 2.5cm;
                    }
                    body {
                        font-family: 'Sarabun', 'TH Sarabun New', 'Angsana New', sans-serif;
                        font-size: 16px;
                        line-height: 1.8;
                        color: #000;
                    }
                    .document-container {
                        max-width: 100%;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        page-break-inside: avoid;
                    }
                    th, td {
                        border: 2px solid #000;
                        padding: 12px 8px;
                        text-align: left;
                        font-size: 15px;
                    }
                    th {
                        background-color: #f5f5f5;
                        font-weight: bold;
                        text-align: center;
                    }
                    td {
                        text-align: center;
                    }
                    .table-container {
                        margin: 25px 0;
                    }
                    .signature-section {
                        margin-top: 50px;
                    }
                    .signature-line {
                        margin: 30px 0;
                    }
                    .signature-box {
                        margin-top: 50px;
                    }
                    .checkbox-group {
                        margin: 20px 0;
                    }
                    .checkbox-item {
                        margin: 10px 0;
                    }
                    @media print {
                        .no-print {
                            display: none;
                        }
                        body {
                            margin: 0;
                        }
                    }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 my-8">
                {/* Header with Actions */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white flex items-center justify-between no-print">
                    <h2 className="text-2xl font-black">หนังสือขออนุมัติซ่อมครุภัณฑ์</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                            title={isEditing ? "บันทึกการแก้ไข" : "แก้ไขข้อมูล"}
                        >
                            {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handlePrint}
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                            title="พิมพ์"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Document Content */}
                <div className="p-8 lg:p-12 bg-white" ref={printRef}>
                    <div className="document-container max-w-4xl mx-auto" style={{ fontFamily: "'Sarabun', 'TH Sarabun New', 'Angsana New', sans-serif" }}>
                        {/* Date */}
                        <div className="text-right mb-8">
                            <p className="text-lg font-medium">วันที่ {currentDate}</p>
                        </div>

                        {/* Subject */}
                        <div className="mb-8">
                            <p className="font-bold text-xl">เรื่อง ขออนุมัติซ่อมครุภัณฑ์</p>
                        </div>

                        {/* Greeting */}
                        <div className="mb-8">
                            {isEditing ? (
                                <p className="text-lg">
                                    เรียน <input 
                                        type="text" 
                                        className="border-b-2 border-blue-500 px-2 min-w-[300px] focus:outline-none bg-transparent"
                                        value={editableData.recipient}
                                        onChange={(e) => setEditableData({...editableData, recipient: e.target.value})}
                                        placeholder="ชื่อผู้รับหนังสือ"
                                    />
                                </p>
                            ) : (
                                <p className="text-lg">เรียน {editableData.recipient || '......................................................................'}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="mb-6 text-justify leading-relaxed" style={{ textIndent: '3rem' }}>
                            {isEditing ? (
                                <p className="text-base">
                                    ตามที่<input 
                                        type="text" 
                                        className="border-b-2 border-blue-500 px-2 min-w-[200px] focus:outline-none bg-transparent"
                                        value={editableData.department}
                                        onChange={(e) => setEditableData({...editableData, department: e.target.value})}
                                        placeholder="ชื่อส่วนงาน"
                                    />ได้ใช้งานครุภัณฑ์ (ระบุชื่อครุภัณฑ์/รหัสครุภัณฑ์/เลขทะเบียน)
                                    ได้แก่
                                </p>
                            ) : (
                                <p className="text-base">
                                    ตามที่{editableData.department || department || '<ชื่อส่วนงาน>'}ได้ใช้งานครุภัณฑ์ (ระบุชื่อครุภัณฑ์/รหัสครุภัณฑ์/เลขทะเบียน)
                                    ได้แก่
                                </p>
                            )}
                        </div>

                        {/* Asset Table */}
                        <div className="table-container mb-8">
                            <table className="border-collapse w-full shadow-sm">
                                <thead>
                                    <tr>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '25%' }}>ชื่อครุภัณฑ์</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '25%' }}>รหัสครุภัณฑ์</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '25%' }}>เลขทะเบียน/Serial</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '25%' }}>สถานที่ตั้ง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center text-base">{asset?.name || '......................................'}</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center text-base">{asset?.code || '......................................'}</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center text-base">{asset?.serial || '......................................'}</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center text-base">{asset?.location || '......................................'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Damage Description */}
                        <div className="mb-6 text-justify leading-relaxed" style={{ textIndent: '3rem' }}>
                            <p className="text-base">
                                ครุภัณฑ์ดังกล่าวได้เกิดการชำรุดชัดเจน ไม่สามารถใช้งานได้ตามปกติ
                                สาเหตุความเสียหาย คือ <span className="font-semibold">{formData?.reason || '..............................................................................'}</span>
                            </p>
                            <p className="mt-4 text-base">
                                จากการตรวจสอบแล้ว เห็นควรซ่อมแซมให้สามารถใช้งานต่อไปได้อย่างมีประสิทธิภาพ
                            </p>
                        </div>

                        {/* Request Section */}
                        <div className="mb-6 text-justify leading-relaxed" style={{ textIndent: '3rem' }}>
                            <p className="text-base">
                                ดังนั้น เพื่อให้การปฏิบัติงานดำเนินไปอย่างต่อเนื่อง หน่วยงานของข้าพเจ้าจึงขออนุมัติซ่อมครุภัณฑ์ดังกล่าว
                                โดยมีรายละเอียดค่าใช้จ่าย ดังนี้
                            </p>
                        </div>

                        {/* Cost Table */}
                        <div className="table-container mb-8">
                            <table className="border-collapse w-full shadow-sm">
                                <thead>
                                    <tr>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '30%' }}>รายการซ่อมแซม</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '30%' }}>ผู้เสนอราคา / ร้านค้า</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '15%' }}>ราคาต่อหน่วย (บาท)</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '10%' }}>จำนวน</th>
                                        <th className="border-2 border-gray-800 px-4 py-3 bg-gray-100 font-bold text-center text-base" style={{ width: '15%' }}>รวม (บาท)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-base">{formData?.reason || '......................................'}</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-base">{formData?.serviceProvider || '......................................'}</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center text-base">{formData?.estimatedCost ? parseFloat(formData.estimatedCost).toLocaleString('th-TH') : '..........'}</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center text-base">1</td>
                                        <td className="border-2 border-gray-800 px-4 py-3 text-center font-semibold text-base">{formData?.estimatedCost ? parseFloat(formData.estimatedCost).toLocaleString('th-TH') : '..........'}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-right mt-6 mb-4">
                                <p className="text-lg font-bold">
                                    รวมทั้งสิ้นเป็นเงิน <span className="underline text-xl">{formData?.estimatedCost ? parseFloat(formData.estimatedCost).toLocaleString('th-TH') : '...................'}</span> บาท
                                </p>
                            </div>
                        </div>

                        {/* Attachment Note */}
                        <div className="mb-6 text-center">
                            <p className="italic text-base text-gray-600">(แนบใบเสนอราคา/รูปภาพครุภัณฑ์ประกอบ)</p>
                        </div>

                        {/* Closing */}
                        <div className="mb-8 text-justify leading-relaxed" style={{ textIndent: '3rem' }}>
                            <p className="text-base">จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ</p>
                        </div>

                        {/* Signature Section - Requester */}
                        <div className="mt-12">
                            <div className="text-right mb-16">
                                <p className="mb-20 text-base">ขอแสดงความนับถือ</p>
                                <div className="mt-8 space-y-2">
                                    <p className="text-base">ลงชื่อ .............................................</p>
                                    <p className="text-base">({user?.name || '.............................................'})</p>
                                    <p className="text-base">ตำแหน่ง {user?.role || '.............................................'}</p>
                                </div>
                            </div>

                            {/* Supervisor Comment */}
                            <div className="mb-12">
                                <p className="font-bold mb-4 text-base">ความคิดเห็นผู้บังคับบัญชา</p>
                                <div className="border-2 border-gray-400 p-6 min-h-[100px] mb-6">
                                    <p className="text-base">..........................................................................................</p>
                                    <p className="text-base">..........................................................................................</p>
                                </div>
                                <div className="mt-8 space-y-2">
                                    <p className="text-base">ลงชื่อ .............................................</p>
                                    <p className="text-base">(.............................................)</p>
                                    <p className="text-base">ตำแหน่ง .............................................</p>
                                </div>
                            </div>

                            {/* Approval Section */}
                            <div>
                                <p className="font-bold mb-6 text-base">คำสั่ง</p>
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-5 h-5" /> 
                                        <span className="text-base">อนุมัติ</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-5 h-5" /> 
                                        <span className="text-base">ไม่อนุมัติ</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-5 h-5" /> 
                                        <span className="text-base">อื่น ๆ ................................................................................</span>
                                    </div>
                                </div>
                                <div className="mt-12 space-y-2">
                                    <p className="text-base">ลงชื่อ .............................................</p>
                                    <p className="text-base">(.............................................)</p>
                                    <p className="text-base">ตำแหน่ง .............................................</p>
                                    <p className="text-base mt-4">วันที่ .............................................</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Actions (Hidden when printing) */}
                <div className="p-6 border-t border-slate-200 bg-slate-50 no-print">
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-white transition-all"
                        >
                            ปิด
                        </button>
                        <button
                            onClick={handlePrint}
                            className="px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-black rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <Printer className="w-4 h-4" />
                            พิมพ์เอกสาร
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepairApprovalDocument;

