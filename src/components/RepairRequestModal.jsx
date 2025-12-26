import React, { useState } from 'react';
import { X, Wrench, Download, FileText, User, CreditCard } from 'lucide-react';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import { hasRealImage } from '../utils/assetManager';
import { ToastContainer, useToast } from './Toast';

const RepairRequestModal = ({ asset, onClose, categories = [] }) => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        reason: '',
        serviceProvider: '',
        estimatedCost: '',
        requestDate: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically save and generate the document
        toast.success('ระบบจำลองการสร้างหนังสือขออนุมัติซ่อมเรียบร้อยแล้ว (กำลังดาวน์โหลดไฟล์...)');
        onClose();
    };

    return (
        <>
            <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Wrench className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">ขออนุมัติซ่อมแซม</h2>
                            <p className="text-blue-100/70 text-sm font-medium">บันทึกข้อความเพื่อเสนอขออนุมัติ</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100 flex gap-4 items-center">
                        {hasRealImage(asset.image) ? (
                            <img 
                                src={asset.image} 
                                alt="" 
                                className="w-16 h-16 rounded-xl object-cover shadow-sm"
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
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-sm ${hasRealImage(asset.image) ? 'hidden' : 'flex'}`}>
                            {(() => {
                                const iconName = getIconNameFromCategories(asset.category, categories);
                                const IconComponent = getCategoryIcon(asset.category, iconName);
                                return <IconComponent className="w-8 h-8 text-slate-600" strokeWidth={2} />;
                            })()}
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{asset.code}</p>
                            <h4 className="font-bold text-slate-800">{asset.name}</h4>
                            <p className="text-xs text-slate-500 italic">Serial: {asset.serial || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="flex items-center text-sm font-black text-slate-700 mb-2">
                                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                                เหตุผล/ความจำเป็นในการซ่อม
                            </label>
                            <textarea
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-24 text-sm"
                                placeholder="เช่น หน้าจอแตก, บอร์ดมีปัญหาชาร์จไฟไม่เข้า..."
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-black text-slate-700 mb-2">
                                    <User className="w-4 h-4 mr-2 text-blue-600" />
                                    ชื่อผู้บริการ/ร้านที่ซ่อม
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    placeholder="ชื่อศูนย์บริการหรือร้านค้า"
                                    value={formData.serviceProvider}
                                    onChange={(e) => setFormData({ ...formData, serviceProvider: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-black text-slate-700 mb-2">
                                    <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                                    ประมาณการค่าใช้จ่าย (บาท)
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    placeholder="0.00"
                                    value={formData.estimatedCost}
                                    onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Attachments Section */}
                        <div>
                            <label className="flex items-center text-sm font-black text-slate-700 mb-2">
                                <Download className="w-4 h-4 mr-2 text-blue-600 rotate-180" />
                                เอกสารแนบ (ใบเสนอราคา / รูปภาพประกอบ)
                            </label>
                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Download className="w-6 h-6 text-blue-600 rotate-180" />
                                </div>
                                <p className="text-sm font-bold text-slate-600">คลิกเพื่อประกอบเอกสาร</p>
                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">PDF, Image (Max 10MB)</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 px-6 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 px-6 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-black rounded-2xl hover:shadow-xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center text-sm"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            ออกหนังสือขออนุมัติ
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};

export default RepairRequestModal;
