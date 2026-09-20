// ============================================================================
// EDITE AQUI — Motor de compatibilidade de vagas.
// Tudo roda no navegador do visitante (nenhum dado é enviado para servidor).
// Para ajustar o resultado, edite as "areas" abaixo: palavras-chave, a força
// (strength: 0 a 1) e os exemplos reais de trabalho usados na explicação.
// ============================================================================

import { experiences } from "@/data/portfolio";

export type Area = {
  id: string;
  label: string;
  strength: number; // 0 a 1 — quanto o perfil domina o tema
  evidence: string; // frase-resumo usada na explicação da nota
  examples: string[]; // exemplos concretos citando empresa, atividade e ferramenta
  keywords: string[];
};

export const areas: Area[] = [
  {
    id: "financeiro",
    label: "Financeiro (contas a pagar e receber)",
    strength: 0.95,
    evidence:
      "rotina financeira completa: contas a pagar e a receber, boletos, cobrança, inadimplência, conciliação bancária e controle de caixa",
    examples: [
      "Na Unimed Leopoldina, emissão de boletos, controle de contas a pagar e a receber, conciliação bancária e relatórios financeiros de apoio à cobrança, além de inclusão de débitos no SPC/Serasa.",
      "Na Quero Mais Tintas, gestão financeira completa: boletos pelo Sicoob, controle de caixa, pagamento a fornecedores e acompanhamento da inadimplência.",
    ],
    keywords: [
      "financeir", "financa", "financas", "contas a pagar", "contas a receber", "cobranc", "boleto",
      "inadimplen", "conciliac", "tesourar", "fluxo de caixa", "caixa", "pagamento", "recebimento",
      "titulo", "remessa bancaria", "banco", "bancari", "sicoob", "baixa de titulo", "cnab",
      "contas", "pagar", "receber", "credito", "debito", "spc", "serasa", "juros", "repasse",
    ],
  },
  {
    id: "administrativo",
    label: "Rotinas administrativas",
    strength: 0.97,
    evidence:
      "atuação administrativa generalista em todas as empresas da minha trajetória, com formação técnica e superior em Administração",
    examples: [
      "Na Sol & Neve, rotina administrativa completa: cadastros, documentos, contratos de comodato, estoque, expedição e apoio ao RH.",
      "Na Dimensa, organização de demandas das squads, controle de planilhas online e interface entre clientes e time técnico.",
    ],
    keywords: [
      "administrat", "auxiliar administrativo", "assistente administrativo", "analista administrativo",
      "back office", "backoffice", "rotinas administrativas", "escritorio", "secretar", "documenta",
      "arquivo", "planilha", "relatorio", "conferencia", "lancament", "digitac", "protocolo", "apoio",
    ],
  },
  {
    id: "cadastro",
    label: "Cadastro PF/PJ e gestão de dados",
    strength: 0.95,
    evidence:
      "cadastro e atualização de clientes PF e PJ em múltiplas bases, com validação via Sintegra e Connect",
    examples: [
      "Na Sol & Neve, cadastro simultâneo de clientes PJ e PF em três bases diferentes, com consulta e validação no Sintegra e no Connect.",
      "Na Energisa, cadastro e admissão de colaboradores nos sistemas RH Health e Unico, com qualificação cadastral no eSocial.",
    ],
    keywords: [
      "cadastr", "recadastr", "pf e pj", "pessoa fisica", "pessoa juridica", "cnpj", "cpf",
      "base de dados", "sintegra", "higienizac", "ficha", "atualizacao cadastral", "registro",
    ],
  },
  {
    id: "faturamento",
    label: "Faturamento e notas fiscais",
    strength: 0.9,
    evidence: "emissão e lançamento de NF-e e MDF-e, faturamento e conferência fiscal",
    examples: [
      "Na Sol & Neve, emissão de NF-e de entrada e saída e de MDF-e para a operação de transporte.",
      "Na Quero Mais Tintas, lançamento de notas fiscais de entrada e saída junto ao controle de compras e estoque.",
    ],
    keywords: [
      "faturament", "nota fiscal", "notas fiscais", "nf-e", "nfe", "nfs", "mdf-e", "mdfe", "fiscal",
      "emissao de notas", "tributa", "escritura", "imposto", "danfe", "xml",
    ],
  },
  {
    id: "atendimento",
    label: "Atendimento e suporte",
    strength: 0.93,
    evidence:
      "atendimento multicanal a clientes, beneficiários e equipes internas, com controle de chamados e SLA",
    examples: [
      "Na Dimensa, tratativa de chamados com controle de SLA e prazos no Acelerato e no Redmine, sempre com contato proativo com o cliente.",
      "Na Unimed, atendimento presencial, telefônico e digital a beneficiários e cooperados, incluindo 2ª via de boletos e cartões.",
    ],
    keywords: [
      "atendiment", "suporte", "help desk", "helpdesk", "service desk", "sac", "call center",
      "cliente", "chamado", "ticket", "sla", "n1", "n2", "customer success", "pos-venda",
      "telefonic", "whatsapp", "relacionamento",
    ],
  },
  {
    id: "ti",
    label: "Tecnologia e sistemas",
    strength: 0.8,
    evidence:
      "técnico de suporte ao negócio na Dimensa, com graduação em Gestão de TI em andamento (UNOPAR)",
    examples: [
      "Na Dimensa, gestão de acessos, perfis e permissões de usuários, apoio em banco de dados e testes/homologação de sistemas.",
      "Adaptação rápida a ERPs e sistemas corporativos: Ellevo, Acelerato, Redmine, Unico, RH Health, Director e Cardio.",
    ],
    keywords: [
      " ti ", "tecnologia da informacao", "sistemas", "sistema", "software", "infraestrutura",
      "banco de dados", "sql", "acesso", "permiss", "usuario", "erp", "crm", "implantac",
      "teste de sistema", "homologac", "redmine", "acelerato", "jira", "chamados tecnicos",
    ],
  },
  {
    id: "rh",
    label: "RH e Departamento Pessoal",
    strength: 0.85,
    evidence:
      "estágio de RH na Energisa (recrutamento, admissão, eSocial) e rotinas de DP na Sol & Neve, com MBA em Gestão de Pessoas",
    examples: [
      "Na Energisa, divulgação de vagas, triagem de currículos, entrevistas e cartas-proposta pela plataforma Kenoby, além de avaliação comportamental Etalent DISC.",
      "Na Sol & Neve, admissão e desligamento via RH NET Social e eSocial, benefícios (Policard, Alelo, VT) e apoio à folha de pagamento.",
    ],
    keywords: [
      "recursos humanos", " rh ", "departamento pessoal", " dp ", "recrutament", "selec", "admiss",
      "desligament", "esocial", "beneficio", "folha de pagamento", "gestao de pessoas",
      "triagem de curriculo", "entrevista", "ponto", "banco de horas", "insalubridade",
    ],
  },
  {
    id: "dados",
    label: "Excel, dados e relatórios",
    strength: 0.85,
    evidence: "controles e relatórios em Excel avançado, Power BI e acompanhamento de indicadores",
    examples: [
      "Na Dimensa, monitoramento de demandas e indicadores em Excel online, com relatórios gerenciais recorrentes.",
      "Certificações em Power BI e Power Apps (Viscari) e em análise de dados para tomada de decisão (Escola Conquer).",
    ],
    keywords: [
      "excel", "power bi", "powerbi", "dados", "indicador", "kpi", "dashboard", "analise",
      "relatori", "metrica", "power apps", "planilhas", "procv", "tabela dinamica", "grafico",
    ],
  },
  {
    id: "processos",
    label: "Processos e organização",
    strength: 0.9,
    evidence: "padronização de processos administrativos e melhoria de eficiência nas rotinas",
    examples: [
      "Padronização de rotinas administrativas e criação de controles que reduziram retrabalho em cadastro, faturamento e cobrança.",
    ],
    keywords: [
      "processo", "padroniza", "melhoria continua", "organizac", "rotina", "procedimento", "fluxo",
      "produtividade", "eficiencia", "prazo", "multitarefa", "sistematiza", "estrutura",
    ],
  },
  {
    id: "compras",
    label: "Compras, estoque e fornecedores",
    strength: 0.7,
    evidence: "pedidos de compra, negociação com fornecedores, estoque e expedição",
    examples: [
      "Na Quero Mais Tintas, emissão e acompanhamento de pedidos de compra, negociação com fornecedores e controle de estoque.",
      "Na Sol & Neve, controle de estoque, expedição para lojas e PDVs e acompanhamento de garantias com fornecedores.",
    ],
    keywords: [
      "compras", "fornecedor", "estoque", "almoxarifado", "expedic", "logistic", "suprimento",
      "negociac", "comodato", "inventario", "recebimento de mercadoria",
    ],
  },
  {
    id: "comercial",
    label: "Comercial e vendas",
    strength: 0.7,
    evidence: "quase 5 anos em vendas na Quero Mais Tintas e comercialização de planos na Plan Minas",
    examples: [
      "Na Quero Mais Tintas, 4 anos de balcão: atendimento, pedidos, cobrança e relacionamento com o cliente.",
    ],
    keywords: [
      "vendas", "vendedor", "comercial", "prospec", "meta", "balcao", "varejo", "loja", "orcamento",
    ],
  },
  {
    id: "saude",
    label: "Saúde suplementar",
    strength: 0.75,
    evidence: "quase 3 anos na Unimed Leopoldina e passagem pela Plan Minas (planos de saúde)",
    examples: [
      "Na Unimed, rotinas de cadastro, cobrança e faturamento de beneficiários, suporte ao intercâmbio nacional e apoio a auditores médicos.",
    ],
    keywords: [
      "plano de saude", "operadora", "beneficiario", "saude suplementar", "ans", "unimed",
      "convenio", "intercambio", "autorizac",
    ],
  },
  {
    id: "ia",
    label: "IA aplicada e automação",
    strength: 0.75,
    evidence: "uso de IA generativa em rotinas de gestão, com formação e certificações na área",
    examples: [
      "Aplicação de IA generativa para acelerar relatórios, textos e análises no dia a dia administrativo.",
    ],
    keywords: [
      "inteligencia artificial", " ia ", "copilot", "chatgpt", "automac", "generativa", "prompt",
    ],
  },
  {
    id: "office",
    label: "Microsoft 365 e Google Workspace",
    strength: 0.9,
    evidence: "domínio de Microsoft 365, Google Workspace e ferramentas colaborativas",
    examples: [
      "Uso diário de Outlook, Word, Excel, Teams, SharePoint, Google Meet e Slack na rotina com clientes e times internos.",
    ],
    keywords: [
      "microsoft", "office", "365", "google workspace", "outlook", "word", "sharepoint", "teams",
      "google meet", "slack", "pacote office",
    ],
  },
  {
    id: "gestao",
    label: "Gestão e liderança",
    strength: 0.6,
    evidence: "MBA em Gestão de Pessoas e Liderança, com experiência coordenando demandas e reuniões",
    examples: [
      "Condução de reuniões técnicas e organização de demandas entre áreas na Dimensa.",
    ],
    keywords: ["lideranc", "gestor", "coordenac", "coordenador", "supervis", "equipe", "gerenc"],
  },
];

