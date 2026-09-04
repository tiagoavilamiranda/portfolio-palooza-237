import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  IdCard,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  Wrench,
  FolderKanban,
  WifiOff,
  Mail,
  Linkedin,
  MapPin,
  Heart,
  HandHeart,
  Server,
  Brain,
  FileText,
  Download,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  profile as profileData,
  about,
  experiences,
  education,
  certifications,
  skills,
  tools,
  systems,
  portfolio,
  volunteering,
  dedications,
  hobbies,
  developmentDocs,
  type Experience,
} from "@/data/portfolio";

function triggerShake() {
  if (typeof document === "undefined") return;
  const el = document.body;
  el.classList.remove("page-shake");
  void el.offsetWidth;
  el.classList.add("page-shake");
}

export function SubPage({
  eyebrow,
  title,
  Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="border-b border-border/60 bg-card/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            onClick={triggerShake}
            className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary transition-all hover:bg-primary/10 hover:shadow-[var(--shadow-gold)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="text-sm tracking-[0.3em] text-primary">
            {profileData.initials}
          </span>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-5xl">
              {title}
            </h2>
          </div>
          <Icon className="h-10 w-10 text-primary/60" />
        </div>
        {children}
      </section>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profileData.name} — Todos os direitos reservados.
      </footer>
    </div>
  );
}

