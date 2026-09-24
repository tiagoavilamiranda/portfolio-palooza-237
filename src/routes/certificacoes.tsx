import { createFileRoute } from "@tanstack/react-router";
import { CertificacoesPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/certificacoes")({
  head: () => ({ meta: [
    { title: "Certificações — Tiago de Avila Miranda" },
    { name: "description", content: "Cursos e certificações profissionais de Tiago de Avila Miranda em gestão, dados, tecnologia e atendimento." },
    { property: "og:title", content: "Certificações — Tiago de Avila Miranda" },
    { property: "og:description", content: "Conheça os cursos e certificados que complementam a formação de Tiago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CertificacoesPage,
});