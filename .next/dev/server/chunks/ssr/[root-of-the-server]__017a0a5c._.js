module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/config/supabase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://inwlvuavdfuabfayhwgo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_sbOZnnDordhzUMqLVCmvWg_wlsLkvAB';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/src/services/imageService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteImage",
    ()=>deleteImage,
    "getImageUrl",
    ()=>getImageUrl,
    "uploadImage",
    ()=>uploadImage,
    "validateImageFile",
    ()=>validateImageFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/supabase.js [app-ssr] (ecmascript)");
;
/**
 * Image Service for Supabase Storage
 * จัดการการอัพโหลดและลบรูปภาพ
 */ const BUCKET_NAME = 'asset-images';
const uploadImage = async (file, assetCode)=>{
    try {
        // ตรวจสอบว่า file และ assetCode มีค่าหรือไม่
        if (!file) {
            return {
                success: false,
                error: 'กรุณาเลือกไฟล์รูปภาพ'
            };
        }
        if (!assetCode || assetCode.trim() === '') {
            return {
                success: false,
                error: 'กรุณากรอกรหัสทรัพย์สินก่อนอัพโหลดรูปภาพ'
            };
        }
        // สร้างชื่อไฟล์จาก asset code และ timestamp
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        // ทำความสะอาด asset code เพื่อใช้เป็นชื่อไฟล์ (ลบอักขระพิเศษ)
        const cleanCode = assetCode.replace(/[^a-zA-Z0-9-_]/g, '_');
        const fileName = `${cleanCode}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        console.log('Uploading image:', {
            fileName,
            filePath,
            fileSize: file.size
        });
        // ลองอัพโหลดโดยตรง
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).upload(filePath, file, {
            cacheControl: '3600',
            upsert: true // อนุญาตให้ overwrite ถ้ามีไฟล์ชื่อเดียวกัน
        });
        if (error) {
            console.error('Upload error details:', {
                message: error.message,
                statusCode: error.statusCode,
                error: error
            });
            // ถ้าเป็น error เกี่ยวกับ bucket ไม่มี
            if (error.message?.includes('Bucket not found') || error.message?.includes('not found') || error.statusCode === 404 || error.message?.includes('does not exist') || error.message?.includes('The resource was not found')) {
                return {
                    success: false,
                    error: `ไม่พบ Storage Bucket '${BUCKET_NAME}'\n\nวิธีแก้:\n1. เปิด Supabase Dashboard → Storage\n2. คลิก "New bucket"\n3. ตั้งชื่อ: "asset-images"\n4. เลือก "Public bucket"\n5. คลิก "Create bucket"`
                };
            }
            // ถ้าเป็น error เกี่ยวกับ permissions
            if (error.message?.includes('permission') || error.message?.includes('policy') || error.message?.includes('denied') || error.message?.includes('forbidden') || error.statusCode === 403 || error.message?.includes('new row violates row-level security') || error.message?.includes('Row Level Security')) {
                return {
                    success: false,
                    error: `ไม่มีสิทธิ์อัพโหลดไฟล์\n\nวิธีแก้:\n1. เปิด Supabase Dashboard → SQL Editor\n2. รันไฟล์: storage_policies_public.sql\n3. หรือไปที่ Storage → Policies → สร้าง policy ใหม่`
                };
            }
            // Error อื่นๆ
            return {
                success: false,
                error: `ไม่สามารถอัพโหลดรูปภาพได้: ${error.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ'}`
            };
        }
        // Get public URL
        const { data: urlData } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).getPublicUrl(filePath);
        if (!urlData || !urlData.publicUrl) {
            return {
                success: false,
                error: 'อัพโหลดสำเร็จแต่ไม่สามารถสร้าง URL ได้'
            };
        }
        console.log('Upload successful:', urlData.publicUrl);
        return {
            success: true,
            url: urlData.publicUrl
        };
    } catch (error) {
        console.error('Upload exception:', error);
        return {
            success: false,
            error: `เกิดข้อผิดพลาด: ${error.message || 'ไม่ทราบสาเหตุ'}`
        };
    }
};
const deleteImage = async (imageUrl)=>{
    try {
        // Extract file path from URL
        // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (!fileName) {
            return {
                success: false,
                error: 'Invalid image URL'
            };
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).remove([
            fileName
        ]);
        if (error) {
            console.error('Delete error:', error);
            return {
                success: false,
                error: error.message
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Delete error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};
const getImageUrl = (filePath)=>{
    const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
};
const validateImageFile = (file)=>{
    // ตรวจสอบประเภทไฟล์
    const validTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif'
    ];
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WEBP, GIF)'
        };
    }
    // ตรวจสอบขนาดไฟล์ (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    ;
    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'ขนาดไฟล์ต้องไม่เกิน 10MB'
        };
    }
    return {
        valid: true
    };
};
}),
"[project]/src/services/supabaseService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyInventoryAdjustment",
    ()=>applyInventoryAdjustment,
    "bulkImportAssets",
    ()=>bulkImportAssets,
    "canAccessSettings",
    ()=>canAccessSettings,
    "canDeleteAssets",
    ()=>canDeleteAssets,
    "canImportAssets",
    ()=>canImportAssets,
    "canManageAssets",
    ()=>canManageAssets,
    "canManageUsers",
    ()=>canManageUsers,
    "createAuditLog",
    ()=>createAuditLog,
    "createInventoryAssignment",
    ()=>createInventoryAssignment,
    "createInventoryCycle",
    ()=>createInventoryCycle,
    "deleteAsset",
    ()=>deleteAsset,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteUser",
    ()=>deleteUser,
    "fetchAssets",
    ()=>fetchAssets,
    "fetchAssetsForCounting",
    ()=>fetchAssetsForCounting,
    "fetchAuditLogs",
    ()=>fetchAuditLogs,
    "fetchCategories",
    ()=>fetchCategories,
    "fetchDiscrepancies",
    ()=>fetchDiscrepancies,
    "fetchInventoryAssignments",
    ()=>fetchInventoryAssignments,
    "fetchInventoryCycle",
    ()=>fetchInventoryCycle,
    "fetchInventoryCycles",
    ()=>fetchInventoryCycles,
    "fetchUsers",
    ()=>fetchUsers,
    "getInventorySummary",
    ()=>getInventorySummary,
    "hasPermission",
    ()=>hasPermission,
    "login",
    ()=>login,
    "saveAsset",
    ()=>saveAsset,
    "saveCategory",
    ()=>saveCategory,
    "saveInventoryCount",
    ()=>saveInventoryCount,
    "saveUser",
    ()=>saveUser,
    "updateAssetStatus",
    ()=>updateAssetStatus,
    "updateInventoryCycle",
    ()=>updateInventoryCycle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$imageService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/imageService.js [app-ssr] (ecmascript)");
