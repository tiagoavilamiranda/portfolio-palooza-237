import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { sendMessage } from "@/lib/visitors.functions";

export function RecadoForm() {
  const [form, setForm] = useState({ name: "", company: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2 || form.message.trim().length < 2) return;
    setStatus("sending");
    try {
      await sendMessage({ data: form });
      setStatus("ok");
      setForm({ name: "", company: "", contact: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-lg border border-primary/30 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <section className="mx-auto mt-12 max-w-2xl rounded-2xl border border-primary/30 bg-card/60 p-6 backdrop-blur">
      <h2 className="flex items-center gap-2 font-serif text-2xl text-primary">
        <MessageSquare className="h-5 w-5" /> Deixe seu recado
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Passou por aqui? Deixe seu nome e uma mensagem — eu leio todas.
      </p>
      {status === "ok" ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-primary">
          <CheckCircle2 className="h-5 w-5" /> Obrigado! Seu recado foi enviado.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={input} placeholder="Seu nome *" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={input} placeholder="Empresa (opcional)" maxLength={100} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <input className={input} placeholder="E-mail, telefone ou LinkedIn (opcional)" maxLength={150} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <textarea className={`${input} min-h-28`} placeholder="Sua mensagem *" required maxLength={1500} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          {status === "error" && <p className="text-sm text-destructive">Não foi possível enviar agora. Tente novamente.</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] disabled:opacity-60"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Send className="h-4 w-4" /> {status === "sending" ? "Enviando..." : "Enviar recado"}
          </button>
        </form>
      )}
    </section>
  );
}
