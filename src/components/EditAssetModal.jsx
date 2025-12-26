import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { generateAssetCodeStandard } from '../utils/assetManager';
import * as imageService from '../services/imageService';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';

const EditAssetModal = ({ isOpen, onClose, asset, onSave, categories }) => {
    const [formData, setFormData] = useState(asset || {});
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        setFormData(asset || {});
        setUploadError('');
    }, [asset]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'usefulLife' ? Number(value) : value
        }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        const validation = imageService.validateImageFile(file);
        if (!validation.valid) {
            setUploadError(validation.error);
            return;
        }

        setUploading(true);
        setUploadError('');

        try {
            // ใช้ asset code หรือ generate temporary code
            const assetCode = formData.code || `TEMP-${Date.now()}`;
            const result = await imageService.uploadImage(file, assetCode);

            if (result.success) {
                setFormData(prev => ({
                    ...prev,
                    image: result.url
                }));
                setUploadError('');
            } else {
                setUploadError(result.error || 'ไม่สามารถอัพโหลดรูปภาพได้');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ');
        } finally {
            setUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all scale-100">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            {asset?.code ? 'แก้ไขข้อมูลทรัพย์สิน' : 'เพิ่มทรัพย์สินใหม่'}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {asset?.code ? `รหัส: ${formData.code}` : 'กรุณากรอกข้อมูลเพื่อลงทะเบียน'}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Code Input (Only for new assets or generally editable) */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสทรัพย์สิน</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code || ''}
                                onChange={handleChange}
                                placeholder="เช่น A004-09-04-2557"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-slate-50 font-mono text-emerald-700 font-bold"
                            />
                        </div>

                        {/* Image Section */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-center mb-4">
                            <div className="relative group cursor-pointer" onClick={handleImageClick}>
                                {formData.image ? (
                                    <img 
                                        src={formData.image} 
                                        alt="Preview" 
                                        className="w-32 h-32 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:opacity-75 transition-opacity" 
                                        onError={(e) => {
                                            // ซ่อนรูปภาพและแสดง icon แทน
                                            e.target.style.display = 'none';
                                            const iconContainer = e.target.nextElementSibling;
                                            if (iconContainer) {
                                                iconContainer.style.display = 'flex';
                                            }
                                        }}
                                    />
                                ) : null}
                                <div className={`w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors ${formData.image ? 'hidden' : 'flex'}`}>
                                    {(() => {
                                        const iconName = getIconNameFromCategories(formData.category, categories);
                                        const IconComponent = getCategoryIcon(formData.category, iconName);
                                        return <IconComponent className="w-8 h-8 text-slate-400" strokeWidth={2} />;
                                    })()}
                                </div>
                                {!uploading && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-2xl">
                                        <span className="bg-white text-slate-700 text-xs px-3 py-2 rounded-full flex items-center font-medium shadow-lg">
                                            <Upload className="w-3 h-3 mr-1" /> {formData.image ? 'เปลี่ยนรูป' : 'อัพโหลดรูป'}
                                        </span>
                                    </div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            {uploadError && (
                                <p className="text-xs text-red-500 mt-2 text-center">{uploadError}</p>
                            )}
                            {formData.image && (
                                <p className="text-xs text-slate-400 mt-2 text-center max-w-xs truncate">
                                    {formData.image}
                                </p>
                            )}
                        </div>

                        {/* Category Section */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">หมวดหมู่ทรัพย์สิน</label>
                            <select
                                name="category"
                                value={formData.category || ''}
                                onChange={(e) => {
                                    const cat = categories.find(c => c.name === e.target.value || c.id === e.target.value);
                                    setFormData(prev => ({
                                        ...prev,
                                        category: e.target.value,
                                        usefulLife: cat ? (cat.usefulLife || cat.useful_life || 5) : prev.usefulLife
                                    }));
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-white"
                            >
                                <option value="">เลือกหมวดหมู่</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name} (อายุ {cat.usefulLife || cat.useful_life || 5} ปี)</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อทรัพย์สิน</label>
                                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ยี่ห้อ (Brand)</label>
                                <input type="text" name="brand" value={formData.brand || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">สี (Color)</label>
                                <input type="text" name="color" value={formData.color || ''} onChange={handleChange} placeholder="เช่น ดำ, ขาว, เงิน" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Serial Number</label>
                                <input type="text" name="serial" value={formData.serial || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ราคาทุน (บาท)</label>
                                <input type="number" name="price" value={formData.price || 0} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">วันที่ซื้อ</label>
                                <input type="date" name="purchaseDate" value={formData.purchaseDate || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">อายุใช้งาน (ปี)</label>
                                <input type="number" name="usefulLife" value={formData.usefulLife || 5} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">สถานที่ตั้ง</label>
                                <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">สถานะปัจจุบัน</label>
                                <select name="status" value={formData.status || 'Normal'} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-white">
                                    <option value="Normal">ปกติ (Normal)</option>
                                    <option value="Repair">รอซ่อม (Repair)</option>
                                    <option value="Check">รอตรวจสอบ (Check)</option>
                                    <option value="Disposed">จำหน่ายออก (Disposed)</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ผู้รับผิดชอบ / ผู้ใช้งาน (Custodian)</label>
                                <input type="text" name="custodian" value={formData.custodian || ''} onChange={handleChange} placeholder="เช่น นายสมชาย ใจดี" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ร้านค้า / ผู้จำหน่าย (Vendor)</label>
                                <input type="text" name="vendor" value={formData.vendor || ''} onChange={handleChange} placeholder="เช่น บจก. เอบีซี คอมพิวเตอร์" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">วันสิ้นสุดการรับประกัน</label>
                                <input type="date" name="warrantyExpiry" value={formData.warrantyExpiry || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">URL รูปภาพ</label>
                                <input type="text" name="image" value={formData.image || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-xs text-slate-500 font-mono" />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">หมายเหตุ (Notes)</label>
                            <textarea name="notes" value={formData.notes || ''} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none text-sm" placeholder="ระบุข้อมูลเพิ่มเติมอื่นๆ ของทรัพย์สิน..."></textarea>
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors">
                            ยกเลิก
                        </button>
                        <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5 flex items-center">
                            <Save className="w-4 h-4 mr-2" />
                            บันทึกข้อมูล
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAssetModal;