;
;
const login = async (username, password)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').eq('username', username).eq('password', password).limit(1);
        if (error) {
            console.error('Supabase login error:', error);
            // ถ้าเป็น error เกี่ยวกับ table ไม่มี ให้ return false
            if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
                return {
                    success: false,
                    message: 'Database table not found. Please run setup SQL first.'
                };
            }
            throw error;
        }
        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (data && data.length > 0) {
            return {
                success: true,
                user: data[0]
            };
        }
        return {
            success: false,
            message: 'Invalid credentials'
        };
    } catch (error) {
        console.error('Login error:', error);
        // ถ้าเป็น error เกี่ยวกับ table ไม่มี ให้ return message ที่ชัดเจน
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
            return {
                success: false,
                message: 'Database table not found. Please run setup SQL first.'
            };
        }
        return {
            success: false,
            message: error.message || 'Login failed'
        };
    }
};
const fetchCategories = async ()=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('categories').select('*').order('name');
        if (error) {
            console.error('Supabase categories error:', error);
            throw error;
        }
        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        // Return empty array instead of throwing to allow fallback
        return [];
    }
};
const saveCategory = async (category)=>{
    try {
        const categoryData = {
            name: category.name,
            prefix: category.prefix || category.name?.charAt(0).toUpperCase() || 'X',
            useful_life: category.usefulLife || category.useful_life || 5,
            icon_name: category.icon_name || null
        };
        let result;
        if (category.id && !isNaN(category.id)) {
            // Update existing category
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('categories').update(categoryData).eq('id', category.id).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
        } else {
            // Insert new category
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('categories').insert(categoryData).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
        }
        return result;
    } catch (error) {
        console.error('Error saving category:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const deleteCategory = async (categoryId)=>{
    try {
        // ตรวจสอบว่ามีทรัพย์สินใช้หมวดหมู่นี้หรือไม่
        const { data: assets, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('id').eq('category', categoryId).limit(1);
        if (checkError) throw checkError;
        if (assets && assets.length > 0) {
            return {
                status: 'error',
                message: 'ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีทรัพย์สินที่ใช้หมวดหมู่นี้อยู่'
            };
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('categories').delete().eq('id', categoryId);
        if (error) throw error;
        return {
            status: 'success'
        };
    } catch (error) {
        console.error('Error deleting category:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchAssets = async ()=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('id, code, name, brand, color, serial, price, location, status, purchase_date, category, useful_life, image, is_sticker_printed, notes, custodian, vendor, warranty_expiry').order('code', {
            ascending: true
        }).limit(10000) // เพิ่ม limit เพื่อป้องกันการดึงข้อมูลมากเกินไป
        ;
        if (error) {
            console.error('Supabase assets error:', error);
            throw error;
        }
        // แปลงข้อมูลให้ตรงกับรูปแบบที่แอปใช้
        const formattedData = (data || []).map((asset)=>{
            // แปลง image path เป็น public URL จาก Supabase Storage
            // - ถ้า image เป็น full URL (http/https) จะใช้ตามเดิม
            // - ถ้า image เป็น filename/path (เช่น "A001-1234567890.jpg") จะแปลงเป็น public URL
            let imageUrl = asset.image || null;
            if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
                // image เป็น filename/path ใน Supabase Storage -> แปลงเป็น public URL
                imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$imageService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(imageUrl);
            }
            return {
                id: asset.id,
                code: asset.code,
                name: asset.name,
                brand: asset.brand,
                color: asset.color,
                serial: asset.serial,
                price: parseFloat(asset.price) || 0,
                location: asset.location,
                status: asset.status,
                purchaseDate: asset.purchase_date,
                category: asset.category,
                usefulLife: asset.useful_life || 5,
                image: imageUrl,
                isStickerPrinted: asset.is_sticker_printed || false,
                notes: asset.notes || '',
                custodian: asset.custodian || '',
                vendor: asset.vendor || '',
                warrantyExpiry: asset.warranty_expiry || ''
            };
        });
        // Sort by code to ensure consistent ordering (natural sort for codes like A001, A002, A010)
        // ใช้ natural sort เพื่อให้ A001, A002, A010 เรียงลำดับได้ถูกต้อง (ไม่ใช่ A001, A010, A002)
        formattedData.sort((a, b)=>{
            const codeA = (a.code || '').toUpperCase().trim();
            const codeB = (b.code || '').toUpperCase().trim();
            // ถ้าไม่มี code ให้ไว้ท้ายสุด
            if (!codeA && !codeB) return 0;
            if (!codeA) return 1;
            if (!codeB) return -1;
            // ใช้ localeCompare with numeric option สำหรับ natural sort
            return codeA.localeCompare(codeB, undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        });
        return formattedData;
    } catch (error) {
        console.error('Error fetching assets:', error);
        // Return empty array instead of throwing to allow fallback
        return [];
    }
};
const saveAsset = async (asset, user = null)=>{
    try {
        const assetData = {
            code: asset.code,
            name: asset.name,
            brand: asset.brand || null,
            color: asset.color || null,
            serial: asset.serial || null,
            price: asset.price || 0,
            location: asset.location || null,
            status: asset.status || 'Normal',
            purchase_date: asset.purchaseDate || null,
            category: asset.category || null,
            useful_life: asset.usefulLife || 5,
            image: asset.image || null,
            is_sticker_printed: asset.isStickerPrinted || false,
            notes: asset.notes || null,
            custodian: asset.custodian || null,
            vendor: asset.vendor || null,
            warranty_expiry: asset.warrantyExpiry || null
        };
        let result;
        const isNewAsset = !asset.id || isNaN(asset.id);
        if (isNewAsset) {
            // Insert new asset
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').insert(assetData).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
            // สร้าง audit log สำหรับการเพิ่มทรัพย์สิน
            try {
                await createAuditLog({
                    action: 'เพิ่ม',
                    asset_code: assetData.code,
                    operator: user?.name || user?.username || 'System',
                    document_ref: null
                });
            } catch (logError) {
                console.warn('Error creating audit log:', logError);
            }
        } else {
            // Update existing asset
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').update(assetData).eq('id', asset.id).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
            // สร้าง audit log สำหรับการแก้ไขทรัพย์สิน
            try {
                await createAuditLog({
                    action: 'แก้ไข',
                    asset_code: assetData.code,
                    operator: user?.name || user?.username || 'System',
                    document_ref: null
                });
            } catch (logError) {
                console.warn('Error creating audit log:', logError);
            }
        }
        return result;
    } catch (error) {
        console.error('Error saving asset:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const deleteAsset = async (assetId, user = null)=>{
    try {
        // ดึงข้อมูลทรัพย์สินก่อนลบเพื่อใช้ใน audit log
        const { data: asset, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('code').eq('id', assetId).single();
        if (fetchError) throw fetchError;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').delete().eq('id', assetId);
        if (error) throw error;
        // สร้าง audit log สำหรับการลบทรัพย์สิน
        try {
            await createAuditLog({
                action: 'ลบ',
                asset_code: asset?.code || null,
                operator: user?.name || user?.username || 'System',
                document_ref: null
            });
        } catch (logError) {
            console.warn('Error creating audit log:', logError);
        }
        return {
            status: 'success'
        };
    } catch (error) {
        console.error('Error deleting asset:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const updateAssetStatus = async (assetId, newStatus, user = null)=>{
    try {
        // ดึงข้อมูลทรัพย์สินก่อนอัพเดทเพื่อใช้ใน audit log
        const { data: asset, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('code, status').eq('id', assetId).single();
        if (fetchError) throw fetchError;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').update({
            status: newStatus
        }).eq('id', assetId);
        if (error) throw error;
        // สร้าง audit log ตามสถานะที่เปลี่ยน
        try {
            let action = null;
            if (newStatus === 'Repair') {
                action = 'ซ่อม';
            } else if (newStatus === 'Disposed') {
                action = 'จำหน่าย';
            }
            // สร้าง audit log เฉพาะเมื่อเปลี่ยนเป็นสถานะที่ต้องการบันทึก
            if (action) {
                await createAuditLog({
                    action: action,
                    asset_code: asset?.code || null,
                    operator: user?.name || user?.username || 'System',
                    document_ref: null
                });
            }
        } catch (logError) {
            console.warn('Error creating audit log:', logError);
        }
        return {
            status: 'success'
        };
    } catch (error) {
        console.error('Error updating asset status:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchAuditLogs = async ()=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('audit_logs').select('id, action_date, action, asset_code, operator, document_ref').order('action_date', {
            ascending: false
        }).limit(100);
        if (error) {
            console.error('Supabase audit logs error:', error);
            throw error;
        }
        return data || [];
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        // Return empty array instead of throwing to allow fallback
        return [];
    }
};
const createAuditLog = async (logData)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('audit_logs').insert({
            action_date: logData.action_date || new Date().toISOString().split('T')[0],
            action: logData.action,
            asset_code: logData.asset_code || null,
            operator: logData.operator || null,
            document_ref: logData.document_ref || null
        }).select().single();
        if (error) throw error;
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error creating audit log:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const bulkImportAssets = async (assets)=>{
    try {
        const assetsData = assets.map((asset)=>({
                code: asset.code,
                name: asset.name,
                brand: asset.brand || null,
                color: asset.color || null,
                serial: asset.serial || null,
                price: parseFloat(asset.price) || 0,
                location: asset.location || null,
                status: asset.status || 'Normal',
                purchase_date: asset.purchase_date || asset.purchaseDate || null,
                category: asset.category || null,
                useful_life: asset.useful_life || asset.usefulLife || 5,
                image: asset.image || null,
                is_sticker_printed: asset.is_sticker_printed || asset.isStickerPrinted || false,
                notes: asset.notes || null,
                custodian: asset.custodian || null,
                vendor: asset.vendor || null,
                warranty_expiry: asset.warranty_expiry || asset.warrantyExpiry || null
            }));
        let inserted = 0;
        let failed = 0;
        const errors = [];
        // Import ทีละรายการเพื่อจัดการ conflict
        for (const assetData of assetsData){
            try {
                // ใช้ upsert เพื่อจัดการกรณี code ซ้ำ
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').upsert(assetData, {
                    onConflict: 'code',
                    ignoreDuplicates: false
                }).select().single();
                if (error) {
                    // ถ้าเป็น duplicate key error ไม่นับเป็น error
                    if (error.code === '23505') {
                        // Duplicate key - skip
                        failed++;
                    } else {
                        throw error;
                    }
                } else {
                    inserted++;
                }
            } catch (error) {
                failed++;
                errors.push({
                    code: assetData.code,
                    error: error.message
                });
            }
        }
        return {
            status: 'success',
            inserted,
            failed,
            total: assets.length,
            errors: errors.length > 0 ? errors : undefined
        };
    } catch (error) {
        console.error('Error bulk importing assets:', error);
        return {
            status: 'error',
            message: error.message,
            inserted: 0,
            total: assets.length
        };
    }
};
const fetchUsers = async ()=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').order('created_at', {
            ascending: false
        });
        if (error) throw error;
        return {
            status: 'success',
            data: data || []
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            status: 'error',
            message: error.message,
            data: []
        };
    }
};
const saveUser = async (user)=>{
    try {
        // Build userData with only fields that exist in the schema
        const userData = {
            username: user.username,
            password: user.password || undefined,
            name: user.name || null,
            role: user.role || 'Viewer'
        };
        // Only include email and status if they exist in the schema
        // We'll try to include them, but if the error mentions missing columns, we'll retry without them
        if (user.email !== undefined && user.email !== null && user.email !== '') {
            userData.email = user.email;
        }
        if (user.status !== undefined && user.status !== null) {
            userData.status = user.status || 'Active';
        }
        let result;
        if (user.id && !isNaN(user.id)) {
            // Update existing user
            if (!userData.password) {
                // Remove password from update if not provided
                delete userData.password;
            }
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').update(userData).eq('id', user.id).select().single();
                if (error) throw error;
                result = {
                    status: 'success',
                    data
                };
            } catch (updateError) {
                // If error is about missing columns (email or status), retry without them
                if (updateError.message && updateError.message.includes('email') || updateError.message.includes('status')) {
                    console.warn('Email or status column not found, retrying without them:', updateError.message);
                    const fallbackData = {
                        username: user.username,
                        name: user.name || null,
                        role: user.role || 'Viewer'
                    };
                    if (userData.password) {
                        fallbackData.password = userData.password;
                    }
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').update(fallbackData).eq('id', user.id).select().single();
                    if (error) throw error;
                    result = {
                        status: 'success',
                        data
                    };
                } else {
                    throw updateError;
                }
            }
        } else {
            // Insert new user
            if (!userData.password) {
                return {
                    status: 'error',
                    message: 'Password is required for new users'
                };
            }
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').insert(userData).select().single();
                if (error) throw error;
                result = {
                    status: 'success',
                    data
                };
            } catch (insertError) {
                // If error is about missing columns (email or status), retry without them
                if (insertError.message && (insertError.message.includes('email') || insertError.message.includes('status'))) {
                    console.warn('Email or status column not found, retrying without them:', insertError.message);
                    const fallbackData = {
                        username: user.username,
                        password: user.password,
                        name: user.name || null,
                        role: user.role || 'Viewer'
                    };
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').insert(fallbackData).select().single();
                    if (error) throw error;
                    result = {
                        status: 'success',
                        data
                    };
                } else {
                    throw insertError;
                }
            }
        }
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const deleteUser = async (userId)=>{
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').delete().eq('id', userId);
        if (error) throw error;
        return {
            status: 'success'
        };
    } catch (error) {
        console.error('Error deleting user:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const hasPermission = (user, permission)=>{
    if (!user || !user.role) return false;
    const rolePermissions = {
        'Admin': [
            'manage_assets',
            'manage_users',
            'view_reports',
            'settings',
            'delete_assets',
            'import_assets'
        ],
        'Manager': [
            'manage_assets',
            'view_reports',
            'import_assets'
        ],
        'Staff': [
            'manage_assets',
            'view_reports'
        ],
        'Viewer': [
            'view_reports'
        ]
    };
    const permissions = rolePermissions[user.role] || [];
    return permissions.includes(permission);
};
const canManageUsers = (user)=>{
    return hasPermission(user, 'manage_users');
};
const canManageAssets = (user)=>{
    return hasPermission(user, 'manage_assets');
};
const canDeleteAssets = (user)=>{
    return hasPermission(user, 'delete_assets');
};
const canImportAssets = (user)=>{
    return hasPermission(user, 'import_assets');
};
const canAccessSettings = (user)=>{
    return hasPermission(user, 'settings');
};
const createInventoryCycle = async (cycleData)=>{
    try {
        // Validation
        if (!cycleData.cycle_name || !cycleData.cycle_name.trim()) {
            return {
                status: 'error',
                message: 'กรุณากรอกชื่อรอบการตรวจนับ'
            };
        }
        if (!cycleData.start_date) {
            return {
                status: 'error',
                message: 'กรุณาเลือกวันที่เริ่มต้น'
            };
        }
        if (!cycleData.end_date) {
            return {
                status: 'error',
                message: 'กรุณาเลือกวันที่สิ้นสุด'
            };
        }
        // Validate date format
        const startDate = new Date(cycleData.start_date);
        const endDate = new Date(cycleData.end_date);
        if (isNaN(startDate.getTime())) {
            return {
                status: 'error',
                message: 'รูปแบบวันที่เริ่มต้นไม่ถูกต้อง'
            };
        }
        if (isNaN(endDate.getTime())) {
            return {
                status: 'error',
                message: 'รูปแบบวันที่สิ้นสุดไม่ถูกต้อง'
            };
        }
        if (startDate > endDate) {
            return {
                status: 'error',
                message: 'วันที่เริ่มต้นต้องมาก่อนวันที่สิ้นสุด'
            };
        }
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').insert({
            year: cycleData.year,
            cycle_name: cycleData.cycle_name.trim(),
            start_date: cycleData.start_date,
            end_date: cycleData.end_date,
            status: cycleData.status || 'Planning',
            assigned_to: cycleData.assigned_to || null,
            notes: cycleData.notes || null,
            created_by: cycleData.created_by
        }).select().single();
        if (error) throw error;
        // สร้าง inventory_counts records สำหรับทรัพย์สินทั้งหมด (หรือตาม filter)
        if (cycleData.assets && Array.isArray(cycleData.assets) && cycleData.assets.length > 0) {
            // กรองเฉพาะ assets ที่มี id และ code
            const validAssets = cycleData.assets.filter((asset)=>asset && asset.id && asset.code);
            if (validAssets.length === 0) {
                console.warn('No valid assets to create inventory counts');
                return {
                    status: 'success',
                    data
                };
            }
            const countsData = validAssets.map((asset)=>({
                    cycle_id: data.id,
                    asset_id: asset.id,
                    asset_code: asset.code
                }));
            console.log(`Creating ${countsData.length} inventory count records for cycle ${data.id}`);
            const { error: countsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').insert(countsData);
            if (countsError) {
                console.error('Error creating inventory counts:', countsError);
                // Rollback cycle creation
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').delete().eq('id', data.id);
                throw new Error(`ไม่สามารถสร้างรายการตรวจนับได้: ${countsError.message}`);
            }
            console.log(`Successfully created ${countsData.length} inventory count records`);
        } else {
            console.warn('No assets provided or assets array is empty');
        }
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error creating inventory cycle:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchInventoryCycles = async (year = null)=>{
    try {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select(`
        *,
        created_by_user:users!inventory_cycles_created_by_fkey(id, name, username),
        assigned_to_user:users!inventory_cycles_assigned_to_fkey(id, name, username)
      `).order('created_at', {
            ascending: false
        });
        if (year) {
            query = query.eq('year', year);
        }
        const { data, error } = await query;
        if (error) throw error;
        return {
            status: 'success',
            data: data || []
        };
    } catch (error) {
        console.error('Error fetching inventory cycles:', error);
        return {
            status: 'error',
            message: error.message,
            data: []
        };
    }
};
const fetchInventoryCycle = async (cycleId)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select(`
        *,
        created_by_user:users!inventory_cycles_created_by_fkey(id, name, username),
        assigned_to_user:users!inventory_cycles_assigned_to_fkey(id, name, username)
      `).eq('id', cycleId).single();
        if (error) throw error;
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error fetching inventory cycle:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const updateInventoryCycle = async (cycleId, updateData)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').update(updateData).eq('id', cycleId).select().single();
        if (error) throw error;
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error updating inventory cycle:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchAssetsForCounting = async (cycleId, filters = {})=>{
    try {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select(`
        *,
        asset:assets(*)
      `).eq('cycle_id', cycleId);
        if (filters.counted_status) {
            query = query.eq('counted_status', filters.counted_status);
        } else if (filters.pending_only) {
            query = query.is('counted_status', null);
        }
        if (filters.location) {
            query = query.eq('asset.location', filters.location);
        }
        if (filters.category) {
            query = query.eq('asset.category', filters.category);
        }
        const { data, error } = await query;
        if (error) throw error;
        // แปลงข้อมูลให้ตรงกับรูปแบบที่ใช้
        const formattedData = (data || []).map((item)=>({
                ...item,
                asset: item.asset ? {
                    ...item.asset,
                    purchaseDate: item.asset.purchase_date,
                    usefulLife: item.asset.useful_life || 5,
                    isStickerPrinted: item.asset.is_sticker_printed || false
                } : null
            }));
        return {
            status: 'success',
            data: formattedData
        };
    } catch (error) {
        console.error('Error fetching assets for counting:', error);
        return {
            status: 'error',
            message: error.message,
            data: []
        };
    }
};
const saveInventoryCount = async (countData)=>{
    try {
        const asset = countData.asset;
        const updateData = {
            counted_status: countData.counted_status,
            counted_location: countData.counted_location || null,
            counted_by: countData.counted_by,
            counted_date: countData.counted_date || new Date().toISOString().split('T')[0],
            counted_notes: countData.counted_notes || null,
            location_match: countData.location_match,
            status_match: countData.status_match,
            condition_match: countData.condition_match,
            requires_adjustment: countData.requires_adjustment || false
        };
        // ตรวจสอบความแตกต่าง
        if (asset) {
            updateData.location_match = (countData.counted_location || asset.location) === asset.location;
            updateData.status_match = true; // ต้องตรวจสอบเพิ่มเติม
            updateData.requires_adjustment = !updateData.location_match || !updateData.status_match;
        }
        let result;
        let isFirstCount = false;
        if (countData.id) {
            // Update existing count
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('id', countData.id).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
        } else {
            // Insert new count หรือ Upsert ถ้ามี record อยู่แล้ว
            // ตรวจสอบว่ามี record อยู่แล้วหรือไม่ (สำหรับ asset นี้ใน cycle นี้)
            const { data: existingCount } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id').eq('cycle_id', countData.cycle_id).eq('asset_id', countData.asset_id).maybeSingle();
            // ตรวจสอบว่าเป็นการตรวจนับครั้งแรกในรอบนี้หรือไม่
            const { data: existingCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id').eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null).limit(1);
            isFirstCount = !existingCounts || existingCounts.length === 0;
            let insertOrUpdateData;
            if (existingCount && existingCount.id) {
                // มี record อยู่แล้ว (แต่อาจจะยังไม่มีการตรวจนับ) - Update
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('id', existingCount.id).select().single();
                if (error) throw error;
                result = {
                    status: 'success',
                    data
                };
            } else {
                // ไม่มี record - Insert ใหม่
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').insert({
                    cycle_id: countData.cycle_id,
                    asset_id: countData.asset_id,
                    asset_code: countData.asset_code,
                    ...updateData
                }).select().single();
                if (error) {
                    // ถ้า error เป็น duplicate key ให้ลอง update แทน
                    if (error.code === '23505' || error.message?.includes('duplicate')) {
                        const { data: updateData, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('cycle_id', countData.cycle_id).eq('asset_id', countData.asset_id).select().single();
                        if (updateError) throw updateError;
                        result = {
                            status: 'success',
                            data: updateData
                        };
                    } else {
                        throw error;
                    }
                } else {
                    result = {
                        status: 'success',
                        data
                    };
                }
            }
        }
        // ============================================================================
        // อัพเดทสถานะ Cycle และ Assignment อัตโนมัติ
        // ============================================================================
        // 1. ถ้าเป็นการตรวจนับครั้งแรก ให้เปลี่ยน Cycle Status จาก Planning → In Progress
        if (isFirstCount) {
            const { data: cycle } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select('status').eq('id', countData.cycle_id).single();
            if (cycle && cycle.status === 'Planning') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').update({
                    status: 'In Progress'
                }).eq('id', countData.cycle_id);
            }
            // 2. อัพเดท Assignment Status จาก Pending → In Progress
            const { data: assignments } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').select('id, status').eq('cycle_id', countData.cycle_id).eq('assigned_to', countData.counted_by).eq('status', 'Pending');
            if (assignments && assignments.length > 0) {
                for (const assignment of assignments){
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').update({
                        status: 'In Progress',
                        started_at: new Date().toISOString()
                    }).eq('id', assignment.id);
                }
            }
        }
        // 3. อัพเดท counted_assets ใน assignments
        const { data: countStats } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id', {
            count: 'exact',
            head: false
        }).eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null);
        const countedCount = countStats?.length || 0;
        // อัพเดททุก assignment ที่เกี่ยวข้อง
        const { data: allAssignments } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').select('id, total_assets').eq('cycle_id', countData.cycle_id);
        if (allAssignments) {
            for (const assignment of allAssignments){
                // นับเฉพาะ assets ที่อยู่ใน scope ของ assignment นี้
                let assignmentCount = countedCount;
                // ถ้ามี filter ให้นับเฉพาะที่ตรงกับ filter
                if (assignment.location_filter || assignment.category_filter) {
                    const { data: filteredCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select(`
              id,
              asset:assets(location, category)
            `).eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null);
                    assignmentCount = (filteredCounts || []).filter((item)=>{
                        const asset = item.asset;
                        if (!asset) return false;
                        if (assignment.location_filter && asset.location !== assignment.location_filter) return false;
                        if (assignment.category_filter && asset.category !== assignment.category_filter) return false;
                        return true;
                    }).length;
                }
                const updateData = {
                    counted_assets: assignmentCount
                };
                // ถ้าตรวจนับครบแล้ว ให้เปลี่ยน status เป็น Completed
                if (assignmentCount >= assignment.total_assets && assignment.total_assets > 0) {
                    updateData.status = 'Completed';
                    updateData.completed_at = new Date().toISOString();
                }
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').update(updateData).eq('id', assignment.id);
            }
        }
        // 4. ตรวจสอบว่าตรวจนับครบทุกรายการหรือไม่ (สำหรับ Cycle)
        const { data: totalCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id', {
            count: 'exact',
            head: false
        }).eq('cycle_id', countData.cycle_id);
        const { data: completedCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id', {
            count: 'exact',
            head: false
        }).eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null);
        const total = totalCounts?.length || 0;
        const completed = completedCounts?.length || 0;
        // ถ้าตรวจนับครบแล้ว ให้เปลี่ยน Cycle Status เป็น Completed (ถ้ายังไม่เป็น)
        if (total > 0 && completed >= total) {
            const { data: cycle } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select('status').eq('id', countData.cycle_id).single();
            if (cycle && cycle.status === 'In Progress') {
            // ไม่เปลี่ยนอัตโนมัติ - ให้ผู้ใช้กดปุ่มเสร็จสิ้นเอง
            // หรือถ้าต้องการให้อัตโนมัติ ให้ uncomment บรรทัดนี้:
            // await supabase.from('inventory_cycles').update({ status: 'Completed' }).eq('id', countData.cycle_id)
            }
        }
        // สร้าง audit log สำหรับการตรวจนับ
        try {
            // ดึงข้อมูล user สำหรับ operator (ถ้ามี counted_by)
            let operator = 'System';
            if (countData.counted_by) {
                const { data: userData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').select('name, username').eq('id', countData.counted_by).single();
                if (userData) {
                    operator = userData.name || userData.username || 'System';
                }
            }
            // สร้าง document_ref ที่รวม cycle_id และ notes (ถ้ามี)
            let documentRef = `Cycle ${countData.cycle_id}`;
            if (countData.counted_notes && countData.counted_notes.trim()) {
                documentRef += ` - ${countData.counted_notes.trim()}`;
            }
            await createAuditLog({
                action: 'ตรวจนับ',
                asset_code: countData.asset_code || asset?.code || null,
                operator: operator,
                document_ref: documentRef
            });
        } catch (logError) {
            console.warn('Error creating audit log:', logError);
        }
        return result;
    } catch (error) {
        console.error('Error saving inventory count:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchDiscrepancies = async (cycleId)=>{
    try {
        // ดึงข้อมูลการตรวจนับทั้งหมดที่ต้องแก้ไข
        // เงื่อนไข: มีการตรวจนับแล้ว (counted_status ไม่เป็น null) และมีความแตกต่าง
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select(`
        *,
        asset:assets(*)
      `).eq('cycle_id', cycleId).not('counted_status', 'is', null) // ต้องมีการตรวจนับแล้ว
        .or('requires_adjustment.eq.true,location_match.eq.false,status_match.eq.false,counted_status.eq.Not Found,counted_status.eq.Moved,counted_status.eq.Damaged');
        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }
        // กรองรายการที่ต้องแก้ไขจริงๆ
        const discrepancies = (data || []).filter((item)=>{
            // ถ้า requires_adjustment = true ให้แสดง
            if (item.requires_adjustment === true) return true;
            // ถ้า location ไม่ตรง ให้แสดง
            if (item.location_match === false) return true;
            // ถ้า status ไม่ตรง ให้แสดง
            if (item.status_match === false) return true;
            // ถ้าสถานะการตรวจนับเป็น Not Found, Moved, หรือ Damaged ให้แสดง
            if ([
                'Not Found',
                'Moved',
                'Damaged'
            ].includes(item.counted_status)) return true;
            return false;
        });
        const formattedData = discrepancies.map((item)=>({
                ...item,
                asset: item.asset ? {
                    ...item.asset,
                    purchaseDate: item.asset.purchase_date,
                    usefulLife: item.asset.useful_life || 5,
                    isStickerPrinted: item.asset.is_sticker_printed || false
                } : null
            }));
        return {
            status: 'success',
            data: formattedData
        };
    } catch (error) {
        console.error('Error fetching discrepancies:', error);
        return {
            status: 'error',
            message: error.message,
            data: []
        };
    }
};
const applyInventoryAdjustment = async (adjustmentData)=>{
    try {
        // ดึงข้อมูล asset เดิมเพื่อใช้เปรียบเทียบและสร้าง audit log
        let oldLocation = null;
        const { data: oldAsset } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('location').eq('id', adjustmentData.asset_id).single();
        if (oldAsset) {
            oldLocation = oldAsset.location;
        }
        // อัพเดทข้อมูลทรัพย์สิน
        const assetUpdates = {};
        if (adjustmentData.new_location && adjustmentData.new_location.trim() !== '') {
            assetUpdates.location = adjustmentData.new_location.trim();
        }
        if (adjustmentData.new_status && adjustmentData.new_status.trim() !== '') {
            assetUpdates.status = adjustmentData.new_status.trim();
        }
        if (Object.keys(assetUpdates).length > 0) {
            const { error: assetError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').update(assetUpdates).eq('id', adjustmentData.asset_id);
            if (assetError) {
                console.error('Error updating asset:', assetError);
                throw assetError;
            }
        }
        // อัพเดท inventory_count
        const updateData = {
            adjustment_reason: adjustmentData.reason || null,
            adjustment_approved_by: adjustmentData.approved_by || null,
            adjustment_approved_at: new Date().toISOString(),
            requires_adjustment: false
        };
        // อัพเดท location_match และ status_match ตามข้อมูลใหม่
        if (adjustmentData.new_location) {
            // ดึงข้อมูล asset เพื่อเปรียบเทียบ
            const { data: asset } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('location, status').eq('id', adjustmentData.asset_id).single();
            if (asset) {
                updateData.location_match = adjustmentData.new_location === asset.location;
                updateData.status_match = !adjustmentData.new_status || adjustmentData.new_status === asset.status;
            }
        }
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('id', adjustmentData.count_id).select().single();
        if (error) {
            console.error('Error updating inventory count:', error);
            throw error;
        }
        // สร้าง audit log
        try {
            // กำหนด action ตามประเภทการแก้ไข
            let action = 'แก้ไข' // default
            ;
            if (adjustmentData.new_location && adjustmentData.new_location.trim() !== oldLocation) {
                action = 'โอนย้าย'; // ถ้ามีการเปลี่ยน location ให้ใช้ 'โอนย้าย'
            }
            // ดึงข้อมูล user สำหรับ operator
            let operator = 'System';
            if (adjustmentData.approved_by) {
                const { data: userData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').select('name, username').eq('id', adjustmentData.approved_by).single();
                if (userData) {
                    operator = userData.name || userData.username || 'System';
                }
            }
            await createAuditLog({
                action: action,
                asset_code: adjustmentData.asset_code,
                operator: operator,
                document_ref: `Cycle ${adjustmentData.cycle_id}`
            });
        } catch (logError) {
            // ไม่ให้ audit log error หยุดการทำงาน
            console.warn('Error creating audit log:', logError);
        }
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error applying inventory adjustment:', error);
        return {
            status: 'error',
            message: error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล'
        };
    }
};
const getInventorySummary = async (cycleId)=>{
    try {
        const { data: counts, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('*').eq('cycle_id', cycleId);
        if (error) throw error;
        const total = counts.length;
        const counted = counts.filter((c)=>c.counted_status).length;
        const found = counts.filter((c)=>c.counted_status === 'Found').length;
        const notFound = counts.filter((c)=>c.counted_status === 'Not Found').length;
        const damaged = counts.filter((c)=>c.counted_status === 'Damaged').length;
        const moved = counts.filter((c)=>c.counted_status === 'Moved').length;
        const matches = counts.filter((c)=>c.location_match && c.status_match).length;
        const requiresAdjustment = counts.filter((c)=>c.requires_adjustment).length;
        return {
            status: 'success',
            data: {
                total,
                counted,
                pending: total - counted,
                found,
                notFound,
                damaged,
                moved,
                matches,
                discrepancies: total - matches,
                requiresAdjustment,
                progressPercent: total > 0 ? counted / total * 100 : 0,
                accuracyPercent: counted > 0 ? matches / counted * 100 : 0
            }
        };
    } catch (error) {
        console.error('Error getting inventory summary:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const createInventoryAssignment = async (assignmentData)=>{
    try {
        // นับจำนวนทรัพย์สินที่ต้องตรวจนับตาม filter
        let assetQuery = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('id', {
            count: 'exact',
            head: true
        });
        if (assignmentData.location_filter) {
            assetQuery = assetQuery.eq('location', assignmentData.location_filter);
        }
        if (assignmentData.category_filter) {
            assetQuery = assetQuery.eq('category', assignmentData.category_filter);
        }
        const { count: totalAssets } = await assetQuery;
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').insert({
            cycle_id: assignmentData.cycle_id,
            assigned_to: assignmentData.assigned_to,
            location_filter: assignmentData.location_filter || null,
            category_filter: assignmentData.category_filter || null,
            status: 'Pending',
            total_assets: totalAssets || 0,
            counted_assets: 0
        }).select().single();
        if (error) throw error;
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error creating inventory assignment:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchInventoryAssignments = async (cycleId = null)=>{
    try {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').select(`
        *,
        assigned_to_user:users!inventory_assignments_assigned_to_fkey(id, name, username)
      `).order('created_at', {
            ascending: false
        });
        if (cycleId) {
            query = query.eq('cycle_id', cycleId);
        }
        const { data, error } = await query;
        if (error) throw error;
        return {
            status: 'success',
            data: data || []
        };
    } catch (error) {
        console.error('Error fetching inventory assignments:', error);
        return {
            status: 'error',
            message: error.message,
            data: []
        };
    }
};
}),
"[project]/src/components/Toast.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
'use client';
;
;
;
const Toast = ({ message, type = 'success', duration = 3000, onClose })=>{
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isExiting, setIsExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            handleClose();
        }, duration);
        return ()=>clearTimeout(timer);
    }, [
        duration
    ]);
    const handleClose = ()=>{
        setIsExiting(true);
        setTimeout(()=>{
            setIsVisible(false);
            onClose?.();
        }, 300);
    };
    if (!isVisible) return null;
    const config = {
        success: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            iconColor: 'text-emerald-600',
            textColor: 'text-emerald-800',
            iconBg: 'bg-emerald-100',
            shadow: 'shadow-emerald-500/20'
        },
        error: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
            bg: 'bg-rose-50',
            border: 'border-rose-200',
            iconColor: 'text-rose-600',
            textColor: 'text-rose-800',
            iconBg: 'bg-rose-100',
            shadow: 'shadow-rose-500/20'
        },
        warning: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            iconColor: 'text-amber-600',
            textColor: 'text-amber-800',
            iconBg: 'bg-amber-100',
            shadow: 'shadow-amber-500/20'
        },
        info: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-800',
            iconBg: 'bg-blue-100',
            shadow: 'shadow-blue-500/20'
        }
    };
    const toastConfig = config[type] || config.success;
    const IconComponent = toastConfig.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-4 right-4 z-[9999] transform transition-all duration-300 ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${toastConfig.bg} ${toastConfig.border} border-2 rounded-xl p-4 shadow-xl ${toastConfig.shadow} min-w-[320px] max-w-md backdrop-blur-sm`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${toastConfig.iconBg} p-2 rounded-lg shrink-0`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                            className: `w-5 h-5 ${toastConfig.iconColor}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/Toast.jsx",
                            lineNumber: 81,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Toast.jsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `${toastConfig.textColor} font-semibold text-sm leading-relaxed`,
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/components/Toast.jsx",
                            lineNumber: 84,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Toast.jsx",
                        lineNumber: 83,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: `${toastConfig.iconColor} hover:opacity-70 transition-opacity shrink-0 p-1 rounded-lg hover:bg-white/50`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Toast.jsx",
                            lineNumber: 92,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Toast.jsx",
                        lineNumber: 88,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Toast.jsx",
                lineNumber: 79,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/Toast.jsx",
            lineNumber: 76,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Toast.jsx",
        lineNumber: 71,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const ToastContainer = ({ toasts, removeToast })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                    message: toast.message,
                    type: toast.type,
                    duration: toast.duration,
                    onClose: ()=>removeToast(toast.id)
                }, void 0, false, {
                    fileName: "[project]/src/components/Toast.jsx",
                    lineNumber: 105,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, toast.id, false, {
                fileName: "[project]/src/components/Toast.jsx",
                lineNumber: 104,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/Toast.jsx",
        lineNumber: 102,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const useToast = ()=>{
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const showToast = (message, type = 'success', duration = 3000)=>{
        const id = Date.now() + Math.random();
        const newToast = {
            id,
            message,
            type,
            duration
        };
        setToasts((prev)=>[
                ...prev,
                newToast
            ]);
        return id;
    };
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
    };
    const success = (message, duration)=>showToast(message, 'success', duration);
    const error = (message, duration)=>showToast(message, 'error', duration);
    const warning = (message, duration)=>showToast(message, 'warning', duration);
    const info = (message, duration)=>showToast(message, 'info', duration);
    return {
        toasts,
        showToast,
        removeToast,
        success,
        error,
        warning,
        info
    };
};
const __TURBOPACK__default__export__ = Toast;
}),
"[project]/src/components/Layout.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.js [app-ssr] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-ssr] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function Layout({ children, user }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const navItems = [
        {
            id: 'dashboard',
            label: 'ภาพรวม (Dashboard)',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            path: '/'
        },
        {
            id: 'assets',
            label: 'ทะเบียนทรัพย์สิน',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
            path: '/assets'
        },
        {
            id: 'inventory',
            label: 'ตรวจนับครุภัณฑ์',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"],
            path: '/inventory'
        },
        {
            id: 'reports',
            label: 'รายงานธุรกรรม',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
            path: '/reports'
        },
        {
            id: 'sticker',
            label: 'พิมพ์สติ๊กเกอร์',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"],
            action: 'modal'
        },
        {
            id: 'settings',
            label: 'ตั้งค่าระบบ',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            path: '/settings'
        }
    ];
    const handleLogout = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    const handleNavClick = (item)=>{
        if (item.action === 'modal' && item.id === 'sticker') {
            toast.info('ฟีเจอร์พิมพ์สติ๊กเกอร์');
            return;
        }
        if (item.id === 'settings' && user && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canAccessSettings"](user)) {
            toast.error('คุณไม่มีสิทธิ์เข้าถึงการตั้งค่า');
            return;
        }
        if (item.path) {
            router.push(item.path);
            setIsMobileMenuOpen(false);
        }
    };
    const isActive = (item)=>{
        if (item.path === '/') {
            return pathname === '/';
        }
        return pathname?.startsWith(item.path);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen font-sans text-slate-800 flex flex-col md:flex-row relative bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastContainer"], {
                toasts: toast.toasts,
                removeToast: toast.removeToast
            }, void 0, false, {
                fileName: "[project]/src/components/Layout.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity",
                onClick: ()=>setIsMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/Layout.jsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl border-r border-slate-800`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 pb-4 flex justify-between items-center border-b border-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                className: "w-5 h-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Layout.jsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Layout.jsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-lg font-bold text-white tracking-tight",
                                                    children: "AssetTrack"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout.jsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400 font-medium uppercase tracking-wide",
                                                    children: "ระบบจัดการทรัพย์สิน"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout.jsx",
                                                    lineNumber: 84,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Layout.jsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Layout.jsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout.jsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(false),
                                className: "md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout.jsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout.jsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Layout.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "p-4 space-y-2 mt-4",
                        children: navItems.map((item)=>{
                            if (item.id === 'settings' && user && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canAccessSettings"](user)) {
                                return null;
                            }
                            const active = isActive(item);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleNavClick(item),
                                className: `w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${active ? 'bg-primary-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`,
                                children: [
                                    active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-0 bottom-0 w-1 bg-primary-400 rounded-l-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 109,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                        className: `w-5 h-5 mr-3 transition-all duration-300 group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`,
                                        strokeWidth: active ? 2.5 : 2
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this),
                                    item.label
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/Layout.jsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layout.jsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 w-full p-6 border-t border-slate-800",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-800 rounded-lg p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-white",
                                            children: user?.name?.charAt(0) || 'S'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Layout.jsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-3 overflow-hidden flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-white truncate",
                                                children: user?.name || 'Staff Member'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Layout.jsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 truncate",
                                                children: user?.role || 'Asset Officer'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Layout.jsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "ml-2 p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors",
                                        title: "ออกจากระบบ",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Layout.jsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Layout.jsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Layout.jsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layout.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Layout.jsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-auto h-screen flex flex-col relative z-10 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white border-b border-slate-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-30 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Layout.jsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-slate-900 text-lg",
                                        children: "AssetTrack"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout.jsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Layout.jsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(true),
                                className: "p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout.jsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout.jsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Layout.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Layout.jsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Layout.jsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/utils/calculations.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDepreciation",
    ()=>calculateDepreciation
]);
const calculateDepreciation = (price, purchaseDateStr, usefulLifeYears)=>{
    // ถ้าไม่มีวันที่ซื้อ ให้ใช้ค่า default
    if (!purchaseDateStr || purchaseDateStr === '') {
        return {
            ageYears: '0.0',
            annualDepreciation: 0,
            accumulatedDepreciation: 0,
            bookValue: price || 0
        };
    }
    const purchaseDate = new Date(purchaseDateStr);
    const today = new Date();
    // ตรวจสอบว่า purchaseDate ถูกต้องหรือไม่
    if (isNaN(purchaseDate.getTime())) {
        return {
            ageYears: '0.0',
            annualDepreciation: 0,
            accumulatedDepreciation: 0,
            bookValue: price || 0
        };
    }
    // วันที่ใช้งาน (Age in days)
    const diffTime = Math.abs(today - purchaseDate);
    const ageDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const ageYears = ageDays / 365;
    // มูลค่าซาก (Residual Value) - ปกติ 1 บาทเพื่อให้รู้ว่ายังมีทรัพย์สินอยู่
    const residualValue = 1;
    // ค่าเสื่อมราคาต่อปี (Annual Depreciation)
    const annualDepreciation = (price - residualValue) / usefulLifeYears;
    // ค่าเสื่อมราคาสะสม (Accumulated Depreciation)
    // ห้ามเกิน (ราคาทุน - 1 บาท)
    let accumulatedDepreciation = annualDepreciation * ageYears;
    const maxDepreciation = price - residualValue;
    if (accumulatedDepreciation > maxDepreciation) {
        accumulatedDepreciation = maxDepreciation;
    }
    // มูลค่าตามบัญชี (Book Value)
    const bookValue = price - accumulatedDepreciation;
    return {
        ageYears: ageYears.toFixed(1),
        annualDepreciation,
        accumulatedDepreciation,
        bookValue: bookValue < 1 ? 1 : bookValue // Min 1 Baht
    };
};
}),
"[project]/src/utils/categoryIcons.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategoryIcon",
    ()=>getCategoryIcon,
    "getIconByName",
    ()=>getIconByName,
    "getIconNameFromCategories",
    ()=>getIconNameFromCategories,
    "renderCategoryIcon",
    ()=>renderCategoryIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-ssr] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sofa$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sofa$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sofa.js [app-ssr] (ecmascript) <export default as Sofa>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$speaker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Speaker$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/speaker.js [app-ssr] (ecmascript) <export default as Speaker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tablet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tablet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tablet.js [app-ssr] (ecmascript) <export default as Tablet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-ssr] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Keyboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/keyboard.js [app-ssr] (ecmascript) <export default as Keyboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mouse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse.js [app-ssr] (ecmascript) <export default as Mouse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript) <export default as Headphones>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$laptop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Laptop$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/laptop.js [app-ssr] (ecmascript) <export default as Laptop>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder.js [app-ssr] (ecmascript) <export default as Folder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-ssr] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/server.js [app-ssr] (ecmascript) <export default as Server>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-ssr] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$watch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Watch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/watch.js [app-ssr] (ecmascript) <export default as Watch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-ssr] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tv$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tv$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tv.js [app-ssr] (ecmascript) <export default as Tv>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-ssr] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-ssr] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript) <export default as Hammer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-ssr] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-ssr] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-ssr] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-ssr] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fan$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fan$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/fan.js [app-ssr] (ecmascript) <export default as Fan>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$air$2d$vent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AirVent$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/air-vent.js [app-ssr] (ecmascript) <export default as AirVent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lamp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lamp.js [app-ssr] (ecmascript) <export default as Lamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book.js [app-ssr] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/archive.js [app-ssr] (ecmascript) <export default as Archive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-ssr] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thermometer.js [app-ssr] (ecmascript) <export default as Thermometer>");
