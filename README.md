# Portfólio Profissional — Tiago de Avila Miranda

Portfólio web pessoal, com currículo virtual interativo, análise de compatibilidade com vagas e assistente virtual.

[![Site](https://img.shields.io/badge/Site%20no%20ar-portfolio--palooza--237.lovable.app-1e3a8a?style=flat-square)](https://portfolio-palooza-237.lovable.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Tiago%20de%20Avila%20Miranda-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiago-de-avila-miranda-53674293/)

**Localização:** Leopoldina, Minas Gerais, Brasil

---

## O que tem aqui

| Área | O que faz |
| --- | --- |
| **Currículo Virtual** | Todas as experiências, cursos e certificações em uma página. Cada item é clicável e leva direto à seção correspondente do portfólio. |
| **Compatibilidade da Vaga** | O visitante cola a descrição da vaga, envia um PDF ou digita uma palavra-chave e recebe uma nota de 0 a 100% com a explicação, citando as experiências reais que têm a ver com aquela vaga. Roda 100% no navegador, sem enviar nada para servidor. |
| **Assistente Virtual** | Um robô que responde perguntas sobre a trajetória, a formação e onde encontrar cada informação no site. |
| **Perfil Profissional & Desenvolvimento** | Perfil comportamental e plano de desenvolvimento profissional em PDF, com visualização e download. |
| **Painel privado** | Área protegida por login que registra visitas (data, hora, origem, cidade aproximada, aparelho) e recados deixados por visitantes. |
| **Dedicatória** | Homenagem a cada empresa da trajetória. |

## Trajetória

- **Evertec Brasil** — Analista de suporte (out 2026 – o momento) · Técnico de suporte ao negócio (mar 2024 – set 2026)
- **Sol & Neve Açaí & Sorvete** — Auxiliar de escritório III (ago 2022 – fev 2024)
- **Energisa** — Estagiário de RH (mai 2021 – abr 2022)
- **Unimed Leopoldina** — Auxiliar de atendimento (jul 2019 – mar 2021) · Estagiário Nível Superior (jun 2018 – jul 2019)
- **Plan Minas** — Auxiliar administrativo (jan 2018 – mar 2018)
- **Quero Mais Tintas** — Auxiliar de escritório (ago 2015 – abr 2016) · Vendedor (jun 2011 – ago 2015)

## Formação

- **MBA em Finanças, Auditoria e Controladoria** — Anhanguera Educacional (set 2026 – jul 2027, em andamento)
- **Tecnólogo em Gestão da Tecnologia da Informação** — UNOPAR (fev 2025 – jul 2027, em andamento)
- **MBA em Gestão de Pessoas e Liderança** — Doctum (2022)
- **Graduação em Administração** — UNOPAR (2018 – 2021)
- **Técnico em Administração** — Escola Estadual Sebastião Silva Coutinho (2016 – 2017)

## Tecnologias

- **React 19** + **TypeScript**
- **TanStack Start** (rotas, renderização no servidor e funções de servidor)
- **Tailwind CSS v4**
- **Vite**
- **Lovable Cloud** (banco de dados, autenticação e armazenamento dos registros de visita e recados)
- **pdf.js** (leitura do PDF da vaga no navegador)

A parte de análise de compatibilidade roda inteiramente no navegador do visitante: nenhuma descrição de vaga é enviada para o servidor.

## Estrutura do projeto

```text
src/
├── data/portfolio.ts        # TODOS os dados: experiências, cursos, certificações, sistemas
├── routes/                  # uma página por rota
├── components/              # cards de experiência, formulário de recado, assistente virtual
└── lib/                     # motor de compatibilidade de vagas e registro de visitas
```

Para trocar um texto, uma data ou adicionar uma empresa, edite **`src/data/portfolio.ts`** — nada mais precisa mudar.

## Rodando localmente

```bash
bun install
bun run dev
```

Abra `http://localhost:8080`.

## Contato

- **E-mail:** tiagooavila@yahoo.com.br
- **LinkedIn:** [tiago-de-avila-miranda-53674293](https://www.linkedin.com/in/tiago-de-avila-miranda-53674293/)
- **Portfólio:** https://portfolio-palooza-237.lovable.app

---

O projeto foi construído com [Lovable](https://lovable.dev) e sincronizado com o GitHub.
