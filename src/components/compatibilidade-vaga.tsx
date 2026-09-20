import { useState } from "react";
import { Target, ThumbsUp, ThumbsDown, AlertTriangle, Upload, Loader2, Trash2 } from "lucide-react";
import { SubPage } from "@/components/portfolio-sections";
import { analyzeVaga, type MatchResult } from "@/lib/vaga-match";

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  let out = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    out += content.items.map((it) => ("str" in it ? it.str : "")).join(" ") + "\n";
  }
  return out;
}

function VerdictBadge({ result }: { result: MatchResult }) {
  const map = {
    alta: {
      Icon: ThumbsUp,
      color: "text-emerald-400",
      ring: "border-emerald-400/60 bg-emerald-400/10",
      label: "Compatível",
    },
    media: {
      Icon: AlertTriangle,
      color: "text-amber-400",
      ring: "border-amber-400/60 bg-amber-400/10",
      label: "Atenção — aderência parcial",
    },
    baixa: {
      Icon: ThumbsDown,
      color: "text-red-400",
      ring: "border-red-400/60 bg-red-400/10",
      label: "Pouco compatível",
    },
  }[result.verdict];
  const { Icon } = map;
  return (
    <div className={`flex items-center gap-5 rounded-2xl border p-6 ${map.ring}`}>
      <Icon className={`h-12 w-12 shrink-0 ${map.color}`} />
      <div>
        <p className={`font-serif text-4xl ${map.color}`}>Nota {result.score}%</p>
        <p className="text-sm font-medium text-foreground/90">{map.label}</p>
        <p className="mt-1 text-sm text-foreground/75">{result.headline}</p>
      </div>
    </div>
  );
}


export function CompatibilidadeVagaPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function run(value: string) {
    setError(null);
    const r = analyzeVaga(value);
    if (!r) {
      setError("Escreva ou cole a descrição da vaga (ou apenas uma palavra-chave).");
      setResult(null);
      return;
    }
    setResult(r);
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const extracted = await extractPdfText(file);
      if (extracted.trim().length < 20) {
        setError("Não consegui ler texto nesse PDF (pode ser uma imagem digitalizada). Cole o texto da vaga abaixo.");
      } else {
        setText(extracted);
        run(extracted);
      }
    } catch {
      setError("Não foi possível ler o PDF. Tente colar o texto da vaga.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  return (
    <SubPage eyebrow="11" title="Compatibilidade da Vaga" Icon={Target}>
      <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
        <p className="max-w-3xl font-serif text-2xl text-foreground">
          Cole a descrição da vaga, envie o PDF ou digite uma palavra-chave (ex.: financeiro) e
          veja de 0 a 100% o quanto ela combina com a minha trajetória.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          A análise acontece no seu próprio navegador — nenhum dado da vaga é enviado ou armazenado.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Ex.: Analista Administrativo Financeiro — emissão de boletos, conciliação bancária, cadastro de clientes PF e PJ, Excel avançado..."
          className="mt-8 w-full resize-y rounded-2xl border border-border bg-background/60 p-5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/70"
        />

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => run(text)}
            className="rounded-full px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            Analisar compatibilidade
          </button>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {loading ? "Lendo PDF..." : "Enviar PDF da vaga"}
            <input type="file" accept="application/pdf" onChange={onFile} className="hidden" />
          </label>

          {(text || result) && (
            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(null);
                setError(null);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" />
              Limpar
            </button>
          )}
        </div>

        {error && <p className="mt-5 text-sm text-red-400">{error}</p>}

        {result?.companyOnly && (
          <div className="mt-10 rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <h3 className="font-serif text-xl text-foreground">Minha passagem por essa empresa</h3>
            <ul className="mt-4 space-y-5">
              {result.companies.map((c) => (
                <li key={c.company} className="border-l-2 border-primary/50 pl-4">
                  <p className="font-medium text-primary">{c.company}</p>
                  <p className="text-sm text-foreground/85">{c.role}</p>
                  <p className="text-sm text-muted-foreground">{c.period}</p>
                  {c.location && <p className="text-xs text-muted-foreground">{c.location}</p>}
                  {c.roles && c.roles.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm text-foreground/75">
                      {c.roles.map((r) => (
                        <li key={r.title}>
                          <span className="font-medium">{r.title}</span> — {r.period}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result && !result.companyOnly && (
          <div className="mt-10 space-y-6">
            <VerdictBadge result={result} />

            <div className="rounded-2xl border border-border bg-background/50 p-6">
              <h3 className="font-serif text-xl text-foreground">Por que essa nota</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{result.summary}</p>
            </div>

            {result.companies.length > 0 && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <h3 className="font-serif text-xl text-foreground">Empresas citadas onde já atuei</h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                  {result.companies.map((c) => (
                    <li key={c.company}>
                      <span className="font-medium text-primary">{c.company}</span> — {c.role} ·{" "}
                      {c.period}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.matchedAreas.length > 0 && (
              <div className="rounded-2xl border border-border bg-background/50 p-6">
                <h3 className="font-serif text-xl text-foreground">
                  Onde minha experiência atende
                </h3>
                <ul className="mt-4 space-y-5">
                  {result.matchedAreas.map((m) => (
                    <li key={m.label} className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-primary">{m.label}</p>
                      <p className="mt-1 text-sm text-foreground/80">{m.evidence}</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/70">
                        {m.examples.map((ex) => (
                          <li key={ex}>{ex}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.missingAreas.length > 0 && (
              <div className="rounded-2xl border border-amber-400/40 bg-amber-400/5 p-6">
                <h3 className="font-serif text-xl text-foreground">Pontos fora do meu histórico</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/80">
                  {result.missingAreas.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </SubPage>
  );
}
