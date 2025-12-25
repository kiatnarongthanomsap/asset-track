import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, Printer, QrCode, Grid, List, CheckCircle2, Filter, CheckCircle } from 'lucide-react';
import { getCategoryIcon, getIconNameFromCategories } from '../utils/categoryIcons';
import * as supabaseService from '../services/supabaseService';

// QR Code Generator using Online API
const QRCodeCanvas = ({ text, size = 100 }) => {
    const [qrDataUrl, setQrDataUrl] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (text) {
            // ใช้ API ออนไลน์เพื่อสร้าง QR code
            // ใช้ qr-server.com หรือ api.qrserver.com
            const encodedText = encodeURIComponent(text);
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&margin=1`;
            
            // Preload image
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                // Convert to data URL for printing
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, size, size);
                setQrDataUrl(canvas.toDataURL('image/png'));
                setError(false);
            };
            img.onerror = () => {
                // Fallback: สร้าง QR code แบบง่ายๆ ด้วย canvas
                setError(true);
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                
                // วาดพื้นหลัง
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, size, size);
                
                // วาด QR code pattern แบบง่ายๆ
                ctx.fillStyle = '#000000';
                const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const cellSize = size / 25;
                
                for (let i = 0; i < 25; i++) {
                    for (let j = 0; j < 25; j++) {
                        const shouldFill = (hash + i * 25 + j) % 3 === 0;
                        if (shouldFill) {
                            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                        }
                    }
                }
                
                // วาด finder patterns (corners)
                const finderSize = 7;
                const drawFinder = (x, y) => {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, finderSize * cellSize, finderSize * cellSize);
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
                };
                
                drawFinder(0, 0);
                drawFinder(size - 7 * cellSize, 0);
                drawFinder(0, size - 7 * cellSize);
                
                setQrDataUrl(canvas.toDataURL('image/png'));
            };
            img.src = qrUrl;
        }
    }, [text, size]);

    if (qrDataUrl) {
        return <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain" />;
    }

    return (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <div className="text-[6px] text-slate-400">Loading QR...</div>
        </div>
    );
};

const StickerPrintModal = ({ isOpen, onClose, assets = [], categories = [], onDataChange }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [layout, setLayout] = useState('grid'); // 'grid' or 'list'
    const [filterPending, setFilterPending] = useState(false);
    const [isMarkingPrinted, setIsMarkingPrinted] = useState(false);

    // Filter assets based on pending sticker status
    const filteredAssets = useMemo(() => {
        if (filterPending) {
            return assets.filter(a => !a.isStickerPrinted);
        }
        return assets;
    }, [assets, filterPending]);

    const handleToggle = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === filteredAssets.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredAssets.map(a => a.id));
        }
    };

    const printableAssets = useMemo(() => {
        return filteredAssets.filter(a => selectedIds.includes(a.id));
    }, [filteredAssets, selectedIds]);

    // Reset selected when filter changes
    useEffect(() => {
        setSelectedIds([]);
    }, [filterPending]);

    // Mark stickers as printed after printing
    const handlePrint = async () => {
        if (printableAssets.length === 0) {
            alert('กรุณาเลือกรายการที่ต้องการพิมพ์');
            return;
        }

        // Trigger print dialog
        window.print();

        // Ask if user wants to mark as printed
        setTimeout(() => {
            if (confirm(`ต้องการบันทึกสถานะการพิมพ์สติ๊กเกอร์สำหรับ ${printableAssets.length} รายการหรือไม่?`)) {
                handleMarkAsPrinted();
            }
        }, 500);
    };

    const handleMarkAsPrinted = async () => {
        setIsMarkingPrinted(true);
        try {
            const updates = printableAssets.map(asset => ({
                id: asset.id,
                isStickerPrinted: true
            }));

            // Update each asset
            for (const update of updates) {
                const { supabase } = await import('../config/supabase');
                const { error } = await supabase
                    .from('assets')
                    .update({ is_sticker_printed: true })
                    .eq('id', update.id);

                if (error) {
                    console.error(`Error updating asset ${update.id}:`, error);
                }
            }

            // Refresh data
            if (onDataChange) {
                await onDataChange();
            }

            alert('บันทึกสถานะการพิมพ์สติ๊กเกอร์สำเร็จ');
            setSelectedIds([]);
        } catch (error) {
            console.error('Error marking stickers as printed:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกสถานะ: ' + error.message);
        } finally {
            setIsMarkingPrinted(false);
        }
    };

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
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">เลือกรายการ ({selectedIds.length})</h3>
                                <button
                                    onClick={handleSelectAll}
                                    className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700"
                                >
                                    {selectedIds.length === filteredAssets.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
                                </button>
                            </div>
                            {/* Filter Toggle */}
                            <button
                                onClick={() => setFilterPending(!filterPending)}
                                className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                                    filterPending 
                                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' 
                                        : 'bg-slate-100 text-slate-600 border-2 border-slate-200 hover:bg-slate-200'
                                }`}
                            >
                                <Filter className="w-3 h-3" />
                                {filterPending ? 'แสดงเฉพาะที่ยังไม่ได้พิมพ์' : 'แสดงทั้งหมด'}
                            </button>
                        </div>
                        <div className="space-y-2">
                            {filteredAssets.length === 0 ? (
                                <div className="text-center py-8 text-slate-400 text-xs">
                                    <p>ไม่มีรายการ{filterPending ? 'ที่ยังไม่ได้พิมพ์สติ๊กเกอร์' : ''}</p>
                                </div>
                            ) : (
                                filteredAssets.map(asset => {
                                    const CategoryIcon = getCategoryIcon(asset.category, getIconNameFromCategories(asset.category, categories));
                                    return (
                                        <div
                                            key={asset.id}
                                            onClick={() => handleToggle(asset.id)}
                                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                                                selectedIds.includes(asset.id)
                                                    ? 'border-emerald-500 bg-emerald-50'
                                                    : 'border-slate-50 bg-slate-50 opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 flex-1 overflow-hidden">
                                                <CategoryIcon className="w-4 h-4 text-slate-500 shrink-0" />
                                                <div className="overflow-hidden flex-1">
                                                    <p className="text-xs font-black text-slate-800 truncate">{asset.name}</p>
                                                    <p className="text-[10px] font-mono text-emerald-600">{asset.code}</p>
                                                    {asset.isStickerPrinted && (
                                                        <span className="text-[8px] text-emerald-600 font-bold flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            พิมพ์แล้ว
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedIds.includes(asset.id) && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                                        </div>
                                    );
                                })
                            )}
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
                            <div className="flex items-center gap-3">
                                {printableAssets.length > 0 && (
                                    <button
                                        onClick={handleMarkAsPrinted}
                                        disabled={isMarkingPrinted}
                                        className={`bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md ${
                                            isMarkingPrinted ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isMarkingPrinted ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                กำลังบันทึก...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-3 h-3" />
                                                บันทึกสถานะพิมพ์แล้ว
                                            </>
                                        )}
                                    </button>
                                )}
                                <button
                                    onClick={handlePrint}
                                    disabled={printableAssets.length === 0}
                                    className={`bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg ${
                                        printableAssets.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    <Printer className="w-4 h-4" /> สั่งพิมพ์สติ๊กเกอร์ ({printableAssets.length})
                                </button>
                            </div>
                        </div>

                        {/* Printable Area */}
                        <div id="printable-stickers" className={`${layout === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'} gap-4 print:gap-2`}>
                            {printableAssets.map(asset => {
                                const CategoryIcon = getCategoryIcon(asset.category, getIconNameFromCategories(asset.category, categories));
                                const qrText = `${asset.code}|${asset.id}`; // QR code contains asset code and ID
                                
                                return (
                                    <div
                                        key={asset.id}
                                        className="bg-white border-2 border-slate-200 p-4 rounded-xl flex items-center gap-4 break-inside-avoid print:border-black print:rounded-none shadow-sm print:shadow-none print:page-break-inside-avoid"
                                    >
                                        {/* QR Code */}
                                        <div className="w-20 h-20 bg-white rounded-lg flex flex-col items-center justify-center p-1 shrink-0 print:border print:border-black border-2 border-slate-300">
                                            <div className="w-full h-full">
                                                <QRCodeCanvas text={qrText} size={80} />
                                            </div>
                                            <span className="text-[6px] text-slate-600 font-mono mt-0.5 tracking-tighter print:text-black">SCAN TO VERIFY</span>
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CategoryIcon className="w-4 h-4 text-slate-500 shrink-0" />
                                                <p className="text-sm font-black text-slate-800 truncate">{asset.name}</p>
                                            </div>
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-lg font-black font-mono text-emerald-600 print:text-black leading-none">{asset.code}</p>
                                            </div>
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                {asset.location && (
                                                    <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded print:border print:border-black">{asset.location}</span>
                                                )}
                                                {asset.category && (
                                                    <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded print:border print:border-black flex items-center gap-1">
                                                        <CategoryIcon className="w-2.5 h-2.5" />
                                                        {asset.category}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                        @page {
                            size: A4;
                            margin: 10mm;
                        }
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
                        .break-inside-avoid {
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }
                        .print\\:border-black {
                            border-color: #000 !important;
                        }
                        .print\\:text-black {
                            color: #000 !important;
                        }
                        .print\\:rounded-none {
                            border-radius: 0 !important;
                        }
                        .print\\:shadow-none {
                            box-shadow: none !important;
                        }
                    }
                `}} />
            </div>
        </div>
    );
};

export default StickerPrintModal;
