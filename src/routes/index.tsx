import { createFileRoute } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import profile from "@/assets/profile.png";
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
} from "lucide-react";

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
  { id: "offline", label: "OffLine", Icon: WifiOff },
];

const experiences = [
  {
    role: "Gerente de Projetos & Contratos",
    company: "Setor de Energia & Infraestrutura",
    period: "2019 — Presente",
    desc: "Gestão de contratos complexos de alto valor, coordenação de equipes multidisciplinares e implementação de práticas de procurement estratégico.",
  },
  {
    role: "Coordenador de Procurement",
    company: "Indústria & Serviços",
    period: "2014 — 2019",
    desc: "Liderança em processos de sourcing, negociação com fornecedores nacionais e internacionais e desenvolvimento de painéis de Business Intelligence.",
  },
  {
    role: "Analista Sênior de Contratos",
    company: "Multinacional",
    period: "2009 — 2014",
    desc: "Análise crítica de contratos, compliance, e apoio a projetos de sustentabilidade e ESG.",
  },
];

const skills = [
  "Gestão de Projetos",
  "Gestão de Contratos",
  "Procurement Estratégico",
  "Business Intelligence",
  "Análise de Dados",
  "Sustentabilidade & ESG",
  "Negociação",
  "Liderança de Equipes",
];

const tools = ["Power BI", "Excel Avançado", "SAP", "MS Project", "Python", "SQL", "Tableau", "Jira"];

const certifications = [
  "PMP — Project Management Professional",
  "Green Belt Six Sigma",
  "ESG Foundations",
  "Contract Management Certified",
];

const portfolio = [
  { title: "Contrato EPC — Usina Solar 150MW", tag: "Energia" },
  { title: "Painel de BI de Procurement", tag: "Business Intelligence" },
  { title: "Programa ESG Corporativo", tag: "Sustentabilidade" },
  { title: "Redesenho de Sourcing Global", tag: "Procurement" },
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
          <span className="text-sm tracking-[0.3em] text-primary">MCBB</span>
          <div className="hidden gap-8 text-xs uppercase tracking-widest text-muted-foreground md:flex">
            {sections.slice(0, 5).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-primary transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-10 pb-24 md:grid-cols-[1.4fr_1fr] md:pt-20">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary/80">Portfólio Profissional</p>
            <h1 className="font-serif text-5xl leading-tight text-primary md:text-7xl">
              Marcelo Couto <br /> Bicalho Braga
            </h1>
            <div className="mt-6 h-px w-24 bg-primary" />
            <p className="mt-6 max-w-xl text-lg text-foreground/90">
              Gerente de Projetos & Contratos <span className="text-primary">|</span> Procurement{" "}
              <span className="text-primary">|</span> Business Intelligence
            </p>
            <p className="mt-2 max-w-xl text-lg text-foreground/90">
              Análise de Dados <span className="text-primary">|</span> Sustentabilidade{" "}
              <span className="text-primary">|</span> ESG
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#profissional"
                className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                Conheça minha trajetória
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
              alt="Marcelo Couto Bicalho Braga"
              width={800}
              height={800}
              className="relative h-64 w-64 rounded-full border-2 border-primary/60 object-cover shadow-[var(--shadow-gold)] md:h-80 md:w-80"
            />
          </div>
        </div>

        {/* Navigation icons */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
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

      {/* PROFISSIONAL */}
      <Section id="profissional" eyebrow="02" title="Trajetória Profissional" Icon={Briefcase}>
        <div className="grid gap-6 md:grid-cols-3">
          {experiences.map((exp) => (
            <div
              key={exp.role}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-gold)]"
            >
              <p className="text-xs uppercase tracking-widest text-primary">{exp.period}</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">{exp.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{exp.company}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{exp.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GRADUAÇÃO */}
      <Section id="graduacao" eyebrow="03" title="Graduação & Formação" Icon={GraduationCap}>
        <div className="grid gap-6 md:grid-cols-2">
          <EduCard
            title="MBA em Gestão de Projetos"
            org="Fundação Getulio Vargas (FGV)"
            period="2016 — 2018"
          />
          <EduCard
            title="Pós-graduação em Business Intelligence"
            org="PUC Minas"
            period="2013 — 2015"
          />
          <EduCard
            title="Engenharia de Produção"
            org="UFMG — Universidade Federal de Minas Gerais"
            period="2004 — 2009"
          />
          <EduCard
            title="Certificação em ESG & Sustentabilidade"
            org="Cambridge Institute for Sustainability Leadership"
            period="2022"
          />
        </div>
      </Section>

      {/* CERTIFICAÇÕES */}
      <Section id="certificacoes" eyebrow="04" title="Certificações" Icon={Award}>
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={c}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50">
                <Award className="h-5 w-5 text-primary" />
              </span>
              <span className="text-foreground/90">{c}</span>
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

      {/* OFFLINE / CONTATO */}
      <Section id="offline" eyebrow="08" title="OffLine — Contato" Icon={WifiOff}>
        <div className="rounded-3xl border border-border bg-card p-10">
          <p className="max-w-2xl font-serif text-2xl text-foreground">
            Vamos conversar sobre projetos, contratos e como transformar dados em decisões
            estratégicas.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ContactItem Icon={Mail} label="E-mail" value="marcelo.braga@email.com" />
            <ContactItem Icon={Linkedin} label="LinkedIn" value="/in/marcelobicalho" />
            <ContactItem Icon={MapPin} label="Localização" value="Belo Horizonte, MG" />
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Marcelo Couto Bicalho Braga — Todos os direitos reservados.
      </footer>
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

function EduCard({ title, org, period }: { title: string; org: string; period: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-widest text-primary">{period}</p>
      <h3 className="mt-2 font-serif text-xl text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{org}</p>
    </div>
  );
}

function ContactItem({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
