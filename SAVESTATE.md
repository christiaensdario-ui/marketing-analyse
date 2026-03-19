# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-19
**Commit hash:** `d56e7a0` *(zie ook: efddfbb)*
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git

---

## Samenvatting recente wijzigingen

### Commit efddfbb — 5 feedbackverbeteringen
1. **Score-tooltips** — Vraagtekenicoontje (?) naast engagement rate, community score en gekleurde badges; bij hover verschijnt uitleg van drempelwaarden
2. **Insights fix (ronde 1)** — "mainstream" toegevoegd als internationale ambitie; budget drempel €500; emotie/resonantie per veld gecheckt
3. **Inzichten bovenaan subpagina's** — InsightCards staan nu helemaal bovenaan op alle 7 subpagina's (vóór de data)
4. **SVG organogram** — Clean boomstructuur: lead-node bovenaan, teamleden in eigen nodes, gestippelde lijn naar rollen/beslissingsproces
5. **Kleurcodering scores** — Engagement rate en community score uitgelegd via tooltip

### Commit d56e7a0 — Insights bugfix + 5 nieuwe verbindingen
6. **Bugfix verbindingen** — Alle 9 inzichten geëvalueerd via onafhankelijke try/catch blokken; geen vroeg afbreken meer
7. **Inzicht 5: Frequentie vs engagement** — >5 posts/week + engagement <5% → rood (urgent)
8. **Inzicht 6: Concurrentie gap** — "Wat doen zij niet" matcht positionering → blauw (kans)
9. **Inzicht 7: UGC vs community** — Weinig UGC + community score >60% → blauw (kans)
10. **Inzicht 8: Markt vs middelen** — Verzadigde markt + budget <€500 → rood (urgent)
11. **Inzicht 9: Groeiende trend vs contentmix** — Stijgende trend + categorie <10% → blauw (kans)
12. **InsightCard kleuren** — Oranje = spanning, Blauw = kans, Rood = urgent
13. **Inzichtenteller** — "N inzichten gedetecteerd" bovenaan blok met kleurcodering (grijs/amber/rood)

---

## Huidige projectstatus

### Bestand
- `marketing-analyse.html` — Enkelvoudig HTML-bestand (React + Tailwind via CDN)

### Features actief
- Multi-client analyse beheer (aanmaken, opslaan, openen, verwijderen)
- PDF export (print-dialoog) + JSON export/import
- Samenvattingspagina als standaard eerste tab
- Interne analyse: Organisatie (met SVG OrgChart), Merkidentiteit, Kanaalstrategie, Doelgroep, Content, Strategie, Community, Middelen, SWOT
- Externe analyse: Concurrentie (multi, scrollbare tabel), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Culturele trends (met richtingspijlen)
- Dashboard: gekleurde badges + tooltips, IconDataCards, tag-chips, SVG organogram, performance metrics
- Visueel: donut contentmix, format-balken, doelgroep vergelijking, community score-meter
- Automatische inzichten: 9 data-verbindingen, 3 kleurtypen, teller bovenaan
- Score-tooltips: engagement rate, community score, badge-legenda
- Inzichten prominent bovenaan elke subpagina
- LocalStorage persistentie met automatische migratie

### Tech stack
- React 18 (UMD via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX in browser)
- Geen build tool, geen dependencies
