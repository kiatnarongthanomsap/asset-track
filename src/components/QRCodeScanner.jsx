import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, AlertCircle } from 'lucide-react';

const QRCodeScanner = ({ onScan, onClose }) => {
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup when component unmounts
            if (html5QrCodeRef.current) {
                html5QrCodeRef.current.stop().catch(() => {});
            }
        };
    }, []);

    const startScanning = async () => {
        try {
            setError(null);
            setIsScanning(true);

            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCodeRef.current = html5QrCode;

            // Start scanning
            await html5QrCode.start(
                {
                    facingMode: "environment" // Use back camera on mobile
                },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText, decodedResult) => {
                    // Successfully scanned
                    html5QrCode.stop().then(() => {
                        setIsScanning(false);
                        onScan(decodedText);
                    }).catch(() => {});
                },
                (errorMessage) => {
                    // Ignore scanning errors (they're normal while scanning)
                }
            );
        } catch (err) {
            console.error('Error starting scanner:', err);
            setError('ไม่สามารถเปิดกล้องได้ กรุณาตรวจสอบสิทธิ์การเข้าถึงกล้อง');
            setIsScanning(false);
        }
    };

    const stopScanning = async () => {
        if (html5QrCodeRef.current) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current.clear();
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
            html5QrCodeRef.current = null;
        }
        setIsScanning(false);
    };

    const handleClose = () => {
        stopScanning();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800">สแกน QR Code</h3>
                    <button
                        onClick={handleClose}
                        className="p-2 text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-bold text-red-800">{error}</p>
                                <p className="text-xs text-red-600 mt-1">
                                    กรุณาตรวจสอบว่าได้อนุญาตให้เข้าถึงกล้องแล้ว
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <div
                        id="qr-reader"
                        className="w-full rounded-xl overflow-hidden bg-slate-100"
                        style={{ minHeight: '300px' }}
                    />
                </div>

                <div className="flex gap-3">
                    {!isScanning ? (
                        <button
                            onClick={startScanning}
                            className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center"
                        >
                            <Camera className="w-5 h-5 mr-2" />
                            เริ่มสแกน
                        </button>
                    ) : (
                        <button
                            onClick={stopScanning}
                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center"
                        >
                            <X className="w-5 h-5 mr-2" />
                            หยุดสแกน
                        </button>
                    )}
                    <button
                        onClick={handleClose}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                        ยกเลิก
                    </button>
                </div>

                <p className="text-xs text-slate-500 text-center mt-4">
                    ชี้กล้องไปที่ QR Code บนสติกเกอร์ครุภัณฑ์
                </p>
            </div>
        </div>
    );
};

export default QRCodeScanner;

