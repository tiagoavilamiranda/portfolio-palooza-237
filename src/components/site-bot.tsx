// ============================================================================
// EDITE AQUI — Assistente do site ("TiagoBot").
// É um robô simples que roda no navegador do visitante: ele entende a pergunta
// ("onde fica...", "como falo com você...") e explica onde cada informação está.
// Para ensinar uma resposta nova, basta acrescentar um item em `knowledge`.
// ============================================================================
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bot, Send, X } from "lucide-react";
import { profile } from "@/data/portfolio";

type Entry = {
  id: string;
  keywords: string[];
  answer: string;
  to?: string;
  linkLabel?: string;
};

const knowledge: Entry[] = [
  {
    id: "profissional",
    keywords: ["experiencia", "experiencias", "trajetoria", "profissional", "emprego", "empresa", "empresas", "carreira", "trabalhou", "trabalho", "cargo", "cargos", "curriculo", "dimensa", "unimed", "energisa", "sol", "neve", "plan", "minas", "quero", "tintas"],
    answer:
      "A trajetória profissional fica na página Profissional: cada empresa aparece com o logo, o cargo, o período e uma linha do tempo quando tive mais de uma função na mesma empresa (Dimensa, Sol & Neve, Energisa, Unimed Leopoldina, Plan Minas e Quero Mais Tintas).",
    to: "/profissional",
    linkLabel: "Abrir Profissional",
  },
  {
    id: "sobre",
    keywords: ["sobre", "quem", "resumo", "apresentacao", "biografia", "perfil"],
    answer:
      "Na página Sobre está o resumo profissional do Tiago: quem ele é, como atua e o que busca hoje.",
    to: "/sobre",
    linkLabel: "Abrir Sobre",
  },
  {
    id: "graduacao",
    keywords: ["graduacao", "faculdade", "formacao", "estudo", "estudou", "mba", "pos", "unopar", "doctum", "escolaridade"],
    answer:
      "A formação acadêmica (graduações, MBA e ensino técnico) fica na página Graduação, com instituição e período de cada curso.",
    to: "/graduacao",
    linkLabel: "Abrir Graduação",
  },
  {
    id: "certificacoes",
    keywords: ["certificacao", "certificacoes", "certificado", "cursos", "curso", "sebrae", "conquer", "viscari", "lgpd", "power"],
    answer:
      "Os cursos e certificados (Sebrae, Escola Conquer, Viscari, Dimensa, Energisa e outros) estão na página Certificações, com a data de emissão de cada um.",
    to: "/certificacoes",
    linkLabel: "Abrir Certificações",
  },
  {
    id: "habilidades",
    keywords: ["habilidade", "habilidades", "competencia", "competencias", "soft", "skill", "skills", "rh"],
    answer: "As habilidades e competências estão na página Habilidades.",
    to: "/habilidades",
    linkLabel: "Abrir Habilidades",
  },
  {
    id: "ferramentas",
    keywords: ["ferramenta", "ferramentas", "sistema", "sistemas", "excel", "office", "erp", "acelerato", "redmine", "ellevo", "unico", "cardio", "esocial", "slack", "ia", "inteligencia"],
    answer:
      "Na página Ferramentas você vê as ferramentas e os sistemas que eu uso: Excel avançado, Microsoft 365, Google Workspace, IA generativa, testes de sistemas, Acelerato, Redmine, Ellevo, Unico, RH Health, eSocial, Director, Cardio e Slack.",
    to: "/ferramentas",
    linkLabel: "Abrir Ferramentas",
  },
  {
    id: "portfolio",
    keywords: ["portfolio", "projeto", "projetos", "entregas", "cases"],
    answer: "Os projetos e entregas ficam na página Portfólio.",
    to: "/portfolio",
    linkLabel: "Abrir Portfólio",
  },
  {
    id: "dedicatoria",
    keywords: ["dedicatoria", "homenagem", "agradecimento", "agradecimentos"],
    answer:
      "A Dedicatória é a homenagem do Tiago a todas as empresas por onde passou e às pessoas que fizeram parte dessa caminhada.",
    to: "/dedicatoria",
    linkLabel: "Abrir Dedicatória",
  },
  {
    id: "offline",
    keywords: ["offline", "off", "hobby", "hobbies", "lazer", "futebol", "f1", "ciclismo", "filme", "filmes", "serie", "series", "viagem", "familia", "pessoal", "gosta"],
    answer:
      "A página OffLine mostra o Tiago fora do trabalho — futebol, Fórmula 1, ciclismo, filmes, séries, viagem e família — e também traz os contatos e o mapa de Leopoldina.",
    to: "/offline",
    linkLabel: "Abrir OffLine",
  },
  {
    id: "contato",
    keywords: ["contato", "email", "e-mail", "telefone", "whatsapp", "falar", "chamar", "linkedin", "localizacao", "onde mora", "cidade", "endereco", "mapa", "leopoldina"],
    answer: `Para falar comigo: e-mail ${profile.email ?? "tiagooavila@yahoo.com.br"}, além do LinkedIn e do mapa de Leopoldina (MG) na página de contato (OffLine).`,
    to: "/offline",
    linkLabel: "Abrir contato",
  },
  {
    id: "perfil-pdf",
    keywords: ["pdf", "documento", "documentos", "comportamental", "desenvolvimento", "mapa", "proposito", "baixar", "download", "anexo"],
    answer:
      "Na página Perfil Profissional & Desenvolvimento estão dois PDFs para visualizar ou baixar: o Perfil Comportamental (Mapa) e o Desenvolvimento Profissional (Propósito).",
    to: "/perfil-desenvolvimento",
    linkLabel: "Abrir Perfil & Desenvolvimento",
  },
  {
    id: "vaga",
    keywords: ["vaga", "compatibilidade", "nota", "match", "recrutador", "recrutamento", "testar", "analisar", "descricao"],
    answer:
      "Na página Compatibilidade da Vaga você cola a descrição da vaga, envia o PDF ou digita uma palavra-chave e recebe uma nota de 0 a 100% com a explicação detalhada, citando experiências reais. Tudo roda no seu navegador, nada é enviado nem guardado.",
    to: "/compatibilidade-vaga",
    linkLabel: "Abrir Compatibilidade da Vaga",
  },
  {
    id: "cnh",
    keywords: ["cnh", "carteira", "habilitacao", "dirigir", "carro"],
    answer: "Sim — tenho CNH categoria B e disponibilidade para dirigir.",
  },
  {
    id: "modelo",
    keywords: ["remoto", "presencial", "hibrido", "home", "office", "disponibilidade", "mudanca"],
    answer:
      "Tenho disponibilidade para trabalhar presencial, híbrido ou 100% remoto, conforme a necessidade da empresa.",
  },
];

