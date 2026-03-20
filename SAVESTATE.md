# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-20
**Commit hash:** `bcc81fb` *(zie ook: d56e7a0, efddfbb)*
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

### Commit bcc81fb — UX verbeteringen ronde 2
14. **getEngagementRate() helper** — Berekent ER via Instagram Insights (bereik) of indicatief (volgers); valt terug op manueel veld
15. **insightsAccess keuze (ja/nee)** — Radiobuttons in formulier; "ja" toont bereik-veld, "nee" toont volgers-veld; live ER-preview zodra data ingevuld
16. **ER-bronvermelding** — "Berekend via Instagram Insights" of "Indicatieve score" onder ER-kaart op dashboard en samenvatting
17. **Formats instructietekst** — "Geef het aantal posts per format in van je laatste 30 posts." bovenaan sectie
18. **Formats <30 waarschuwing** — Oranje waarschuwing wanneer totaal posts < 30
19. **Formats dashboard disclaimer** — Grijze tekst "Gebaseerd op X posts — aantallen omgezet naar percentages" onder format-balken
20. **Frequentie gecombineerde lijn** — Dashboard toont "Gemiddeld X posts/week en Y stories/week — gebaseerd op de laatste 4 weken"
21. **Inzicht 9: Dynamische trendnaam** — Noemt specifieke gedetecteerde trend (genre-populariteit, nostalgie-trend, etc.)
22. **PDF export** — Inline ER-berekening op basis van insightsAccess bij exporteren

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
- Formats: count-based invoer (laatste 30 posts), auto-percentageberekening, <30 waarschuwing
- Frequentie: twee numerieke velden (posts + stories, laatste 4 weken), auto-weekgemiddelde
- Engagement rate: automatische berekening via Instagram Insights (bereik) of indicatief (volgers)

### Tech stack
- React 18 (UMD via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX in browser)
- Geen build tool, geen dependencies
