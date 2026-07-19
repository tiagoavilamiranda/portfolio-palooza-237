import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [{ title: "Portfólio — Tiago de Avila Miranda" }] }),
  component: PortfolioPage,
});