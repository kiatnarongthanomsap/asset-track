import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://inwlvuavdfuabfayhwgo.supabase.co'
const supabaseAnonKey = 'sb_publishable_sbOZnnDordhzUMqLVCmvWg_wlsLkvAB'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