;
;
/**
 * Icon mapping จากชื่อ icon ไปยัง component
 */ const iconMap = {
    Monitor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
    Printer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"],
    Sofa: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sofa$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sofa$3e$__["Sofa"],
    Speaker: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$speaker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Speaker$3e$__["Speaker"],
    Tablet: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tablet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tablet$3e$__["Tablet"],
    HardDrive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"],
    Keyboard: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Keyboard$3e$__["Keyboard"],
    Mouse: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mouse$3e$__["Mouse"],
    Headphones: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__["Headphones"],
    Camera: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
    Video: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"],
    Laptop: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$laptop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Laptop$3e$__["Laptop"],
    Package: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
    Box: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"],
    FileText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
    ImageIcon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
    Folder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"],
    Database: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"],
    Server: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"],
    Wifi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"],
    Smartphone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
    Watch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$watch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Watch$3e$__["Watch"],
    Gamepad2: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"],
    Mic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"],
    Tv: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tv$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tv$3e$__["Tv"],
    Radio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"],
    Car: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"],
    Building2: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
    Hammer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__["Hammer"],
    Wrench: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
    Palette: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"],
    Music: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"],
    Clock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
    Lightbulb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"],
    Fan: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fan$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fan$3e$__["Fan"],
    AirVent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$air$2d$vent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AirVent$3e$__["AirVent"],
    Lamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lamp$3e$__["Lamp"],
    Book: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"],
    Archive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__["Archive"],
    Calculator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"],
    Thermometer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__["Thermometer"]
};
const getIconByName = (iconName)=>{
    if (!iconName) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"];
    // แปลงชื่อ icon เป็น component
    const IconComponent = iconMap[iconName];
    return IconComponent || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"];
};
const getCategoryIcon = (category, iconName = null)=>{
    // ถ้ามี icon_name จาก database ให้ใช้ก่อน
    if (iconName) {
        return getIconByName(iconName);
    }
    if (!category) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"];
    const categoryLower = category.toLowerCase();
    // Computer related
    if (categoryLower.includes('คอมพิวเตอร์') || categoryLower.includes('computer') || categoryLower.includes('pc')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"];
    }
    if (categoryLower.includes('laptop') || categoryLower.includes('โน้ตบุ๊ค')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$laptop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Laptop$3e$__["Laptop"];
    }
    if (categoryLower.includes('tablet') || categoryLower.includes('แท็บเล็ต')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tablet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tablet$3e$__["Tablet"];
    }
    // Printer & Scanner
    if (categoryLower.includes('printer') || categoryLower.includes('เครื่องพิมพ์') || categoryLower.includes('เครื่องสแกน')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"];
    }
    // Monitor & Display
    if (categoryLower.includes('monitor') || categoryLower.includes('จอภาพ') || categoryLower.includes('หน้าจอ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"];
    }
    // Audio & Speaker
    if (categoryLower.includes('เครื่องเสียง') || categoryLower.includes('speaker') || categoryLower.includes('ลำโพง')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$speaker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Speaker$3e$__["Speaker"];
    }
    if (categoryLower.includes('headphone') || categoryLower.includes('หูฟัง')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__["Headphones"];
    }
    if (categoryLower.includes('mic') || categoryLower.includes('ไมโครโฟน')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"];
    }
    // Camera & Video
    if (categoryLower.includes('camera') || categoryLower.includes('กล้อง')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"];
    }
    if (categoryLower.includes('video') || categoryLower.includes('วีดีโอ') || categoryLower.includes('cctv')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"];
    }
    // Furniture
    if (categoryLower.includes('โต๊ะ') || categoryLower.includes('table') || categoryLower.includes('desk')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
    }
    if (categoryLower.includes('ปรับสมุด')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"];
    }
    if (categoryLower.includes('เก้าอี้') || categoryLower.includes('chair')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sofa$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sofa$3e$__["Sofa"];
    }
    if (categoryLower.includes('ตู้') || categoryLower.includes('cabinet') || categoryLower.includes('shelf') || categoryLower.includes('ตู้เก็บเอกสาร')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__["Archive"];
    }
    if (categoryLower.includes('ตู้เย็น') || categoryLower.includes('refrigerator')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__["Thermometer"];
    }
    if (categoryLower.includes('ถังต้มน้ำ') || categoryLower.includes('water')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Thermometer$3e$__["Thermometer"];
    }
    // Storage & Drive
    if (categoryLower.includes('hard drive') || categoryLower.includes('harddisk') || categoryLower.includes('hdd') || categoryLower.includes('ssd')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"];
    }
    if (categoryLower.includes('storage') || categoryLower.includes('เก็บข้อมูล')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"];
    }
    // Network & Server
    if (categoryLower.includes('server') || categoryLower.includes('เซิร์ฟเวอร์')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"];
    }
    if (categoryLower.includes('router') || categoryLower.includes('network') || categoryLower.includes('เราเตอร์')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"];
    }
    // Input devices
    if (categoryLower.includes('keyboard') || categoryLower.includes('คีย์บอร์ด')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Keyboard$3e$__["Keyboard"];
    }
    if (categoryLower.includes('mouse') || categoryLower.includes('เมาส์')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mouse$3e$__["Mouse"];
    }
    // Mobile devices
    if (categoryLower.includes('phone') || categoryLower.includes('โทรศัพท์') || categoryLower.includes('smartphone')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"];
    }
    // TV & Display
    if (categoryLower.includes('tv') || categoryLower.includes('television') || categoryLower.includes('ทีวี')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tv$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tv$3e$__["Tv"];
    }
    if (categoryLower.includes('ฉายภาพ') || categoryLower.includes('projector')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"];
    }
    // Lighting
    if (categoryLower.includes('light') || categoryLower.includes('ไฟ') || categoryLower.includes('หลอดไฟ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"];
    }
    if (categoryLower.includes('lamp') || categoryLower.includes('โคมไฟ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lamp$3e$__["Lamp"];
    }
    // Air conditioning
    if (categoryLower.includes('fan') || categoryLower.includes('พัดลม')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fan$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fan$3e$__["Fan"];
    }
    if (categoryLower.includes('air') || categoryLower.includes('แอร์') || categoryLower.includes('เครื่องฟอกอากาศ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$air$2d$vent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AirVent$3e$__["AirVent"];
    }
    // Office equipment
    if (categoryLower.includes('เครื่องพับ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"];
    }
    if (categoryLower.includes('สแกนลายนิ้วมือ') || categoryLower.includes('fingerprint')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"];
    }
    if (categoryLower.includes('สแกน') && !categoryLower.includes('ลายนิ้ว')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
    }
    if (categoryLower.includes('แฟกซ์') || categoryLower.includes('fax')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"];
    }
    if (categoryLower.includes('เครื่องย่อย') || categoryLower.includes('shredder')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"];
    }
    // Tools
    if (categoryLower.includes('tool') || categoryLower.includes('เครื่องมือ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__["Hammer"];
    }
    if (categoryLower.includes('เครื่องนับ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"];
    }
    if (categoryLower.includes('รถเข็น')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"];
    }
    // Vehicle
    if (categoryLower.includes('car') || categoryLower.includes('รถ') || categoryLower.includes('vehicle')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"];
    }
    // Building
    if (categoryLower.includes('building') || categoryLower.includes('อาคาร')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"];
    }
    // Art & Design
    if (categoryLower.includes('art') || categoryLower.includes('ศิลป์') || categoryLower.includes('ภาพ')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"];
    }
    if (categoryLower.includes('music') || categoryLower.includes('ดนตรี')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"];
    }
    // Clock & Time
    if (categoryLower.includes('clock') || categoryLower.includes('นาฬิกา') || categoryLower.includes('watch')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"];
    }
    // Book & Document
    if (categoryLower.includes('book') || categoryLower.includes('หนังสือ') || categoryLower.includes('เอกสาร')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"];
    }
    // Default icon
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"];
};
const getIconNameFromCategories = (categoryName, categories = [])=>{
    if (!categoryName || !categories || categories.length === 0) {
        return null;
    }
    // หา category object ที่มี name ตรงกับ categoryName
    const category = categories.find((cat)=>{
        const catName = typeof cat === 'string' ? cat : cat.name || cat;
        return catName === categoryName;
    });
    // ถ้า category เป็น object และมี icon_name ให้ return icon_name
    if (category && typeof category === 'object' && category.icon_name) {
        return category.icon_name;
    }
    return null;
};
const renderCategoryIcon = (category, props = {}, iconName = null, categories = [])=>{
    try {
        // ถ้าไม่มี iconName แต่มี categories ให้หา icon_name จาก categories
        if (!iconName && categories && categories.length > 0) {
            iconName = getIconNameFromCategories(category, categories);
        }
        const IconComponent = getCategoryIcon(category || '', iconName);
        if (!IconComponent) {
            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], props);
        }
        // Use React.createElement to avoid issues with JSX in utility functions
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(IconComponent, props);
    } catch (error) {
        console.error('Error rendering category icon:', error);
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], props);
    }
};
}),
"[project]/src/utils/assetManager.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Default image URL ที่ใช้ในระบบ (ถ้าเป็น URL นี้ถือว่าไม่มีรูป)
 */ __turbopack_context__.s([
    "ASSET_CATEGORIES",
    ()=>ASSET_CATEGORIES,
    "DEFAULT_IMAGE_URL",
    ()=>DEFAULT_IMAGE_URL,
    "calculateStraightLineDepreciation",
    ()=>calculateStraightLineDepreciation,
    "downloadCSVTemplate",
    ()=>downloadCSVTemplate,
    "exportAssetsToCSV",
    ()=>exportAssetsToCSV,
    "exportPendingStickersCSV",
    ()=>exportPendingStickersCSV,
    "generateAssetCode",
    ()=>generateAssetCode,
    "generateAssetCodeStandard",
    ()=>generateAssetCodeStandard,
    "hasRealImage",
    ()=>hasRealImage,
    "parseAssetCSV",
    ()=>parseAssetCSV,
    "parseAssetCode",
    ()=>parseAssetCode
]);
const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400';
const hasRealImage = (image)=>{
    if (!image || image === '' || image === null) return false;
    // ถ้าเป็น default image URL ถือว่าไม่มีรูป
    if (image.includes('unsplash.com/photo-1497215728101-856f4ea42174')) return false;
    return true;
};
const generateAssetCode = (prefix, year, runningNumber, padding = 4)=>{
    const paddedRunning = String(runningNumber).padStart(padding, '0');
    return `${prefix}-${year}-${paddedRunning}`;
};
const generateAssetCodeStandard = (prefix, runningNumber, purchaseDate, padding = 3)=>{
    // Convert purchaseDate to Date object if it's a string
    const date = purchaseDate instanceof Date ? purchaseDate : new Date(purchaseDate);
    // Get day, month, year (Buddhist Era)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const yearBE = date.getFullYear() + 543; // Convert AD to BE
    // Pad running number
    const paddedRunning = String(runningNumber).padStart(padding, '0');
    // Format: {PREFIX}{RUNNING}-{DD}-{MM}-{YYYY}
    return `${prefix}${paddedRunning}-${day}-${month}-${yearBE}`;
};
const parseAssetCode = (code)=>{
    if (!code || typeof code !== 'string') return null;
    // Pattern: {PREFIX}{RUNNING}-{DD}-{MM}-{YYYY}
    const match = code.match(/^([A-Z])(\d+)-(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (!match) return null;
    const [, prefix, running, day, month, yearBE] = match;
    const yearAD = parseInt(yearBE) - 543;
    return {
        prefix,
        running: parseInt(running),
        day: parseInt(day),
        month: parseInt(month),
        yearBE: parseInt(yearBE),
        yearAD,
        purchaseDate: new Date(yearAD, parseInt(month) - 1, parseInt(day))
    };
};
const calculateStraightLineDepreciation = (cost, purchaseDate, usefulLife, scrapValue = 1)=>{
    const buyDate = new Date(purchaseDate);
    const today = new Date();
    // Calculate Age in Months/Years
    const diffTime = Math.abs(today - buyDate);
    const ageYears = diffTime / (1000 * 60 * 60 * 24 * 365);
    // Yearly Depreciation
    const yearlyDep = (cost - scrapValue) / usefulLife;
    // Accumulated Depreciation
    let accumulated = yearlyDep * ageYears;
    const maxDep = cost - scrapValue;
    if (accumulated > maxDep) {
        accumulated = maxDep;
    }
    // Book Value
    const bookValue = cost - accumulated;
    return {
        annualDepreciation: yearlyDep,
        accumulatedDepreciation: accumulated,
        bookValue: bookValue < scrapValue ? scrapValue : bookValue,
        ageInYears: ageYears.toFixed(2)
    };
};
const exportAssetsToCSV = (assets)=>{
    // 1. Group assets by category
    const grouped = {};
    assets.forEach((asset)=>{
        const cat = asset.category || 'ไม่ระบุ';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(asset);
    });
    // 2. Define Headers - Extended to match all data
    const headers = [
        'รหัสทรัพย์สิน',
        'ชื่อทรัพย์สิน',
        'หมวดหมู่',
        'ยี่ห้อ',
        'Serial Number',
        'ราคาทุน',
        'วันที่ซื้อ',
        'อายุการใช้งาน',
        'สถานที่',
        'สถานะ',
        'พิมพ์สติ๊กเกอร์'
    ];
    let csvRows = [];
    csvRows.push(headers.join(","));
    let grandTotal = 0;
    // 3. Process each group
    Object.entries(grouped).forEach(([category, items])=>{
        // Category Header Row
        csvRows.push(`""`); // Empty row for spacing
        csvRows.push(`"--- หมวดหมู่: ${category} ---",,,,,,,,,,`);
        let categoryTotal = 0;
        // Data Rows
        items.forEach((asset)=>{
            const row = [
                `"${asset.code}"`,
                `"${asset.name}"`,
                `"${asset.category}"`,
                `"${asset.brand || ''}"`,
                `"${asset.serial || ''}"`,
                asset.price,
                `"${asset.purchaseDate}"`,
                asset.usefulLife,
                `"${asset.location}"`,
                `"${asset.status}"`,
                `"${asset.isStickerPrinted ? 'Yes' : 'No'}"`
            ];
            csvRows.push(row.join(","));
            categoryTotal += asset.price;
        });
        // Category Subtotal Row
        csvRows.push(`"รวมหมวด ${category}",,,,,"${categoryTotal}",,,,`);
        grandTotal += categoryTotal;
    });
    // 4. Grand Total Row
    csvRows.push(`""`);
    csvRows.push(`"มูลค่ารวมทรัพย์สินทั้งหมด",,,,,"${grandTotal}",,,,`);
    // 5. Combine with BOM for Thai Excel support
    const csvContent = "\uFEFF" + csvRows.join("\n");
    // 6. Create Download Link
    const blob = new Blob([
        csvContent
    ], {
        type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Asset_Report_Complete_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const downloadCSVTemplate = ()=>{
    const headers = [
        'รหัสทรัพย์สิน',
        'ชื่อทรัพย์สิน',
        'หมวดหมู่',
        'ยี่ห้อ',
        'Serial Number',
        'ราคาทุน',
        'วันที่ซื้อ',
        'อายุการใช้งาน',
        'สถานที่',
        'สถานะ'
    ];
    const example = [
        'COM-2567-0001',
        'เครื่องคอมพิวเตอร์พกพา',
        'Computer',
        'Dell',
        'X123456789',
        '45000',
        '2024-01-20',
        '5',
        'ห้องประชุม 1',
        'Normal'
    ];
    const csvRows = [
        headers.join(","),
        example.join(",")
    ];
    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([
        csvContent
    ], {
        type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Asset_Import_Template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const parseAssetCSV = async (file)=>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = (e)=>{
            const text = e.target.result;
            const lines = text.split('\n');
            if (lines.length < 2) {
                resolve([]);
                return;
            }
            const assets = [];
            for(let i = 1; i < lines.length; i++){
                const line = lines[i].trim();
                if (!line || line.startsWith('"---') || line.startsWith('""') || line.includes('รวมหมวด')) continue;
                const values = line.split(',').map((v)=>v.trim().replace(/"/g, ''));
                if (values.length < 10) continue;
                assets.push({
                    id: Date.now() + i,
                    code: values[0],
                    name: values[1],
                    category: values[2],
                    brand: values[3],
                    serial: values[4],
                    price: parseFloat(values[5]) || 0,
                    purchaseDate: values[6],
                    usefulLife: parseInt(values[7]) || 5,
                    location: values[8],
                    status: values[9] || 'Normal',
                    isStickerPrinted: false,
                    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=300'
                });
            }
            resolve(assets);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
};
const exportPendingStickersCSV = (assets)=>{
    const pendingAssets = assets.filter((a)=>!a.isStickerPrinted);
    const headers = [
        'รหัสทรัพย์สิน',
        'ชื่อทรัพย์สิน',
        'หมวดหมู่',
        'ยี่ห้อ',
        'Serial Number',
        'สถานที่',
        'สถานะการพิมพ์สติ๊กเกอร์'
    ];
    const rows = pendingAssets.map((asset)=>[
            `"${asset.code}"`,
            `"${asset.name}"`,
            `"${asset.category}"`,
            `"${asset.brand || ''}"`,
            `"${asset.serial || ''}"`,
            `"${asset.location}"`,
            `"ยังไม่พิมพ์"`
        ]);
    const csvContent = "\uFEFF" + [
        headers,
        ...rows
    ].map((e)=>e.join(",")).join("\n");
    const blob = new Blob([
        csvContent
    ], {
        type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Pending_Stickers_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const ASSET_CATEGORIES = [
    {
        id: 'com',
        name: 'คอมพิวเตอร์',
        prefix: 'COM',
        usefulLife: 5
    },
    {
        id: 'fur',
        name: 'เฟอร์นิเจอร์',
        prefix: 'FUR',
        usefulLife: 8
    },
    {
        id: 'veh',
        name: 'ยานพาหนะ',
        prefix: 'VEH',
        usefulLife: 10
    },
    {
        id: 'ele',
        name: 'เครื่องใช้ไฟฟ้า',
        prefix: 'ELE',
        usefulLife: 5
    }
];
}),
"[project]/src/components/AssetRegistry.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-ssr] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-ssr] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-ssr] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-ssr] (ecmascript) <export default as FileSpreadsheet>");
(()=>{
    const e = new Error("Cannot find module './StatusBadge'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/calculations.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/categoryIcons.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$assetManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/assetManager.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const AssetRegistry = ({ data, onEditAsset, onAddAsset, onRepairRequest, initialFilter = 'All', onFilterChange, initialCategoryFilter = null, onCategoryFilterChange, categories = [], user })=>{
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialFilter);
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCategoryFilter);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('list'); // 'list' or 'grid'
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        setFilterStatus(initialFilter);
    }, [
        initialFilter
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        setCategoryFilter(initialCategoryFilter);
    }, [
        initialCategoryFilter
    ]);
    const handleFilterChange = (status)=>{
        setFilterStatus(status);
        onFilterChange?.(status);
    };
    const filteredAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchQuery.toLowerCase().trim();
        const filtered = data.filter((asset)=>{
            if (categoryFilter && (asset.category || 'ไม่ระบุ') !== categoryFilter) {
                return false;
            }
            const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
            if (!matchesStatus) {
                return false;
            }
            let matchesSearch = true;
            if (query) {
                const searchFields = [
                    asset.code || '',
                    asset.name || '',
                    asset.brand || '',
                    asset.color || '',
                    asset.serial || '',
                    asset.location || '',
                    asset.category || '',
                    asset.custodian || '',
                    asset.vendor || ''
                ];
                matchesSearch = searchFields.some((field)=>field.toLowerCase().includes(query));
            }
            return matchesSearch;
        });
        return filtered.sort((a, b)=>{
            const codeA = (a.code || '').toUpperCase();
            const codeB = (b.code || '').toUpperCase();
            return codeA.localeCompare(codeB, undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        });
    }, [
        data,
        searchQuery,
        filterStatus,
        categoryFilter
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight",
                                children: "ทะเบียนทรัพย์สิน"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm sm:text-base text-slate-500 mt-1",
                                children: "จัดการข้อมูลทรัพย์สินและอุปกรณ์สำนักงาน"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 76,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 sm:gap-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$assetManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exportAssetsToCSV"])(data),
                                className: "flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white text-sm sm:text-base font-medium rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 w-full sm:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                        className: "w-4 h-4 sm:w-5 sm:h-5 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "รายงาน Excel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 84,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        children: "Excel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onAddAsset,
                                className: "flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-600 text-white text-sm sm:text-base font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 w-full sm:w-auto",
                                style: {
                                    color: '#ffffff'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4 sm:w-5 sm:h-5 mr-2",
                                        style: {
                                            color: '#ffffff',
                                            stroke: '#ffffff'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 92,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        style: {
                                            color: '#ffffff'
                                        },
                                        children: "เพิ่มทรัพย์สินใหม่"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 93,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        style: {
                                            color: '#ffffff'
                                        },
                                        children: "เพิ่มใหม่"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 94,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AssetRegistry.jsx",
                lineNumber: 73,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            (categoryFilter || filterStatus !== 'All') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-emerald-50 border border-emerald-200 rounded-2xl p-3 sm:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 sm:gap-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs sm:text-sm font-bold text-emerald-800",
                                children: "แสดงรายการที่มี:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 102,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            categoryFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center",
                                        children: (()=>{
                                            const iconName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIconNameFromCategories"])(categoryFilter, categories);
                                            const IconComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryIcon"])(categoryFilter, iconName);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                className: "w-3 h-3 sm:w-4 sm:h-4",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 109,
                                                columnNumber: 48
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 105,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "หมวดหมู่: "
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 112,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate max-w-[120px] sm:max-w-none",
                                        children: categoryFilter
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 113,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setCategoryFilter(null);
                                            onCategoryFilterChange?.(null);
                                        },
                                        className: "hover:bg-emerald-700 rounded-full p-0.5 transition-colors shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3 sm:w-4 sm:h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 121,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 114,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 104,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            filterStatus !== 'All' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "สถานะ: "
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 127,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: filterStatus === 'Normal' ? 'ปกติ' : filterStatus === 'Repair' ? 'ชำรุด' : filterStatus === 'Check' ? 'รอตรวจสอบ' : 'จำหน่ายออก'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 128,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFilterChange('All'),
                                        className: "hover:bg-blue-700 rounded-full p-0.5 transition-colors shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3 sm:w-4 sm:h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 133,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 129,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 126,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 101,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setCategoryFilter(null);
                            onCategoryFilterChange?.(null);
                            handleFilterChange('All');
                        },
                        className: "text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0",
                        children: "ล้างทั้งหมด"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 138,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AssetRegistry.jsx",
                lineNumber: 100,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-4 justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full md:w-96",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 154,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "ค้นหา...",
                                        className: "w-full pl-12 pr-4 py-2.5 sm:py-3 bg-transparent rounded-xl focus:outline-none focus:bg-slate-50 text-slate-700 placeholder:text-slate-400 text-sm sm:text-base font-medium",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 155,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 153,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center w-full md:w-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex bg-slate-100/50 rounded-xl p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setViewMode('list'),
                                            className: `p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 170,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 166,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setViewMode('grid'),
                                            className: `p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 176,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                    lineNumber: 165,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 164,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-4 items-start md:items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1 md:flex-initial",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                            className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 185,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: categoryFilter || '',
                                            onChange: (e)=>{
                                                const value = e.target.value || null;
                                                setCategoryFilter(value);
                                                onCategoryFilterChange?.(value);
                                            },
                                            className: "w-full md:w-64 pl-12 pr-10 py-3 bg-transparent border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 font-medium appearance-none cursor-pointer hover:bg-slate-50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "ทั้งหมดหมวดหมู่"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 195,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: cat.name,
                                                        children: cat.name
                                                    }, cat.id || cat.name, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 197,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 186,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 202,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                    lineNumber: 184,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 183,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-1 flex-wrap gap-2",
                                children: [
                                    'All',
                                    'Normal',
                                    'Repair',
                                    'Check',
                                    'Disposed'
                                ].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFilterChange(status),
                                        className: `px-4 py-2 text-sm font-medium rounded-xl transition-all ${filterStatus === status ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`,
                                        children: status === 'All' ? 'ทั้งหมด' : status === 'Normal' ? 'ปกติ' : status === 'Repair' ? 'แจ้งซ่อม' : status === 'Check' ? 'รอตรวจ' : 'จำหน่าย'
                                    }, status, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 208,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 206,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 182,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AssetRegistry.jsx",
                lineNumber: 151,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            viewMode === 'grid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
                children: filteredAssets.map((asset)=>{
                    const dep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateDepreciation"])(asset.price, asset.purchaseDate, asset.usefulLife);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer",
                        onClick: ()=>onEditAsset(asset),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-56 w-full bg-slate-100 relative overflow-hidden",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$assetManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasRealImage"])(asset.image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: asset.image,
                                        alt: asset.name,
                                        className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700",
                                        onError: (e)=>{
                                            e.target.style.display = 'none';
                                            const iconContainer = e.target.nextElementSibling;
                                            if (iconContainer) {
                                                iconContainer.style.display = 'flex';
                                            }
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 234,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0)) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$assetManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasRealImage"])(asset.image) ? 'hidden' : 'flex'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 mx-auto mb-2 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center",
                                                    children: (()=>{
                                                        const iconName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIconNameFromCategories"])(asset.category, categories);
                                                        const IconComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryIcon"])(asset.category, iconName);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                            className: "w-8 h-8 text-slate-600",
                                                            strokeWidth: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                                            lineNumber: 253,
                                                            columnNumber: 60
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 249,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400 font-medium",
                                                    children: "ไม่มีรูปภาพ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 256,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 248,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 247,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-3 right-3 backdrop-blur-md bg-white/80 p-1 rounded-lg shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                            status: asset.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 260,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 259,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    onEditAsset(asset);
                                                },
                                                className: "bg-white/90 p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform hover:bg-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                    className: "w-6 h-6 text-slate-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 267,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 263,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    onRepairRequest(asset);
                                                },
                                                className: "bg-white/90 p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform hover:bg-blue-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                                    className: "w-6 h-6 text-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 273,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 269,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 262,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 232,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-slate-800 line-clamp-1 text-lg group-hover:text-emerald-600 transition-colors",
                                                    children: asset.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 280,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400 font-mono mt-1",
                                                    children: asset.code
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 281,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 279,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 278,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    asset.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm text-slate-600 mb-3 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                className: "w-4 h-4 text-slate-400 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 286,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "line-clamp-1",
                                                children: asset.location
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 287,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 285,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500",
                                                        children: "มูลค่าปัจจุบัน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 292,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-800",
                                                        children: Math.round(dep.bookValue).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 293,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 291,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full bg-slate-100 rounded-full h-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-emerald-500 h-2 rounded-full",
                                                    style: {
                                                        width: `${dep.bookValue / asset.price * 100}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 296,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 295,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 290,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 277,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, asset.id, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 231,
                        columnNumber: 29
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/AssetRegistry.jsx",
                lineNumber: 227,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            viewMode === 'list' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-left border-separate border-spacing-y-3 min-w-[900px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "text-slate-400 text-xs uppercase tracking-wider font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2",
                                            children: "รูปภาพ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 315,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2",
                                            children: "รหัสทรัพย์สิน"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 316,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2",
                                            children: "รายละเอียด"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 317,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2 hidden lg:table-cell",
                                            children: "สถานที่ตั้ง"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 318,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2 text-right",
                                            children: "ราคาทุน"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 319,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2 text-right hidden md:table-cell",
                                            children: "มูลค่าปัจจุบัน"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 320,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2",
                                            children: "สถานะ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 321,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 sm:px-6 py-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 322,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                    lineNumber: 314,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 313,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: filteredAssets.length > 0 ? filteredAssets.map((asset)=>{
                                    const dep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateDepreciation"])(asset.price, asset.purchaseDate, asset.usefulLife);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-white shadow-sm hover:shadow-lg transition-all duration-300 group rounded-2xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 rounded-l-2xl border-y border-l border-slate-50 group-hover:border-slate-100",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$assetManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasRealImage"])(asset.image) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: asset.image,
                                                        alt: "",
                                                        className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm",
                                                        onError: (e)=>{
                                                            e.target.style.display = 'none';
                                                            const iconContainer = e.target.nextElementSibling;
                                                            if (iconContainer) {
                                                                iconContainer.style.display = 'flex';
                                                            }
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 333,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0)) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-sm ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$assetManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasRealImage"])(asset.image) ? 'hidden' : 'flex'}`,
                                                        children: (()=>{
                                                            const iconName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIconNameFromCategories"])(asset.category, categories);
                                                            const IconComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryIcon"])(asset.category, iconName);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                className: "w-5 h-5 sm:w-6 sm:h-6 text-slate-600",
                                                                strokeWidth: 2
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                lineNumber: 350,
                                                                columnNumber: 68
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        })()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 346,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 331,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 border-y border-slate-50 group-hover:border-slate-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md",
                                                        children: asset.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 355,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    asset.serial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400 mt-1",
                                                        children: [
                                                            "S/N: ",
                                                            asset.serial
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 357,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 354,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 border-y border-slate-50 group-hover:border-slate-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold text-sm sm:text-base text-slate-700",
                                                        children: asset.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 361,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs text-slate-400 mt-1 flex-wrap",
                                                        children: [
                                                            asset.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: asset.brand
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                lineNumber: 363,
                                                                columnNumber: 73
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            asset.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    asset.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                        lineNumber: 366,
                                                                        columnNumber: 81
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-3.5 h-3.5 flex items-center justify-center",
                                                                                children: (()=>{
                                                                                    const iconName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIconNameFromCategories"])(asset.category, categories);
                                                                                    const IconComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$categoryIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryIcon"])(asset.category, iconName);
                                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                                        className: "w-3.5 h-3.5 text-slate-400",
                                                                                        strokeWidth: 2
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                                        lineNumber: 372,
                                                                                        columnNumber: 84
                                                                                    }, ("TURBOPACK compile-time value", void 0));
                                                                                })()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                                lineNumber: 368,
                                                                                columnNumber: 69
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: asset.category
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                                lineNumber: 375,
                                                                                columnNumber: 69
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                        lineNumber: 367,
                                                                        columnNumber: 65
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 362,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    asset.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 text-xs text-slate-500 mt-1 lg:hidden",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                lineNumber: 382,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: asset.location
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                lineNumber: 383,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 381,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 360,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 border-y border-slate-50 group-hover:border-slate-100 hidden lg:table-cell",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-600 font-medium",
                                                    children: asset.location
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 388,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 387,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 border-y border-slate-50 group-hover:border-slate-100 font-mono text-xs sm:text-sm text-slate-500 text-right",
                                                children: asset.price.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 392,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 border-y border-slate-50 group-hover:border-slate-100 text-right hidden md:table-cell",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-xs sm:text-sm font-bold text-slate-800",
                                                        children: Math.round(dep.bookValue).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 396,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-slate-400",
                                                        children: [
                                                            "เสื่อม: ",
                                                            Math.round(dep.accumulatedDepreciation).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                                        lineNumber: 397,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 395,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 border-y border-slate-50 group-hover:border-slate-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                    status: asset.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 400,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 399,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 sm:p-4 rounded-r-2xl border-y border-r border-slate-50 group-hover:border-slate-100 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>onRepairRequest(asset),
                                                            className: "p-1.5 sm:p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-400 transition-colors",
                                                            title: "ขออนุมัติซ่อม",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                                                className: "w-4 h-4 sm:w-5 sm:h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                lineNumber: 405,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                                            lineNumber: 404,
                                                            columnNumber: 57
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>onEditAsset(asset),
                                                            className: "p-1.5 sm:p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg text-slate-400 transition-colors",
                                                            title: "แก้ไข",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                className: "w-4 h-4 sm:w-5 sm:h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                                lineNumber: 408,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                                            lineNumber: 407,
                                                            columnNumber: 57
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 403,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                                lineNumber: 402,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, asset.id, true, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 330,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0));
                                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: "8",
                                        className: "p-12 text-center text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "w-12 h-12 mb-4 text-gray-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 419,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "ไม่พบข้อมูลที่ค้นหา"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                                    lineNumber: 420,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AssetRegistry.jsx",
                                            lineNumber: 418,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AssetRegistry.jsx",
                                        lineNumber: 417,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AssetRegistry.jsx",
                                    lineNumber: 416,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AssetRegistry.jsx",
                                lineNumber: 325,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AssetRegistry.jsx",
                        lineNumber: 312,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/AssetRegistry.jsx",
                    lineNumber: 311,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AssetRegistry.jsx",
                lineNumber: 310,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AssetRegistry.jsx",
        lineNumber: 72,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AssetRegistry;
}),
"[project]/src/components/EditAssetModal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const EditAssetModal = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: "EditAssetModal"
            }, void 0, false, {
                fileName: "[project]/src/components/EditAssetModal.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Component is being implemented..."
            }, void 0, false, {
                fileName: "[project]/src/components/EditAssetModal.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EditAssetModal.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = EditAssetModal;
}),
"[project]/src/components/RepairRequestModal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const RepairRequestModal = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: "RepairRequestModal"
            }, void 0, false, {
                fileName: "[project]/src/components/RepairRequestModal.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Component is being implemented..."
            }, void 0, false, {
                fileName: "[project]/src/components/RepairRequestModal.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RepairRequestModal.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = RepairRequestModal;
}),
"[project]/src/app/assets/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Layout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AssetRegistry$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AssetRegistry.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditAssetModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EditAssetModal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RepairRequestModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RepairRequestModal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function AssetsContent() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [assets, setAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isEditModalOpen, setIsEditModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentAsset, setCurrentAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [repairAsset, setRepairAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [assetFilter, setAssetFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All');
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const filter = searchParams.get('filter');
        const category = searchParams.get('category');
        const editId = searchParams.get('edit');
        if (filter) {
            setAssetFilter(filter);
        }
        if (category) {
            setCategoryFilter(category);
        }
        if (editId && assets.length > 0) {
            const asset = assets.find((a)=>a.id === parseInt(editId));
            if (asset) {
                setCurrentAsset(asset);
                setIsEditModalOpen(true);
            }
        }
    }, [
        searchParams,
        assets
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            fetchData();
        }
    }, [
        user
    ]);
    const fetchData = async ()=>{
        try {
            const [assetsData, catsData] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAssets"](),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCategories"]()
            ]);
            setAssets(assetsData || []);
            if (catsData && catsData.length > 0) {
                const formattedCategories = catsData.map((cat)=>({
                        ...cat,
                        usefulLife: cat.useful_life || cat.usefulLife || 5,
                        iconName: cat.icon_name || cat.iconName || null
                    }));
                setCategories(formattedCategories);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    const handleAddAsset = ()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canManageAssets"](user)) {
            toast.error('คุณไม่มีสิทธิ์เพิ่มทรัพย์สิน');
            return;
        }
        const newAsset = {
            id: Date.now(),
            code: '',
            name: '',
            brand: '',
            color: '',
            category: '',
            serial: '',
            price: 0,
            purchaseDate: '',
            usefulLife: 5,
            location: '',
            status: 'Normal',
            custodian: '',
            vendor: '',
            warrantyExpiry: '',
            notes: '',
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'
        };
        setCurrentAsset(newAsset);
        setIsEditModalOpen(true);
    };
    const handleEditAsset = (asset)=>{
        setCurrentAsset(asset);
        setIsEditModalOpen(true);
    };
    const handleRepairRequest = (asset)=>{
        setRepairAsset(asset);
    };
    const handleSaveAsset = async (savedAsset)=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAsset"](savedAsset, user);
            if (result.status === 'success') {
                fetchData();
                setIsEditModalOpen(false);
                toast.success('บันทึกข้อมูลสำเร็จ');
            } else {
                toast.error('ไม่สามารถบันทึกข้อมูลได้: ' + (result.message || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Failed to save asset:', error);
            toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };
    if (!user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        user: user,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditAssetModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isEditModalOpen,
                onClose: ()=>setIsEditModalOpen(false),
                asset: currentAsset,
                onSave: handleSaveAsset,
                categories: categories
            }, void 0, false, {
                fileName: "[project]/src/app/assets/page.jsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            repairAsset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RepairRequestModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                asset: repairAsset,
                onClose: ()=>setRepairAsset(null),
                categories: categories,
                user: user
            }, void 0, false, {
                fileName: "[project]/src/app/assets/page.jsx",
                lineNumber: 147,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AssetRegistry$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                data: assets,
                onEditAsset: handleEditAsset,
                onAddAsset: handleAddAsset,
                onRepairRequest: handleRepairRequest,
                initialFilter: assetFilter,
                onFilterChange: setAssetFilter,
                initialCategoryFilter: categoryFilter,
                onCategoryFilterChange: setCategoryFilter,
                categories: categories
            }, void 0, false, {
                fileName: "[project]/src/app/assets/page.jsx",
                lineNumber: 154,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/assets/page.jsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
function AssetsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/assets/page.jsx",
            lineNumber: 172,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetsContent, {}, void 0, false, {
            fileName: "[project]/src/app/assets/page.jsx",
            lineNumber: 173,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/assets/page.jsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__017a0a5c._.js.map