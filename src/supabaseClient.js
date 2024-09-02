// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fantnqurrcwcyvewzedc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbnRucXVycmN3Y3l2ZXd6ZWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2Mjk1NjEsImV4cCI6MjAzOTIwNTU2MX0.VLIF1DMIo7PYxYmVCjuhcTj6vP3-0JNh2lrK4G82ADg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
