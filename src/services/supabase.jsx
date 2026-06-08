import { createClient } from "@supabase/supabase-js";

const SupabaseKey = "sb_publishable_zXxI-OquKAISiXFzUPYAYg_a2opYNLI"
const SupabaseLink = "https://rkztjhneuqypulnywewa.supabase.co"

const supabase = createClient(SupabaseLink, SupabaseKey)

export default supabase