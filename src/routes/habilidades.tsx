import { createFileRoute } from "@tanstack/react-router";
import { HabilidadesPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/habilidades")({
  head: () => ({ meta: [
    { title: "Habilidades — Tiago de Avila Miranda" },
    { name: "description", content: "Habilidades administrativas, financeiras, tecnológicas e de atendimento de Tiago de Avila Miranda." },
    { property: "og:title", content: "Habilidades — Tiago de Avila Miranda" },
    { property: "og:description", content: "Conheça as principais habilidades e competências profissionais de Tiago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HabilidadesPage,
});