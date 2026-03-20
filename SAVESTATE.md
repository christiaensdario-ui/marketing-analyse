# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-20
**Commit hash:** `3661b1c` *(zie ook: 38f8d22, f83c460)*
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git

---

## Samenvatting recente wijzigingen

### Commit 38f8d22 — SWOT vergelijking visueel verbeterd
1. **Vergelijkingskaartjes** — Elk verschil in een eigen afgebakend kaartje met titel en bodytekst
2. **Gekleurde streep** — Oranje = AI kritischer, blauw = AI ziet extra kans
3. **parseVergelijking()** — Verwerkt zowel nieuw JSON-array als legacy string-formaat

### Commit 3661b1c — Persona generator uitbreiding + samenvattingspagina redesign

#### Persona tabs (4 tabs per kaart)
4. **Profiel** — Bestaande inhoud (naam, bio, quote, motivaties, frustraties, mediagebruik, koopgedrag)
5. **Customer Journey** — 5 fases (Ontdekking→Terugkeer), elk met beschrijving + voorbeeld, kleurcodering per fase
6. **Kanaaladvies** — Platform-kaartjes met prioriteit-badge (primair/secundair/optioneel), reden/content/timing
7. **Doelgroepvergelijking** — Overeenkomsten (groen), verschillen (rood), conclusie (amber)

#### Persona generator uitbreiding (3+1 persona's)
8. **Kernklant (persona1)** — Gebaseerd op werkelijke doelgroep
9. **Aspirationele klant (persona2)** — Gebaseerd op gewenste doelgroep
10. **Randgeval (persona3)** — Verrassend segment via merkidentiteit + trends + concurrentie
11. **Conflictpersona (persona4)** — Automatisch bij doelgroepkloof (gewenst ≠ werkelijk); oranje banner
12. **buildPersonaPrompt** — Expliciete rollen per persona, geen twee mogen gelijken; merkwaarden + concurrenten als extra context; maxTokens 6000
13. **Persona-ID's** — `id="persona-card-{key}"` voor scrollnavigatie vanuit samenvatting

#### Samenvattingspagina redesign
14. **Gezondheidscore A–F** — Bovenaan, 4 factoren: community/ER/contentmix/doelgroepkloof; groen/oranje/rood; factor-badges ✓/✗; tooltip
15. **MiniDonutChart** — Volledige donut (100×100px) vervangt dominante-categorie-tekst; alle categorieën + percentages
16. **Doelgroep compact** — Kleinere blokken met line-clamp; mismatch-waarschuwing groter, prominenter, met uitlegtekst
17. **SWOT highlights verwijderd** — Top sterktes/bedreigingen weg van samenvattingspagina
18. **Persona snellinks** — Klikbare kaartjes onderaan; navigeert naar personas-tab + scrollt naar betreffende kaart

---

## Huidige projectstatus

### Bestand
- `marketing-analyse.html` — Enkelvoudig HTML-bestand (React + Tailwind via CDN)

### Features actief
- Multi-client analyse beheer (aanmaken, opslaan, openen, verwijderen)
- PDF export (print-dialoog) + JSON export/import
- Samenvattingspagina: gezondheidscore A–F, mini-donut contentmix, doelgroep compact, persona snellinks
- Interne analyse: Organisatie (SVG OrgChart), Merkidentiteit, Kanalen, Doelgroep, Content, Strategie, Community, Middelen, SWOT
- Externe analyse: Concurrentie (multi + frequentie/performance per concurrent), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Trends
- Dashboard: badges + tooltips, IconDataCards, tag-chips, SVG organogram, performance metrics
- Visueel: donut contentmix, format-balken, doelgroep vergelijking, community score-meter
- Automatische inzichten: 9 data-verbindingen, 3 kleurtypen, teller bovenaan
- Engagement rate: uitsluitend automatisch berekend (Insights/bereik of publiek/volgers)
- Concurrent ER: automatisch via publieke formule (likes + comments) / volgers
- Persona Creator: 3 standaard persona's + optionele conflictpersona via Anthropic API
  - 4 tabs per kaart: Profiel, Customer Journey, Kanaaladvies, Doelgroepvergelijking
  - Refresh per persona; persistentie in analyseobject
- AI SWOT: parallelle analyse naast handmatige SWOT met vergelijkingsnoot (gestructureerde kaartjes)
- LocalStorage persistentie met automatische migratie

### Tech stack
- React 18 (UMD via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX in browser)
- Anthropic API (claude-sonnet-4-20250514, directe browser-fetch)
- Geen build tool, geen dependencies
