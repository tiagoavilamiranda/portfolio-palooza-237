// ============================================================================
// EDITE AQUI — Todos os dados do portfólio ficam neste arquivo.
// Basta trocar os textos, datas, empresas, cursos, etc.
// ============================================================================

import logoDimensa from "@/assets/logo-10.png.asset.json";
import logoSolNeve from "@/assets/logo-11.png.asset.json";
import logoEnergisa from "@/assets/logo-12.png.asset.json";
import logoUnimed from "@/assets/logo-13.png.asset.json";
import logoPlanMinas from "@/assets/logo-14.png.asset.json";
import docPerfilComportamental from "@/assets/perfil-comportamental.pdf.asset.json";
import docDesenvolvimentoProfissional from "@/assets/desenvolvimento-profissional.pdf.asset.json";

export const profile = {
  name: "Tiago de Avila Miranda",
  initials: "TAM",
  headline:
    "Administrador | Administrativo Generalista | Cadastro PF/PJ | Faturamento | Financeiro | Processos Administrativos | Gestão de TI | Microsoft 365 | Google Workspace | IA Aplicada",
  shortHeadline: [
    "Administrador | Gestão de TI | Processos Administrativos",
    "Cadastro PF/PJ | Faturamento | Financeiro | IA Aplicada",
  ],
  email: "tiagooavila@yahoo.com.br",
  linkedin: "https://www.linkedin.com/in/tiago-de-avila-miranda-53674293/",
  linkedinLabel: "/in/tiago-de-avila-miranda-53674293",
  location: "Leopoldina, Minas Gerais, Brasil",
};

export const about = `Administrador formado, atualmente cursando Gestão de TI, com experiência nas áreas administrativa, financeira, cadastral e de atendimento interno, atuando em empresas como Unimed, Energisa, Sol e Neve e Dimensa.

Ao longo da minha trajetória, desenvolvi experiência em cadastro e atualização de clientes PF e PJ (CPF e CNPJ), implantação e manutenção de módulos em sistemas corporativos, emissão e atualização de boletos, negociação e reprocessamento de títulos, geração de remessas bancárias, faturamento, emissão e envio de notas fiscais eletrônicas (NF-e), controle e envio de contratos de comodato, elaboração de relatórios gerenciais e suporte às rotinas administrativas e financeiras.

Também atuei no controle de documentos, organização de informações, atendimento às equipes internas, apoio aos setores comercial, financeiro e operacional, além de contribuir para a padronização de processos e melhoria da eficiência das atividades administrativas.

Tenho facilidade em aprender novos sistemas, perfil analítico, organização, atenção aos detalhes e compromisso com a qualidade das entregas. Sou reconhecido pela pontualidade, responsabilidade, assiduidade e pelo cuidado com os recursos da empresa, mantendo um histórico consistente de comprometimento e cumprimento de prazos.

Possuo domínio do Microsoft Office (com foco em Excel), Google Workspace e sistemas corporativos, buscando continuamente aprimorar meus conhecimentos e contribuir para a evolução dos processos e dos resultados da organização.

Estou aberto a conexões, networking e novas oportunidades profissionais. Será um prazer conversar sobre como posso agregar valor à sua equipe.`;

// Para adicionar a logo real da empresa, coloque o arquivo em src/assets/
// e troque `logo` por: logo: "/src/assets/nome-da-logo.png"
// Se `logo` for null, mostramos as iniciais da empresa.
export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  desc: string;
  logo?: string | null;
  logoBg?: string; // cor de fundo do badge quando não há logo
  // Quando o cargo teve múltiplas posições na mesma empresa (ex.: estágio → efetivo),
  // preencha `roles` para renderizar uma linha do tempo estilo LinkedIn.
  // Nesse caso, `role` vira o resumo do cargo principal (ou "Trajetória na empresa")
  // e `desc` vira o resumo geral. Cada item de `roles` tem sua própria data e descrição.
  roles?: {
    title: string;
    period: string;
    location?: string;
    desc: string;
  }[];
};

