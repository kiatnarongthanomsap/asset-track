import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vyeajefodhcwaanuexzg.supabase.co'
const supabaseAnonKey = 'sb_publishable_mub-bnzYF8bBKnq2b2WXzw_PXKFmslc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

