import { createBrowserClient } from '@supabase/ssr'


const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createBrowserClient(supabaseURL, supabaseKey);

export default supabase;