export const experiences: Experience[] = [
  {
    role: "Técnico de suporte ao negócio",
    company: "Dimensa Tecnologia",
    period: "mar 2024 — o momento",
    location: "Leopoldina, Minas Gerais, Brasil · Híbrido",
    logo: logoDimensa.url,
    logoBg: "#0f172a",
    desc: "Atendimento e suporte técnico a sistemas corporativos. Análise, tratativa e acompanhamento de chamados conforme SLA. Gestão de tickets nas plataformas Acelerato e Redmine. Acompanhamento de treinamentos e suporte aos clientes durante a utilização dos sistemas. Gestão de acessos, perfis e permissões de usuários. Validação de cadastros e liberação de credenciais. Apoio em infraestrutura e banco de dados. Monitoramento e controle de demandas via Excel e plataformas corporativas. Elaboração de relatórios e acompanhamento de indicadores. Interface entre clientes, equipe técnica e áreas internas. Organização e condução de reuniões técnicas via Google Meet.",
  },
  {
    role: "Auxiliar de escritório III (Geral)",
    company: "Sol & Neve Açaí & Sorvete",
    period: "ago 2022 — fev 2024 · 1 ano 7 meses",
    location: "Leopoldina, Minas Gerais, Brasil",
    logo: logoSolNeve.url,
    logoBg: "#e879f9",
    desc: "Cadastro e atualização de clientes PF e PJ em sistemas corporativos. Gestão cadastral simultânea em múltiplas bases de dados. Consulta e validação cadastral por meio do Sintegra e Connect. Controle de cadastros, bens e ativos em Excel e sistemas internos. Emissão de NF-e (entrada e saída) e MDF-e. Gestão de contratos de comodato, envio e controle de equipamentos. Controle de estoque e expedição de materiais para lojas e PDVs. Acompanhamento de garantias junto a fornecedores. Atendimento a vendedores, supervisores e clientes por telefone e WhatsApp. Cadastro e atualização de colaboradores nos sistemas RH NET Social e SCI. Consulta e qualificação cadastral no eSocial. Apoio aos processos de admissão, desligamento e recrutamento. Gestão de benefícios (Policard, Alelo e Vale-Transporte). Controle de multas da frota e identificação de condutores.",
  },
  {
    role: "Estagiário de RH",
    company: "Energisa",
    period: "mai 2021 — abr 2022 · 1 ano",
    location: "Cataguases, Minas Gerais, Brasil",
    logo: logoEnergisa.url,
    logoBg: "#1e3a8a",
    desc: "Apoio aos processos de Recrutamento e Seleção para diferentes unidades do Grupo Energisa. Divulgação de vagas, triagem de currículos e acompanhamento de processos seletivos. Agendamento de entrevistas, feedback aos candidatos e envio de cartas-proposta. Gestão de processos seletivos por meio da plataforma Kenoby. Abertura e acompanhamento de chamados no sistema Ellevo. Cadastro e atualização de colaboradores nos sistemas RHHealth e Unico. Conferência de documentação admissional e qualificação cadastral no eSocial. Aplicação e acompanhamento de avaliações comportamentais (Etalent DISC). Suporte aos processos de admissão, integração e desligamento de colaboradores. Elaboração e atualização de planilhas de controle e apoio às rotinas administrativas de RH.",
  },
  {
    role: "Trajetória na Unimed Leopoldina",
    company: "Unimed Leopoldina",
    period: "jun 2018 — mar 2021 · 2 anos 10 meses",
    location: "Leopoldina, Minas Gerais, Brasil",
    logo: logoUnimed.url,
    logoBg: "#059669",
    desc: "Trajetória de quase 3 anos na Unimed, do estágio ao atendimento efetivo, atuando nas áreas de Cadastro, Cobrança, Faturamento e Atendimento ao beneficiário. Reconhecido como Estagiário Destaque em 2019, com menção em revista do CIEE.",
    roles: [
      {
        title: "Auxiliar de atendimento",
        period: "jul 2019 — mar 2021 · 1 ano 9 meses",
        desc: "Atendimento presencial, telefônico e digital a clientes, beneficiários e cooperados. Suporte aos processos administrativos e operacionais da área de atendimento.",
      },
      {
        title: "Estagiário Nível Superior",
        period: "jun 2018 — jul 2019 · 1 ano 2 meses",
        desc: "Apoio às rotinas administrativas dos setores de Cadastro, Cobrança e Faturamento. Cadastro e atualização de clientes PF e PJ. Emissão de boletos bancários. Controle de comissões de vendedores em Excel. Emissão de segunda via de cartões. Inclusão e acompanhamento de débitos nos sistemas SPC e Serasa. Organização, conferência e arquivamento de contratos e documentos.",
      },
    ],
  },
  {
    role: "Auxiliar administrativo",
    company: "Plan Minas",
    period: "jan 2018 — mar 2018 · 3 meses",
    location: "Leopoldina, Minas Gerais, Brasil",
    logo: logoPlanMinas.url,
    logoBg: "#7c3aed",
    desc: "Cadastro e atualização de clientes e materiais em sistemas corporativos. Aplicação de regras de carência e atualização cadastral conforme normas da operadora. Comercialização de planos e serviços. Abertura, alteração e cancelamento de planos. Controle e fechamento de caixa. Atendimento telefônico e suporte aos clientes.",
  },
  {
    role: "Trajetória na Quero Mais Tintas",
    company: "Quero Mais Tintas Ltda",
    period: "jun 2011 — abr 2016 · 4 anos 11 meses",
    location: "Leopoldina, Minas Gerais, Brasil",
    logo: null,
    logoBg: "#0284c7",
    desc: "Quase 5 anos de trajetória na Quero Mais Tintas, começando no balcão como vendedor e evoluindo para funções administrativas e financeiras, com atuação completa no ciclo comercial, fiscal e de contas a pagar/receber.",
    roles: [
      {
        title: "Auxiliar de Escritório",
        period: "ago 2015 — abr 2016 · 9 meses",
        desc: "Cadastro e atualização de produtos, clientes e fornecedores. Emissão e acompanhamento de pedidos de compras. Negociação e relacionamento com fornecedores. Emissão de boletos pelo Sicoob. Controle de recebimentos, cobranças e inadimplência. Lançamento de NF-e de entrada e saída. Pagamento de fornecedores e conciliação financeira.",
      },
      {
        title: "Vendedor",
        period: "jun 2011 — ago 2015 · 4 anos 3 meses",
        desc: "Atendimento e vendas de produtos, prestando suporte aos clientes durante todo o processo comercial. Elaboração de pedidos de compra e venda. Emissão de boletos e NF-e. Controle de caixa, recebimentos e pagamentos a fornecedores. Gestão de cobranças e acompanhamento da inadimplência.",
      },
    ],
  },
];

