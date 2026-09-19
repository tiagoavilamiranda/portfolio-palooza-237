// ============================================================================
// EDITE AQUI — Motor de compatibilidade de vagas.
// Tudo roda no navegador do visitante (nenhum dado é enviado para servidor).
// Para ajustar o resultado, edite as "areas" abaixo: palavras-chave e a força
// (strength: 0 a 1) que representa o quanto o Tiago domina aquele tema.
// ============================================================================

import { about, experiences, skills, tools, systems, certifications, education } from "@/data/portfolio";

export type Area = {
  id: string;
  label: string;
  strength: number; // 0 a 1 — quanto o perfil domina o tema
  evidence: string; // frase usada na explicação da nota
  keywords: string[];
};

export const areas: Area[] = [
  {
    id: "financeiro",
    label: "Financeiro",
    strength: 0.95,
    evidence:
      "rotinas financeiras na Unimed, Sol & Neve e Quero Mais Tintas: boletos, cobrança, inadimplência, conciliação e pagamento a fornecedores",
    keywords: ["financeir", "contas a pagar", "contas a receber", "cobranc", "boleto", "inadimplen", "conciliac", "tesourar", "fluxo de caixa", "caixa", "pagamento", "recebimento", "titulo", "remessa bancaria", "banco"],
  },
  {
    id: "administrativo",
    label: "Administrativo",
    strength: 0.97,
    evidence: "atuação administrativa generalista em todas as empresas, com formação em Administração",
    keywords: ["administrat", "auxiliar administrativo", "assistente administrativo", "back office", "backoffice", "rotinas administrativas", "escritorio", "secretar", "documenta", "arquivo", "planilha", "relatorio"],
  },
  {
    id: "cadastro",
    label: "Cadastro PF/PJ",
    strength: 0.95,
    evidence: "cadastro e atualização de clientes PF e PJ em múltiplos sistemas, com validação via Sintegra e Connect",
    keywords: ["cadastr", "pf e pj", "pessoa fisica", "pessoa juridica", "cnpj", "cpf", "base de dados", "sintegra", "higienizac"],
  },
  {
    id: "faturamento",
    label: "Faturamento & Fiscal",
    strength: 0.9,
    evidence: "emissão de NF-e, MDF-e e faturamento na Sol & Neve, Unimed e Quero Mais Tintas",
    keywords: ["faturament", "nota fiscal", "nf-e", "nfe", "mdf-e", "mdfe", "fiscal", "emissao de notas", "tributa", "escritura"],
  },
  {
    id: "atendimento",
    label: "Atendimento & Suporte",
    strength: 0.93,
    evidence: "atendimento a clientes, beneficiários e equipes internas na Unimed, Plan Minas e Dimensa",
    keywords: ["atendiment", "suporte", "help desk", "helpdesk", "service desk", "sac", "call center", "cliente", "chamado", "ticket", "sla", "n1", "n2", "customer success", "pos-venda"],
  },
  {
    id: "ti",
    label: "Tecnologia da Informação",
    strength: 0.8,
    evidence: "técnico de suporte ao negócio na Dimensa e graduação em Gestão de TI (UNOPAR)",
    keywords: [" ti ", "tecnologia da informacao", "sistemas", "software", "infraestrutura", "banco de dados", "sql", "acesso", "permiss", "usuario", "erp", "implantac", "teste de sistema", "homologac", "redmine", "acelerato", "jira"],
  },
  {
    id: "rh",
    label: "Recursos Humanos",
    strength: 0.85,
    evidence: "estágio de RH na Energisa (recrutamento, admissão, eSocial) e rotinas de DP na Sol & Neve, com MBA em Gestão de Pessoas",
    keywords: ["recursos humanos", " rh ", "departamento pessoal", " dp ", "recrutament", "selec", "admiss", "desligament", "esocial", "beneficio", "folha de pagamento", "gestao de pessoas", "triagem de curriculo", "entrevista"],
  },
  {
    id: "dados",
    label: "Dados & Excel",
    strength: 0.85,
    evidence: "controles e relatórios em Excel avançado, Power BI e análise de indicadores",
    keywords: ["excel", "power bi", "powerbi", "dados", "indicador", "kpi", "dashboard", "analise", "relatori", "metrica", "power apps", "planilhas"],
  },
  {
    id: "processos",
    label: "Processos & Organização",
    strength: 0.9,
    evidence: "padronização de processos administrativos e melhoria de eficiência nas rotinas",
    keywords: ["processo", "padroniza", "melhoria continua", "organizac", "rotina", "procedimento", "fluxo", "produtividade", "eficiencia"],
  },
  {
    id: "compras",
    label: "Compras & Estoque",
    strength: 0.7,
    evidence: "pedidos de compra, negociação com fornecedores, estoque e expedição na Quero Mais Tintas e Sol & Neve",
    keywords: ["compras", "fornecedor", "estoque", "almoxarifado", "expedic", "logistic", "suprimento", "negociac", "contrato de comodato"],
  },
  {
    id: "comercial",
    label: "Comercial & Vendas",
    strength: 0.7,
    evidence: "quase 5 anos em vendas na Quero Mais Tintas e comercialização de planos na Plan Minas",
    keywords: ["vendas", "vendedor", "comercial", "prospec", "meta de venda", "balcao", "varejo", "loja"],
  },
  {
    id: "saude",
    label: "Saúde Suplementar",
    strength: 0.75,
    evidence: "quase 3 anos na Unimed Leopoldina e passagem pela Plan Minas (planos de saúde)",
    keywords: ["plano de saude", "operadora", "beneficiario", "saude suplementar", "ans", "unimed", "convenio"],
  },
  {
    id: "ia",
    label: "IA Aplicada",
    strength: 0.75,
    evidence: "aplicação de IA generativa em rotinas de gestão e certificações na área",
    keywords: ["inteligencia artificial", " ia ", "copilot", "chatgpt", "automac", "generativa", "prompt"],
  },
  {
    id: "office",
    label: "Microsoft 365 / Google Workspace",
    strength: 0.9,
    evidence: "domínio de Microsoft 365, Google Workspace e ferramentas colaborativas",
    keywords: ["microsoft", "office", "365", "google workspace", "outlook", "word", "sharepoint", "teams", "google meet", "slack"],
  },
  {
    id: "gestao",
    label: "Gestão & Liderança",
    strength: 0.6,
    evidence: "MBA em Gestão de Pessoas e Liderança, com experiência coordenando demandas e reuniões",
    keywords: ["lideranc", "gestor", "coordenac", "coordenador", "supervis", "equipe", "gerenc"],
  },
];

