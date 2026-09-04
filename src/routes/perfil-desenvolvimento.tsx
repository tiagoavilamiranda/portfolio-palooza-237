import { createFileRoute } from "@tanstack/react-router";
import { PerfilDesenvolvimentoPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/perfil-desenvolvimento")({
  head: () => ({
    meta: [
      { title: "Perfil Profissional & Desenvolvimento — Tiago de Avila Miranda" },
      {
        name: "description",
        content:
          "Perfil comportamental e documentos de desenvolvimento profissional de Tiago de Avila Miranda.",
      },
      { property: "og:title", content: "Perfil Profissional & Desenvolvimento — Tiago de Avila Miranda" },
      {
        property: "og:description",
        content: "Perfil comportamental e desenvolvimento profissional de Tiago de Avila Miranda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerfilDesenvolvimentoPage,
});
