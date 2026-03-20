# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-20
**Commit hash:** `c6c1390` *(zie ook: e23b27d, 71420a7, dd6ca65, bcc81fb)*
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git

---

## Samenvatting recente wijzigingen

### Commit bcc81fb — UX verbeteringen ronde 2
1. **getEngagementRate() helper** — Berekent ER via Instagram Insights (bereik) of indicatief (volgers)
2. **insightsAccess keuze (ja/nee)** — Radiobuttons; conditionele velden; live ER-preview
3. **ER-bronvermelding** — "Berekend via Instagram Insights" of "Indicatieve score" op dashboard
4. **Formats instructietekst + <30 waarschuwing + dashboard disclaimer**
5. **Frequentie gecombineerde dashboardlijn** — "Gemiddeld X posts/week en Y stories/week"
6. **Inzicht 9: Dynamische trendnaam** — Noemt specifieke gedetecteerde trend
7. **PDF export** — Inline ER-berekening op basis van insightsAccess

### Commit dd6ca65 — 4 bugfixes invoerflow
8. **Frequentie info-kadertje** — Blauw kader met instructietekst + vraagteken-tooltip
9. **GroupLabel tooltip-prop** — Frequentie-sectie krijgt uitleg posts vs stories
10. **ER dashboard/samenvatting geblokkeerd** — Placeholder zolang bereik/volgers ontbreekt
11. **Concurrent engagement** — Vrij tekstveld vervangen door likes+comments+volgers + auto ER

### Commit 71420a7 — Manueel ER-veld volledig verwijderd
12. **gemiddeldeEngagementRate** — Verwijderd uit emptyData, migratie, helper, formulier en PDF
13. **getEngagementRate()** — Geeft alleen nog waarde bij volledig ingevulde auto-berekening
14. **erMissing = !erStr** — Dekt alle gevallen: geen keuze, ontbrekend veld, geen data

### Commit e23b27d — Concurrent frequentie + performance sectie
15. **emptyCompetitor** — postsAantal, storiesAantal, engagementShares toegevoegd
16. **Formulier** — Frequentie-kadertje + posts/stories + ≈/week + performance grid (4 velden)
17. **Auto ER-preview** — Placeholder zolang likes, comments of volgers ontbreekt
18. **Dashboard tabel** — Posts/week en Stories/week rijen toegevoegd
19. **PDF export** — Posts/week en Stories/week kolommen in concurrent-tabel

### Commit c6c1390 — Persona Creator + AI SWOT via Anthropic API
20. **callAnthropicAPI()** — Directe browser-fetch naar claude-sonnet-4-20250514
21. **Persona's tab** — Nieuwe tab (laatste); auto-generatie bij eerste bezoek
22. **PersonaCard** — Naam, leeftijd, bio, quote, motivaties, frustraties, mediagebruik, koopgedrag
23. **Refresh per persona** — ↻ knop per kaart hergenereert alleen die persona
24. **AI SWOT** — Parallelle SWOT naast handmatige; side-by-side met SwotBlockNarrow
25. **Vergelijkingsnoot** — Max 3 punten met grootste verschillen tussen beide SWOT's
26. **API sleutel** — Opgeslagen in localStorage (ma_apikey); setup-scherm bij eerste gebruik
27. **Error handling** — Rode foutmelding + "Opnieuw" knop bij alle AI-functies
28. **Persistentie** — personas en aiSwot opgeslagen in analyseobject; bewaard na herstart

---

## Huidige projectstatus

### Bestand
- `marketing-analyse.html` — Enkelvoudig HTML-bestand (React + Tailwind via CDN)

### Features actief
- Multi-client analyse beheer (aanmaken, opslaan, openen, verwijderen)
- PDF export (print-dialoog) + JSON export/import
- Samenvattingspagina als standaard eerste tab
- Interne analyse: Organisatie (SVG OrgChart), Merkidentiteit, Kanalen, Doelgroep, Content, Strategie, Community, Middelen, SWOT
- Externe analyse: Concurrentie (multi + frequentie/performance per concurrent), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Trends
- Dashboard: badges + tooltips, IconDataCards, tag-chips, SVG organogram, performance metrics
- Visueel: donut contentmix, format-balken, doelgroep vergelijking, community score-meter
- Automatische inzichten: 9 data-verbindingen, 3 kleurtypen, teller bovenaan
- Engagement rate: uitsluitend automatisch berekend (Insights/bereik of publiek/volgers)
- Concurrent ER: automatisch via publieke formule (likes + comments) / volgers
- Persona Creator: 2 AI-persona's via Anthropic API, per persona refresh-knop
- AI SWOT: parallelle analyse naast handmatige SWOT met vergelijkingsnoot
- LocalStorage persistentie met automatische migratie

### Tech stack
- React 18 (UMD via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX in browser)
- Anthropic API (claude-sonnet-4-20250514, directe browser-fetch)
- Geen build tool, geen dependencies
