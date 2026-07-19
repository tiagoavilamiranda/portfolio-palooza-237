import { createFileRoute } from "@tanstack/react-router";
import { ProfissionalPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/profissional")({
  head: () => ({ meta: [{ title: "Trajetória Profissional — Tiago de Avila Miranda" }] }),
  component: ProfissionalPage,
});