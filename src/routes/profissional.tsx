import { createFileRoute } from "@tanstack/react-router";
import { ProfissionalPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/profissional")({
  head: () => ({ meta: [
    { title: "Trajetória Profissional — Tiago de Avila Miranda" },
    { name: "description", content: "Experiências profissionais de Tiago de Avila Miranda nas áreas administrativa, financeira, cadastral, RH e tecnologia." },
    { property: "og:title", content: "Trajetória Profissional — Tiago de Avila Miranda" },
    { property: "og:description", content: "Conheça as empresas, cargos e atividades da trajetória profissional de Tiago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProfissionalPage,
});