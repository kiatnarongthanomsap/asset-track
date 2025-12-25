import { supabase } from '../config/supabase'

/**
 * Supabase Service Layer
 * ฟังก์ชันสำหรับเชื่อมต่อกับ Supabase Database
 */

// ============================================================================
// Authentication
// ============================================================================

export const login = async (username, password) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .limit(1)

    if (error) {
      console.error('Supabase login error:', error)
      // ถ้าเป็น error เกี่ยวกับ table ไม่มี ให้ return false
      if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
        return { success: false, message: 'Database table not found. Please run setup SQL first.' }
      }
      throw error
    }

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (data && data.length > 0) {
      return { success: true, user: data[0] }
    }

    return { success: false, message: 'Invalid credentials' }
  } catch (error) {
    console.error('Login error:', error)
    // ถ้าเป็น error เกี่ยวกับ table ไม่มี ให้ return message ที่ชัดเจน
    if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
      return { success: false, message: 'Database table not found. Please run setup SQL first.' }
    }
    return { success: false, message: error.message || 'Login failed' }
  }
}

// ============================================================================
// Categories
// ============================================================================

export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Supabase categories error:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Return empty array instead of throwing to allow fallback
    return []
  }
}

// ============================================================================
// Assets
// ============================================================================

export const fetchAssets = async () => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase assets error:', error)
      throw error
    }

    // แปลงข้อมูลให้ตรงกับรูปแบบที่แอปใช้
    return (data || []).map(asset => ({
      id: asset.id,
      code: asset.code,
      name: asset.name,
      brand: asset.brand,
      serial: asset.serial,
      price: parseFloat(asset.price) || 0,
      location: asset.location,
      status: asset.status,
      purchaseDate: asset.purchase_date,
      category: asset.category,
      usefulLife: asset.useful_life || 5,
      image: asset.image,
      isStickerPrinted: asset.is_sticker_printed || false
    }))
  } catch (error) {
    console.error('Error fetching assets:', error)
    // Return empty array instead of throwing to allow fallback
    return []
  }
}

export const saveAsset = async (asset) => {
  try {
    const assetData = {
      code: asset.code,
      name: asset.name,
      brand: asset.brand || null,
      serial: asset.serial || null,
      price: asset.price || 0,
      location: asset.location || null,
      status: asset.status || 'Normal',
      purchase_date: asset.purchaseDate || null,
      category: asset.category || null,
      useful_life: asset.usefulLife || 5,
      image: asset.image || null,
      is_sticker_printed: asset.isStickerPrinted || false
    }

    let result

    if (asset.id && !isNaN(asset.id)) {
      // Update existing asset
      const { data, error } = await supabase
        .from('assets')
        .update(assetData)
        .eq('id', asset.id)
        .select()
        .single()

      if (error) throw error
      result = { status: 'success', data }
    } else {
      // Insert new asset
      const { data, error } = await supabase
        .from('assets')
        .insert(assetData)
        .select()
        .single()

      if (error) throw error
      result = { status: 'success', data }
    }

    return result
  } catch (error) {
    console.error('Error saving asset:', error)
    return { status: 'error', message: error.message }
  }
}

export const deleteAsset = async (assetId) => {
  try {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', assetId)

    if (error) throw error
    return { status: 'success' }
  } catch (error) {
    console.error('Error deleting asset:', error)
    return { status: 'error', message: error.message }
  }
}

export const updateAssetStatus = async (assetId, newStatus) => {
  try {
    const { error } = await supabase
      .from('assets')
      .update({ status: newStatus })
      .eq('id', assetId)

    if (error) throw error
    return { status: 'success' }
  } catch (error) {
    console.error('Error updating asset status:', error)
    return { status: 'error', message: error.message }
  }
}

// ============================================================================
// Audit Logs
// ============================================================================

export const fetchAuditLogs = async () => {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('action_date', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Supabase audit logs error:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    // Return empty array instead of throwing to allow fallback
    return []
  }
}

export const createAuditLog = async (logData) => {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        action_date: logData.action_date || new Date().toISOString().split('T')[0],
        action: logData.action,
        asset_code: logData.asset_code || null,
        operator: logData.operator || null,
        document_ref: logData.document_ref || null
      })
      .select()
      .single()

    if (error) throw error
    return { status: 'success', data }
  } catch (error) {
    console.error('Error creating audit log:', error)
    return { status: 'error', message: error.message }
  }
}

// ============================================================================
// Bulk Import
// ============================================================================

export const bulkImportAssets = async (assets) => {
  try {
    const assetsData = assets.map(asset => ({
      code: asset.code,
      name: asset.name,
      brand: asset.brand || null,
      serial: asset.serial || null,
      price: parseFloat(asset.price) || 0,
      location: asset.location || null,
      status: asset.status || 'Normal',
      purchase_date: asset.purchase_date || asset.purchaseDate || null,
      category: asset.category || null,
      useful_life: asset.useful_life || asset.usefulLife || 5,
      image: asset.image || null,
      is_sticker_printed: asset.is_sticker_printed || asset.isStickerPrinted || false
    }))

    let inserted = 0
    let failed = 0
    const errors = []

    // Import ทีละรายการเพื่อจัดการ conflict
    for (const assetData of assetsData) {
      try {
        // ใช้ upsert เพื่อจัดการกรณี code ซ้ำ
        const { data, error } = await supabase
          .from('assets')
          .upsert(assetData, {
            onConflict: 'code',
            ignoreDuplicates: false
          })
          .select()
          .single()

        if (error) {
          // ถ้าเป็น duplicate key error ไม่นับเป็น error
          if (error.code === '23505') {
            // Duplicate key - skip
            failed++
          } else {
            throw error
          }
        } else {
          inserted++
        }
      } catch (error) {
        failed++
        errors.push({ code: assetData.code, error: error.message })
      }
    }

    return {
      status: 'success',
      inserted,
      failed,
      total: assets.length,
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error) {
    console.error('Error bulk importing assets:', error)
    return {
      status: 'error',
      message: error.message,
      inserted: 0,
      total: assets.length
    }
  }
}

