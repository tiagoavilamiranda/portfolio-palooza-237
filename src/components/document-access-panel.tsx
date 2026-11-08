import { useEffect, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Check, X, ShieldOff, RefreshCw } from 'lucide-react';
import { decideDocumentAccess } from '@/lib/documents.functions';

type Request = { id: string; requester_name: string; requester_email: string; reason: string; status: string; document_id: string; created_at: string };
const labels: Record<string, string> = { pending: 'Aguardando sua decisão', approved: 'Aprovado', denied: 'Recusado', revoked: 'Revogado' };
export function DocumentAccessPanel() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const decide = useServerFn(decideDocumentAccess);
  async function load() {
    const [r, d] = await Promise.all([supabase.from('document_access_requests').select('*').order('created_at', { ascending: false }), supabase.from('portfolio_documents').select('id,title')]);
    if (r.error || d.error) { setError('Não foi possível carregar as solicitações.'); return; }
    setRequests(r.data ?? []);
    setTitles(Object.fromEntries((d.data ?? []).map((doc) => [doc.id, doc.title])));
  }
  useEffect(() => { void load(); }, []);
  async function act(id: string, status: 'approved' | 'denied' | 'revoked') {
    setBusy(true); setError('');
    try { await decide({ data: { id, status } }); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível salvar a decisão.'); }
    finally { setBusy(false); }
  }
  return <section className="mt-5">
    <div className="flex items-center justify-between gap-3"><h2 className="font-serif text-2xl text-primary">Acesso aos documentos</h2><Button variant="ghost" size="icon" aria-label="Atualizar solicitações" onClick={load}><RefreshCw /></Button></div>
    {error && <p role="alert" className="mt-3 text-destructive">{error}</p>}
    <div className="mt-4 grid gap-4">{requests.map((r) => <article key={r.id} className="rounded-md border border-border p-4">
      <p className="font-medium text-primary">{titles[r.document_id] ?? 'Documento'}</p>
      <p className="mt-2 break-words">{r.requester_name} · {r.requester_email}</p>
      <p className="mt-1 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString('pt-BR')} · {labels[r.status]}</p>
      {r.reason && <p className="mt-3 whitespace-pre-wrap text-sm">{r.reason}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {r.status !== 'approved' && <Button variant="outline" disabled={busy} onClick={() => act(r.id, 'approved')}><Check /> Aprovar</Button>}
        {r.status === 'pending' && <Button variant="outline" disabled={busy} onClick={() => act(r.id, 'denied')}><X /> Recusar</Button>}
        {r.status === 'approved' && <Button variant="outline" disabled={busy} onClick={() => act(r.id, 'revoked')}><ShieldOff /> Revogar</Button>}
      </div>
    </article>)}</div>
    {!requests.length && <p className="py-8 text-muted-foreground">Nenhuma solicitação de acesso recebida.</p>}
  </section>;
}