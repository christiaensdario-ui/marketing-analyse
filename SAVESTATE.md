# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-23
**Commit hash:** `279f6c5`
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git

---

## Samenvatting recente wijzigingen

### Sessie 2026-03-23 — 3 grote uitbreidingen

#### 1. Samenvattingspagina — alles klikbaar
- **DCard** — optionele `onClick` prop; hover:border-gray-300 + hover:shadow-md + ↗ pijl rechtsonder
- **Community score kaart** → Community subtab (Interne Analyse)
- **Engagement rate kaart** → Content subtab; benchmark-element (↑/↓) apart klikbaar → Concurrentie
- **Contentmix** → Content subtab
- **Doelgroep** → Doelgroep subtab
- **Marktcontext** → Markt/Scene subtab (Externe Analyse)
- **Middelen** → Middelen subtab
- **Gaps** — elk gap-item individueel klikbaar met eigen navigatiebestemming
- **Automatische inzichten** — elk InsightCard klikbaar naar eerste pagina in `pages[]`
- **Persona snellinks** — reeds functioneel
- **handleNavigate** in DashboardScreen; `setMainTab` + `setInterneTab`/`setExterneTab`

#### 2. OrgChart — onbeperkte hiërarchische niveaus
- **emptyTeamlid** — `rapporteertAan: ''` veld toegevoegd
- **migrateAnalysis** — behoudt `rapporteertAan` bij herlaad van oude data
- **OrgChart redesign** — tree-layout algoritme (Reingold-Tilford-like); curved SVG-paden van parent naar kinderen; elke node op de correcte diepte; cycle-safeguard; behoud donkere bubbel (isLeader) en gestippelde lijn beslissingsproces
- **TeamEditor** — "Rapporteert aan" dropdown per teamlid (naast "Rol"); toont namen van andere teamleden

#### 3. ConcurrentieRadar — toggle eigen merk
- **Toggle knop** "Toon eigen merk" (default aan); rode gestippelde lijn + rose toggle-button
- **Eigen merk scores**: Positionering = huidigePositionering; Content = positioneringsconsistentie; Community = communityScore/20; Engagement = ER; Differentiatie = toneOfVoice
- **Legende** — eigen merk met gestippelde kleurlijn en klantnaam
- **PageConcurrentie + DashboardScreen** — `analysis` prop doorgegeven aan radar

### Sessie 2026-03-23 — Export modal

#### Exportfunctionaliteit herbouwd
1. **ExportModal component** — Modaal venster dat opent bij klik op "Exporteer"-knop in de dashboard header
2. **Selectieopties** — "Volledige analyse" (alles); individuele checkboxes: Samenvatting, Interne Analyse (volledig), Externe Analyse (volledig), Persona's
3. **Individuele secties uitklapbaar** — Accordeon-sectie met Intern (9 secties) en Extern (5 secties) afzonderlijk aanvinkbaar
4. **Formaatkeuze** — PDF of JSON toggle; exporteer-knop uitgeschakeld als niets geselecteerd
5. **exportPDFFiltered()** — Bouwt alleen geselecteerde secties; klantnaam + datum in header; page-break tussen elke sectie; Persona's als opgemaakte kaartjes
6. **exportJSONFiltered()** — Filtert analyse-object op geselecteerde secties; aiSwot meegegeven bij SWOT-selectie
7. **DashboardScreen** — Split-knop (PDF + ▾ dropdown) vervangen door één "Exporteer"-knop; `showExportMenu`/`exportMenuRef` verwijderd

### Sessie 2026-03-23 — 4 grote uitbreidingen

#### 1. Teamstructuur invoerflow
1. **emptyTeamlid** — Nieuw datashape `{naam, functietitel, rol, isLeader}` per teamlid
2. **TeamEditor component** — Gestructureerd formulier met "Voeg teamlid toe"-knop; max 10 leden; checkbox per lid voor teamleader-aanwijzing; verwijderknop
3. **OrgChart redesign** — Leider bovenaan met naam + functietitel (donkere bubbel); rest in rij eronder; rol als klein grijs label rechts van elke bubbel; SVG verbindingslijnen; gestippelde lijn naar beslissingsproces-blok; backward-compat fallback naar oude tekstvelden
4. **Migratie** — `migrateAnalysis()` behoudt `teamleden` array bij herlaad van oude opgeslagen data

#### 2. Concurrentieanalyse radardiagram
5. **scoreTextVeld()** — Scoort tekstveld 1–5 op basis van positieve/negatieve sleutelwoorden
6. **erToRadarScore()** — Converteert ER-percentage naar score 1–5
7. **ConcurrentieRadar** — SVG penta-radardiagram (5 assen: positionering, content, community, engagement, differentiatie); kleurlijn per concurrent; legende + toelichting; boven de bestaande vergelijkingstabel

#### 3. Samenvattingspagina uitbreiding
8. **Benchmark ER** — In de ER-kaart: pijl omhoog (groen) of omlaag (oranje) met "Beste concurrent: X%" wanneer concurrent ER beschikbaar
9. **Marktcontext sectie** — Na doelgroep-kaart: twee kleurgecodeerde badges (groeiend/verzadigd/krimpend/stabiel) voor marktgrootte en marktverzadiging
10. **Middelen sectie** — Na marktcontext: budget en tijd als kaartjes; oranje waarschuwing onder €500/maand of onder 5 uur/week

#### 4. Sectiegezondheidsscores
11. **computeSectionHealth()** — Telt positieve vs totale badges in een sectie
12. **SectionHealthBadge component** — Toont "X/Y" badge naast sectietitel; groen als alles positief, rood als alles negatief, oranje anders
13. **Badges toegevoegd aan** — Alle 9 interne en externe dashboard-secties: Merkidentiteit, Kanaalstrategie, Doelgroep, Strategische content, Community, Concurrentie, Samenwerkingen, Markt/Scene, Doelgroepgedrag, Culturele trends

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
- Export modal: selecteerbare secties (samenvatting, interne/externe/persona's/individueel), PDF of JSON formaat
- Samenvattingspagina: gezondheidscore A–F, mini-donut contentmix, doelgroep compact, persona snellinks, benchmark ER (concurrent vergelijking), marktcontext badges, middelen kaartjes
- Interne analyse: Organisatie (SVG OrgChart + TeamEditor), Merkidentiteit, Kanalen, Doelgroep, Content, Strategie, Community, Middelen, SWOT
- Externe analyse: Concurrentie (radardiagram + vergelijkingstabel), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Trends
- Dashboard: badges + tooltips, IconDataCards, tag-chips, SVG organogram, performance metrics, sectiegezondheidsscores (X/Y)
- Visueel: donut contentmix, format-balken, doelgroep vergelijking, community score-meter, penta-radardiagram concurrenten
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
