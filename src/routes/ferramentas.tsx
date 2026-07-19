import { createFileRoute } from "@tanstack/react-router";
import { FerramentasPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({ meta: [{ title: "Ferramentas & Sistemas — Tiago de Avila Miranda" }] }),
  component: FerramentasPage,
});