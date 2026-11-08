import { createFileRoute } from '@tanstack/react-router';
import { DocumentGallery, documentsQuery } from '@/components/document-gallery';

export const Route = createFileRoute('/documentos')({
  loader: ({ context }) => context.queryClient.ensureQueryData(documentsQuery),
  head: () => ({ meta: [
    { title: 'Diplomas, Certificados e Conquistas — Tiago de Avila Miranda' },
    { name: 'description', content: 'Registros da formação e das conquistas profissionais de Tiago de Avila Miranda, com dados pessoais protegidos.' },
    { property: 'og:title', content: 'Diplomas, Certificados e Conquistas — Tiago de Avila Miranda' },
    { property: 'og:description', content: 'Conheça os registros acadêmicos e profissionais de Tiago, com privacidade nos documentos.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: DocumentGallery,
});