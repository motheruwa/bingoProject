import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czuwmutuqgoyhrwtmrio.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dXdtdXR1cWdveWhyd3RtcmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDc3MDcsImV4cCI6MjA0OTQ4MzcwN30.KHe4r1IPTIOiShzenJ7b8ij-qZvROD8ziR8F6yf4aNg"
export  const supabase5 = createClient(supabaseUrl, supabaseKey)