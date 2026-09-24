import { createFileRoute } from "@tanstack/react-router";
import { GraduacaoPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/graduacao")({
  head: () => ({
    meta: [
      { title: "Graduação e Formação — Tiago de Avila Miranda" },
      {
        name: "description",
        content: "Formação acadêmica de Tiago de Avila Miranda em Administração, Gestão de TI, Gestão de Pessoas, Finanças, Auditoria e Controladoria.",
      },
      { property: "og:title", content: "Graduação e Formação — Tiago de Avila Miranda" },
      {
        property: "og:description",
        content: "Conheça a formação acadêmica e os MBAs de Tiago de Avila Miranda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GraduacaoPage,
});