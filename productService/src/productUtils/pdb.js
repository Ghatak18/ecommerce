const {createClient} = require("@supabase/supabase-js")


const supabaseUrl = "https://umzwxochvqrttssdeyzc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtend4b2NodnFydHRzc2RleXpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzkxMTI5OSwiZXhwIjoyMDU5NDg3Mjk5fQ.hS0WBkxDfLpmMmUXb8xl2AddtWYEZX4vyDpO3bl3Ai4"

const supabase = createClient(supabaseUrl,supabaseKey)

module.exports = supabase;