function CompanyBadge({ exp }: { exp: Experience }) {
  const initials = exp.company
    .replace(/&/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  if (exp.logo) {
    return (
      <img
        src={exp.logo}
        alt={exp.company}
        className="h-14 w-14 shrink-0 rounded-xl border border-border bg-white object-contain p-1"
      />
    );
  }
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border font-serif text-lg font-semibold text-white"
      style={{ background: exp.logoBg || "#1f2937" }}
      aria-label={exp.company}
    >
      {initials}
    </div>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const hasRoles = exp.roles && exp.roles.length > 0;
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)]">
      <div className="flex items-start gap-4">
        <CompanyBadge exp={exp} />
        <div className="min-w-0 flex-1">
          {hasRoles ? (
            <>
              <h3 className="font-serif text-xl font-bold text-primary">{exp.company}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {exp.period}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-foreground">{exp.role}</h3>
              <p className="mt-0.5 text-sm text-primary">{exp.company}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {exp.period}
              </p>
            </>
          )}
          {exp.location && (
            <p className="mt-1 text-xs text-muted-foreground">{exp.location}</p>
          )}
        </div>
      </div>
      {exp.desc && (
        <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
          {exp.desc}
        </p>
      )}
      {hasRoles && (
        <ol className="relative mt-6 space-y-6 border-l border-primary/40 pl-6">
          {exp.roles!.map((r, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
              <h4 className="font-serif text-base font-bold text-foreground">{r.title}</h4>
              <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                {r.period}
              </p>
              {r.location && (
                <p className="mt-0.5 text-xs text-muted-foreground">{r.location}</p>
              )}
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                {r.desc}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function EduCard({
  title,
  org,
  period,
  extra,
}: {
  title: string;
  org: string;
  period: string;
  extra?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-widest text-primary">{period}</p>
      <h3 className="mt-2 font-serif text-xl text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{org}</p>
      {extra && <p className="mt-2 text-xs text-foreground/70">{extra}</p>}
    </div>
  );
}

function ContactItem({
  Icon,
  label,
  value,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm text-foreground">{value}</p>
      </div>
    </>
  );
  const cls =
    "flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/60";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

// ============================================================================
// SECTION PAGES
// ============================================================================

export function SobrePage() {
  return (
    <SubPage eyebrow="01" title="Sobre" Icon={IdCard}>
      <div className="rounded-2xl border border-border bg-card p-8">
        {about.split("\n\n").map((p, i) => (
          <p key={i} className="mb-4 text-foreground/90 leading-relaxed last:mb-0">
            {p}
          </p>
        ))}
      </div>
    </SubPage>
  );
}

export function ProfissionalPage() {
  return (
    <SubPage eyebrow="02" title="Trajetória Profissional" Icon={Briefcase}>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.role + exp.company + exp.period} exp={exp} />
        ))}
      </div>
    </SubPage>
  );
}

export function GraduacaoPage() {
  return (
    <SubPage eyebrow="03" title="Graduação & Formação" Icon={GraduationCap}>
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((e) => (
          <EduCard key={e.title} title={e.title} org={e.org} period={e.period} extra={e.extra} />
        ))}
      </div>
    </SubPage>
  );
}

export function CertificacoesPage() {
  return (
    <SubPage eyebrow="04" title="Certificações" Icon={Award}>
      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((c) => (
          <div
            key={c.title}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50">
              <Award className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="font-serif text-foreground">{c.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {c.org} <span className="text-primary">·</span> {c.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SubPage>
  );
}

export function HabilidadesPage() {
  return (
    <SubPage eyebrow="05" title="Habilidades" Icon={Lightbulb}>
      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-primary/40 bg-card px-5 py-2 text-sm text-foreground/90 transition-all hover:border-primary hover:text-primary"
          >
            {s}
          </span>
        ))}
      </div>
    </SubPage>
  );
}

export function FerramentasPage() {
  return (
    <SubPage eyebrow="06" title="Ferramentas & Sistemas" Icon={Wrench}>
      <div>
        <h3 className="mb-4 font-serif text-2xl text-foreground">Ferramentas</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tools.map((t) => (
            <div
              key={t}
              className="rounded-xl border border-border bg-card p-6 text-center font-serif text-lg text-foreground transition-all hover:border-primary hover:text-primary"
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3">
          <Server className="h-6 w-6 text-primary" />
          <h3 className="font-serif text-2xl text-foreground">Sistemas que utilizei</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {systems.map((s) => (
            <span
              key={s}
              className="rounded-full border border-primary/40 bg-card px-5 py-2 text-sm text-foreground/90 transition-all hover:border-primary hover:text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

export function PortfolioPage() {
  return (
    <SubPage eyebrow="07" title="Portfólio de Projetos" Icon={FolderKanban}>
      <div className="grid gap-6 md:grid-cols-2">
        {portfolio.map((p) => (
          <div
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/60"
          >
            <div
              className="absolute inset-x-0 top-0 h-1 opacity-60 transition-opacity group-hover:opacity-100"
              style={{ background: "var(--gradient-gold)" }}
            />
            <p className="text-xs uppercase tracking-widest text-primary">{p.tag}</p>
            <h3 className="mt-3 font-serif text-2xl text-foreground">{p.title}</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Case selecionado com resultados mensuráveis em prazo, custo e qualidade.
            </p>
          </div>
        ))}
      </div>
    </SubPage>
  );
}

export function DedicatoriaPage() {
  return (
    <SubPage eyebrow="08" title="Dedicatória" Icon={HandHeart}>
      <div className="mb-10 rounded-3xl border border-primary/30 bg-card p-8 text-center">
        <Heart className="mx-auto h-8 w-8 text-primary" />
        <p className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
          Minha gratidão a cada empresa que fez parte da minha história.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          Uma homenagem sincera a quem me deu a oportunidade de aprender, errar,
          crescer e me tornar o profissional que sou hoje.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {dedications.map((d) => (
          <div
            key={d.company}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)]"
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: "var(--gradient-gold)" }}
            />
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl text-foreground">{d.company}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 italic">
              “{d.message}”
            </p>
          </div>
        ))}
      </div>

      {volunteering.length > 0 && (
        <div className="mt-12">
          <h3 className="font-serif text-2xl text-foreground mb-4">Voluntariado</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {volunteering.map((v) => (
              <div key={v.title + v.org} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-primary">{v.period}</p>
                <h4 className="mt-2 font-serif text-lg text-foreground">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.org}</p>
                <p className="mt-3 text-sm text-foreground/80">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SubPage>
  );
}

export function OfflinePage() {
  return (
    <SubPage eyebrow="09" title="OffLine — Contato" Icon={WifiOff}>
      <div className="rounded-3xl border border-border bg-card p-10">
        <p className="max-w-2xl font-serif text-2xl text-foreground">
          Vamos conversar sobre projetos, contratos e como transformar dados em decisões
          estratégicas.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ContactItem Icon={Mail} label="E-mail" value={profileData.email} href={`mailto:${profileData.email}`} />
          <ContactItem
            Icon={Linkedin}
            label="LinkedIn"
            value={profileData.linkedinLabel}
            href={profileData.linkedin}
          />
          <ContactItem
            Icon={MapPin}
            label="Localização"
            value={profileData.location}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profileData.location)}`}
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Leopoldina, Minas Gerais"
            src={`https://www.google.com/maps?q=${encodeURIComponent(profileData.location)}&output=embed`}
            width="100%"
            height="320"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full border-0"
          />
        </div>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">Fora do trabalho</p>
          <h3 className="mt-2 font-serif text-2xl text-foreground">Do que eu gosto</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {hobbies.map((h) => (
              <span
                key={h.label}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/50 px-5 py-2 text-sm text-foreground/90 transition-all hover:border-primary hover:text-primary"
              >
                <span className="text-lg leading-none">{h.emoji}</span>
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SubPage>
  );
}
export function PerfilDesenvolvimentoPage() {
  return (
    <SubPage eyebrow="10" title="Perfil Profissional & Desenvolvimento" Icon={Brain}>
      <div className="rounded-3xl border border-border bg-card p-10">
        <p className="max-w-2xl font-serif text-2xl text-foreground">
          Documentos sobre o meu perfil comportamental e a minha evolução profissional.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {developmentDocs.map((doc) => (
            <a
              key={doc.title}
              href={doc.file}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-background/50 p-6 transition-all hover:border-primary hover:shadow-[var(--shadow-gold)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 text-primary">
                <FileText className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl text-foreground group-hover:text-primary">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground">{doc.desc}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs uppercase tracking-widest text-primary">
                <Download className="h-3.5 w-3.5" />
                Abrir PDF {doc.date ? `· ${doc.date}` : ""}
              </span>
            </a>
          ))}
        </div>
      </div>
    </SubPage>
  );
}
