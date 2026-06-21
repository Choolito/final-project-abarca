# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Proyecto

**Trabajo Final de Carrera** — Ingeniería en Informática, UCSE DAR.  
**Tema:** Sistema de reconocimiento automático de eventos deportivos en video (caso de estudio: rugby).  
**Autor:** Juan Ignacio Abarca  
**Estado:** Fase de Anteproyecto (Art. 6 del Reglamento UCSE).

El repositorio actúa como **espacio de documentación y versionado** del anteproyecto y material de investigación. El código fuente y artefactos de ML se incorporarán después de la aprobación del anteproyecto.

---

## Estructura del repositorio

```
final-project-abarca/
├── docs/
│   └── anteproyecto/          # 9 secciones reglamentarias (Art. 6b)
│       ├── 01_titulo_y_problema.md
│       ├── 02_objetivos_y_metas.md
│       ├── 03_antecedentes.md
│       ├── 04_justificacion.md
│       ├── 05_marco_teorico.md
│       ├── 06_metodologia.md
│       ├── 07_alcance.md
│       ├── 08_cronograma.md
│       └── 09_bibliografia.md
├── research/
│   ├── papers/                # Estado del arte y referencias
│   └── reglamento_ucse/       # Reglamento oficial
├── .github/
│   ├── workflows/             # CI (markdownlint, link check, convención de ramas, limpieza de ramas)
│   ├── rulesets-main.json     # Ruleset de protección de main
│   ├── rulesets-develop.json  # Ruleset de protección de develop
│   └── RULESETS_SETUP.md      # Guía de configuración manual de rulesets
├── .gitignore
├── README.md
└── CLAUDE.md (este archivo)
```

---

## Flujo de trabajo — Git Flow

### Ramas principales

| Rama | Propósito | Merge desde |
|------|-----------|------------|
| **main** | Producción. Solo merges de `release/x.y.z`. | `release/*` |
| **develop** | Rama default e integración. Acepta `feature/`, `fix/`, `docs/`. | `feature/*`, `fix/*`, `docs/*` |
| **release/x.y.z** | Branch de release. Se crea desde `develop` y se mergea a `main`. | — |

### Flujo típico

1. **Crear rama de trabajo** desde `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/nombre-feature  # o fix/nombre, docs/nombre-docs
   ```

2. **Hacer commits** y push:
   ```bash
   git push -u origin feature/nombre-feature
   ```

3. **Abrir PR** a `develop` (no a `main`).

4. **Para una release**, crear rama desde `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b release/0.0.1
   git push -u origin release/0.0.1
   ```

5. **PR de release a main** (una vez aprobada).

6. **Etiquetar la release (tag).** El entorno remoto de Claude Code **no permite** hacer push de tags desde consola. El tag se crea **desde la web de GitHub**, sin necesidad de repo local:
   - Ir a `https://github.com/Choolito/final-project-abarca/releases/new`
   - En *Choose a tag* escribir `vX.Y.Z` → *Create new tag on publish*
   - *Target:* `main` → *Publish release*

> **Limpieza de ramas:** al mergear un PR, su rama de origen se elimina automáticamente (workflow `cleanup-branches.yml`). `main` y `develop` están excluidas y nunca se eliminan.

### Convenciones de nombres

- `feature/` — nuevas funcionalidades
- `fix/` — correcciones de bugs
- `docs/` — cambios en documentación
- `release/x.y.z` — branches de release (ej: `release/0.1.0`)

---

## Comandos comunes

### Documentación

En esta fase, el trabajo es principalmente redacción de documentación en Markdown.

```bash
# Ver cambios en docs
git diff docs/

# Commitear cambios en anteproyecto
git add docs/anteproyecto/
git commit -m "docs: actualizar sección X del anteproyecto"
```

---

## Fase actual — Anteproyecto

**Artículos del Reglamento UCSE cubiertos:**

| Art. | Requisito | Archivo |
|-----|-----------|---------|
| 6b.1 | Título y problema | `01_titulo_y_problema.md` |
| 6b.2 | Objetivos y metas | `02_objetivos_y_metas.md` |
| 6b.3 | Antecedentes | `03_antecedentes.md` |
| 6b.4 | Justificación | `04_justificacion.md` |
| 6b.5 | Marco teórico | `05_marco_teorico.md` |
| 6b.6 | Metodología | `06_metodologia.md` |
| 6b.7 | Alcance | `07_alcance.md` |
| 6b.8 | Cronograma | `08_cronograma.md` |
| 6b.9 | Bibliografía | `09_bibliografia.md` |

Copia del reglamento: `research/reglamento_ucse/reglamento_tf_ucse.pdf`.

---

## Rulesets — Protección de ramas

Las reglas para el repositorio están definidas en `.github/rulesets-main.json` y `.github/rulesets-develop.json`. Se deben configurar manualmente siguiendo `.github/RULESETS_SETUP.md`:

**Pasos:**
1. Ve a: `https://github.com/Choolito/final-project-abarca/settings/rules`
2. Click en **"New ruleset"**
3. Copia el contenido de `.github/rulesets-main.json` (y luego `.github/rulesets-develop.json`)

**Qué protege:**

- ✅ Convención de nombres de rama (main, develop, feature/*, fix/*, docs/*, release/x.y.z)
- ✅ **main:** requiere PR con aprobación antes de mergear
- ✅ **main y develop:** protegidas contra force-push y eliminación
- ✅ **develop:** rama de integración para feature/*, fix/*, docs/*

---

## Próximas fases

- **Art. 7:** Evaluación del anteproyecto por cátedra.
- **Art. 8-10:** Desarrollo del TF, presentación y evaluación (después de aprobación).

---

## Referencias

- [README.md](README.md) — Visión general y cumplimiento regulatorio.
- [Reglamento UCSE](research/reglamento_ucse/reglamento_tf_ucse.pdf) — Normativa oficial.
