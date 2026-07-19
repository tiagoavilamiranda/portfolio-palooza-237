import { createFileRoute } from "@tanstack/react-router";
import { SobrePage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [{ title: "Sobre — Tiago de Avila Miranda" }] }),
  component: SobrePage,
});