import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqqkcsykbhlxbbistbru.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcWtjc3lrYmhseGJiaXN0YnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NDYxMzksImV4cCI6MjA0NjIyMjEzOX0.wRuNkNsHFsEUoSpZm8LR_N5p9_1HlSatvpb4g4c4T5w"
export  const supabase4 = createClient(supabaseUrl, supabaseKey)