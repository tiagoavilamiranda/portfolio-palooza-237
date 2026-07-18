import { createFileRoute } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import profile from "@/assets/profile.jpg";
import {
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
} from "lucide-react";
import {
  profile as profileData,
  about,
  experiences,
  education,
  certifications,
  skills,
  tools,
  portfolio,
  volunteering,
  dedications,
  type Experience,
} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

const sections = [
  { id: "apresentacao", label: "Apresentação", Icon: IdCard },
  { id: "profissional", label: "Profissional", Icon: Briefcase },
  { id: "graduacao", label: "Graduação", Icon: GraduationCap },
  { id: "certificacoes", label: "Certificações", Icon: Award },
  { id: "habilidades", label: "Habilidades", Icon: Lightbulb },
  { id: "ferramentas", label: "Ferramentas", Icon: Wrench },
  { id: "portfolio", label: "Portfólio", Icon: FolderKanban },
  { id: "dedicatoria", label: "Dedicatória", Icon: HandHeart },
  { id: "offline", label: "OffLine", Icon: WifiOff },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* HERO */}
      <section
        id="apresentacao"
        className="relative min-h-screen overflow-hidden"
      >
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <span className="text-sm tracking-[0.3em] text-primary">{profileData.initials}</span>
          <div className="hidden gap-8 text-xs uppercase tracking-widest text-muted-foreground md:flex">
            {sections.slice(0, 5).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-primary transition-colors">
                {s.label}
              </a>
            ))}
          </div>
          <a
            href="#dedicatoria"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary transition-all hover:bg-primary/10 hover:shadow-[var(--shadow-gold)]"
          >
            <Heart className="h-3.5 w-3.5" />
            Dedicatória
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-10 pb-24 md:grid-cols-[1.4fr_1fr] md:pt-20">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary/80">Portfólio Profissional</p>
            <h1 className="font-serif text-5xl leading-tight text-primary md:text-7xl">
              {profileData.name.split(" ").slice(0, -1).join(" ")} <br /> {profileData.name.split(" ").slice(-1)}
            </h1>
            <div className="mt-6 h-px w-24 bg-primary" />
            {profileData.shortHeadline.map((line, i) => (
              <p key={i} className="mt-2 max-w-xl text-lg text-foreground/90">
                {line.split(" | ").map((seg, j, arr) => (
                  <span key={j}>
                    {seg}
                    {j < arr.length - 1 && <span className="text-primary"> | </span>}
                  </span>
                ))}
              </p>
            ))}

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#profissional"
                className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                Conheça minha trajetória
              </a>
              <a
                href="#dedicatoria"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Heart className="h-4 w-4" />
                Dedicatória
              </a>
              <a
                href="#offline"
                className="rounded-full border border-primary/40 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Entrar em contato
              </a>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div
              className="absolute -inset-4 rounded-full blur-3xl opacity-40"
              style={{ background: "var(--gradient-gold)" }}
            />
            <img
              src={profile}
              alt={profileData.name}
              width={800}
              height={800}
              className="relative h-64 w-64 rounded-full border-2 border-primary/60 object-cover shadow-[var(--shadow-gold)] md:h-80 md:w-80"
            />
          </div>
        </div>

        {/* Navigation icons */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-9">
            {sections.map(({ id, label, Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-card/60 backdrop-blur transition-all group-hover:border-primary group-hover:shadow-[var(--shadow-gold)]">
                  <Icon className="h-6 w-6 text-primary" />
                </span>
                <span className="text-[11px] font-medium tracking-wide text-foreground/80 group-hover:text-primary">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <Section id="sobre" eyebrow="01" title="Sobre" Icon={IdCard}>
        <div className="rounded-2xl border border-border bg-card p-8">
          {about.split("\n\n").map((p, i) => (
            <p key={i} className="mb-4 text-foreground/90 leading-relaxed last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* PROFISSIONAL */}
      <Section id="profissional" eyebrow="02" title="Trajetória Profissional" Icon={Briefcase}>
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.role + exp.company + exp.period} exp={exp} />
          ))}
        </div>
      </Section>

      {/* GRADUAÇÃO */}
      <Section id="graduacao" eyebrow="03" title="Graduação & Formação" Icon={GraduationCap}>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((e) => (
            <EduCard key={e.title} title={e.title} org={e.org} period={e.period} extra={e.extra} />
          ))}
        </div>
      </Section>

      {/* CERTIFICAÇÕES */}
      <Section id="certificacoes" eyebrow="04" title="Certificações" Icon={Award}>
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
      </Section>

      {/* HABILIDADES */}
      <Section id="habilidades" eyebrow="05" title="Habilidades" Icon={Lightbulb}>
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
      </Section>

      {/* FERRAMENTAS */}
      <Section id="ferramentas" eyebrow="06" title="Ferramentas" Icon={Wrench}>
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
      </Section>

      {/* PORTFÓLIO */}
      <Section id="portfolio" eyebrow="07" title="Portfólio de Projetos" Icon={FolderKanban}>
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
      </Section>

      {/* DEDICATÓRIA */}
      <Section
        id="dedicatoria"
        eyebrow="08"
        title="Dedicatória"
        Icon={HandHeart}
      >
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
      </Section>

      {/* OFFLINE / CONTATO */}
      <Section id="offline" eyebrow="09" title="OffLine — Contato" Icon={WifiOff}>
        <div className="rounded-3xl border border-border bg-card p-10">
          <p className="max-w-2xl font-serif text-2xl text-foreground">
            Vamos conversar sobre projetos, contratos e como transformar dados em decisões
            estratégicas.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ContactItem Icon={Mail} label="E-mail" value={profileData.email} />
            <ContactItem Icon={Linkedin} label="LinkedIn" value={profileData.linkedinLabel} href={profileData.linkedin} />
            <ContactItem Icon={MapPin} label="Localização" value={profileData.location} />
          </div>
        </div>
      </Section>

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
        className="h-14 w-14 shrink-0 rounded-xl border border-border object-cover"
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
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)]">
      <div className="flex items-start gap-4">
        <CompanyBadge exp={exp} />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl text-foreground">{exp.role}</h3>
          <p className="mt-0.5 text-sm text-primary">{exp.company}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {exp.period}
          </p>
          {exp.location && (
            <p className="mt-1 text-xs text-muted-foreground">{exp.location}</p>
          )}
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-foreground/80">{exp.desc}</p>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  Icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
      <div className="mb-12 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary/70">{eyebrow}</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">{title}</h2>
        </div>
        <Icon className="h-10 w-10 text-primary/60" />
      </div>
      {children}
    </section>
  );
}

function EduCard({ title, org, period, extra }: { title: string; org: string; period: string; extra?: string }) {
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
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </>
  );
  const cls = "flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/60";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <div className={cls}>
      {inner}
    </div>
  );
}
