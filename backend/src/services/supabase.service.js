import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// ⚡ Carrega o .env antes de qualquer uso
dotenv.config({ path: new URL('../../.env', import.meta.url).pathname });

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  process.exit(1); // encerra se as variáveis não forem carregadas
}

export const supabase = createClient(supabaseUrl, supabaseKey);

