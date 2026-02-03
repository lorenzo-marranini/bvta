import { createClient } from '@supabase/supabase-js'

// Incolla qui i dati che hai copiato (in futuro useremo le variabili d'ambiente)
const supabaseUrl = 'https://vhqpzjlhvsrsrdbxcpwn.supabase.co'
const supabaseKey = 'sb_publishable_AiZT8vHnFzjwn5lp1rqX6A_g5mF2xqk'

export const supabase = createClient(supabaseUrl, supabaseKey)