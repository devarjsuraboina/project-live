

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://plthldemflplvzxrzuqh.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdGhsZGVtZmxwbHZ6eHJ6dXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NTkyMzEsImV4cCI6MjA1MDQzNTIzMX0.xmV83KFRo44O5o7MHr7GipUKChcMG37gm5DBBdP_4DU"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase