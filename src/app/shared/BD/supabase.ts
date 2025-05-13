import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wxuhvrszdkutrzmccboz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dWh2cnN6ZGt1dHJ6bWNjYm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMDA1MTksImV4cCI6MjA2MjY3NjUxOX0.FC8816n3X811AWC59rEUp38lohfMM1LSqxd8wZaDXIA';

export const supabase = createClient(supabaseUrl, supabaseKey);