export const education = [
  {
    title: "Pós-graduação Lato Sensu — MBA Finanças, Auditoria e Controladoria",
    org: "Anhanguera Educacional",
    period: "set 2026 — jul 2027",
    extra: "Curso em andamento",
  },
  {
    title: "Curso Superior de Tecnologia — Gestão da Tecnologia da Informação",
    org: "UNOPAR — Universidade Norte do Paraná",
    period: "fev 2025 — jul 2027",
    extra: "Competências: IA generativa para gestão e Tecnologia da informação",
  },
  {
    title: "MBA em Gestão de Pessoas e Liderança",
    org: "Rede de Ensino Doctum",
    period: "mar 2022 — set 2022",
  },
  {
    title: "Graduação em Business Administration and Management",
    org: "UNOPAR — Universidade Norte do Paraná",
    period: "2018 — 2021",
    extra: "Cataguases, MG · Ensino superior e Dados financeiros",
  },
  {
    title: "Técnico em Administração",
    org: "Escola Estadual Sebastião Silva Coutinho (Polivalente)",
    period: "2016 — 2017",
    extra: "Leopoldina, MG",
  },
];

export const certifications = [
  { title: "Análise de dados como aliada da tomada de decisão", org: "Escola Conquer", date: "jun 2026" },
  { title: "Customer Success", org: "Sebrae", date: "jul 2026" },
  { title: "Gestão Financeira", org: "Sebrae", date: "jun 2024 · expirou em jun 2024" },
  { title: "Power BI Expert na Prática", org: "Viscari Inc.", date: "jan 2026" },
  { title: "Simplifica Inteligência Artificial Express", org: "SIMPLIFICA TREINAMENTOS", date: "jan 2026" },
  { title: "Power Apps Expert na Prática", org: "Viscari Inc.", date: "jan 2026" },
  { title: "Proteção contra Phishing e Engenharia Social", org: "Dimensa Tecnologia", date: "out 2025" },
  { title: "LGPD — Lei Geral de Proteção de Dados", org: "Energisa", date: "mai 2021" },
];