// Requisitos que o perfil hoje NÃO cobre — usados para penalizar a nota.
const gaps: { label: string; keywords: string[] }[] = [
  { label: "inglês fluente/avançado", keywords: ["ingles fluente", "ingles avancado", "fluent english", "english fluent", "bilingue"] },
  { label: "programação / desenvolvimento de software", keywords: ["desenvolvedor", "programador", "javascript", "python", "java ", "react", "back-end", "front-end", "fullstack", "full stack"] },
  { label: "contabilidade com registro CRC", keywords: ["contador", " crc ", "ciencias contabeis"] },
  { label: "engenharia", keywords: ["engenheiro", "engenharia civil", "engenharia mecanica", "engenharia eletrica", "crea"] },
  { label: "área da saúde assistencial (enfermagem/medicina)", keywords: ["enfermeir", "medic", "coren", "crm ativo", "tecnico de enfermagem"] },
  { label: "atuação jurídica (OAB)", keywords: ["advogad", " oab ", "juridic"] },
];

const stopwords = new Set(
  `a o as os de do da dos das e ou em no na nos nas um uma uns umas para por com sem sob sobre ao aos que se sua seu suas seus como mais menos muito ser estar ter tem sao ate entre pelo pela apos nosso nossa voce vaga empresa area nivel setor sera pode deve desejavel requisito requisitos atividades responsabilidades diferencial experiencia conhecimento conhecimentos profissional profissionais trabalho salario beneficios horario segunda sexta contrato clt local presencial remoto hibrido descricao perfil buscamos procuramos candidato candidatos formacao superior completo cursando ensino medio anos ano`
    .split(/\s+/),
);

