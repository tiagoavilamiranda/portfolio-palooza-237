import { createFileRoute } from "@tanstack/react-router";
import { FerramentasPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({ meta: [
    { title: "Ferramentas e Sistemas — Tiago de Avila Miranda" },
    { name: "description", content: "Ferramentas, plataformas e sistemas corporativos utilizados por Tiago de Avila Miranda." },
    { property: "og:title", content: "Ferramentas e Sistemas — Tiago de Avila Miranda" },
    { property: "og:description", content: "Conheça as ferramentas e os sistemas que fazem parte da experiência de Tiago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: FerramentasPage,
});