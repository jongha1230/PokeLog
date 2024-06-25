import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL: string = import.meta.env
  .VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase: SupabaseClient<Database, "public"> = createClient(
  SUPABASE_PROJECT_URL,
  SUPABASE_ANON_KEY
);

export default supabase;
