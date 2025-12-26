import { supabase } from '../config/supabase'

/**
 * Image Service for Supabase Storage
 * จัดการการอัพโหลดและลบรูปภาพ
 */

const BUCKET_NAME = 'asset-images'

/**
 * Upload image to Supabase Storage
 * @param {File} file - ไฟล์รูปภาพ
 * @param {string} assetCode - รหัสครุภัณฑ์ (ใช้เป็นชื่อไฟล์)
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export const uploadImage = async (file, assetCode) => {
  try {
    // ตรวจสอบว่า file และ assetCode มีค่าหรือไม่
    if (!file) {
      return { success: false, error: 'กรุณาเลือกไฟล์รูปภาพ' }
    }

    if (!assetCode || assetCode.trim() === '') {
      return { success: false, error: 'กรุณากรอกรหัสทรัพย์สินก่อนอัพโหลดรูปภาพ' }
    }

    // สร้างชื่อไฟล์จาก asset code และ timestamp
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    // ทำความสะอาด asset code เพื่อใช้เป็นชื่อไฟล์ (ลบอักขระพิเศษ)
    const cleanCode = assetCode.replace(/[^a-zA-Z0-9-_]/g, '_')
    const fileName = `${cleanCode}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    console.log('Uploading image:', { fileName, filePath, fileSize: file.size })

    // ลองอัพโหลดโดยตรง
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true // อนุญาตให้ overwrite ถ้ามีไฟล์ชื่อเดียวกัน
      })

    if (error) {
      console.error('Upload error details:', {
        message: error.message,
        statusCode: error.statusCode,
        error: error
      })
      
      // ถ้าเป็น error เกี่ยวกับ bucket ไม่มี
      if (error.message?.includes('Bucket not found') || 
          error.message?.includes('not found') ||
          error.statusCode === 404 ||
          error.message?.includes('does not exist') ||
          error.message?.includes('The resource was not found')) {
        return { 
          success: false, 
          error: `ไม่พบ Storage Bucket '${BUCKET_NAME}'\n\nวิธีแก้:\n1. เปิด Supabase Dashboard → Storage\n2. คลิก "New bucket"\n3. ตั้งชื่อ: "asset-images"\n4. เลือก "Public bucket"\n5. คลิก "Create bucket"` 
        }
      }
      
      // ถ้าเป็น error เกี่ยวกับ permissions
      if (error.message?.includes('permission') || 
          error.message?.includes('policy') ||
          error.message?.includes('denied') ||
          error.message?.includes('forbidden') ||
          error.statusCode === 403 ||
          error.message?.includes('new row violates row-level security') ||
          error.message?.includes('Row Level Security')) {
        return { 
          success: false, 
          error: `ไม่มีสิทธิ์อัพโหลดไฟล์\n\nวิธีแก้:\n1. เปิด Supabase Dashboard → SQL Editor\n2. รันไฟล์: storage_policies_public.sql\n3. หรือไปที่ Storage → Policies → สร้าง policy ใหม่` 
        }
      }
      
      // Error อื่นๆ
      return { 
        success: false, 
        error: `ไม่สามารถอัพโหลดรูปภาพได้: ${error.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ'}` 
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    if (!urlData || !urlData.publicUrl) {
      return { 
        success: false, 
        error: 'อัพโหลดสำเร็จแต่ไม่สามารถสร้าง URL ได้' 
      }
    }

    console.log('Upload successful:', urlData.publicUrl)

    return {
      success: true,
      url: urlData.publicUrl
    }
  } catch (error) {
    console.error('Upload exception:', error)
    return { 
      success: false, 
      error: `เกิดข้อผิดพลาด: ${error.message || 'ไม่ทราบสาเหตุ'}` 
    }
  }
}

/**
 * Delete image from Supabase Storage
 * @param {string} imageUrl - URL ของรูปภาพ
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteImage = async (imageUrl) => {
  try {
    // Extract file path from URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const urlParts = imageUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]

    if (!fileName) {
      return { success: false, error: 'Invalid image URL' }
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get public URL for an image
 * @param {string} filePath - Path ของไฟล์ใน storage
 * @returns {string} Public URL
 */
export const getImageUrl = (filePath) => {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)
  
  return data.publicUrl
}

/**
 * Validate image file
 * @param {File} file - ไฟล์ที่ต้องการตรวจสอบ
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
export const validateImageFile = (file) => {
  // ตรวจสอบประเภทไฟล์
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WEBP, GIF)' }
  }

  // ตรวจสอบขนาดไฟล์ (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'ขนาดไฟล์ต้องไม่เกิน 10MB' }
  }

  return { valid: true }
}
