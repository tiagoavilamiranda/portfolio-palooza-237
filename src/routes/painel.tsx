import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Eye, MessageSquare, LogOut, Trash2 } from "lucide-react";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Painel privado — Tiago de Avila Miranda" },
      { name: "description", content: "Área restrita do portfólio." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel privado" },
      { property: "og:description", content: "Área restrita do portfólio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Painel,
});

type Visit = { id: string; created_at: string; path: string; source: string | null; city: string | null; region: string | null; country: string | null; device: string | null };
type Msg = { id: string; created_at: string; name: string; company: string | null; contact: string | null; message: string };

const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

function Painel() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary"><ArrowLeft className="h-4 w-4" /> Voltar</Link>
        <h1 className="mt-4 font-serif text-4xl text-primary">Painel privado</h1>
        {!ready ? null : session ? <Dashboard email={session.user.email ?? ""} /> : <Login />}
      </div>
    </div>
  );
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  async function go(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) setMsg("E-mail ou senha incorretos (ou e-mail ainda não confirmado).");
    } else {
      const { error } = await supabase.auth.signUp({ email, password: pass, options: { emailRedirectTo: `${window.location.origin}/painel` } });
      setMsg(error ? error.message : "Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.");
    }
  }
  const input = "w-full rounded-lg border border-primary/30 bg-background/60 px-4 py-2.5 text-sm focus:border-primary focus:outline-none";
  return (
    <form onSubmit={go} className="mt-8 grid max-w-sm gap-3">
      <p className="text-sm text-muted-foreground">Acesso exclusivo do dono do portfólio.</p>
      <input className={input} type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={input} type="password" placeholder="Senha (mín. 6)" required minLength={6} value={pass} onChange={(e) => setPass(e.target.value)} />
      <button className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-gold)" }}>
        {mode === "in" ? "Entrar" : "Criar acesso"}
      </button>
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="text-xs text-primary underline">
        {mode === "in" ? "Primeiro acesso? Criar senha" : "Já tenho acesso"}
      </button>
      {msg && <p className="text-sm text-foreground/80">{msg}</p>}
    </form>
  );
}

function Dashboard({ email }: { email: string }) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [tab, setTab] = useState<"v" | "m">("v");

  async function load() {
    const [v, m] = await Promise.all([
      supabase.from("site_visits").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("visitor_messages").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    setVisits((v.data as Visit[]) ?? []);
    setMsgs((m.data as Msg[]) ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function delMsg(id: string) {
    await supabase.from("visitor_messages").delete().eq("id", id);
    load();
  }

  const today = visits.filter((v) => new Date(v.created_at).toDateString() === new Date().toDateString()).length;
  const linkedin = visits.filter((v) => v.source === "LinkedIn").length;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Conectado como {email}</span>
        <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1 text-primary"><LogOut className="h-4 w-4" /> Sair</button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Visitas", visits.length], ["Hoje", today], ["Vindas do LinkedIn", linkedin], ["Recados", msgs.length]].map(([l, n]) => (
          <div key={l} className="rounded-xl border border-primary/30 bg-card/60 p-4">
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="font-serif text-3xl text-primary">{n}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <button onClick={() => setTab("v")} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${tab === "v" ? "border-primary bg-primary/10 text-primary" : "border-border"}`}><Eye className="h-4 w-4" /> Visitas</button>
        <button onClick={() => setTab("m")} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${tab === "m" ? "border-primary bg-primary/10 text-primary" : "border-border"}`}><MessageSquare className="h-4 w-4" /> Recados</button>
      </div>
      {tab === "v" ? (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-xs text-muted-foreground"><tr><th className="p-3">Quando</th><th className="p-3">Página</th><th className="p-3">Origem</th><th className="p-3">Cidade</th><th className="p-3">Aparelho</th></tr></thead>
            <tbody>
              {visits.map((v) => (
                <tr key={v.id} className="border-t border-border">
                  <td className="p-3 whitespace-nowrap">{fmt(v.created_at)}</td>
                  <td className="p-3">{v.path}</td>
                  <td className="p-3">{v.source ?? "—"}</td>
                  <td className="p-3">{[v.city, v.region, v.country].filter(Boolean).join(", ") || "—"}</td>
                  <td className="p-3">{v.device ?? "—"}</td>
                </tr>
              ))}
              {!visits.length && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Nenhuma visita registrada ainda.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          {msgs.map((m) => (
            <div key={m.id} className="rounded-xl border border-primary/30 bg-card/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-primary">{m.name}{m.company ? ` · ${m.company}` : ""}</p>
                  <p className="text-xs text-muted-foreground">{fmt(m.created_at)}{m.contact ? ` · ${m.contact}` : ""}</p>
                </div>
                <button onClick={() => delMsg(m.id)} aria-label="Apagar" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm">{m.message}</p>
            </div>
          ))}
          {!msgs.length && <p className="p-6 text-center text-muted-foreground">Nenhum recado ainda.</p>}
        </div>
      )}
    </div>
  );
}
