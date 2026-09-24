import { createFileRoute } from "@tanstack/react-router";
import { OfflinePage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/offline")({
  head: () => ({ meta: [
    { title: "Contato e OffLine — Tiago de Avila Miranda" },
    { name: "description", content: "Entre em contato com Tiago de Avila Miranda e conheça seus interesses fora do trabalho." },
    { property: "og:title", content: "Contato e OffLine — Tiago de Avila Miranda" },
    { property: "og:description", content: "Contato, localização e interesses pessoais de Tiago de Avila Miranda." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: OfflinePage,
});