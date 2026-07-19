import { createFileRoute } from "@tanstack/react-router";
import { CertificacoesPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/certificacoes")({
  head: () => ({ meta: [{ title: "Certificações — Tiago de Avila Miranda" }] }),
  component: CertificacoesPage,
});