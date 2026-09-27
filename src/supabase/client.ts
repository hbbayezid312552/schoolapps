import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export async function uploadImage(file: File, folder = 'general'): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase কনফিগার করা হয়নি। .env ফাইলে VITE_SUPABASE_URL এবং VITE_SUPABASE_ANON_KEY দিন।');
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) {
    throw new Error('শুধু JPG, PNG অথবা WEBP ছবি আপলোড করা যাবে।');
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('ছবির সর্বোচ্চ সাইজ ৫ MB হতে পারবে।');
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from('school-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from('school-images').getPublicUrl(filePath);
  return data.publicUrl;
}
