import { supabase } from '../config/supabase'
import { getImageUrl } from './imageService'

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
    return (data || []).map(asset => {
      // แปลง image path เป็น public URL จาก Supabase Storage
      // - ถ้า image เป็น full URL (http/https) จะใช้ตามเดิม
      // - ถ้า image เป็น filename/path (เช่น "A001-1234567890.jpg") จะแปลงเป็น public URL
      let imageUrl = asset.image || null
      
      if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        // image เป็น filename/path ใน Supabase Storage -> แปลงเป็น public URL
        imageUrl = getImageUrl(imageUrl)
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
      }
    })
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
    }))

// ============================================================================
// User Management
// ============================================================================

export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { status: 'success', data: data || [] }
  } catch (error) {
    console.error('Error fetching users:', error)
    return { status: 'error', message: error.message, data: [] }
  }
}

export const saveUser = async (user) => {
  try {
    const userData = {
      username: user.username,
      password: user.password || undefined, // Only update password if provided
      name: user.name || null,
      role: user.role || 'Viewer',
      email: user.email || null,
      status: user.status || 'Active'
    }

    let result

    if (user.id && !isNaN(user.id)) {
      // Update existing user
      if (!userData.password) {
        // Remove password from update if not provided
        delete userData.password
      }
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      result = { status: 'success', data }
    } else {
      // Insert new user
      if (!userData.password) {
        return { status: 'error', message: 'Password is required for new users' }
      }
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single()

      if (error) throw error
      result = { status: 'success', data }
    }

    return result
  } catch (error) {
    console.error('Error saving user:', error)
    return { status: 'error', message: error.message }
  }
}

export const deleteUser = async (userId) => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)

    if (error) throw error
    return { status: 'success' }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { status: 'error', message: error.message }
  }
}

// ============================================================================
// Permission Check Utilities
// ============================================================================

export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false
  
  const rolePermissions = {
    'Admin': ['manage_assets', 'manage_users', 'view_reports', 'settings', 'delete_assets', 'import_assets'],
    'Manager': ['manage_assets', 'view_reports', 'import_assets'],
    'Staff': ['manage_assets', 'view_reports'],
    'Viewer': ['view_reports']
  }

  const permissions = rolePermissions[user.role] || []
  return permissions.includes(permission)
}

export const canManageUsers = (user) => {
  return hasPermission(user, 'manage_users')
}

export const canManageAssets = (user) => {
  return hasPermission(user, 'manage_assets')
}

export const canDeleteAssets = (user) => {
  return hasPermission(user, 'delete_assets')
}

export const canImportAssets = (user) => {
  return hasPermission(user, 'import_assets')
}

export const canAccessSettings = (user) => {
  return hasPermission(user, 'settings')
}

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

// ============================================================================
// Inventory Management (Annual Asset Counting)
// ============================================================================

/**
 * สร้างรอบการตรวจนับใหม่
 */
