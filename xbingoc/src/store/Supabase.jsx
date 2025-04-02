import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pcwrqdoiprviastgslfk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjd3JxZG9pcHJ2aWFzdGdzbGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3ODg1NzEsImV4cCI6MjA0NTM2NDU3MX0.Vs4W2S9nIICET1Vlq-EItX8W94kXXbf9bSzihJhJVnI"
export  const supabase = createClient(supabaseUrl, supabaseKey)