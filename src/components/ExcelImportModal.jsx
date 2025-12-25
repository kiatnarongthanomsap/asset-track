import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import * as supabaseService from '../services/supabaseService';

export default function ExcelImportModal({ isOpen, onClose, onImportComplete }) {
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [validationResults, setValidationResults] = useState([]);
    const [importing, setImporting] = useState(false);
    const [importStatus, setImportStatus] = useState(null);

    // Template columns ที่ต้องการ
    const REQUIRED_COLUMNS = {
        'รหัสทรัพย์สิน': 'code',
        'ชื่อทรัพย์สิน': 'name',
        'ยี่ห้อ': 'brand',
        'Serial Number': 'serial',
        'ราคา': 'price',
        'สถานที่': 'location',
        'สถานะ': 'status',
        'วันที่จัดซื้อ': 'purchase_date',
        'หมวดหมู่': 'category',
        'อายุการใช้งาน': 'useful_life'
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // ตรวจสอบนามสกุลไฟล์
        const validExtensions = ['.xlsx', '.xls'];
        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            alert('กรุณาเลือกไฟล์ Excel (.xlsx หรือ .xls) เท่านั้น');
            return;
        }

        setFile(selectedFile);
        readExcelFile(selectedFile);
    };

    const readExcelFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // อ่าน sheet แรก
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);

                if (jsonData.length === 0) {
                    alert('ไฟล์ Excel ว่างเปล่า');
                    return;
                }

                // Function: ดึงวันที่ซื้อจากรหัสทรัพย์สิน
                const extractDateFromCode = (code) => {
                    if (!code || typeof code !== 'string') return null;
                    
                    // รูปแบบ: A004-09-04-2557 -> ดึง 09-04-2557
                    const match = code.match(/-(\d{1,2})-(\d{1,2})-(\d{4})$/);
                    if (!match) return null;
                    
                    try {
                        const day = parseInt(match[1], 10);
                        const month = parseInt(match[2], 10);
                        let year = parseInt(match[3], 10);
                        
                        // แปลง พ.ศ. เป็น ค.ศ. (ถ้า > 2500)
                        if (year > 2500) {
                            year = year - 543;
                        }
                        
                        // ตรวจสอบความถูกต้อง
                        if (year < 1900 || year > 2100) return null;
                        if (month < 1 || month > 12) return null;
                        if (day < 1 || day > 31) return null;
                        
                        // สร้างวันที่ (format: YYYY-MM-DD)
                        const date = new Date(year, month - 1, day);
                        if (date.getFullYear() === year && 
                            date.getMonth() === month - 1 && 
                            date.getDate() === day) {
                            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        }
                    } catch (e) {
                        return null;
                    }
                    return null;
                };

                // แปลงข้อมูลและตรวจสอบ
                const mappedData = jsonData.map((row, index) => {
                    const mappedRow = {};
                    Object.keys(REQUIRED_COLUMNS).forEach(thaiCol => {
                        const engCol = REQUIRED_COLUMNS[thaiCol];
                        mappedRow[engCol] = row[thaiCol] || '';
                    });
                    
                    // ถ้าไม่มีวันที่ซื้อ แต่มีรหัสทรัพย์สิน ให้ดึงจากรหัส
                    if (!mappedRow.purchase_date && mappedRow.code) {
                        const extractedDate = extractDateFromCode(mappedRow.code);
                        if (extractedDate) {
                            mappedRow.purchase_date = extractedDate;
                        }
                    }
                    
                    mappedRow._rowNumber = index + 2; // +2 เพราะมี header และเริ่มที่ 1
                    return mappedRow;
                });

                setPreviewData(mappedData);
                validateData(mappedData);
            } catch (error) {
                console.error('Error reading Excel:', error);
                alert('เกิดข้อผิดพลาดในการอ่านไฟล์ Excel');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const validateData = (data) => {
        const results = data.map(row => {
            const errors = [];

            // ตรวจสอบฟิลด์บังคับ
            if (!row.code || row.code.trim() === '') {
                errors.push('ไม่มีรหัสทรัพย์สิน');
            }
            if (!row.name || row.name.trim() === '') {
                errors.push('ไม่มีชื่อทรัพย์สิน');
            }

            // ตรวจสอบราคา
            if (row.price && isNaN(parseFloat(row.price))) {
                errors.push('ราคาไม่ถูกต้อง');
            }

            // ตรวจสอบสถานะ
            const validStatuses = ['Normal', 'Repair', 'Check', 'Disposed'];
            if (row.status && !validStatuses.includes(row.status)) {
                errors.push(`สถานะต้องเป็น: ${validStatuses.join(', ')}`);
            }

            // ตรวจสอบอายุการใช้งาน
            if (row.useful_life && isNaN(parseInt(row.useful_life))) {
                errors.push('อายุการใช้งานต้องเป็นตัวเลข');
            }

            return {
                rowNumber: row._rowNumber,
                isValid: errors.length === 0,
                errors: errors,
                data: row
            };
        });

        setValidationResults(results);
    };

    const handleImport = async () => {
        const validRows = validationResults.filter(r => r.isValid);

        if (validRows.length === 0) {
            alert('ไม่มีข้อมูลที่ถูกต้องสำหรับนำเข้า');
            return;
        }

        if (!window.confirm(`คุณต้องการนำเข้าข้อมูล ${validRows.length} รายการใช่หรือไม่?`)) {
            return;
        }

        setImporting(true);
        setImportStatus({ success: 0, failed: 0, total: validRows.length });

        try {
            // แปลงข้อมูลให้ตรงกับรูปแบบ Supabase
            const assetsToImport = validRows.map(result => ({
                code: result.data.code,
                name: result.data.name,
                brand: result.data.brand || null,
                serial: result.data.serial || null,
                price: parseFloat(result.data.price) || 0,
                location: result.data.location || null,
                status: result.data.status || 'Normal',
                purchase_date: result.data.purchase_date || null,
                category: result.data.category || null,
                useful_life: parseInt(result.data.useful_life) || 5,
                image: null, // ไม่ตั้งค่า default image - ให้แสดง icon แทน
                is_sticker_printed: false
            }));

            // ใช้ bulk import
            const result = await supabaseService.bulkImportAssets(assetsToImport);

            if (result.status === 'success') {
                setImportStatus({ 
                    success: result.inserted, 
                    failed: result.total - result.inserted, 
                    total: result.total 
                });
                
                alert(`นำเข้าข้อมูลเสร็จสิ้น\nสำเร็จ: ${result.inserted} รายการ\nล้มเหลว: ${result.total - result.inserted} รายการ`);

                if (result.inserted > 0) {
                    onImportComplete?.();
                }
            } else {
                alert(`เกิดข้อผิดพลาด: ${result.message || 'ไม่สามารถนำเข้าข้อมูลได้'}`);
                setImportStatus({ 
                    success: result.inserted || 0, 
                    failed: result.total - (result.inserted || 0), 
                    total: result.total 
                });
            }

            // Reset
            setFile(null);
            setPreviewData([]);
            setValidationResults([]);
            setImportStatus(null);

        } catch (error) {
            console.error('Import error:', error);
            alert('เกิดข้อผิดพลาดในการนำเข้าข้อมูล');
        } finally {
            setImporting(false);
        }
    };

    const downloadTemplate = () => {
        // สร้าง template Excel
        const templateData = [{
            'รหัสทรัพย์สิน': 'A001-01-01-2568',
            'ชื่อทรัพย์สิน': 'Laptop Dell Latitude',
            'ยี่ห้อ': 'Dell',
            'Serial Number': 'SN123456',
            'ราคา': 25000,
            'สถานที่': 'ห้องไอที',
            'สถานะ': 'Normal',
            'วันที่จัดซื้อ': '2024-01-15',
            'หมวดหมู่': 'Computer',
            'อายุการใช้งาน': 5
        }];

        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Template');
        XLSX.writeFile(wb, 'AssetTrack_Import_Template.xlsx');
    };

    if (!isOpen) return null;

    const validCount = validationResults.filter(r => r.isValid).length;
    const invalidCount = validationResults.filter(r => !r.isValid).length;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <FileSpreadsheet className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">นำเข้าข้อมูลจาก Excel</h2>
                                <p className="text-emerald-100 text-sm">Import Assets from Excel File</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Download Template */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 mb-1">ดาวน์โหลด Template</h3>
                                <p className="text-sm text-blue-700 mb-3">
                                    ดาวน์โหลดไฟล์ตัวอย่างเพื่อดูรูปแบบการจัดเรียงข้อมูลที่ถูกต้อง
                                </p>
                                <button
                                    onClick={downloadTemplate}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    ดาวน์โหลด Template
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            เลือกไฟล์ Excel
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                className="hidden"
                                id="excel-upload"
                            />
                            <label
                                htmlFor="excel-upload"
                                className="cursor-pointer inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                            >
                                เลือกไฟล์
                            </label>
                            {file && (
                                <p className="mt-3 text-sm text-slate-600">
                                    ไฟล์ที่เลือก: <span className="font-semibold">{file.name}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Validation Summary */}
                    {validationResults.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <div className="text-2xl font-bold text-slate-700">{validationResults.length}</div>
                                <div className="text-sm text-slate-600">ทั้งหมด</div>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <div className="text-2xl font-bold text-green-700">{validCount}</div>
                                </div>
                                <div className="text-sm text-green-600">ถูกต้อง</div>
                            </div>
                            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                <div className="flex items-center gap-2">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                    <div className="text-2xl font-bold text-red-700">{invalidCount}</div>
                                </div>
                                <div className="text-sm text-red-600">ผิดพลาด</div>
                            </div>
                        </div>
                    )}

                    {/* Preview Table */}
                    {previewData.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-3">ตัวอย่างข้อมูล (5 รายการแรก)</h3>
                            <div className="overflow-x-auto border border-slate-200 rounded-xl">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-semibold text-slate-700">แถว</th>
                                            <th className="px-4 py-2 text-left font-semibold text-slate-700">สถานะ</th>
                                            <th className="px-4 py-2 text-left font-semibold text-slate-700">รหัส</th>
                                            <th className="px-4 py-2 text-left font-semibold text-slate-700">ชื่อ</th>
                                            <th className="px-4 py-2 text-left font-semibold text-slate-700">ราคา</th>
                                            <th className="px-4 py-2 text-left font-semibold text-slate-700">ข้อผิดพลาด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {validationResults.slice(0, 5).map((result, idx) => (
                                            <tr key={idx} className={`border-t ${result.isValid ? 'bg-white' : 'bg-red-50'}`}>
                                                <td className="px-4 py-2 text-slate-600">{result.rowNumber}</td>
                                                <td className="px-4 py-2">
                                                    {result.isValid ? (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-red-600" />
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 font-mono text-xs">{result.data.code}</td>
                                                <td className="px-4 py-2">{result.data.name}</td>
                                                <td className="px-4 py-2">{result.data.price}</td>
                                                <td className="px-4 py-2 text-red-600 text-xs">
                                                    {result.errors.join(', ')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {validationResults.length > 5 && (
                                <p className="text-sm text-slate-500 mt-2">
                                    และอีก {validationResults.length - 5} รายการ...
                                </p>
                            )}
                        </div>
                    )}

                    {/* Import Progress */}
                    {importing && importStatus && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                <span className="font-semibold text-blue-900">กำลังนำเข้าข้อมูล...</span>
                            </div>
                            <div className="text-sm text-blue-700">
                                ความคืบหน้า: {importStatus.success + importStatus.failed} / {importStatus.total}
                                (สำเร็จ: {importStatus.success}, ล้มเหลว: {importStatus.failed})
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 p-6 bg-slate-50 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={validCount === 0 || importing}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {importing ? 'กำลังนำเข้า...' : `นำเข้าข้อมูล (${validCount} รายการ)`}
                    </button>
                </div>
            </div>
        </div>
    );
}
