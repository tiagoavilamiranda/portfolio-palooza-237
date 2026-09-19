import { createFileRoute, Link } from "@tanstack/react-router";
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
  Heart,
  HandHeart,
  Brain,
  Target,
} from "lucide-react";
import { profile as profileData } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function triggerShake() {
  if (typeof document === "undefined") return;
  const el = document.body;
  el.classList.remove("page-shake");
  void el.offsetWidth;
  el.classList.add("page-shake");
}

const cards = [
  { to: "/sobre", label: "Sobre", Icon: IdCard },
  { to: "/profissional", label: "Profissional", Icon: Briefcase },
  { to: "/graduacao", label: "Graduação", Icon: GraduationCap },
  { to: "/certificacoes", label: "Certificações", Icon: Award },
  { to: "/habilidades", label: "Habilidades", Icon: Lightbulb },
  { to: "/ferramentas", label: "Ferramentas", Icon: Wrench },
  { to: "/portfolio", label: "Portfólio", Icon: FolderKanban },
  { to: "/dedicatoria", label: "Dedicatória", Icon: HandHeart },
  { to: "/offline", label: "OffLine", Icon: WifiOff },
  { to: "/perfil-desenvolvimento", label: "Perfil & Desenvolvimento", Icon: Brain },
  { to: "/compatibilidade-vaga", label: "Compatibilidade Vaga", Icon: Target },
] as const;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <section className="relative min-h-screen overflow-hidden">
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
          <Link
            to="/dedicatoria"
            onClick={triggerShake}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary transition-all hover:bg-primary/10 hover:shadow-[var(--shadow-gold)]"
          >
            <Heart className="h-3.5 w-3.5" />
            Dedicatória
          </Link>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-10 pb-16 md:grid-cols-[1.4fr_1fr] md:pt-20">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary/80">
              Portfólio Profissional
            </p>
            <h1 className="font-serif text-5xl leading-tight text-primary md:text-7xl">
              {profileData.name.split(" ").slice(0, -1).join(" ")} <br />
              {profileData.name.split(" ").slice(-1)}
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
              <Link
                to="/profissional"
                onClick={triggerShake}
                className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                Conheça minha trajetória
              </Link>
              <Link
                to="/dedicatoria"
                onClick={triggerShake}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Heart className="h-4 w-4" />
                Dedicatória
              </Link>
              <Link
                to="/offline"
                onClick={triggerShake}
                className="rounded-full border border-primary/40 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Entrar em contato
              </Link>
              <Link
                to="/perfil-desenvolvimento"
                onClick={triggerShake}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <Brain className="h-4 w-4" />
                Perfil Profissional & Desenvolvimento
              </Link>
              <Link
                to="/compatibilidade-vaga"
                onClick={triggerShake}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Target className="h-4 w-4" />
                Compatibilidade Vaga
              </Link>
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

        {/* Navigation cards → sub-pages */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.4em] text-primary/70">
            Navegue pelas seções
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cards.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={triggerShake}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-card/60 backdrop-blur transition-all group-hover:border-primary group-hover:shadow-[var(--shadow-gold)]">
                  <Icon className="h-6 w-6 text-primary" />
                </span>
                <span className="text-[11px] font-medium tracking-wide text-foreground/80 group-hover:text-primary">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profileData.name} — Todos os direitos reservados.
      </footer>
    </div>
  );
}