import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycuolnwyxsyalvnnwkmo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdW9sbnd5eHN5YWx2bm53a21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NDMzMTAsImV4cCI6MjA0NjIxOTMxMH0.6nhwevIS8HlpgDalMcn2Fi--Xfdw00exSxz7WJRsiGM"
export  const supabase3 = createClient(supabaseUrl, supabaseKey)