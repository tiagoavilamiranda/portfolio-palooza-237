import { createFileRoute } from "@tanstack/react-router";
import { OfflinePage } from "@/components/portfolio-sections";

export const Route = createFileRoute("/offline")({
  head: () => ({ meta: [{ title: "Contato — Tiago de Avila Miranda" }] }),
  component: OfflinePage,
});