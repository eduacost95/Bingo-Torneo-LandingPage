import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RegistrationRecord, TournamentSettings } from '../types';

export const DEFAULT_SETTINGS: TournamentSettings = {
  whatsappGroupLink: 'https://chat.whatsapp.com/G5qMaicaoBingoFreeOficial',
  firstPrize: {
    title: 'Bono de Mercado por $400.000 COP',
    subtitle: '+ Canasta Familiar Completa en Supermercado Local Aliado',
    voucherValue: '$400.000 COP',
    description: 'El primer participante en alcanzar 500 puntos se lleva el gran bono de mercado para compras de víveres en Maicao más la canasta de alimentos esenciales.',
    badge: '1er Puesto (Meta 500 Pts)',
  },
  secondPrize: {
    title: 'Bono de Mercado por $200.000 COP',
    voucherValue: '$200.000 COP',
    description: 'Bono para surtir despensa familiar en almacenes o tiendas autorizadas en Maicao.',
    badge: '2do Puesto',
  },
  thirdPrize: {
    title: 'Bono de Cena Familiar / Recarga + Kit Bingo',
    voucherValue: '$100.000 COP aprox.',
    description: 'Bono para compartir una cena o recarga móvil + kit oficial con gorra y termo Bingo Torneo Comunitario.',
    badge: '3er Puesto',
  },
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  adminPin: '1234',
  heroImageUrl: '/src/assets/images/hero_maicao_bingo_1792333770482.jpg',
  communityImageUrl: '/src/assets/images/comunidad_maicao_reunion_1792333770784.jpg',
  prizesImageUrl: '/src/assets/images/premios_canasta_mercado_1792333770845.jpg',
};

const LOCAL_STORAGE_SETTINGS_KEY = 'btf_tournament_settings_v1';
const LOCAL_STORAGE_REGISTRATIONS_KEY = 'btf_registrations_v1';

let cachedSupabaseClient: SupabaseClient | null = null;
let lastClientKey = '';

export function getSupabaseClient(url?: string, key?: string): SupabaseClient | null {
  const settings = loadSettings();
  const targetUrl = (url || settings.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '').trim();
  const targetKey = (key || settings.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  if (!targetUrl || !targetKey || targetUrl.includes('your-project.supabase.co')) {
    return null;
  }

  const currentKey = `${targetUrl}:${targetKey}`;
  if (cachedSupabaseClient && lastClientKey === currentKey) {
    return cachedSupabaseClient;
  }

  try {
    cachedSupabaseClient = createClient(targetUrl, targetKey);
    lastClientKey = currentKey;
    return cachedSupabaseClient;
  } catch (err) {
    console.error('Error inicializando Supabase client:', err);
    return null;
  }
}

export function loadSettings(): TournamentSettings {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        firstPrize: { ...DEFAULT_SETTINGS.firstPrize, ...parsed.firstPrize },
        secondPrize: { ...DEFAULT_SETTINGS.secondPrize, ...parsed.secondPrize },
        thirdPrize: { ...DEFAULT_SETTINGS.thirdPrize, ...parsed.thirdPrize },
      };
    }
  } catch (e) {
    console.error('Error cargando settings locales:', e);
  }
  return DEFAULT_SETTINGS;
}

