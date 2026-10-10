"""Generate the recruitment PDF from shared portfolio data. Run: python3 scripts/generate-cv.py."""
import json
import subprocess
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.barcode.qr import QrCodeWidget

ROOT = Path(__file__).resolve().parents[1]
raw = subprocess.check_output([
    'bun', '-e',
    'import {profile,experiences,education,certifications,tools,systems,slugify} from "./src/data/portfolio.ts"; '
    'console.log(JSON.stringify({profile,experiences,education,certifications,tools,systems,'
    'experienceSlugs:experiences.map(e=>slugify(e.company)),educationSlugs:education.map(e=>slugify(e.title)),'
    'certificationSlugs:certifications.map(e=>slugify(e.title))}));'
], cwd=ROOT, text=True)
data = json.loads(raw)
for name, query in [('CV', 'DejaVu Sans'), ('CVBold', 'DejaVu Sans:bold')]:
    font = subprocess.check_output(['fc-match', '-f', '%{file}', query], text=True).strip()
    pdfmetrics.registerFont(TTFont(name, font))
pdfmetrics.registerFontFamily('CV', normal='CV', bold='CVBold', italic='CV', boldItalic='CVBold')

# Print palette: restrained, high-contrast, and readable in grayscale.
INK = colors.HexColor('#20292C')
MUTED = colors.HexColor('#566267')
ACCENT = colors.HexColor('#176459')
LINE = colors.HexColor('#D3DEDA')
BASE = 'https://portfolio-palooza-237.lovable.app'
styles = {
    'name': ParagraphStyle('name', fontName='CVBold', fontSize=25, leading=31, textColor=INK, spaceAfter=5),
    'role': ParagraphStyle('role', fontName='CV', fontSize=12, leading=17, textColor=ACCENT, spaceAfter=9),
    'contact': ParagraphStyle('contact', fontName='CV', fontSize=9, leading=14, textColor=MUTED),
    'section': ParagraphStyle('section', fontName='CVBold', fontSize=10, leading=14, textColor=ACCENT, spaceBefore=14, spaceAfter=8),
    'company': ParagraphStyle('company', fontName='CVBold', fontSize=11, leading=15, textColor=INK, spaceAfter=2),
    'meta': ParagraphStyle('meta', fontName='CV', fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=4),
    'position': ParagraphStyle('position', fontName='CVBold', fontSize=9.5, leading=14, textColor=INK, spaceAfter=3),
    'body': ParagraphStyle('body', fontName='CV', fontSize=9.5, leading=14, textColor=INK),
    'bullet': ParagraphStyle('bullet', fontName='CV', fontSize=9.5, leading=14, textColor=INK, leftIndent=10, firstLineIndent=-9, spaceAfter=3),
    'compact': ParagraphStyle('compact', fontName='CV', fontSize=8.6, leading=12.5, textColor=INK, spaceAfter=3),
}

def p(text, style='body'):
    return Paragraph(text, styles[style])

def linked(text, url):
    return f'<link href="{escape(url, quote=True)}">{escape(text)}</link>'

def period(text):
    return text.split(' · ')[0].replace('o momento', 'atual')

# Concise editorial summaries of the responsibilities already described in the portfolio.
bullets = [
    [
        'Atendimento, análise e acompanhamento de chamados conforme SLA, com gestão de tickets no Acelerato e Redmine.',
        'Gestão de acessos, perfis, permissões e cadastros; orientação a usuários de sistemas corporativos.',
        'Apoio em infraestrutura e banco de dados; elaboração de relatórios e acompanhamento de indicadores.',
        'Uso de Excel e IA generativa para apoiar a organização, análise e gestão de demandas.',
    ],
    [
        'Cadastro e atualização de clientes PF/PJ em múltiplas bases, com validação no Sintegra e Connect.',
        'Emissão de NF-e e MDF-e; gestão de contratos de comodato e controle de bens e equipamentos.',
        'Controle de estoque, expedição e acompanhamento de garantias; atendimento ao comercial e a clientes.',
        'Apoio a admissões, desligamentos e benefícios, com rotinas no RH NET Social e eSocial.',
    ],
    [
        'Apoio ao recrutamento e seleção: divulgação de vagas, triagem de currículos, entrevistas e cartas-proposta.',
        'Gestão de processos no Kenoby, chamados no Ellevo e cadastros no RHHealth e Unico.',
        'Conferência de documentos admissionais e eSocial; avaliações Etalent DISC e planilhas de controle.',
    ],
    [
        'Atendimento presencial, telefônico e digital a beneficiários e cooperados; apoio a cadastro, cobrança e faturamento.',
        'Emissão e reemissão de boletos, remessas bancárias, controle de comissões e organização de contratos.',
        'Reconhecimento como Estagiário Destaque em 2019, com menção em revista do CIEE.',
    ],
    ['Cadastro de clientes, atualização de planos e regras de carência; venda de serviços, atendimento e fechamento de caixa.'],
    [
        'Contas a pagar e receber, boletos no Sicoob, cobrança, NF-e e conciliação financeira.',
        'Cadastro de produtos, clientes e fornecedores; pedidos de compra, vendas e controle de caixa.',
    ],
]

