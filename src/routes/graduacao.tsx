import { createFileRoute } from "@tanstack/react-router";
import { GraduacaoPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/graduacao")({
  head: () => ({
    meta: [
      { title: "Graduação e Formação — Tiago de Avila Miranda" },
      {
        name: "description",
        content: "Formação acadêmica de Tiago de Avila Miranda em Administração, Gestão de TI, Gestão de Pessoas, Business Intelligence, Finanças, Auditoria e Controladoria.",
      },
      { property: "og:title", content: "Graduação e Formação — Tiago de Avila Miranda" },
      {
        property: "og:description",
        content: "Conheça a formação de Tiago e os MBAs em Business Intelligence e em Finanças, Auditoria e Controladoria na Anhanguera.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GraduacaoPage,
});