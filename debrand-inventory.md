# Debranding Inventory — Phase 1 (read-only)

**Repo:** `thatapp/ava` — the **AVA documentation site** (`docs.thatapp.io`), a Jekyll
static site forked from `elasticio/elasticio.github.io` (see `upstream` remote).
**Date:** 2026-06-15. **Status:** inventory only, no edits applied.

## Executive summary

This is a **documentation/copy repo, not application/runtime source.** There is no
live engine contract to break here (no `sailor` process, no `run(msg,cfg,snapshot)`
executing, no HTTP server emitting `X-Powered-By`). That collapses most of the brief's
risk: the "do not break the runtime" guardrail mostly does **not** apply, with **one
important exception** — code samples that customers copy and `npm install` (below).

- ~717 markdown content files; **~239 files** contain at least one engine reference.
- Disclosure is almost entirely **Bucket A (customer-facing copy)**.
- The one real hazard is **Bucket B/C: npm package names in code samples** that must
  resolve when a customer runs them.
- Infra/edge vectors (`X-Powered-By`, source maps, `Server:` headers) = **0 hits** —
  not present in a static Jekyll repo. Those live at the hosting/proxy layer, not here.

## Hit counts (whole repo, binaries excluded)

| Term | Matches | Files | Primary bucket |
|---|---|---|---|
| `sailor` | 869 | 204 | A (copy) / B (SDK refs) |
| `elasticio` | 192 | 86 | A / B |
| `elastic.io` | 57 | 30 | A / E |
| `@elastic.io` | 46 | 27 | **B/C (npm scope)** |
| `elasticio-node` | 56 | 39 | **B/C (npm package)** |
| `elasticio-sailor-nodejs` | 40 | — | **B/C (npm package)** |
| `component repository` | 35 | 17 | A |
| `getPassthrough` | 33 | 18 | B |
| `OIH` | 27 | 16 | A (remove) |
| `emit('data'` | 24 | — | B |
| `msg, cfg, snapshot` | 22 | — | B |
| `sailor-jvm` | 18 | — | B/C |
| `nodes_config` | 10 | — | A (schema docs) |
| `mapper_type` / `default_mapper_type` | 13 | — | A (schema docs) |
| `newMessageWithBody` | 4 | 3 | B |
| `Open Integration Hub` | 2 | 2 | A (remove) |
| `X-Powered-By`, `sourceMappingURL`, `hoist/`, `coreapps/` | 0 | 0 | — |

## Where the disclosure lives (engine-ref files by area)

| Area | Files | What's in it |
|---|---|---|
| `content/_components` | 132 | Component docs: `@elastic.io/*` packages, OIH, `elasticio-node` samples |
| `content/_releases` | 76 | Changelog: `Sailor` version bumps, `elasticio-sailor-nodejs`, package versions |
| `content/_developers` | 11 | SDK authoring docs: `sailor`, `getPassthrough`, `msg,cfg,snapshot`, build helper |
| `content/_references` | 9 | `emiterror.md` etc. — `require('elasticio-node')` samples |
| `content/_on-premises` | 5 | Self-hosting docs |
| `content/_guides` | 5 | e.g. `using-snapshots.md` — `require('elasticio-node')` |
| `_data/chapters.yml` | 1 | **Nav has a "Sailor" chapter** ("References on our SDKs") |
| `_includes`, `_layouts`, templates | 0 | Clean — brand already templated via `tenant.yml` |

## Classification & action by bucket

### Bucket A — Customer-facing copy (rename freely)
- **Prose references** to `elasticio` / `elastic.io` / `OIH` / `Open Integration Hub` /
  `component repository` across guides, references, components, on-premises.
- **Nav: the "Sailor" chapter** in `_data/chapters.yml:103` → rename to "AVA Runtime
  SDK" / "AVA SDK" (the *label* is copy; the package names underneath are B/C).
- **Schema-doc terms** (`nodes_config`, `mapper_type`, etc.) — generic enough to keep or
  lightly reword; low risk.
- **Action:** apply the brief's term map (sailor→runtime, component→step, OIH→remove).
  High volume but mechanical. Release-note history (76 files) is a judgment call —
  see "Decisions needed."

### Bucket B/C — npm packages & SDK calls in code samples (DO NOT blindly rename)
This is the documentation analogue of the brief's runtime guardrail. These are **real
published packages a customer installs/imports**; renaming the doc without an
AVA-published equivalent gives the customer code that does not resolve.
- `var elasticio = require('elasticio-node')` — `content/_references/emiterror.md:29`,
  `content/_guides/using-snapshots.md:51`
- `@elastic.io/component-build-helper` (`npm install -g`) —
  `content/_developers/component-build-configuration.md:60,210`
- `@elastic.io/component-commons-library`, `elasticio-sailor-nodejs` — throughout
  `_components` and `_releases`
- `messages.newMessageWithBody(...)`, `this.emit('data',{body})`,
  `$getPassthrough()`, `run(msg,cfg,snapshot)` — authored SDK surface
- **Action:** keep the working name **unless** an AVA-namespaced package/alias is
  actually published. Otherwise these become the residual register (see below).

### Bucket D — Secrets
- `_config.yml` Algolia `search_only_api_key` is a **public** search-only key (designed
  to be exposed) — **not** a leak, but noted. No private credentials, tokens, or
  hardcoded account fallbacks found in this repo.

### Bucket E — Domains / callback URLs
- `https://your-tenant.elastic.io/callback/oauth2` —
  `content/_components/linkedin/index.md`. This is an **engine OAuth callback host**.
  Functional, not just copy: fixing it in docs only matters if the real OAuth callback
  is served from an AVA domain. → confirm at the platform layer, then update doc.

## Residual register (cannot be closed by editing this repo)
1. **npm package identity** (`elasticio-node`, `@elastic.io/*`, `elasticio-sailor-nodejs`)
   — closed only by AVA publishing/aliasing packages, or by the OEM agreement granting
   SDK rebranding. Highest-value follow-up; **not a docs change.**
2. **OAuth callback domain** (`*.elastic.io/callback/oauth2`) — closed at the auth/proxy
   layer, not in markdown.
3. **Upstream remote** `elasticio/elasticio.github.io` — git provenance; local-only,
   informational.

## Decisions needed before remediation (Phase 3 review gate)
1. **npm packages in samples:** does AVA publish AVA-named equivalents, or do samples
   keep the working `elasticio-*` names (documented under a neutral "engine SDK" framing)?
2. **Release-note history (76 files):** scrub `Sailor`/package names in past changelog
   entries, or leave history intact and only debrand forward?
3. **Verification claims:** out of scope for this repo, but the related `llms-full.txt`
   carries unverified security/cert claims (ISO 27001, "zero records", "largest
   partner"). Debranding must not become *misbranding* — those need independent
   verification, never fabrication.