// Sinônimos e variações (inclusive erros comuns de português) → termo canônico.
const synonyms: Record<string, string> = {
  financas: "financeiro",
  finanças: "financeiro",
  financeira: "financeiro",
  fincanceiro: "financeiro",
  finaceiro: "financeiro",
  tesouraria: "financeiro",
  cobranca: "cobranc",
  faturista: "faturament",
  notafiscal: "nota fiscal",
  adm: "administrativo",
  administrativa: "administrativo",
  aux: "auxiliar",
  rh: " rh ",
  dp: " dp ",
  "departamento de pessoal": "departamento pessoal",
  recepcao: "atendimento",
  recepcionista: "atendimento",
  atendente: "atendimento",
  telemarketing: "atendimento",
  suporte_tecnico: "suporte",
  planilhas: "excel",
  "excell": "excel",
  "exel": "excel",
  bi: "power bi",
  contabil: "fiscal",
  contabilidade: "fiscal",
  compradora: "compras",
  comprador: "compras",
  almoxarife: "almoxarifado",
  estoquista: "estoque",
  vendas_internas: "vendas",
  cliente_final: "cliente",
};

export function norm(s: string) {
  return ` ${s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

// distância de edição simples, para tolerar erros de digitação
function close(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  if (a.length < 5) return false;
  let i = 0;
  let j = 0;
  let diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++diff > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else {
      i++;
      j++;
    }
  }
  return true;
}

// Empresas da trajetória — usadas quando a busca é pelo nome da empresa.
type CompanyHit = { company: string; role: string; period: string; location?: string; roles?: { title: string; period: string }[] };

const companyAliases: { match: string[]; company: string }[] = [
  { match: ["dimensa"], company: "Dimensa Tecnologia" },
  { match: ["sol e neve", "sol neve", "expresso frio"], company: "Sol & Neve Açaí & Sorvete" },
  { match: ["energisa"], company: "Energisa" },
  { match: ["unimed"], company: "Unimed Leopoldina" },
  { match: ["plan minas", "planminas"], company: "Plan Minas" },
  { match: ["quero mais tintas", "quero mais"], company: "Quero Mais Tintas Ltda" },
];

function findCompanies(job: string): CompanyHit[] {
  const hits: CompanyHit[] = [];
  for (const alias of companyAliases) {
    if (!alias.match.some((m) => job.includes(norm(m).trim()))) continue;
    const exp = experiences.find((e) => e.company === alias.company);
    if (!exp) continue;
    hits.push({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      location: exp.location,
      roles: exp.roles?.map((r) => ({ title: r.title, period: r.period })),
    });
  }
  return hits;
}

export type MatchResult = {
  score: number;
  verdict: "alta" | "media" | "baixa";
  headline: string; // frase que fala a nota em voz alta
  summary: string;
  matchedAreas: { label: string; evidence: string; examples: string[]; hits: string[] }[];
  missingAreas: string[];
  companies: CompanyHit[];
  companyOnly: boolean; // quando a busca foi só pelo nome de uma empresa: sem nota
};

// Requisitos que o perfil hoje NÃO cobre — usados para penalizar a nota.
const gaps: { label: string; keywords: string[] }[] = [
  { label: "inglês fluente/avançado", keywords: ["ingles fluente", "ingles avancado", "fluent english", "english fluent", "bilingue"] },
  { label: "programação / desenvolvimento de software", keywords: ["desenvolvedor", "programador", "javascript", "python", "java ", "react", "back-end", "front-end", "fullstack", "full stack"] },
  { label: "contabilidade com registro CRC", keywords: ["contador", " crc ", "ciencias contabeis"] },
  { label: "engenharia", keywords: ["engenheiro", "engenharia civil", "engenharia mecanica", "engenharia eletrica", "crea"] },
  { label: "área da saúde assistencial (enfermagem/medicina)", keywords: ["enfermeir", "medic", "coren", "crm ativo", "tecnico de enfermagem"] },
  { label: "atuação jurídica (OAB)", keywords: ["advogad", " oab ", "juridic"] },
];

const verdictLabel = {
  alta: "Compatível",
  media: "Atenção — aderência parcial",
  baixa: "Pouco compatível",
} as const;

export function analyzeVaga(text: string): MatchResult | null {
  const raw = text.trim();
  if (raw.length < 2) return null;
  let job = norm(raw);

  // expande sinônimos e corrige variações antes de comparar
  const tokens = job.split(" ").filter(Boolean);
  const extra: string[] = [];
  for (const t of tokens) {
    const syn = synonyms[t];
    if (syn) extra.push(norm(syn).trim());
  }
  if (extra.length) job = `${job}${extra.join(" ")} `;

  const companies = findCompanies(job);
  const wordCount = tokens.length;

  // Busca curta pelo nome da empresa → mostra o cargo e o período, sem nota.
  if (companies.length > 0 && wordCount <= 8) {
    return {
      score: 0,
      verdict: "alta",
      headline: "",
      summary: "",
      matchedAreas: [],
      missingAreas: [],
      companies,
      companyOnly: true,
    };
  }

  // 1) Áreas identificadas na vaga (com tolerância a erros de digitação)
  const matchedAreas: MatchResult["matchedAreas"] = [];
  for (const area of areas) {
    const hits = area.keywords.filter((k) => {
      const key = k.trim();
      if (job.includes(key.length <= 3 ? ` ${key} ` : key)) return true;
      if (key.includes(" ")) return false;
      return tokens.some((t) => close(t, key));
    });
    if (hits.length > 0) {
      matchedAreas.push({
        label: area.label,
        evidence: area.evidence,
        examples: area.examples,
        hits,
      });
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

  // 2) Abrangência: quantas frentes distintas da vaga eu cubro
  const breadth = Math.min(1, matchedAreas.length / 4);

  // 3) Requisitos fora do perfil (única penalidade — palavras comuns nunca descontam nota)
  const foundGaps = gaps.filter((g) => g.keywords.some((k) => job.includes(k)));
  const penalty = Math.min(35, foundGaps.length * 14);

  let score = Math.round((areaScore * 0.78 + breadth * 0.22) * 100) - penalty;
  score = Math.max(0, Math.min(100, score));

  const missingAreas = foundGaps.map((g) => g.label);
  const verdict: MatchResult["verdict"] = score >= 60 ? "alta" : score >= 51 ? "media" : "baixa";

  const ranked = matchedAreas
    .slice()
    .sort((a, b) => b.hits.length - a.hits.length);
  const top = ranked.slice(0, 3).map((m) => m.label);

  const headline =
    matchedAreas.length === 0
      ? `Nota 0% — não identifiquei nesta descrição temas ligados à minha trajetória.`
      : `Nota ${score}% de compatibilidade — ${verdictLabel[verdict]}.`;

  const parts: string[] = [];
  if (matchedAreas.length === 0) {
    parts.push(
      "A descrição analisada não traz requisitos ligados às áreas em que atuo (administrativa, financeira, cadastro, faturamento, atendimento, RH ou sistemas). Por isso a nota ficou em 0%.",
    );
  } else {
    parts.push(
      `Esta vaga tem nota ${score}% de compatibilidade com o meu perfil. Os requisitos se concentram em ${top.join(", ")} — exatamente o que faço no dia a dia há mais de 10 anos de trajetória administrativa e financeira.`,
    );
    const lead = ranked[0]!;
    parts.push(`Em ${lead.label.toLowerCase()}, minha experiência é direta: ${lead.evidence}. ${lead.examples[0] ?? ""}`.trim());
    const second = ranked[1];
    if (second) {
      parts.push(`Também atendo ${second.label.toLowerCase()}: ${second.examples[0] ?? second.evidence}`);
    }
    if (verdict === "alta") {
      parts.push(
        "Somando isso ao domínio de Excel avançado, Microsoft 365, Google Workspace e ERPs (Acelerato, Redmine, Ellevo, Unico, RH Health, Sicoob, Sintegra), consigo assumir a rotina com pouca curva de adaptação.",
      );
    } else if (verdict === "media") {
      parts.push(
        `Existe aderência parcial${missingAreas.length ? `: parte dos requisitos (${missingAreas.join(", ")}) foge do meu histórico` : ", já que a vaga mistura temas dentro e fora da minha atuação principal"}. Nas frentes administrativas e financeiras, porém, a entrega é imediata.`,
      );
    } else {
      parts.push(
        `A aderência ao meu histórico é baixa${missingAreas.length ? `, principalmente por exigir ${missingAreas.join(", ")}` : ""}.`,
      );
    }
  }

  return {
    score,
    verdict,
    headline,
    summary: parts.filter(Boolean).join(" "),
    matchedAreas: ranked,
    missingAreas,
    companies,
    companyOnly: false,
  };
}
