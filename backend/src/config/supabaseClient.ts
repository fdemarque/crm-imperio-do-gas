import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import WebSocket from 'ws';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL e Key não foram definidos no arquivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  global: { WebSocket } as any,
  realtime: {
    transport: WebSocket as any
  }
});
