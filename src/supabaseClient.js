
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://awcdwtliyddvfhbjdetd.supabase.co'
const supabaseKey = 'sb_publishable_gHdGd1AlbQ7O3uxn1Ap8CQ_YkdvV_Lh'

export const supabase = createClient(supabaseUrl, supabaseKey)
