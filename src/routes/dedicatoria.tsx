import { createFileRoute } from "@tanstack/react-router";
import { DedicatoriaPage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/dedicatoria")({
  head: () => ({ meta: [{ title: "Dedicatória — Tiago de Avila Miranda" }] }),
  component: DedicatoriaPage,
});