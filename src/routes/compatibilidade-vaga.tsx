import { createFileRoute } from "@tanstack/react-router";
import { CompatibilidadeVagaPage } from "@/components/compatibilidade-vaga";

export const Route = createFileRoute("/compatibilidade-vaga")({
  head: () => ({
    meta: [
      { title: "Compatibilidade da Vaga — Tiago de Avila Miranda" },
      {
        name: "description",
        content:
          "Cole a descrição de uma vaga ou envie o PDF e veja de 0 a 100% a compatibilidade com o perfil profissional de Tiago de Avila Miranda.",
      },
      { property: "og:title", content: "Compatibilidade da Vaga — Tiago de Avila Miranda" },
      {
        property: "og:description",
        content: "Descubra em segundos o quanto uma vaga combina com a trajetória do Tiago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompatibilidadeVagaPage,
});
