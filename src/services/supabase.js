import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tnbnzgnztbodhoyhfxmd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuYm56Z256dGJvZGhveWhmeG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MzQ0OTgsImV4cCI6MjAyNzIxMDQ5OH0.Ex2uejwISb1FECBTfwHG-6TtKHU-VsyAFFJjZ8ljEM4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
