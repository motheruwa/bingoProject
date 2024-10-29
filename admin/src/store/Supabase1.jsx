import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgwtfmebkklzwkghykop.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnd3RmbWVia2tsendrZ2h5a29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxODM0NDcsImV4cCI6MjA0NTc1OTQ0N30.Td0DQ1XuUpe6M8w23JZaMTws4GCoNwhpYIuaOUGyCLE"
export  const supabase1 = createClient(supabaseUrl, supabaseKey)