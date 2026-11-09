import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Undo2, EyeOff } from 'lucide-react';

type Box = { x: number; y: number; w: number; h: number };
type Page = { canvas: HTMLCanvasElement; boxes: Box[] };

async function fileToPages(file: File): Promise<HTMLCanvasElement[]> {
  if (file.type === 'application/pdf') {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const out: HTMLCanvasElement[] = [];
    for (let i = 1; i <= Math.min(doc.numPages, 10); i++) {
      const page = await doc.getPage(i);
      const vp = page.getViewport({ scale: 2 });
      const c = document.createElement('canvas');
      c.width = vp.width; c.height = vp.height;
      await page.render({ canvas: c, canvasContext: c.getContext('2d')!, viewport: vp }).promise;
      out.push(c);
    }
    return out;
  }
  const img = await createImageBitmap(file);
  const scale = Math.min(1, 2400 / Math.max(img.width, img.height));
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
  c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
  return [c];
}

// Covers each box with heavy pixelation plus a solid bar, so hidden numbers cannot be recovered.
function redact(page: Page): Promise<Blob> {
  const c = document.createElement('canvas');
  c.width = page.canvas.width; c.height = page.canvas.height;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(page.canvas, 0, 0);
  for (const b of page.boxes) {
    ctx.filter = 'blur(18px)';
    ctx.drawImage(page.canvas, b.x, b.y, b.w, b.h, b.x, b.y, b.w, b.h);
    ctx.filter = 'none';
    ctx.fillStyle = 'rgba(40,40,40,0.85)';
    ctx.fillRect(b.x, b.y, b.w, b.h);
  }
  return new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.85));
}

export function DocumentUploader({ onDone }: { onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Diploma');
  const [institution, setInstitution] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const drag = useRef<{ page: number; x: number; y: number } | null>(null);
  const [draft, setDraft] = useState<{ page: number; box: Box } | null>(null);

  async function pick(f: File | undefined) {
    if (!f) return;
    setMsg(''); setFile(f);
    try { setPages((await fileToPages(f)).map((canvas) => ({ canvas, boxes: [] }))); }
    catch { setMsg('Não consegui abrir esse arquivo. Use JPG, PNG ou PDF.'); }
  }
  function point(e: React.PointerEvent<HTMLDivElement>, i: number) {
    const r = e.currentTarget.getBoundingClientRect();
    const c = pages[i].canvas;
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  }
  function up(i: number) {
    if (draft && draft.box.w > 8 && draft.box.h > 8) setPages((p) => p.map((pg, j) => (j === i ? { ...pg, boxes: [...pg.boxes, draft.box] } : pg)));
    drag.current = null; setDraft(null);
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !pages.length) return;
    setBusy(true); setMsg('');
    try {
      const id = crypto.randomUUID();
      const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
      const originalPath = `${id}/original.${ext}`;
      const previewPaths: string[] = [];
      for (let i = 0; i < pages.length; i++) {
        const path = `${id}/pagina-${i + 1}.jpg`;
        const { error } = await supabase.storage.from('document-previews').upload(path, await redact(pages[i]), { contentType: 'image/jpeg' });
        if (error) throw error;
        previewPaths.push(path);
      }
      const { error: oe } = await supabase.storage.from('document-originals').upload(originalPath, file, { contentType: file.type });
      if (oe) throw oe;
      const { error: de } = await supabase.from('portfolio_documents').insert({ id, title: title.trim(), category, institution: institution.trim(), description: description.trim(), preview_paths: previewPaths });
      if (de) throw de;
      const { error: fe } = await supabase.from('document_original_files').insert({ document_id: id, storage_path: originalPath, filename: file.name.slice(0, 150) });
      if (fe) throw fe;
      setMsg('Publicado! Já aparece na aba Diplomas, Certificados e Conquistas.');
      setFile(null); setPages([]); setTitle(''); setInstitution(''); setDescription('');
      onDone();
    } catch { setMsg('Não foi possível publicar. Confira se você está conectado e tente de novo.'); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={save} className="mt-5 grid gap-4 rounded-md border border-border p-5">
      <h3 className="font-serif text-2xl text-primary">Adicionar ao portfólio</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">Tipo
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3">
            <option value="Diploma">Diploma</option><option value="Certificado">Certificado</option><option value="Conquista">Conquista</option><option value="Momento">Momento na empresa</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">Título<Input required maxLength={150} value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <label className="grid gap-1 text-sm">Instituição ou empresa<Input maxLength={150} value={institution} onChange={(e) => setInstitution(e.target.value)} /></label>
        <label className="grid gap-1 text-sm">Arquivo (foto ou PDF)<Input type="file" accept="image/*,application/pdf" onChange={(e) => pick(e.target.files?.[0])} /></label>
      </div>
      <label className="grid gap-1 text-sm">Descrição (opcional)<Textarea maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></label>
      {pages.length > 0 && (
        <div className="grid gap-4">
          <p className="flex items-center gap-2 text-sm text-primary"><EyeOff className="h-4 w-4" /> Arraste sobre o CPF e a identidade para ocultar. Se não houver, é só publicar.</p>
          {pages.map((pg, i) => (
            <div key={i} className="grid gap-2">
              <div
                className="relative touch-none select-none overflow-hidden rounded-md border border-border"
                onPointerDown={(e) => { const p = point(e, i); drag.current = { page: i, ...p }; e.currentTarget.setPointerCapture(e.pointerId); }}
                onPointerMove={(e) => { if (!drag.current) return; const p = point(e, i); const s = drag.current; setDraft({ page: i, box: { x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) } }); }}
                onPointerUp={() => up(i)}
              >
                <img src={pg.canvas.toDataURL('image/jpeg', 0.7)} alt={`Página ${i + 1}`} className="block h-auto w-full" draggable={false} />
                {[...pg.boxes, ...(draft?.page === i ? [draft.box] : [])].map((b, k) => (
                  <div key={k} className="absolute bg-foreground/80 backdrop-blur" style={{ left: `${(b.x / pg.canvas.width) * 100}%`, top: `${(b.y / pg.canvas.height) * 100}%`, width: `${(b.w / pg.canvas.width) * 100}%`, height: `${(b.h / pg.canvas.height) * 100}%` }} />
                ))}
              </div>
              {pg.boxes.length > 0 && <Button type="button" variant="ghost" size="sm" className="justify-self-start" onClick={() => setPages((p) => p.map((x, j) => (j === i ? { ...x, boxes: x.boxes.slice(0, -1) } : x)))}><Undo2 /> Desfazer última área</Button>}
            </div>
          ))}
        </div>
      )}
      <Button variant="outline" disabled={busy || !pages.length}><Upload />{busy ? 'Publicando…' : 'Publicar'}</Button>
      {msg && <p role="status" className="text-sm">{msg}</p>}
    </form>
  );
}
