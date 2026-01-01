(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/config/supabase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL || 'https://inwlvuavdfuabfayhwgo.supabase.co';
const supabaseAnonKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_sbOZnnDordhzUMqLVCmvWg_wlsLkvAB';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/imageService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/supabase.js [app-client] (ecmascript)");
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).upload(filePath, file, {
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
        const { data: urlData } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).getPublicUrl(filePath);
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
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).remove([
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
    const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET_NAME).getPublicUrl(filePath);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/supabaseService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    "deleteInventoryCycle",
    ()=>deleteInventoryCycle,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$imageService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/imageService.js [app-client] (ecmascript)");
;
;
const login = async (username, password)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').eq('username', username).eq('password', password).limit(1);
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').select('*').order('name');
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
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').update(categoryData).eq('id', category.id).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
        } else {
            // Insert new category
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').insert(categoryData).select().single();
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
        const { data: assets, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('id').eq('category', categoryId).limit(1);
        if (checkError) throw checkError;
        if (assets && assets.length > 0) {
            return {
                status: 'error',
                message: 'ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีทรัพย์สินที่ใช้หมวดหมู่นี้อยู่'
            };
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').delete().eq('id', categoryId);
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('id, code, name, brand, color, serial, price, location, status, purchase_date, category, useful_life, image, is_sticker_printed, notes, custodian, vendor, warranty_expiry').order('code', {
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
                imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$imageService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(imageUrl);
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
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').insert(assetData).select().single();
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
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').update(assetData).eq('id', asset.id).select().single();
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
        const { data: asset, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('code').eq('id', assetId).single();
        if (fetchError) throw fetchError;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').delete().eq('id', assetId);
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
        const { data: asset, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('code, status').eq('id', assetId).single();
        if (fetchError) throw fetchError;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').update({
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('audit_logs').select('id, action_date, action, asset_code, operator, document_ref').order('action_date', {
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('audit_logs').insert({
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
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').upsert(assetData, {
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').order('created_at', {
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
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').update(userData).eq('id', user.id).select().single();
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
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').update(fallbackData).eq('id', user.id).select().single();
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
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').insert(userData).select().single();
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
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').insert(fallbackData).select().single();
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
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').delete().eq('id', userId);
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').insert({
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
            const { error: countsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').insert(countsData);
            if (countsError) {
                console.error('Error creating inventory counts:', countsError);
                // Rollback cycle creation
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').delete().eq('id', data.id);
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
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select(`
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select(`
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').update(updateData).eq('id', cycleId).select().single();
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
const deleteInventoryCycle = async (cycleId)=>{
    try {
        // ลบ inventory_counts ที่เกี่ยวข้องก่อน
        const { error: countsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').delete().eq('cycle_id', cycleId);
        if (countsError) {
            console.error('Error deleting inventory counts:', countsError);
        // ยังคงดำเนินการต่อเพื่อลบ cycle
        }
        // ลบ inventory_assignments ที่เกี่ยวข้อง
        const { error: assignmentsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').delete().eq('cycle_id', cycleId);
        if (assignmentsError) {
            console.error('Error deleting inventory assignments:', assignmentsError);
        // ยังคงดำเนินการต่อเพื่อลบ cycle
        }
        // ลบ cycle
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').delete().eq('id', cycleId);
        if (error) throw error;
        return {
            status: 'success'
        };
    } catch (error) {
        console.error('Error deleting inventory cycle:', error);
        return {
            status: 'error',
            message: error.message
        };
    }
};
const fetchAssetsForCounting = async (cycleId, filters = {})=>{
    try {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select(`
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
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('id', countData.id).select().single();
            if (error) throw error;
            result = {
                status: 'success',
                data
            };
        } else {
            // Insert new count หรือ Upsert ถ้ามี record อยู่แล้ว
            // ตรวจสอบว่ามี record อยู่แล้วหรือไม่ (สำหรับ asset นี้ใน cycle นี้)
            const { data: existingCount } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id').eq('cycle_id', countData.cycle_id).eq('asset_id', countData.asset_id).maybeSingle();
            // ตรวจสอบว่าเป็นการตรวจนับครั้งแรกในรอบนี้หรือไม่
            const { data: existingCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id').eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null).limit(1);
            isFirstCount = !existingCounts || existingCounts.length === 0;
            let insertOrUpdateData;
            if (existingCount && existingCount.id) {
                // มี record อยู่แล้ว (แต่อาจจะยังไม่มีการตรวจนับ) - Update
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('id', existingCount.id).select().single();
                if (error) throw error;
                result = {
                    status: 'success',
                    data
                };
            } else {
                // ไม่มี record - Insert ใหม่
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').insert({
                    cycle_id: countData.cycle_id,
                    asset_id: countData.asset_id,
                    asset_code: countData.asset_code,
                    ...updateData
                }).select().single();
                if (error) {
                    // ถ้า error เป็น duplicate key ให้ลอง update แทน
                    if (error.code === '23505' || error.message?.includes('duplicate')) {
                        const { data: updateData, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('cycle_id', countData.cycle_id).eq('asset_id', countData.asset_id).select().single();
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
            const { data: cycle } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select('status').eq('id', countData.cycle_id).single();
            if (cycle && cycle.status === 'Planning') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').update({
                    status: 'In Progress'
                }).eq('id', countData.cycle_id);
            }
            // 2. อัพเดท Assignment Status จาก Pending → In Progress
            const { data: assignments } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').select('id, status').eq('cycle_id', countData.cycle_id).eq('assigned_to', countData.counted_by).eq('status', 'Pending');
            if (assignments && assignments.length > 0) {
                for (const assignment of assignments){
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').update({
                        status: 'In Progress',
                        started_at: new Date().toISOString()
                    }).eq('id', assignment.id);
                }
            }
        }
        // 3. อัพเดท counted_assets ใน assignments
        const { data: countStats } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id', {
            count: 'exact',
            head: false
        }).eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null);
        const countedCount = countStats?.length || 0;
        // อัพเดททุก assignment ที่เกี่ยวข้อง
        const { data: allAssignments } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').select('id, total_assets').eq('cycle_id', countData.cycle_id);
        if (allAssignments) {
            for (const assignment of allAssignments){
                // นับเฉพาะ assets ที่อยู่ใน scope ของ assignment นี้
                let assignmentCount = countedCount;
                // ถ้ามี filter ให้นับเฉพาะที่ตรงกับ filter
                if (assignment.location_filter || assignment.category_filter) {
                    const { data: filteredCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select(`
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').update(updateData).eq('id', assignment.id);
            }
        }
        // 4. ตรวจสอบว่าตรวจนับครบทุกรายการหรือไม่ (สำหรับ Cycle)
        const { data: totalCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id', {
            count: 'exact',
            head: false
        }).eq('cycle_id', countData.cycle_id);
        const { data: completedCounts } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('id', {
            count: 'exact',
            head: false
        }).eq('cycle_id', countData.cycle_id).not('counted_status', 'is', null);
        const total = totalCounts?.length || 0;
        const completed = completedCounts?.length || 0;
        // ถ้าตรวจนับครบแล้ว ให้เปลี่ยน Cycle Status เป็น Completed (ถ้ายังไม่เป็น)
        if (total > 0 && completed >= total) {
            const { data: cycle } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_cycles').select('status').eq('id', countData.cycle_id).single();
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
                const { data: userData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('name, username').eq('id', countData.counted_by).single();
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select(`
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
        const { data: oldAsset } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('location').eq('id', adjustmentData.asset_id).single();
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
            const { error: assetError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').update(assetUpdates).eq('id', adjustmentData.asset_id);
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
            const { data: asset } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('location, status').eq('id', adjustmentData.asset_id).single();
            if (asset) {
                updateData.location_match = adjustmentData.new_location === asset.location;
                updateData.status_match = !adjustmentData.new_status || adjustmentData.new_status === asset.status;
            }
        }
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').update(updateData).eq('id', adjustmentData.count_id).select().single();
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
                const { data: userData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('name, username').eq('id', adjustmentData.approved_by).single();
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
        const { data: counts, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_counts').select('*').eq('cycle_id', cycleId);
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
        let assetQuery = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('assets').select('id', {
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
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').insert({
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
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('inventory_assignments').select(`
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LoginPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const LoginPage = ({ onLogin })=>{
    _s();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('admin');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('123456');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"](username, password);
            if (result.success) {
                onLogin(result.user);
            } else {
                if (result.message && (result.message.includes('relation') || result.message.includes('does not exist') || result.message.includes('table not found') || result.message.includes('PGRST116'))) {
                    console.warn('Supabase tables not found, using mock login');
                    onLogin({
                        id: 1,
                        username: username,
                        name: 'Administrator',
                        role: 'Admin'
                    });
                } else if (result.message && result.message.includes('Invalid credentials')) {
                    if (username === 'admin' && password === '123456') {
                        console.warn('User not found in Supabase, using mock login for admin');
                        onLogin({
                            id: 1,
                            username: username,
                            name: 'Administrator',
                            role: 'Admin'
                        });
                    } else {
                        alert('Login failed: ' + (result.message || 'Invalid credentials'));
                    }
                } else {
                    alert('Login failed: ' + (result.message || 'Invalid credentials'));
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            console.warn('Supabase connection error, using mock login');
            onLogin({
                id: 1,
                username: username,
                name: 'Administrator',
                role: 'Admin'
            });
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"
            }, void 0, false, {
                fileName: "[project]/src/components/LoginPage.jsx",
                lineNumber: 66,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50"
            }, void 0, false, {
                fileName: "[project]/src/components/LoginPage.jsx",
                lineNumber: 67,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-5xl flex bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative z-10 m-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex flex-col flex-1 bg-slate-900 p-12 text-white relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 h-full flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-12",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 bg-primary-600 rounded-lg flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    className: "w-7 h-7 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 75,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                lineNumber: 74,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-2xl font-bold tracking-tight",
                                                        children: "AssetTrack"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 78,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400 font-medium uppercase tracking-wide",
                                                        children: "ระบบจัดการทรัพย์สิน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 79,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                lineNumber: 77,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LoginPage.jsx",
                                        lineNumber: 73,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 72,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-3xl font-bold leading-tight mb-4",
                                                    children: [
                                                        "ระบบบริหารจัดการ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 87,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-primary-400",
                                                            children: "ครุภัณฑ์และทรัพย์สิน"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 88,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 86,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-300 text-base leading-relaxed max-w-md",
                                                    children: "สำหรับสหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 90,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 85,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4 p-4 rounded-lg bg-slate-800/50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                className: "w-5 h-5 text-primary-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                                lineNumber: 98,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 97,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-semibold text-sm mb-1 text-white",
                                                                    children: "ความปลอดภัยสูง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "ระบบเข้ารหัสและควบคุมการเข้าถึง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                                    lineNumber: 102,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 100,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 96,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4 p-4 rounded-lg bg-slate-800/50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                className: "w-5 h-5 text-primary-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                                lineNumber: 107,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 106,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-semibold text-sm mb-1 text-white",
                                                                    children: "การเข้าถึงที่ควบคุม"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                                    lineNumber: 110,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "เฉพาะผู้ใช้ที่ได้รับอนุญาตเท่านั้น"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                                    lineNumber: 111,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 109,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 105,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 95,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 84,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-auto pt-8 border-t border-slate-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "© 2024 สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LoginPage.jsx",
                                        lineNumber: 118,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LoginPage.jsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoginPage.jsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 lg:flex-[0.9] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-md mx-auto w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:hidden mb-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    className: "w-6 h-6 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 130,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                lineNumber: 129,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-xl font-bold text-slate-900",
                                                        children: "AssetTrack"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 133,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500 font-medium",
                                                        children: "ระบบจัดการทรัพย์สิน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 134,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                lineNumber: 132,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LoginPage.jsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold text-slate-900 mb-2",
                                            children: "เข้าสู่ระบบ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 140,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-600 text-sm",
                                            children: "กรุณาเข้าสู่ระบบด้วยบัญชีผู้ใช้ของคุณ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 141,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 139,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-semibold text-slate-700 block",
                                                    children: "ชื่อผู้ใช้ / อีเมล"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 146,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 148,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            required: true,
                                                            type: "text",
                                                            placeholder: "กรุณากรอกชื่อผู้ใช้หรืออีเมล",
                                                            className: "w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 placeholder:text-slate-400",
                                                            value: username,
                                                            onChange: (e)=>setUsername(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 149,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 147,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 145,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-semibold text-slate-700 block",
                                                    children: "รหัสผ่าน"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 161,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 163,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            required: true,
                                                            type: showPassword ? "text" : "password",
                                                            placeholder: "กรุณากรอกรหัสผ่าน",
                                                            className: "w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 placeholder:text-slate-400",
                                                            value: password,
                                                            onChange: (e)=>setPassword(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 164,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setShowPassword(!showPassword),
                                                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1",
                                                            children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                className: "w-5 h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                                lineNumber: 177,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "w-5 h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                                lineNumber: 177,
                                                                columnNumber: 90
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 172,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 162,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 160,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between py-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-800 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            className: "w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-2 focus:ring-primary-500/20"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 184,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium",
                                                            children: "จดจำการเข้าสู่ระบบ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LoginPage.jsx",
                                                            lineNumber: 185,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 183,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    className: "text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors",
                                                    children: "ลืมรหัสผ่าน?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LoginPage.jsx",
                                                    lineNumber: 187,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 182,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: isLoading,
                                            className: `w-full py-3 rounded-lg bg-primary-600 text-white font-semibold shadow-md hover:bg-primary-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-80 cursor-wait' : ''}`,
                                            style: {
                                                color: '#ffffff',
                                                backgroundColor: '#2563eb'
                                            },
                                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin",
                                                        style: {
                                                            borderColor: '#ffffff',
                                                            borderTopColor: 'transparent'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 201,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#ffffff',
                                                            fontWeight: 600
                                                        },
                                                        children: "กำลังเข้าสู่ระบบ..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 202,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#ffffff',
                                                            fontWeight: 600
                                                        },
                                                        children: "เข้าสู่ระบบ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 206,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "w-4 h-4",
                                                        style: {
                                                            color: '#ffffff',
                                                            stroke: '#ffffff',
                                                            fill: 'none'
                                                        },
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LoginPage.jsx",
                                                        lineNumber: 207,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LoginPage.jsx",
                                            lineNumber: 190,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 144,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-10 pt-6 border-t border-slate-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-2 text-xs text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                className: "w-4 h-4 text-primary-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                lineNumber: 215,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: "การเข้าถึงระบบนี้จำกัดเฉพาะผู้ใช้ที่ได้รับอนุญาตเท่านั้น"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LoginPage.jsx",
                                                lineNumber: 216,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LoginPage.jsx",
                                        lineNumber: 214,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LoginPage.jsx",
                                    lineNumber: 213,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LoginPage.jsx",
                            lineNumber: 126,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoginPage.jsx",
                        lineNumber: 125,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LoginPage.jsx",
                lineNumber: 69,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-6 w-full text-center z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-500 text-xs",
                    children: "© 2024 สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด • เวอร์ชัน 1.0.4"
                }, void 0, false, {
                    fileName: "[project]/src/components/LoginPage.jsx",
                    lineNumber: 224,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/LoginPage.jsx",
                lineNumber: 223,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LoginPage.jsx",
        lineNumber: 65,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LoginPage, "6K/m5tu8djt+f5MwlRfFcNt16EY=");
_c = LoginPage;
const __TURBOPACK__default__export__ = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/login/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Login
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoginPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoginPage.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Login() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleLogin = (user)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoginPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        onLogin: handleLogin
    }, void 0, false, {
        fileName: "[project]/src/app/login/page.jsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_s(Login, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Login;
var _c;
__turbopack_context__.k.register(_c, "Login");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_337d4bcc._.js.map