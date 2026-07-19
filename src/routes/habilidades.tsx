import { createFileRoute } from "@tanstack/react-router";
import { HabilidadesPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/habilidades")({
  head: () => ({ meta: [{ title: "Habilidades — Tiago de Avila Miranda" }] }),
  component: HabilidadesPage,
});