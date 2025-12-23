import React, { useState, useMemo } from 'react';
import { X, Printer, QrCode, Grid, List, CheckCircle2 } from 'lucide-react';

const StickerPrintModal = ({ isOpen, onClose, assets }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [layout, setLayout] = useState('grid'); // 'grid' or 'list'

    const handleToggle = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === assets.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(assets.map(a => a.id));
        }
    };

    const printableAssets = useMemo(() => {
        return assets.filter(a => selectedIds.includes(a.id));
    }, [assets, selectedIds]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 flex items-center">
                            <QrCode className="w-7 h-7 mr-3 text-emerald-600" />
                            ระบบจัดพิมพ์สติ๊กเกอร์รหัสทรัพย์สิน
                        </h2>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Sticker & QR Label Generator</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Asset Selection */}
                    <div className="w-1/3 border-r border-slate-100 flex flex-col p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">เลือกรายการ ({selectedIds.length})</h3>
                            <button
                                onClick={handleSelectAll}
                                className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700"
                            >
                                {selectedIds.length === assets.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
                            </button>
                        </div>
                        <div className="space-y-2">
                            {assets.map(asset => (
                                <div
                                    key={asset.id}
                                    onClick={() => handleToggle(asset.id)}
                                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${selectedIds.includes(asset.id)
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-slate-50 bg-slate-50 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-black text-slate-800 truncate">{asset.name}</p>
                                        <p className="text-[10px] font-mono text-emerald-600">{asset.code}</p>
                                    </div>
                                    {selectedIds.includes(asset.id) && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Preview Panel */}
                    <div className="flex-1 bg-slate-50/50 p-8 overflow-y-auto print:p-0 print:bg-white">
                        <div className="flex items-center justify-between mb-8 print:hidden">
                            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                                <button
                                    onClick={() => setLayout('grid')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${layout === 'grid' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <Grid className="w-4 h-4" /> ตาราง 2 คอลัมน์
                                </button>
                                <button
                                    onClick={() => setLayout('list')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${layout === 'list' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <List className="w-4 h-4" /> แถวเดี่ยว
                                </button>
                            </div>
                            <button
                                onClick={() => window.print()}
                                className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
                            >
                                <Printer className="w-4 h-4" /> สั่งพิมพ์สติ๊กเกอร์
                            </button>
                        </div>

                        {/* Printable Area */}
                        <div id="printable-stickers" className={`${layout === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'} gap-4 print:gap-2`}>
                            {printableAssets.map(asset => (
                                <div
                                    key={asset.id}
                                    className="bg-white border-2 border-slate-200 p-4 rounded-xl flex items-center gap-4 break-inside-avoid print:border-black print:rounded-none shadow-sm print:shadow-none"
                                >
                                    {/* QR Code Placeholder */}
                                    <div className="w-20 h-20 bg-slate-900 rounded-lg flex flex-col items-center justify-center p-1 shrink-0 print:border print:border-black">
                                        <QrCode className="w-full h-full text-white" />
                                        <span className="text-[6px] text-white font-mono mt-0.5 tracking-tighter">SCAN TO VERIFY</span>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">KU CO-OPERATIVE STORE</p>
                                        <p className="text-sm font-black text-slate-800 truncate mb-1">{asset.name}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-black font-mono text-emerald-600 print:text-black leading-none">{asset.code}</p>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded print:border print:border-black">{asset.location}</span>
                                            <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded print:border print:border-black">{asset.category}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {printableAssets.length === 0 && (
                                <div className="col-span-2 py-32 text-center">
                                    <QrCode className="w-16 h-16 text-slate-200 mx-auto mb-4 opacity-50" />
                                    <p className="text-slate-400 font-bold">กรุณาเลือกรายการทางด้านซ้ายเพื่อพรีวิวสติ๊กเกอร์</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Print Styles */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        body * { visibility: hidden; }
                        #printable-stickers, #printable-stickers * { visibility: visible; }
                        #printable-stickers {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            padding: 0 !important;
                        }
                        .print\\:hidden { display: none !important; }
                    }
                `}} />
            </div>
        </div>
    );
};

export default StickerPrintModal;