story = []
profile = data['profile']
story += [p(escape(profile['name']), 'name'), p(escape(data['experiences'][0]['roles'][0]['title']).capitalize(), 'role')]
story += [p(f"{escape(profile['location'])} · {linked(profile['email'], 'mailto:' + profile['email'])}", 'contact')]
story += [p(linked('linkedin.com/in/tiago-de-avila-miranda-53674293', profile['linkedin']), 'contact')]
story += [p('Portfólio: ' + linked('portfolio-palooza-237.lovable.app', BASE), 'contact')]
story += [p('CNH B · Disponibilidade para trabalho presencial, híbrido ou remoto', 'contact')]
story += [p('RESUMO PROFISSIONAL', 'section')]
story += [p('Administrador com experiência em suporte a sistemas corporativos e rotinas administrativas e financeiras. '
            'Atualmente Analista de suporte na Evertec Brasil, com atuação em chamados, acessos, orientação a usuários e relatórios. '
            'Trajetória em faturamento, cadastro, cobrança e Recursos Humanos. Cursa Gestão da Tecnologia da Informação e '
            'MBA em Finanças, Auditoria e Controladoria, unindo experiência operacional e formação em gestão.')]
story += [p('EXPERIÊNCIA PROFISSIONAL', 'section')]

def experience(index, compact=False):
    e = data['experiences'][index]
    block = [p(linked(e['company'], f"{BASE}/profissional#{data['experienceSlugs'][index]}"), 'company')]
    block += [p(period(e['period']) + ' · ' + escape((e.get('location') or '').replace('Minas Gerais, Brasil', 'MG')), 'meta')]
    if e.get('roles'):
        for role in e['roles']:
            block += [p(escape(role['title']) + ' <font name="CV">· ' + escape(period(role['period'])) + '</font>', 'position')]
    else:
        block += [p(escape(e['role']), 'position')]
    block += [p('• ' + escape(text), 'compact' if compact else 'bullet') for text in bullets[index]]
    block += [Spacer(1, 9 if not compact else 6)]
    return KeepTogether(block)

for i in range(3):
    story.append(experience(i))
story += [PageBreak(), p('EXPERIÊNCIA PROFISSIONAL · CONTINUAÇÃO', 'section')]
for i in range(3, 6):
    story.append(experience(i, compact=True))
story += [p('FORMAÇÃO ACADÊMICA', 'section')]
for i, e in enumerate(data['education']):
    title = e['title'].replace('Pós-graduação Lato Sensu — MBA', 'MBA em').replace('Curso Superior de Tecnologia —', 'Tecnologia em').replace('Graduação em Business Administration and Management', 'Bacharelado em Administração')
    current = ' · em andamento' if 'andamento' in e.get('extra', '') else ''
    story.append(p('<b>' + linked(title.strip(), f"{BASE}/graduacao#{data['educationSlugs'][i]}") + '</b><br/>' + escape(e['org']) + ' · ' + escape(e['period']) + current, 'compact'))
story += [p('CURSOS E CERTIFICAÇÕES', 'section')]
for i, c in enumerate(data['certifications']):
    # A selected recruitment list, without altering the portfolio's complete record.
    if 'Inteligência Artificial Express' in c['title']:
        continue
    story.append(p(linked(c['title'], f"{BASE}/certificacoes#{data['certificationSlugs'][i]}") + ' — ' + escape(c['org']) + ' · ' + escape(c['date']), 'compact'))
story += [p('FERRAMENTAS E SISTEMAS', 'section')]
story += [p('<b>Produtividade e dados:</b> ' + escape(', '.join(data['tools'])) + '.', 'compact')]
story += [p('<b>Sistemas corporativos:</b> ' + escape(', '.join(data['systems'])) + '.', 'compact')]

def decorate(canvas, doc):
    width, height = A4
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(43, height - 29, width - 43, height - 29)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(43, 38, width - 43, 38)
    canvas.setFont('CV', 7.3)
    canvas.setFillColor(MUTED)
    canvas.drawString(43, 25, profile['name'] + ' · Currículo profissional')
    canvas.drawRightString(width - 43, 25, f'{doc.page} / 2')
    if doc.page == 2:
        qr = QrCodeWidget(profile['linkedin'])
        qr.barFillColor = INK
        bounds = qr.getBounds()
        size = 34
        drawing = Drawing(size, size, transform=[size / (bounds[2]-bounds[0]), 0, 0, size / (bounds[3]-bounds[1]), 0, 0])
        drawing.add(qr)
        drawing.drawOn(canvas, width - 82, 43)
        canvas.linkURL(profile['linkedin'], (width - 82, 43, width - 48, 77), relative=0)
        canvas.drawRightString(width - 88, 55, 'LinkedIn · Tiago de Avila Miranda')

output = ROOT / 'public/curriculo-tiago-de-avila-miranda.pdf'
doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=43, rightMargin=43, topMargin=42, bottomMargin=87,
                        title='Currículo — Tiago de Avila Miranda', author=profile['name'],
                        subject='Experiência profissional, formação e competências')
doc.build(story, onFirstPage=decorate, onLaterPages=decorate)
print(f'Currículo gerado: {output.name}')