export async function loadSettingsAsync(): Promise<TournamentSettings> {
  const local = loadSettings();
  const supabase = getSupabaseClient(local.supabaseUrl, local.supabaseAnonKey);
  if (!supabase) return local;

  try {
    const { data, error } = await supabase
      .from('tournament_settings')
      .select('settings')
      .eq('id', 'default')
      .single();

    if (data && data.settings) {
      const merged: TournamentSettings = {
        ...DEFAULT_SETTINGS,
        ...local,
        ...data.settings,
        firstPrize: { ...DEFAULT_SETTINGS.firstPrize, ...local.firstPrize, ...data.settings.firstPrize },
        secondPrize: { ...DEFAULT_SETTINGS.secondPrize, ...local.secondPrize, ...data.settings.secondPrize },
        thirdPrize: { ...DEFAULT_SETTINGS.thirdPrize, ...local.thirdPrize, ...data.settings.thirdPrize },
      };
      localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('No se pudo cargar settings de Supabase:', e);
  }
  return local;
}

export async function uploadImageToSupabase(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Url = reader.result as string;
      const supabase = getSupabaseClient();
      if (supabase) {
        try {
          const fileName = `img_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
          const { data, error } = await supabase.storage
            .from('tournament-images')
            .upload(fileName, file, { upsert: true });

          if (!error && data) {
            const { data: pubData } = supabase.storage
              .from('tournament-images')
              .getPublicUrl(data.path);
            if (pubData?.publicUrl) {
              resolve(pubData.publicUrl);
              return;
            }
          }
        } catch (err) {
          console.warn('Storage bucket upload fell back to base64:', err);
        }
      }
      resolve(base64Url);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function saveSettings(settings: TournamentSettings): Promise<boolean> {
  try {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    
    // Attempt saving to Supabase if available
    const supabase = getSupabaseClient(settings.supabaseUrl, settings.supabaseAnonKey);
    if (supabase) {
      await supabase
        .from('tournament_settings')
        .upsert({
          id: 'default',
          settings,
          updated_at: new Date().toISOString(),
        })
        .select();
    }
    return true;
  } catch (e) {
    console.error('Error guardando configuración:', e);
    return false;
  }
}

export function getLocalRegistrations(): RegistrationRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REGISTRATIONS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error leyendo inscripciones locales:', e);
  }
  return [];
}

export function saveLocalRegistration(record: RegistrationRecord): void {
  try {
    const list = getLocalRegistrations();
    // Prepend new record
    const updated = [record, ...list.filter((r) => r.id !== record.id)];
    localStorage.setItem(LOCAL_STORAGE_REGISTRATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error guardando inscripción local:', e);
  }
}

export async function saveRegistration(record: RegistrationRecord): Promise<{
  savedInSupabase: boolean;
  savedLocally: boolean;
  message?: string;
}> {
  // Always ensure local persistence first so no user data is lost
  saveLocalRegistration(record);

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      savedInSupabase: false,
      savedLocally: true,
      message: 'Guardado localmente. Conecta Supabase en el panel para sincronizar en la nube.',
    };
  }
  try {
    const { error } = await supabase.from('registrations').insert({
      id: record.id,
      full_name: record.fullName,
      phone: record.phone,
      city: record.city,
      neighborhood: record.neighborhood,
      serial_number: record.serialNumber,
      card_matrix: record.cardMatrix,
      joined_whatsapp: record.joinedWhatsApp,
      status: record.status,
      created_at: record.createdAt,
      invited_by: record.invitedBy || null,
    });

    if (error) {
      console.warn('Advertencia al insertar en tabla registrations de Supabase:', error.message);
      return {
        savedInSupabase: false,
        savedLocally: true,
        message: `Guardado localmente. Error en Supabase: ${error.message}`,
      };
    }

    return {
      savedInSupabase: true,
      savedLocally: true,
    };
  } catch (err: any) {
    console.error('Error guardando en Supabase:', err);
    return {
      savedInSupabase: false,
      savedLocally: true,
      message: err?.message || 'Error de conexión con Supabase',
    };
  }
}

export async function updateRegistrationWhatsAppStatus(id: string, joined: boolean): Promise<void> {
  try {
    const list = getLocalRegistrations();
    const updated = list.map((item) => (item.id === id ? { ...item, joinedWhatsApp: joined } : item));
    localStorage.setItem(LOCAL_STORAGE_REGISTRATIONS_KEY, JSON.stringify(updated));

    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('registrations').update({ joined_whatsapp: joined }).eq('id', id);
    }
  } catch (e) {
    console.error('Error actualizando estado de WhatsApp:', e);
  }
}

export async function fetchAllRegistrations(): Promise<{
  data: RegistrationRecord[];
  fromSupabase: boolean;
}> {
  const localList = getLocalRegistrations();
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: localList,
      fromSupabase: false,
    };
  }

  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('No se pudo leer de Supabase, usando registros locales:', error?.message);
      return {
        data: localList,
        fromSupabase: false,
      };
    }

    // Map Supabase snake_case to camelCase
    const mapped: RegistrationRecord[] = data.map((row: any) => ({
      id: row.id,
      fullName: row.full_name || row.fullName || 'Jugador',
      phone: row.phone || '',
      city: row.city || 'Maicao',
      neighborhood: row.neighborhood || 'Centro',
      serialNumber: row.serial_number || row.serialNumber || 'BTF-0000',
      cardMatrix: row.card_matrix || row.cardMatrix || [],
      createdAt: row.created_at || row.createdAt || new Date().toISOString(),
      joinedWhatsApp: Boolean(row.joined_whatsapp ?? row.joinedWhatsApp),
      status: row.status || 'activo',
      invitedBy: row.invited_by || row.invitedBy || undefined,
    }));

    // Merge any local-only records that were created offline
    const idSet = new Set(mapped.map((r) => r.id));
    const merged = [...mapped];
    for (const localRec of localList) {
      if (!idSet.has(localRec.id)) {
        merged.push(localRec);
      }
    }

    return {
      data: merged,
      fromSupabase: true,
    };
  } catch (e) {
    console.error('Error al consultar Supabase:', e);
    return {
      data: localList,
      fromSupabase: false,
    };
  }
}

export const SUPABASE_SQL_SETUP_SCRIPT = `-- SCRIPT SQL PARA CREAR LAS TABLAS Y EL BUCKET DE IMÁGENES EN SUPABASE
-- Abre Supabase -> SQL Editor -> Pega y ejecuta este código:

-- 1. Tabla de inscripciones de participantes
CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT,
  serial_number TEXT UNIQUE NOT NULL,
  card_matrix JSONB,
  joined_whatsapp BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'activo',
  invited_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de configuración de la página y torneo
CREATE TABLE IF NOT EXISTS tournament_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  settings JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar permisos de lectura y escritura para clave anónima (anon public)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir insercion publica de inscritos"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir lectura publica de inscritos"
  ON registrations FOR SELECT
  USING (true);

CREATE POLICY "Permitir actualizacion de inscritos"
  ON registrations FOR UPDATE
  USING (true);

CREATE POLICY "Permitir lectura y gestion de configuracion"
  ON tournament_settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Crear Bucket de Almacenamiento para las Imágenes del Torneo
INSERT INTO storage.buckets (id, name, public)
VALUES ('tournament-images', 'tournament-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 4. Políticas de Seguridad (RLS) para el Storage Bucket (subida y lectura de imágenes)
CREATE POLICY "Permitir lectura publica de imagenes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tournament-images');

CREATE POLICY "Permitir subida de imagenes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tournament-images');

CREATE POLICY "Permitir actualizacion de imagenes"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'tournament-images');

CREATE POLICY "Permitir eliminacion de imagenes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'tournament-images');
`;

