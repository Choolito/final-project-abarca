# GitHub Rulesets - Configuración Manual

Configura estos 2 rulesets en: `https://github.com/Choolito/final-project-abarca/settings/rules`

---

## Ruleset 1: main - Production Protection

**Usar archivo:** `.github/rulesets-main.json`

**Datos:**
- **Nombre:** `Main Production Protection`
- **Descripción:** Protecciones para rama main - Solo merges desde release/
- **Target:** Branch
- **Enforcement:** Active
- **Conditions - Ref name include:** `refs/heads/main`

**Rules:**

1. ✅ **Require pull requests before merging**
   - NO marcar "Require approvals"
   - Parámetros: `require_pull_request_reviews: false`

2. ✅ **Block force pushes**

3. ✅ **Block deletions**

**Flujo:**
```
develop → release/0.1.0 (rama nueva)
         → PR a main (obligatorio)
         → Mergea en main (sin aprobación)
```

---

## Ruleset 2: develop - Integration Protection

**Usar archivo:** `.github/rulesets-develop.json`

**Datos:**
- **Nombre:** `Develop Integration Protection`
- **Descripción:** Protecciones para rama develop - Solo merges desde feature/, fix/, docs/
- **Target:** Branch
- **Enforcement:** Active
- **Conditions - Ref name include:** `refs/heads/develop`

**Rules:**

1. ✅ **Require pull requests before merging**
   - NO marcar "Require approvals"
   - Parámetros: `require_pull_request_reviews: false`

2. ✅ **Block force pushes**

3. ✅ **Block deletions**

**Flujo:**
```
feature/nueva-feature → PR a develop (obligatorio)
fix/bug-fix           → PR a develop (obligatorio)
docs/cambios          → PR a develop (obligatorio)
                      → Mergea en develop (sin aprobación)
```

---

## Pasos para importar

**Para cada ruleset:**

1. Ve a `https://github.com/Choolito/final-project-abarca/settings/rules`
2. Click en **New ruleset** → **Import a ruleset** (o similar)
3. Copia el contenido del archivo JSON (`.github/rulesets-main.json` o `.github/rulesets-develop.json`)
4. Pégalo en GitHub
5. Confirma

---

## Resultado final

✅ **main:** Producción
   - Requiere PR desde release/* (sin aprobación)
   - Protegido contra force-push y eliminación

✅ **develop:** Integración
   - Requiere PR desde feature/*, fix/*, docs/* (sin aprobación)
   - Protegido contra force-push y eliminación

✅ **feature/*, fix/*, docs/*:** Ramas de trabajo
   - Libre para crear y trabajar
   - Se mergean vía PR a develop

✅ **release/x.y.z:** Ramas de release
   - Se crean desde develop
   - Se mergean vía PR a main
