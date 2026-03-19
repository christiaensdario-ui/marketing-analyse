# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-19
**Commit hash:** `(zie git log)`
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git

---

## Samenvatting wijzigingen (commit 8a2002e)

### Dashboardvisualisatie
1. **IconDataCard** — Alle tekstvelden in afgebakende kaartjes met passend icoon per veld
2. **Badge-detectie** — Automatische gekleurde badge op sleutelwoorden: sterk/consistent/goed/hoog → groen · matig/gemengd/beperkt → oranje · zwak/inconsistent/laag/geen → rood
3. **Sectie-achtergronden** — Subtiele achtergrondkleuren per sectie (slate/violet/blue/amber/teal/emerald/purple/orange/sky/rose)
4. **Tag-lijstvelden** — Actieve platformen, teamleden, gatekeepers, potentiële partners, andere labels als tag-chips

### Kleurcodering scores
5. **Engagement rate** — Rood <2%, oranje 2-5%, groen >5% — met badge en gekleurde achtergrond
6. **Community score** — Rood <40%, oranje 40-70%, groen >70%
7. **Contentmix** — Oranje waarschuwing bij >60% dominantie in donut-legenda

### Performance fix
8. **Balken verwijderd** — Likes/Comments/Shares als grote getallen in aparte kaartjes, geen misleidende balkbreedte
9. **Engagement rate apart** — Groot gekleurd kaartje met badge (Laag/Gemiddeld/Goed)

### Team hiërarchie (OrgChart)
10. **Visueel organogram** — team/leden, rollen en werking samengevoegd in één visual
    - Eindverantwoordelijke bovenaan (donker blok)
    - Overige leden in rij eronder
    - Rollen als beschrijvingstekst in midden
    - Werking als blauw "Beslissingsproces" onderaan

### PDF export (split button)
11. **PDF als hoofdexport** — Knop exporteert via `window.print()` naar volledig rapport
12. **JSON als secundaire optie** — Dropdown-pijltje naast PDF-knop
13. **PDF-inhoud** — Alle secties: A–J intern + A–E extern, SWOT-grid 2×2, concurrentietabel

### Samenvattingspagina
14. **Eerste tab** — Standaard zichtbaar bij openen van een analyse
15. **Metrics** — Community score + engagement rate als gekleurde blokken
16. **Contentmix dominant** — Welke categorie overheerst + waarschuwing bij >60%
17. **Doelgroep** — Gewenst vs werkelijk met waarschuwing bij verschil
18. **SWOT highlights** — Top 2 sterktes + top 2 bedreigingen
19. **Gaps** — 5 automatisch gegenereerde gaps op basis van data

### Automatische inzichten (4 verbindingen)
20. **Kanaal mismatch** — Doelgroep gebruikt platform dat ontbreekt in kanaalstrategie
21. **Promo vs resonantie** — Promo >50% + zwakke emotie/doelgroepresonantie
22. **Tone vs community** — Afstandelijke tone of voice + community score <50%
23. **Budget vs ambitie** — Beperkt budget + internationale gewenste doelgroep
24. **Dubbele zichtbaarheid** — Inzichten op samenvattingspagina én op relevante subpagina's

---

## Huidige projectstatus

### Bestand
- `marketing-analyse.html` — Enkelvoudig HTML-bestand (React + Tailwind via CDN)

### Features actief
- Multi-client analyse beheer (aanmaken, opslaan, openen, verwijderen)
- PDF export (print-dialoog) + JSON export/import
- Samenvattingspagina als standaard eerste tab
- Interne analyse: Organisatie (met OrgChart), Merkidentiteit, Kanaalstrategie, Doelgroep, Content, Strategie, Community, Middelen, SWOT
- Externe analyse: Concurrentie (multi, scrollbare tabel), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Culturele trends (met richtingspijlen)
- Dashboard: gekleurde badges, IconDataCards, tag-chips, OrgChart, performance metrics
- Visueel: donut contentmix, format-balken, doelgroep vergelijking, community score-meter
- Automatische inzichten: 4 data-verbindingen gedetecteerd en weergegeven
- LocalStorage persistentie met automatische migratie

### Tech stack
- React 18 (UMD via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX in browser)
- Geen build tool, geen dependencies
