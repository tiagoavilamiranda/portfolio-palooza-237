import { createFileRoute } from "@tanstack/react-router";
import { GraduacaoPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/graduacao")({
  head: () => ({ meta: [{ title: "Graduação — Tiago de Avila Miranda" }] }),
  component: GraduacaoPage,
});