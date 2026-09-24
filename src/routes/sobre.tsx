import { createFileRoute } from "@tanstack/react-router";
import { SobrePage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [
    { title: "Sobre — Tiago de Avila Miranda" },
    { name: "description", content: "Conheça o perfil, os objetivos e a atuação profissional de Tiago de Avila Miranda." },
    { property: "og:title", content: "Sobre — Tiago de Avila Miranda" },
    { property: "og:description", content: "Perfil e apresentação profissional de Tiago de Avila Miranda." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SobrePage,
});