type Msg = { from: "bot" | "user"; text: string; to?: string; linkLabel?: string };

function normalize(s: string) {
  return ` ${s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
}

function answerFor(question: string): Msg[] {
  const q = normalize(question);
  if (/\b(oi|ola|bom dia|boa tarde|boa noite|tudo bem)\b/.test(q)) {
    return [
      {
        from: "bot",
        text: "Olá! Eu sou o assistente do portfólio do Tiago. Pergunte, por exemplo: “onde fica a experiência dele?”, “onde vejo os certificados?” ou “como faço para testar uma vaga?”.",
      },
    ];
  }
  const scored = knowledge
    .map((e) => ({ e, score: e.keywords.filter((k) => q.includes(` ${k}`)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return [
      {
        from: "bot",
        text: "Ainda não sei responder isso. Posso te mostrar: Sobre, Profissional, Graduação, Certificações, Habilidades, Ferramentas, Portfólio, Dedicatória, OffLine, Perfil & Desenvolvimento ou Compatibilidade da Vaga. Qual deles você procura?",
      },
    ];
  }
  return scored.slice(0, 2).map(({ e }) => ({
    from: "bot" as const,
    text: e.answer,
    to: e.to,
    linkLabel: e.linkLabel,
  }));
}

const suggestions = [
  "Onde fica a experiência?",
  "Onde vejo os certificados?",
  "Como testo uma vaga?",
  "Como falo com o Tiago?",
];

export function SiteBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Oi! Eu sou o guia deste portfólio. Me pergunte onde fica qualquer informação que eu te levo até lá.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function ask(text: string) {
    const question = text.trim();
    if (!question) return;
    setMessages((m) => [...m, { from: "user", text: question }, ...answerFor(question)]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Abrir assistente do site"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-110"
        style={{ background: "var(--gradient-gold)" }}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-primary/40 bg-card/95 shadow-[var(--shadow-gold)] backdrop-blur">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <Bot className="h-5 w-5 text-primary" />
            <div>
              <p className="font-serif text-lg text-foreground">Assistente do portfólio</p>
              <p className="text-[11px] text-muted-foreground">
                Pergunte onde está cada informação
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm ${
                  m.from === "bot"
                    ? "bg-background/70 text-foreground/90"
                    : "ml-auto border border-primary/40 bg-primary/10 text-foreground"
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                {m.to && (
                  <Link
                    to={m.to}
                    className="mt-2 inline-block text-xs font-medium text-primary underline underline-offset-4"
                  >
                    {m.linkLabel ?? "Abrir página"}
                  </Link>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") ask(input);
              }}
              placeholder="Onde fica...?"
              className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground outline-none focus:border-primary/70"
            />
            <button
              type="button"
              onClick={() => ask(input)}
              aria-label="Enviar pergunta"
              className="flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
