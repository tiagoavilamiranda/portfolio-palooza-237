import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [
    { title: "Projetos — Tiago de Avila Miranda" },
    { name: "description", content: "Projetos de Tiago de Avila Miranda em processos, dados, suporte e inteligência artificial aplicada." },
    { property: "og:title", content: "Projetos — Tiago de Avila Miranda" },
    { property: "og:description", content: "Conheça os projetos e entregas profissionais de Tiago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PortfolioPage,
});