export function norm(s: string) {
  return ` ${s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

// Corpus de tudo que o Tiago já fez — usado para medir cobertura de termos.
const corpus = norm(
  [
    about,
    ...skills,
    ...tools,
    ...systems,
    ...certifications.map((c) => `${c.title} ${c.org}`),
    ...education.map((e) => `${e.title} ${e.org} ${e.extra ?? ""}`),
    ...experiences.flatMap((e) => [
      e.role,
      e.company,
      e.desc,
      ...(e.roles?.map((r) => `${r.title} ${r.desc}`) ?? []),
    ]),
    ...areas.flatMap((a) => [a.label, ...a.keywords]),
  ].join(" \n "),
);

export type MatchResult = {
  score: number;
  verdict: "alta" | "media" | "baixa";
  summary: string;
  matchedAreas: { label: string; evidence: string; hits: string[] }[];
  missingAreas: string[];
  unknownTerms: string[];
  termCoverage: number;
};

export function analyzeVaga(text: string): MatchResult | null {
  const raw = text.trim();
  if (raw.length < 2) return null;
  const job = norm(raw);

  // 1) Áreas identificadas na vaga
  const matchedAreas: MatchResult["matchedAreas"] = [];
  for (const area of areas) {
    const hits = area.keywords.filter((k) => job.includes(k.trim().length <= 3 ? k : k));
    if (hits.length > 0) {
      matchedAreas.push({ label: area.label, evidence: area.evidence, hits });
    }
  }
  const areaScore =
    matchedAreas.length > 0
      ? matchedAreas.reduce((acc, m) => {
          const a = areas.find((x) => x.label === m.label)!;
          const weight = Math.min(1, 0.6 + m.hits.length * 0.2);
          return acc + a.strength * weight;
        }, 0) /
        matchedAreas.reduce((acc, m) => acc + Math.min(1, 0.6 + m.hits.length * 0.2), 0)
      : 0;

  // 2) Cobertura de termos relevantes da vaga dentro do histórico do Tiago
  const terms = Array.from(
    new Set(
      job
        .split(" ")
        .filter((w) => w.length >= 4 && !stopwords.has(w) && !/^\d+$/.test(w)),
    ),
  );
  const known = terms.filter((t) => corpus.includes(t.slice(0, Math.max(4, t.length - 2))));
  const unknownTerms = terms.filter((t) => !known.includes(t)).slice(0, 12);
  const termCoverage = terms.length ? known.length / terms.length : 0;

  // 3) Requisitos fora do perfil (penalidade)
  const foundGaps = gaps.filter((g) => g.keywords.some((k) => job.includes(k)));
  const penalty = Math.min(35, foundGaps.length * 14);

  const base = matchedAreas.length > 0 ? areaScore * 0.7 + termCoverage * 0.3 : termCoverage * 0.7;
  let score = Math.round(base * 100) - penalty;
  score = Math.max(0, Math.min(100, score));

  const missingAreas = foundGaps.map((g) => g.label);
  const verdict: MatchResult["verdict"] = score >= 60 ? "alta" : score >= 51 ? "media" : "baixa";

  const top = matchedAreas
    .slice()
    .sort((a, b) => b.hits.length - a.hits.length)
    .slice(0, 3)
    .map((m) => m.label);

  const summary =
    matchedAreas.length === 0
      ? `A descrição analisada não apresenta termos diretamente ligados à minha trajetória administrativa, financeira, de cadastro, atendimento ou TI. Por isso a nota ficou em ${score}%.`
      : verdict === "alta"
        ? `Vaga com nota ${score}% de compatibilidade. Os requisitos concentram-se em ${top.join(", ")}, áreas em que tenho atuação comprovada — ${matchedAreas[0]!.evidence}.`
        : verdict === "media"
          ? `Vaga com nota ${score}%. Existe aderência parcial em ${top.join(", ")}, mas parte dos requisitos foge do meu histórico principal${missingAreas.length ? ` (${missingAreas.join(", ")})` : ""}.`
          : `Vaga com nota ${score}%. A aderência ao meu histórico é baixa${missingAreas.length ? `, principalmente por exigir ${missingAreas.join(", ")}` : ""}.`;

  return { score, verdict, summary, matchedAreas, missingAreas, unknownTerms, termCoverage };
}
