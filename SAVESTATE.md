# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-19
**Commit hash:** `019c64f`
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git

---

## Samenvatting wijzigingen (commit 019c64f)

### Structuurwijzigingen
1. **Kanaalstrategie** — Nieuwe sectie C in interne analyse: actieve platformen, onderbouwing per platform, primair kanaal, ontbrekende kanalen
2. **Formats uitgebreid** — Elk format (foto/video/reels/carousels) heeft nu 3 velden: percentage, uitleg, voorbeeldcontent
3. **Performance hernoemd** — Velden hernoemd naar `gemiddeldeLikes`, `gemiddeldeComments`, `gemiddeldeShares`, `gemiddeldeEngagementRate` (met achterwaartse migratie)
4. **Concurrentieanalyse** — Multi-concurrent support (max 5), elk met eigen naamveld, toevoegen/verwijderen knoppen
5. **Samenwerkingen en netwerk** — Nieuwe sectie in externe analyse: potentiële partners, gatekeepers, bestaande samenwerkingen, ontbrekende samenwerkingen
6. **Platformanalyse verwijderd** — Sectie volledig verwijderd uit formulier, dashboard en datastructuur

### Visuele dashboardverbeteringen
1. **Contentmix donutgrafiek** — SVG donut zonder externe library; invoer via dropdown (10/20/30/50 posts) + absolute aantallen per contenttype; percentages automatisch berekend
2. **Formats staafdiagrammen** — Horizontale gekleurde balken per format met uitleg en voorbeeldcontent eronder
3. **Doelgroep vergelijking** — Blauw blok (gewenste doelgroep) naast oranje blok (werkelijke doelgroep)
4. **Concurrentietabel** — Scrollbare vergelijkingstabel: concurrenten als kolommen, analysecomponenten als rijen
5. **Community score-meter** — Visuele meter van "Publiek" naar "Echte community" op basis van ingevulde velden

### Migratie
- Bestaande `localStorage`-data wordt automatisch omgezet naar de nieuwe structuur via `migrateAnalysis()`

---

## Huidige projectstatus

### Bestand
- `marketing-analyse.html` — Enkelvoudig HTML-bestand (React + Tailwind via CDN)

### Features actief
- Multi-client analyse beheer (aanmaken, opslaan, openen, verwijderen)
- JSON export en import
- Interne analyse: Organisatie, Merkidentiteit, Kanaalstrategie, Doelgroep, Contentanalyse, Strategische content, Community, Middelen, SWOT
- Externe analyse: Concurrentie (multi), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Culturele trends
- Visueel dashboard met donut, staafdiagrammen, vergelijkingstabel, score-meter
- LocalStorage persistentie met automatische migratie

### Tech stack
- React 18 (UMD via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX in browser)
- Geen build tool, geen dependencies
