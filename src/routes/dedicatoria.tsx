import { createFileRoute } from "@tanstack/react-router";
import { DedicatoriaPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/dedicatoria")({
  head: () => ({ meta: [
    { title: "Dedicatória — Tiago de Avila Miranda" },
    { name: "description", content: "Homenagem de Tiago de Avila Miranda às empresas que fizeram parte de sua trajetória profissional." },
    { property: "og:title", content: "Dedicatória — Tiago de Avila Miranda" },
    { property: "og:description", content: "Uma homenagem às empresas e pessoas que participaram da trajetória de Tiago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DedicatoriaPage,
});