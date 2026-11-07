# Plan de Trabajo Final — versión de entrega

Documento de entrega del anteproyecto con la **estructura de la plantilla de la cátedra** (*UCSE II TF Plan*): portada, índice y 9 secciones (Introducción; Contexto y Marco Teórico; Antecedentes y Estado del Arte; Justificación; Objetivos; Alcance; Metodología; Cronograma; Bibliografía).

| Archivo | Qué es |
|---|---|
| `Plan_TF_Abarca.docx` | Documento para subir a Google Docs y compartir con el Director |
| `Plan_TF_Abarca.pdf` | Vista previa renderizada con LibreOffice (la tipografía puede variar respecto de Word o Google Docs) |
| `contenido.js` | Texto del documento, condensado desde `docs/anteproyecto/` |
| `build.js` | Script que genera el `.docx` (docx-js) |
| `paginas.json` | Números de página del índice |
| `logo.png`, `gantt_rgb.png` | Logo UCSE (extraído de la plantilla) y diagrama de Gantt |

El contenido de referencia sigue siendo `docs/anteproyecto/`: este documento es una versión condensada para respetar la extensión de entrega (≈11 páginas con portada y bibliografía). La bibliografía incluye sólo las 31 obras citadas en esta versión (Art. 9c).

Para regenerarlo:

```bash
node build.js paginas.json
```