export const skills = [
  "Administração",
  "Cadastro PF/PJ",
  "Faturamento & NF-e",
  "Processos Financeiros",
  "Gestão de TI",
  "RH",
  "IA Aplicada",
  "Análise de Dados",
  "Atendimento & Suporte",
  "Capacidade de adaptação",
  "Organização & Processos",
];

export const tools = [
  "Microsoft 365",
  "Excel Avançado",
  "Google Workspace",
  "Power BI",
  "Power Apps",
  "IA Generativa",
  "Testes de Sistemas",
  "Análise de Dados",
];

// Sistemas / plataformas que já utilizei
export const systems = [
  "Unico",
  "RH Health",
  "RH NET Social",
  "eSocial",
  "Kenoby",
  "Acelerato",
  "Redmine",
  "Ellevo",
  "Director",
  "Sintegra",
  "Connect",
  "Etalent DISC",
  "SPC / Serasa",
  "Sicoob",
  "Cardio",
  "Slack",
];

export const portfolio = [
  { title: "Padronização de processos administrativos", tag: "Processos" },
  { title: "Automação de relatórios em Excel & Power BI", tag: "Dados" },
  { title: "Gestão de tickets e SLAs em Acelerato/Redmine", tag: "Suporte" },
  { title: "Aplicação de IA generativa em rotinas de gestão", tag: "IA" },
];

export const volunteering = [
  {
    title: "Estudante voluntário",
    org: "Escola Estadual Sebastião Silva Coutinho",
    period: "jun 2017 — dez 2017 · 7 meses",
    desc: "Auxílio em matrículas para cursos técnicos, reprodução de materiais didáticos, atendimento telefônico e presencial, participação em sábados letivos e apoio às atividades educacionais.",
  },
];

// Hobbies / interesses fora do trabalho — edite à vontade (adicione, remova ou troque emojis)
export const hobbies = [
  { emoji: "⚽", label: "Futebol" },
  { emoji: "🏎️", label: "Fórmula 1" },
  { emoji: "🚴", label: "Ciclismo" },
  { emoji: "🎬", label: "Filmes" },
  { emoji: "📺", label: "Séries" },
  { emoji: "✈️", label: "Viagem" },
  { emoji: "👨‍👩‍👧", label: "Família" },
];

// Dedicatória — homenagem a cada empresa da trajetória
export const dedications = [
  {
    company: "Dimensa Tecnologia",
    message:
      "Obrigado pela confiança e pela oportunidade de crescer em um ambiente de tecnologia e inovação. Aqui aprendi que suporte de verdade é escutar antes de resolver.",
  },
  {
    company: "Sol & Neve",
    message:
      "Gratidão por me mostrar que o cuidado com o detalhe — do cadastro à expedição — é o que sustenta uma operação inteira. Levo comigo o carinho de cada equipe.",
  },
  {
    company: "Energisa",
    message:
      "Foi onde entendi o poder das pessoas dentro dos processos. Meu muito obrigado pela vivência em RH e pela responsabilidade de participar da história de tantos profissionais.",
  },
  {
    company: "Unimed Leopoldina",
    message:
      "Minha primeira grande escola. Do estágio ao reconhecimento como Estagiário Destaque, obrigado por acreditarem em mim quando eu ainda estava aprendendo a acreditar.",
  },
  {
    company: "Plan Minas",
    message:
      "Curto no tempo, gigante no aprendizado. Obrigado pela chance de atender pessoas com respeito e responsabilidade.",
  },
  {
    company: "Quero Mais Tintas",
    message:
      "Meu ponto de partida. Aqui aprendi que vender é servir, que o balcão ensina mais que qualquer manual e que respeito ao cliente vale mais que qualquer meta.",
  },
];
// Perfil comportamental e desenvolvimento — PDFs hospedados na CDN da Lovable.
// Para substituir um documento no futuro, basta criar um novo asset e trocar a importação abaixo.
export const developmentDocs = [
  {
    title: "Perfil Comportamental",
    desc: "Relatório do meu perfil comportamental mais recente.",
    file: docPerfilComportamental.url,
    date: "2026",
  },
  {
    title: "Desenvolvimento Profissional",
    desc: "Documento com meu plano e evolução de desenvolvimento profissional.",
    file: docDesenvolvimentoProfissional.url,
    date: "2026",
  },
];
