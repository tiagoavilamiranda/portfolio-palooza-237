import { createFileRoute } from "@tanstack/react-router";
import { FileText, ArrowUpRight, Download } from "lucide-react";
import { SubPage } from "@/components/portfolio-sections";
import { profile, about, experiences, education, certifications, skills, slugify } from "@/data/portfolio";

export const Route = createFileRoute("/curriculo")({
  head: () => ({
    meta: [
      { title: "Currículo Virtual — Tiago de Avila Miranda" },
      { name: "description", content: "Currículo interativo de Tiago de Avila Miranda: clique em cada experiência, curso ou certificação para ver os detalhes no portfólio." },
      { property: "og:title", content: "Currículo Virtual — Tiago de Avila Miranda" },
      { property: "og:description", content: "Currículo interativo: cada item leva direto aos detalhes no portfólio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CurriculoPage,
});

function Item({ href, title, sub, period }: { href: string; title: string; sub?: string; period?: string }) {
  return (
    <a
      href={href}
      className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)]"
    >
      <div className="min-w-0">
        <p className="font-serif text-foreground group-hover:text-primary">{title}</p>
        {sub && <p className="mt-1 text-sm text-foreground/70">{sub}</p>}
        {period && <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{period}</p>}
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-primary opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h3 className="mb-4 border-l-2 border-primary pl-3 font-serif text-2xl text-foreground">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function CurriculoPage() {
  return (
    <SubPage eyebrow="CV" title="Currículo Virtual" Icon={FileText}>
      <div className="max-w-4xl">
        <p className="text-lg font-serif text-primary">{profile.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{profile.location} · {profile.email}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">{about.split("\n\n")[0]}</p>
        <p className="mt-4 text-xs text-muted-foreground">Clique em qualquer item para ver os detalhes no portfólio.</p>
        <a
          href="/curriculo-tiago-de-avila-miranda.pdf"
          download
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/60 px-5 py-2 text-sm text-primary hover:bg-primary/10"
        >
          <Download className="h-4 w-4" /> Baixar em PDF
        </a>

        <Section title="Experiência profissional">
          {experiences.map((e) => (
            <Item
              key={e.company + e.period}
              href={`/profissional#${slugify(e.company)}`}
              title={e.company}
              sub={e.roles?.length ? e.roles.map((r) => r.title).join(" · ") : e.role}
              period={e.period}
            />
          ))}
        </Section>

        <Section title="Formação">
          {education.map((e) => (
            <Item key={e.title} href={`/graduacao#${slugify(e.title)}`} title={e.title} sub={e.org} period={e.period} />
          ))}
        </Section>

        <Section title="Certificações">
          {certifications.map((c) => (
            <Item key={c.title} href={`/certificacoes#${slugify(c.title)}`} title={c.title} sub={c.org} period={c.date} />
          ))}
        </Section>

        <Section title="Habilidades">
          <a href="/habilidades" className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary">{s}</span>
            ))}
          </a>
        </Section>
      </div>
    </SubPage>
  );
}
