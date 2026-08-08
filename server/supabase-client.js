import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKey) {
  throw new Error("Missing Supabase env vars for server");
}

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
