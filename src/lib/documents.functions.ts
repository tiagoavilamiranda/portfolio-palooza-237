import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { requestAccessSchema, accessDecisionSchema } from './documents';

export const listDocuments = createServerFn({ method: 'GET' }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('Coleção indisponível.');
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
    headers.set('apikey', key);
    return fetch(input, { ...init, headers });
  } } });
  const { data, error } = await client.from('portfolio_documents').select('id,title,category,institution,description,preview_paths,created_at').order('created_at', { ascending: false });
  if (error) throw new Error('Não foi possível carregar os documentos.');
  const browserUrl = import.meta.env.VITE_SUPABASE_URL;
  return Promise.all((data ?? []).map(async (doc: { id: string; title: string; category: string; institution: string; description: string; preview_paths: string[]; created_at: string }) => {
    const previews = await Promise.all(doc.preview_paths.map(async (path) => {
      const { data: signed, error: signError } = await client.storage.from('document-previews').createSignedUrl(path, 3600);
      if (signError || !signed) return null;
      return signed.signedUrl.replace(url, browserUrl);
    }));
    return { ...doc, previews: previews.filter((p): p is string => Boolean(p)) };
  }));
});

export const askDocumentAccess = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => requestAccessSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: auth } = await context.supabase.auth.getUser();
    if (!auth.user?.email || !auth.user.email_confirmed_at) throw new Error('Confirme seu e-mail antes de solicitar acesso.');
    const { error } = await context.supabase.from('document_access_requests').insert({ document_id: data.documentId, user_id: context.userId, requester_name: data.name, requester_email: auth.user.email, reason: data.reason });
    if (error?.code === '23505') throw new Error('Você já tem uma solicitação para este documento.');
    if (error) throw new Error('Não foi possível enviar sua solicitação.');
    return { ok: true };
  });

export const decideDocumentAccess = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => accessDecisionSchema.parse(d))
  .handler(async ({ data, context }) => {
    // The owner-only UPDATE policy is the authority, never a client-side flag.
    const { data: row, error } = await context.supabase.from('document_access_requests').update({ status: data.status }).eq('id', data.id).select('id').single();
    if (error || !row) throw new Error('Você não tem permissão para decidir esta solicitação.');
    return { ok: true };
  });

export const readDocumentOriginal = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: file, error } = await context.supabase.from('document_original_files').select('storage_path,filename').eq('document_id', data.id).single();
    if (error || !file) throw new Error('O acesso ao documento completo não foi autorizado.');
    // Download through the user's RLS client: no bearer URLs to forward, and revocation is checked on every open.
    const { data: blob, error: downloadError } = await context.supabase.storage.from('document-originals').download(file.storage_path);
    if (downloadError || !blob) throw new Error('Não foi possível abrir o original.');
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    return { filename: file.filename, mime: blob.type, base64: btoa(binary) };
  });