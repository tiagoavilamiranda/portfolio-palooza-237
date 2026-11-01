import { describe, expect, test } from "bun:test";
import { education, educationSummary } from "./portfolio";
import { analyzeVaga } from "../lib/vaga-match";

describe("Formação informada no LinkedIn", () => {
  test("MBA Business Intelligence mantém instituição, período e andamento", () => {
    expect(education.find((item) => item.title.includes("Business Intelligence"))).toEqual({
      title: "Pós-graduação Lato Sensu — MBA em Business Intelligence",
      org: "Anhanguera Educacional",
      period: "out 2026 — ago 2027",
      extra: "Curso em andamento",
    });
  });
  test("nova formação não substitui os outros cursos", () => {
    expect(education).toHaveLength(6);
    expect(education.find((item) => item.title.includes("Finanças"))?.period).toBe("set 2026 — jul 2027");
    expect(education.find((item) => item.title.includes("Gestão da Tecnologia"))?.period).toBe("fev 2025 — jul 2027");
  });
  test("resumo compartilhado preserva os dois MBAs da Anhanguera", () => {
    expect(educationSummary).toContain("Business Intelligence");
    expect(educationSummary).toContain("Finanças, Auditoria e Controladoria");
  });
  test("compatibilidade reconhece BI como estudos em andamento sem mudar a força da experiência", () => {
    const result = analyzeVaga("MBA em Business Intelligence");
    const area = result?.matchedAreas.find((item) => item.label === "Excel, dados e relatórios");
    expect(area?.examples.some((item) => item.includes("out 2026 — ago 2027") && item.includes("Formação em andamento"))).toBe(true);
    expect(result?.metRequirements.some((item) => item.includes("Business Intelligence"))).toBe(true);
  });
});