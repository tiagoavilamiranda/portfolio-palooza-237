import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { education, educationSummary } from "./portfolio";
import { analyzeVaga } from "../lib/vaga-match";

describe("Formação informada no LinkedIn", () => {
  test("MBA Business Intelligence mantém instituição, período e andamento", () => {
    assert.deepEqual(education.find((item) => item.title.includes("Business Intelligence")), {
      title: "Pós-graduação Lato Sensu — MBA em Business Intelligence",
      org: "Anhanguera Educacional",
      period: "out 2026 — ago 2027",
      extra: "Curso em andamento",
    });
  });
  test("Gestão de TI (UNOPAR) não consta na formação", () => {
    assert.equal(education.length, 5);
    assert.equal(education.find((item) => item.title.includes("Gestão da Tecnologia")), undefined);
    assert.equal(education.find((item) => item.title.includes("Finanças"))?.period, "set 2026 — jul 2027");
  });
  test("resumo compartilhado preserva os dois MBAs da Anhanguera", () => {
    assert.ok(educationSummary.includes("Business Intelligence"));
    assert.ok(educationSummary.includes("Finanças, Auditoria e Controladoria"));
  });
  test("compatibilidade reconhece BI como estudos em andamento sem mudar a força da experiência", () => {
    const result = analyzeVaga("MBA em Business Intelligence");
    const area = result?.matchedAreas.find((item) => item.label === "Excel, dados e relatórios");
    assert.equal(area?.examples.some((item) => item.includes("out 2026 — ago 2027") && item.includes("Formação em andamento")), true);
    assert.equal(result?.metRequirements.some((item) => item.includes("Business Intelligence")), true);
  });
});