import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hdzwaigrszptwyoqekge.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkendhaWdyc3pwdHd5b3Fla2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxODkwNjMsImV4cCI6MjA0NTc2NTA2M30.XghDGTK7Z992d7JSJFxhNnykzOiFUimcfTVL6nIoGz0"
export  const supabase2 = createClient(supabaseUrl, supabaseKey)