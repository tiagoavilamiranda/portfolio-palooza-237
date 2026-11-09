import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import type { Session } from '@supabase/supabase-js';
import { Award, LockKeyhole, Image, Send, LogOut, FileCheck, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SubPage } from '@/components/portfolio-sections';
import { listDocuments, askDocumentAccess, readDocumentOriginal } from '@/lib/documents.functions';
import { requestAccessSchema } from '@/lib/documents';

export const documentsQuery = { queryKey: ['document-gallery'], queryFn: () => listDocuments(), staleTime: 300000 };
const statusLabels: Record<string, string> = { pending: 'Solicitação enviada', denied: 'Acesso não autorizado', revoked: 'Acesso revogado', approved: 'Acesso autorizado' };

export function DocumentGallery() {
  const { data: docs } = useSuspenseQuery(documentsQuery);
  const [filter, setFilter] = useState('Todos');
  const [session, setSession] = useState<Session | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<{ url: string; filename: string } | null>(null);
  const ask = useServerFn(askDocumentAccess);
  const read = useServerFn(readDocumentOriginal);
  async function loadStatuses() {
    const { data } = await supabase.from('document_access_requests').select('document_id,status');
    setStatuses(Object.fromEntries((data ?? []).map((r) => [r.document_id, r.status])));
  }
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, value) => {
      setSession(value);
      if (event === 'SIGNED_OUT') { setStatuses({}); setOriginal(null); }
    });
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (session) void loadStatuses(); }, [session]);
  useEffect(() => () => { if (original) URL.revokeObjectURL(original.url); }, [original]);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      if (!session) {
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/documentos` } });
        if (error) throw new Error('Não foi possível enviar o link. Tente novamente em alguns minutos.');
        setMessage('Enviamos um link ao seu e-mail. Confirme o acesso e volte ao documento para solicitar autorização.');
      } else {
        const data = requestAccessSchema.parse({ documentId: selected, name, reason });
        await ask({ data }); await loadStatuses(); setSelected(null);
      }
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Não foi possível enviar.'); }
    finally { setBusy(false); }
  }
  async function open(id: string) {
    setBusy(true); setMessage('');
    try {
      const result = await read({ data: { id } });
      const bytes = Uint8Array.from(atob(result.base64), (c) => c.charCodeAt(0));
      setOriginal({ url: URL.createObjectURL(new Blob([bytes], { type: result.mime })), filename: result.filename });
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Não foi possível abrir o documento.'); await loadStatuses(); }
    finally { setBusy(false); }
  }
  return <SubPage eyebrow="Minha trajetória em registros" title="Diplomas, Certificados e Conquistas" Icon={Award}>
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {['Todos', 'Diploma', 'Certificado', 'Conquista', 'Momento'].map((f) => <Button key={f} variant={filter === f ? 'secondary' : 'ghost'} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f === 'Todos' ? f : f === 'Momento' ? 'Momentos nas empresas' : `${f}s`}</Button>)}
      {session && <Button className="sm:ml-auto" variant="ghost" onClick={() => { void loadStatuses(); }}><FileCheck /> Atualizar acessos</Button>}
      {session && <Button variant="ghost" size="icon" aria-label="Sair do acesso aos documentos" onClick={() => supabase.auth.signOut()}><LogOut /></Button>}
    </div>
    {message && <p role="status" className="mb-6 text-sm text-primary">{message}</p>}
    {!docs.length ? <div className="border-y border-border py-16 text-center"><Award className="mx-auto mb-5 h-12 w-12 text-primary/60" /><h3 className="font-serif text-2xl">Coleção em preparação</h3><p className="mt-3 text-sm text-muted-foreground">Os primeiros diplomas, certificados e registros de conquistas estarão aqui em breve.</p></div> : <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
      {docs.filter((d) => filter === 'Todos' || d.category === filter).map((d) => <article key={d.id} className="overflow-hidden rounded-md border border-border bg-card/40">
        <div className="space-y-2 bg-muted/20">{d.previews.length ? d.previews.map((src, i) => <a key={src} href={src} target="_blank" rel="noreferrer" aria-label={`Ampliar ${d.title}, página ${i + 1}`}><img src={src} alt={`${d.title} — página ${i + 1}, versão pública`} className="h-auto w-full object-contain" loading="lazy" /></a>) : <div className="flex aspect-[4/3] items-center justify-center"><Image className="h-12 w-12 text-muted-foreground" /></div>}</div>
        <div className="p-5"><p className="text-xs text-primary">{d.category}</p><h3 className="mt-2 font-serif text-2xl">{d.title}</h3><p className="mt-2 text-sm text-muted-foreground">{d.institution}</p>{d.description && <p className="mt-3 text-sm">{d.description}</p>}
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3 w-3" /> Original restrito</p>
          {statuses[d.id] && <p className="mt-3 text-sm text-primary">{statusLabels[statuses[d.id]]}</p>}
          {statuses[d.id] === 'approved' ? <Button variant="outline" className="mt-4 w-full" disabled={busy} onClick={() => open(d.id)}><FileCheck /> Ver documento completo</Button> : <Button variant="outline" className="mt-4 w-full" disabled={Boolean(statuses[d.id])} onClick={() => { setSelected(d.id); setMessage(''); }}><LockKeyhole /> Solicitar acesso ao original</Button>}
        </div>
      </article>)}
    </div>}
    <Dialog open={Boolean(selected)} onOpenChange={(value) => { if (!value) setSelected(null); }}><DialogContent><DialogTitle>{session ? 'Solicitar autorização a Tiago' : 'Confirmar seu e-mail'}</DialogTitle><DialogDescription>{session ? 'Tiago poderá aprovar ou recusar o acesso a este documento.' : 'O acesso ao original depende da autorização individual de Tiago.'}</DialogDescription><form className="grid gap-4" onSubmit={submit}>
      {!session ? <label className="grid gap-2 text-sm">E-mail<Input type="email" value={email} required maxLength={254} onChange={(e) => setEmail(e.target.value)} /></label> : <><label className="grid gap-2 text-sm">Seu nome<Input value={name} required minLength={2} maxLength={100} onChange={(e) => setName(e.target.value)} /></label><label className="grid gap-2 text-sm">Motivo da solicitação<Textarea value={reason} maxLength={500} onChange={(e) => setReason(e.target.value)} /></label></>}
      <Button variant="outline" disabled={busy}><Send />{busy ? 'Enviando…' : session ? 'Enviar solicitação' : 'Receber link por e-mail'}</Button>{message && <p role="status" className="text-sm">{message}</p>}
    </form></DialogContent></Dialog>
    <Dialog open={Boolean(original)} onOpenChange={(value) => { if (!value) setOriginal(null); }}><DialogContent className="max-w-4xl"><DialogTitle>{original?.filename}</DialogTitle><DialogDescription>Documento completo autorizado por Tiago.</DialogDescription>{original && <Button asChild variant="outline" className="justify-self-start"><a href={original.url} download={original.filename}><Download /> Baixar documento</a></Button>}{original && <iframe title="Documento completo" src={original.url} className="h-[65vh] w-full rounded-md border border-border" />}</DialogContent></Dialog>
  </SubPage>;
}