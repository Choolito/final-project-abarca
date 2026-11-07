// Genera el Plan de Trabajo Final (.docx) con la estructura de la plantilla UCSE.
// Uso: node build.js [paginas.json]   (paginas.json: números de página del índice)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  WidthType, ShadingType, AlignmentType, HeadingLevel, LevelFormat, PageBreak, LineRuleType,
  Footer, PageNumber, BorderStyle, TabStopType,
} = require("docx");
const C = require("./contenido.js");

const DIR = __dirname;
const pages = process.argv[2] && fs.existsSync(process.argv[2]) ? JSON.parse(fs.readFileSync(process.argv[2])) : {};
const BODY = "Calibri", HEAD = "Cambria", TNR = "Times New Roman";
const CONTENT_W = 9026; // A4 (11906) menos márgenes de 1440 a cada lado

// --- marcado en línea: **negrita** y *cursiva* ---
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith("**")) out.push(new TextRun({ ...base, text: t.slice(2, -2), bold: true }));
    else out.push(new TextRun({ ...base, text: t.slice(1, -1), italics: true }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const P = (text, opts = {}) => new Paragraph({ children: runs(text), alignment: AlignmentType.JUSTIFIED, ...opts });

function table(t) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const cell = (txt, w, head) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders,
    shading: head ? { type: ShadingType.CLEAR, color: "auto", fill: "E7E6E6" } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({ children: runs(txt, head ? { size: 18, bold: true } : { size: 18 }), spacing: { after: 0, line: 240, lineRule: LineRuleType.AUTO } })],
  });
  return new Table({
    width: { size: t.widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: t.widths,
    rows: [
      new TableRow({ tableHeader: true, children: t.header.map((h, i) => cell(h, t.widths[i], true)) }),
      ...t.rows.map(r => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, t.widths[i], false)) })),
    ],
  });
}

// --- portada ---
const logo = fs.readFileSync(path.join(DIR, "logo.png"));
const center = (children, after = 0, before = 0) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before, after }, children });
const portada = [
  center([new TextRun({ text: "UNIVERSIDAD CATÓLICA DE SANTIAGO DEL ESTERO", font: TNR, bold: true, size: 28 })], 200, 600),
  center([new TextRun({ text: "DEPARTAMENTO ACADÉMICO RAFAELA", font: TNR, bold: true, size: 22 })], 600),
  center([new ImageRun({ type: "png", data: logo, transformation: { width: 120, height: 167 } })], 600),
  center([new TextRun({ text: "Ingeniería en Informática", font: TNR, bold: true, smallCaps: true, size: 28 })], 240),
  center([new TextRun({ text: "Plan de Trabajo Final", font: TNR, bold: true, smallCaps: true, size: 28 })], 600),
  center([new TextRun({ text: `“${C.titulo}”`, font: TNR, size: 26 })], 160),
  center([new TextRun({ text: C.subtitulo, font: TNR, italics: true, size: 22 })], 700),
  center([new TextRun({ text: "Director", font: TNR, bold: true, size: 22 })], 60),
  center([new TextRun({ text: C.director, font: TNR, size: 22 })], 240),
  center([new TextRun({ text: "Autor", font: TNR, bold: true, size: 22 })], 60),
  center([new TextRun({ text: C.autor, font: TNR, size: 22 })], 1200),
  center([new TextRun({ text: "Rafaela", font: TNR, size: 22 })], 60),
  center([new TextRun({ text: C.fecha, font: TNR, size: 22 })]),
];

// --- cuerpo ---
const h1s = C.secciones.filter(b => b.h1).map(b => b.h1).concat(["Bibliografía"]);
const indice = [
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: "Índice", font: TNR, size: 24 })], spacing: { after: 480 } }),
  ...h1s.map((h, i) => new Paragraph({
    tabStops: [{ type: TabStopType.LEFT, position: 720 }, { type: TabStopType.RIGHT, position: CONTENT_W }],
    indent: { left: 360 },
    spacing: { after: 160 },
    children: [new TextRun({ text: `${i + 1}.\t${h}\t${pages[h] || ""}`, font: TNR, size: 22 })],
  })),
];

const body = [new Paragraph({ children: [new PageBreak()] })];
let n = 0;
for (const b of C.secciones) {
  if (b.h1) { n++; body.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(`${n}. ${b.h1}`)] })); }
  else if (b.h2) body.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(b.h2)] }));
  else if (b.p) body.push(P(b.p, /:\*{0,2}$/.test(b.p.trim()) || b.p.startsWith("La tabla") ? { keepNext: true } : {}));
  else if (b.bullets) b.bullets.forEach(t => body.push(P(t, { numbering: { reference: "vinetas", level: 0 } })));
  else if (b.numbered) b.numbered.forEach(t => body.push(P(t, { numbering: { reference: "objetivos", level: 0 } })));
  else if (b.table) { body.push(table(b.table)); body.push(new Paragraph({ spacing: { after: 60 }, children: [] })); }
  else if (b.image) {
    const img = fs.readFileSync(path.join(DIR, b.image));
    const w = 600, h = Math.round(w * 1300 / 2968);
    body.push(center([new ImageRun({ type: "png", data: img, transformation: { width: w, height: h } })], 60, 120));
    body.push(center([new TextRun({ text: b.caption, italics: true, size: 18 })], 160));
  }
}
n++;
body.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(`${n}. Bibliografía`)] }));
C.bibliografia.forEach(ref => body.push(new Paragraph({
  children: runs(ref, { size: 19 }),
  indent: { left: 567, hanging: 567 },
  spacing: { after: 50, line: 240, lineRule: LineRuleType.AUTO },
})));

const doc = new Document({
  creator: C.autor,
  title: "Plan de Trabajo Final",
  styles: {
    default: { document: { run: { font: BODY, size: 22 }, paragraph: { spacing: { after: 100, line: 264, lineRule: LineRuleType.AUTO } } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: HEAD, size: 28, bold: true, color: "000000" },
        paragraph: { spacing: { before: 360, after: 160 }, keepNext: true, keepLines: true, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: HEAD, size: 23, bold: true, color: "000000" },
        paragraph: { spacing: { before: 200, after: 100 }, keepNext: true, keepLines: true, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [
    { reference: "vinetas", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 567, hanging: 283 } } } }] },
    { reference: "objetivos", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 567, hanging: 340 } } } }] },
  ]},
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } },
      titlePage: true,
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ children: [PageNumber.CURRENT], size: 18 })] })] }),
      first: new Footer({ children: [new Paragraph({ children: [] })] }),
    },
    children: [...portada, ...indice, ...body],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(path.join(DIR, "Plan_TF_Abarca.docx"), buf);
  console.log("ok", h1s.length, "secciones");
});