export const createInventoryCycle = async (cycleData) => {
  try {
    const { data, error } = await supabase
      .from('inventory_cycles')
      .insert({
        year: cycleData.year,
        cycle_name: cycleData.cycle_name,
        start_date: cycleData.start_date,
        end_date: cycleData.end_date,
        status: cycleData.status || 'Planning',
        assigned_to: cycleData.assigned_to || null,
        notes: cycleData.notes || null,
        created_by: cycleData.created_by
      })
      .select()
      .single()

    if (error) throw error

    // สร้าง inventory_counts records สำหรับทรัพย์สินทั้งหมด (หรือตาม filter)
    if (cycleData.assets && cycleData.assets.length > 0) {
      const countsData = cycleData.assets.map(asset => ({
        cycle_id: data.id,
        asset_id: asset.id,
        asset_code: asset.code
      }))

      const { error: countsError } = await supabase
        .from('inventory_counts')
        .insert(countsData)

      if (countsError) {
        console.error('Error creating inventory counts:', countsError)
        // Rollback cycle creation
        await supabase.from('inventory_cycles').delete().eq('id', data.id)
        throw countsError
      }
    }

    return { status: 'success', data }
  } catch (error) {
    console.error('Error creating inventory cycle:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * ดึงข้อมูลรอบการตรวจนับทั้งหมด
 */
export const fetchInventoryCycles = async (year = null) => {
  try {
    let query = supabase
      .from('inventory_cycles')
      .select(`
        *,
        created_by_user:users!inventory_cycles_created_by_fkey(id, name, username),
        assigned_to_user:users!inventory_cycles_assigned_to_fkey(id, name, username)
      `)
      .order('created_at', { ascending: false })

    if (year) {
      query = query.eq('year', year)
    }

    const { data, error } = await query

    if (error) throw error
    return { status: 'success', data: data || [] }
  } catch (error) {
    console.error('Error fetching inventory cycles:', error)
    return { status: 'error', message: error.message, data: [] }
  }
}

/**
 * ดึงข้อมูลรอบการตรวจนับตาม ID
 */
export const fetchInventoryCycle = async (cycleId) => {
  try {
    const { data, error } = await supabase
      .from('inventory_cycles')
      .select(`
        *,
        created_by_user:users!inventory_cycles_created_by_fkey(id, name, username),
        assigned_to_user:users!inventory_cycles_assigned_to_fkey(id, name, username)
      `)
      .eq('id', cycleId)
      .single()

    if (error) throw error
    return { status: 'success', data }
  } catch (error) {
    console.error('Error fetching inventory cycle:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * อัพเดทสถานะรอบการตรวจนับ
 */
export const updateInventoryCycle = async (cycleId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('inventory_cycles')
      .update(updateData)
      .eq('id', cycleId)
      .select()
      .single()

    if (error) throw error
    return { status: 'success', data }
  } catch (error) {
    console.error('Error updating inventory cycle:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * ดึงรายการทรัพย์สินที่ต้องตรวจนับในรอบนี้
 */
export const fetchAssetsForCounting = async (cycleId, filters = {}) => {
  try {
    let query = supabase
      .from('inventory_counts')
      .select(`
        *,
        asset:assets(*)
      `)
      .eq('cycle_id', cycleId)

    if (filters.counted_status) {
      query = query.eq('counted_status', filters.counted_status)
    } else if (filters.pending_only) {
      query = query.is('counted_status', null)
    }

    if (filters.location) {
      query = query.eq('asset.location', filters.location)
    }

    if (filters.category) {
      query = query.eq('asset.category', filters.category)
    }

    const { data, error } = await query

    if (error) throw error

    // แปลงข้อมูลให้ตรงกับรูปแบบที่ใช้
    const formattedData = (data || []).map(item => ({
      ...item,
      asset: item.asset ? {
        ...item.asset,
        purchaseDate: item.asset.purchase_date,
        usefulLife: item.asset.useful_life || 5,
        isStickerPrinted: item.asset.is_sticker_printed || false
      } : null
    }))

    return { status: 'success', data: formattedData }
  } catch (error) {
    console.error('Error fetching assets for counting:', error)
    return { status: 'error', message: error.message, data: [] }
  }
}

/**
 * บันทึกผลการตรวจนับ
 */
export const saveInventoryCount = async (countData) => {
  try {
    const asset = countData.asset
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
    }

    // ตรวจสอบความแตกต่าง
    if (asset) {
      updateData.location_match = (countData.counted_location || asset.location) === asset.location
      updateData.status_match = true // ต้องตรวจสอบเพิ่มเติม
      updateData.requires_adjustment = !updateData.location_match || !updateData.status_match
    }

    let result
    if (countData.id) {
      // Update existing count
      const { data, error } = await supabase
        .from('inventory_counts')
        .update(updateData)
        .eq('id', countData.id)
        .select()
        .single()

      if (error) throw error
      result = { status: 'success', data }
    } else {
      // Insert new count
      const { data, error } = await supabase
        .from('inventory_counts')
        .insert({
          cycle_id: countData.cycle_id,
          asset_id: countData.asset_id,
          asset_code: countData.asset_code,
          ...updateData
        })
        .select()
        .single()

      if (error) throw error
      result = { status: 'success', data }
    }

    return result
  } catch (error) {
    console.error('Error saving inventory count:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * ดึงรายการที่แตกต่าง (Discrepancies)
 */
export const fetchDiscrepancies = async (cycleId) => {
  try {
    const { data, error } = await supabase
      .from('inventory_counts')
      .select(`
        *,
        asset:assets(*)
      `)
      .eq('cycle_id', cycleId)
      .or('requires_adjustment.eq.true,location_match.eq.false,status_match.eq.false')

    if (error) throw error

    const formattedData = (data || []).map(item => ({
      ...item,
      asset: item.asset ? {
        ...item.asset,
        purchaseDate: item.asset.purchase_date,
        usefulLife: item.asset.useful_life || 5
      } : null
    }))

    return { status: 'success', data: formattedData }
  } catch (error) {
    console.error('Error fetching discrepancies:', error)
    return { status: 'error', message: error.message, data: [] }
  }
}

/**
 * แก้ไขข้อมูลทรัพย์สินจากการตรวจนับ
 */
export const applyInventoryAdjustment = async (adjustmentData) => {
  try {
    // อัพเดทข้อมูลทรัพย์สิน
    const assetUpdates = {}
    if (adjustmentData.new_location) assetUpdates.location = adjustmentData.new_location
    if (adjustmentData.new_status) assetUpdates.status = adjustmentData.new_status

    if (Object.keys(assetUpdates).length > 0) {
      const { error: assetError } = await supabase
        .from('assets')
        .update(assetUpdates)
        .eq('id', adjustmentData.asset_id)

      if (assetError) throw assetError
    }

    // อัพเดท inventory_count
    const { data, error } = await supabase
      .from('inventory_counts')
      .update({
        adjustment_reason: adjustmentData.reason,
        adjustment_approved_by: adjustmentData.approved_by,
        adjustment_approved_at: new Date().toISOString(),
        requires_adjustment: false
      })
      .eq('id', adjustmentData.count_id)
      .select()
      .single()

    if (error) throw error

    // สร้าง audit log
    await createAuditLog({
      action: `Inventory Adjustment: ${adjustmentData.reason}`,
      asset_code: adjustmentData.asset_code,
      operator: adjustmentData.approved_by?.toString() || 'System',
      document_ref: `Cycle ${adjustmentData.cycle_id}`
    })

    return { status: 'success', data }
  } catch (error) {
    console.error('Error applying inventory adjustment:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * สรุปผลการตรวจนับ
 */
export const getInventorySummary = async (cycleId) => {
  try {
    const { data: counts, error } = await supabase
      .from('inventory_counts')
      .select('*')
      .eq('cycle_id', cycleId)

    if (error) throw error

    const total = counts.length
    const counted = counts.filter(c => c.counted_status).length
    const found = counts.filter(c => c.counted_status === 'Found').length
    const notFound = counts.filter(c => c.counted_status === 'Not Found').length
    const damaged = counts.filter(c => c.counted_status === 'Damaged').length
    const moved = counts.filter(c => c.counted_status === 'Moved').length
    const matches = counts.filter(c => c.location_match && c.status_match).length
    const requiresAdjustment = counts.filter(c => c.requires_adjustment).length

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
        progressPercent: total > 0 ? (counted / total) * 100 : 0,
        accuracyPercent: counted > 0 ? (matches / counted) * 100 : 0
      }
    }
  } catch (error) {
    console.error('Error getting inventory summary:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * สร้างการมอบหมายงานตรวจนับ
 */
export const createInventoryAssignment = async (assignmentData) => {
  try {
    // นับจำนวนทรัพย์สินที่ต้องตรวจนับตาม filter
    let assetQuery = supabase.from('assets').select('id', { count: 'exact', head: true })
    
    if (assignmentData.location_filter) {
      assetQuery = assetQuery.eq('location', assignmentData.location_filter)
    }
    if (assignmentData.category_filter) {
      assetQuery = assetQuery.eq('category', assignmentData.category_filter)
    }

    const { count: totalAssets } = await assetQuery

    const { data, error } = await supabase
      .from('inventory_assignments')
      .insert({
        cycle_id: assignmentData.cycle_id,
        assigned_to: assignmentData.assigned_to,
        location_filter: assignmentData.location_filter || null,
        category_filter: assignmentData.category_filter || null,
        status: 'Pending',
        total_assets: totalAssets || 0,
        counted_assets: 0
      })
      .select()
      .single()

    if (error) throw error
    return { status: 'success', data }
  } catch (error) {
    console.error('Error creating inventory assignment:', error)
    return { status: 'error', message: error.message }
  }
}

/**
 * ดึงการมอบหมายงานตรวจนับ
 */
export const fetchInventoryAssignments = async (cycleId = null) => {
  try {
    let query = supabase
      .from('inventory_assignments')
      .select(`
        *,
        assigned_to_user:users!inventory_assignments_assigned_to_fkey(id, name, username)
      `)
      .order('created_at', { ascending: false })

    if (cycleId) {
      query = query.eq('cycle_id', cycleId)
    }

    const { data, error } = await query

    if (error) throw error
    return { status: 'success', data: data || [] }
  } catch (error) {
    console.error('Error fetching inventory assignments:', error)
    return { status: 'error', message: error.message, data: [] }
  }
}

