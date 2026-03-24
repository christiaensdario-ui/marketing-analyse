# Marketing Analyse App — Savestate

## Laatste opslag
**Datum:** 2026-03-24
**Commit hash:** deb74f0
**Branch:** `master`
**Remote:** https://github.com/christiaensdario-ui/marketing-analyse.git
**Gepushed:** ja — 11 commits naar origin/master

---

## Samenvatting recente wijzigingen

### Sessie 2026-03-24 — WeekFlow: Netlify deployment

- `weekflow.html` hernoemd naar `index.html`
- `netlify.toml` aangemaakt: redirect `/api/chat → /.netlify/functions/chat`
- `netlify/functions/chat.js`: serverless proxy naar Anthropic API (x-api-key server-side)
- `server.js` + `package.json`: lokale Node.js server (alternatief voor Netlify dev)
- `README.md`: deploy-instructies voor Netlify en lokale Netlify CLI

### Sessie 2026-03-24 — WeekFlow: AI instructies in stap 2

- Stap 2 uitgebreid met '📝 Extra instructies voor de AI' textarea + tekenteller
- `_saveAIInstructions()` slaat direct op in `settings.aiInstructions` in localStorage
- Stap 3 toont alleen nog bufferuren + bevestiging dat instructies ingesteld zijn
- Systeemprompt: `aiInstructions` toegevoegd als directe tekst (niet als payload-veld)

### Sessie 2026-03-24 — WeekFlow: ghost blocks direct geplaatst

- Ghost blocks verschijnen onmiddellijk na plaatsen studieblok, zonder bevestiging
- `_findAvailableSlot()`: zoekt conflictvrij tijdslot op voorkeursdag, anders volgende dag
- `isShifted`-vlag + oranje badge 'Verschoven — geen vrije tijd' als blok verplaatst
- Ghost popover: alleen 'Bevestig' en 'Verwijder' (geen dag/tijdvelden)
- Ghost blocks sleepbaar; slepen wist `isShifted`
- Pulserende animatie + '✓ Ingepland' label
- Herhaling-offset gecorrigeerd: +3 en +7 dagen (was +3 en +10)

### Sessie 2026-03-24 — WeekFlow: dynamische rijhoogte + AI planning wizard

- Rijhoogte kalender via JS (`_updateCalRowHeight`), niet meer via CSS `calc(100vh)`
- ResizeObserver op `.cal-container` voor live updates bij window resize
- AI planning volledig werkend vanuit stap 3: `bufferHours` en `aiInstructions` uit wizard
- Foutpad AI-planning navigeert naar lege kalender

### Sessie 2026-03-24 — WeekFlow: AI planning fix + drag & drop verbeteringen

#### AI planning (`_callAnthropicAPI`, `_startAIPlanning`, `_setAIButtonLoading`)
- Alleen `Content-Type: application/json` header (geen x-api-key, geen anthropic-version)
- `console.log` van request body vóór fetch + full response na parse
- Markdown fences strippen (` ```json ``` `) vóór JSON.parse
- try/catch op JSON.parse; foutmelding: "Het AI voorstel kon niet worden verwerkt. Probeer opnieuw of plan zelf."
- `_setAIButtonLoading(loading)` — button uitgeschakeld + "⏳ AI is je planning aan het maken..." tijdens request
- `id="btn-ai-plan"` op de knop in `_buildStep3()`
- `try/finally` zodat button altijd opnieuw ingeschakeld wordt

#### Drag & drop verbeteringen (`_initCalDragDrop`, `_initResizeHandles`)
- Snap-to-full-hour bij drag vanuit sidebar én bij herplaatsen van bestaand blok
- Visuele uur-cel highlight (`.drop-target`) tijdens dragover, verwijderd bij dragleave/drop
- Resize handles (`.cal-resize-handle`) op elk blok: 30-min snap, conflictdetectie, tooltip `#cal-resize-tip`
- Shake-animatie (`@keyframes cal-shake`) bij ongeldige drop of ongeldige resize
- `_resizeState` variabele voorkomt dat HTML5-drag start tijdens resize

### Sessie 2026-03-24 — WeekFlow: studieplanning, ghost blocks, dagweergave

#### WeekFlow uitbreidingen (`WeekFlow/weekflow.html`)

**Studieblok logica:**
- Studie-categorie krijgt speciaal popover: Vaknaam + live sessienummer + sessieduur info
- `_getStudySessionNum(vaknaam)` — telt bestaande sessies per vaknaam, auto-increment
- `_getSessionInfo(num)` — Sessie 1 = 45min, Sessie 2 = 30min, Sessie 3 = 45min, Herhaling = 15min
- Duur automatisch bepaald door sessienummer, niet handmatig invulbaar
- `_showStudyPopover`, `_updateStudyInfo`, `_confirmStudyAdd`

**Automatische vervolgsessies (ghost blocks):**
- Sessie 1 geplaatst → ghost Sessie 2 (dag+1)
- Sessie 2 bevestigd → ghost Sessie 3 (dag+2)
- Sessie 3 bevestigd → ghost Herhaling (dag+3) + ghost Herhaling (dag+10)
- Ghost blokken: semi-transparant, gestreepte border, "❓" icoon
- Ghost op volle dag → oranje highlight + "⚠️ Overbelast" tekst
- Klik op ghost → popover met dag/tijd aanpassen + bevestigen/verwijderen
- Bevestigen ghost → wordt echt blok, triggert volgende ghosts
- `_placeGhostBlocks`, `_openGhostPopover`, `_confirmGhost`, `_deleteGhost`

**Overbelasting detectie:**
- Na elk blok plaatsen/bevestigen/verplaatsen/bewerken: `_checkOverbooking(day, newBlockId)`
- Check: bevestigde uren + shift uren + buffer > 16u
- Modal "⚠️ [Dag] is overbelast" met overzicht van blokken
- Optie 1: "Verplaats blok" → dag/tijd picker → verplaatst het nieuwe blok (`_obMoveNewBlock`, `_obConfirmMove`)
- Optie 2: ✕ per blok in lijst → direct verwijderen (`_obDelBlock`)
- `_isDayFull`, `_checkOverbooking`, `_obClose`, `_obMoveNewBlock`, `_obConfirmMove`, `_obDelBlock`

**Dagweergave:**
- Klik op dagkoptekst in kalender → dagweergave (`navDay`)
- Verticale lijst blokken gesorteerd op tijd, ghost blokken apart
- Elk blok: kleurstip, tijdsbereik, naam, duur, checkbox done/undone
- Voortgangsbalk: "X van Y blokken afgewerkt"
- Verlopen + niet-afgewerkt blok → oranje banner met opties:
  - "Later vandaag" → tijdpicker + overlapscheck (`_dvMoveLater`, `_dvConfirmMoveLater`)
  - "Morgen" → direct verplaatst (`_dvMoveMorrow`)
- Ghost blokken in dagweergave tonen "Bevestig" knop
- Terug-knop → weekkalender
- `_buildDayView`, `_dvToggleDone`, `_dvMoveLater`, `_dvConfirmMoveLater`, `_dvMoveMorrow`

**Nieuwe state variabelen:** `_selectedDay`, `_obNewBlockId`

---

### Sessie 2026-03-24 — WeekFlow: volledig kalenderscherm

#### Nieuw project: WeekFlow (`WeekFlow/weekflow.html`)
Volledig herontwikkelde kalenderweergave als de kern van de app.

**Layout & structuur:**
- Volledig schermvullend (`height: 100vh; overflow: hidden`), `#app.cal-mode { max-width: 100% }`
- Top bar: ‹ terug | ‹ week | datumbereik | week › | Vandaag | + Planning
- Linker sidebar (152px): sleep-tegels per actieve categorie (kleurstip, naam, standaardduur)
- Rechts: dagkolommenrij (44px) + uurlabels (34px breed) + 7 dagkolommen
- Rijhoogte = `(100vh − 140px) / 24` via CSS-variabele `--row-h` — geen JS nodig, past exact op scherm
- Onderbalk: aantal blokken, uren activiteiten, geschatte vrije tijd

**Drag & Drop:**
- Sleep categorie-tegel → dagkolom → popover vraagt naam, starttijd, duur (vooringevuld met categorie-defaults)
- Sleep bestaand blok → verplaatsen (snapt op 30 minuten)
- Overlappingsdetectie tegen bestaande blokken én werkshifts (`_checkOverlap`)

**Blokken in het rooster:**
- Werkshifts: gestreept blauw patroon, niet-sleepbaar, absoluut gepositioneerd op werkelijke tijd
- Activiteitblokken: kleur-tinted achtergrond met gekleurde linkerrand, naam + tijdsbereik
- Klik op blok → bewerkpopover: naam / tijd / duur velden + verwijderknop

**Horizon-overlay:**
- Dagen > 14 dagen vooruit: 40% doorzichtig + gecentreerde knop "Planning toevoegen" (herstart wizard)

**Nieuwe functies (JS):**
- `_timeToFloat()`, `_floatToTime()` — conversie tijdstring ↔ decimaal getal
- `_checkOverlap()` — overlappingsdetectie blokken + shifts
- `_buildCalendar()` — herbouwd van nul; genereert volledige HTML-structuur
- `_calGoToday()`, `_calWeek()` — weeknavigatie
- `_initCalDragDrop()` — koppelt dragstart/dragover/drop listeners na render
- `_closePopover()`, `_openPopover()` — popover lifecycle
- `_showAddPopover()`, `_confirmAdd()` — nieuw blok toevoegen
- `_showEditPopover()`, `_confirmEdit()`, `_deleteBlock()` — blok bewerken/verwijderen
- `_moveBlock()` — blok verplaatsen via drag

**Overig:**
- `.gitignore` aangemaakt (sluit `.claude/` uit)
- `#cal-pop` + `#cal-pop-back` toegevoegd aan body (popover-elementen buiten `#app`)
- `_render()` stelt `cal-mode` klasse in op `#app` en roept `_initCalDragDrop()` aan

---

### Sessie 2026-03-24 — WeekFlow: volledige herschrijving (startpagina + wizard)

Eerder in dezelfde dag: complete herstart van `WeekFlow/weekflow.html`.

- **Startpagina**: twee grote kaartjes (📅 Nieuwe planning / 📋 Mijn planning)
- **3-staps wizard**: Werkrooster (14-daags shift-editor) → Categorieën (toggle + velden) → Overzicht
- **Stap 1** — inline shift-editor per dag, één rij tegelijk bewerkbaar
- **Stap 2** — CSS toggle-switch kaartjes, uitklapbare velden per ingeschakelde categorie, eigen categorieën toevoegen
- **Stap 3** — samenvatting + "Genereer AI planning" (→ toast "komt binnenkort") + "Zelf plannen" (→ kalender)
- **Kalender** (stub, nu vervangen) — weekrooster met shift-pills en blok-pills
- **Tech**: vanilla JS SPA, localStorage, geen build tool

---

### Sessie 2026-03-23 — 3 grote uitbreidingen (marketing-analyse.html)

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

---

## Huidige projectstatus

### Bestanden
- `marketing-analyse.html` — Enkelvoudig HTML-bestand (React + Tailwind via CDN)
- `WeekFlow/weekflow.html` — Enkelvoudig HTML-bestand (Vanilla JS, geen framework)

### marketing-analyse.html — Features actief
- Multi-client analyse beheer (aanmaken, opslaan, openen, verwijderen)
- Export modal: selecteerbare secties (samenvatting, interne/externe/persona's/individueel), PDF of JSON formaat
- Samenvattingspagina: gezondheidscore A–F, mini-donut contentmix, doelgroep compact, persona snellinks, benchmark ER, marktcontext badges, middelen kaartjes
- Interne analyse: Organisatie (SVG OrgChart + TeamEditor), Merkidentiteit, Kanalen, Doelgroep, Content, Strategie, Community, Middelen, SWOT
- Externe analyse: Concurrentie (radardiagram + vergelijkingstabel), Samenwerkingen, Markt/Scene, Doelgroepgedrag, Trends
- Persona Creator: 3 standaard + optionele conflictpersona via Anthropic API (4 tabs per kaart)
- AI SWOT: parallelle analyse naast handmatige SWOT (gestructureerde kaartjes)
- LocalStorage persistentie met automatische migratie

### WeekFlow/weekflow.html — Features actief
- Startpagina met twee navigatiekaartjes
- 3-staps wizard: werkrooster (14 dagen) → categorieën → overzicht
- Kalender: volledig schermvullende weekweergave met drag & drop
  - Sidebar met sleepbare categorie-tegels
  - 24-uur tijdrooster, 7 dagkolommen, past exact op scherm
  - Werkshifts automatisch gerenderd (gestreept patroon)
  - Blokken toevoegen/verplaatsen/bewerken/verwijderen via drag & drop + popover
  - Overlappingsdetectie (blokken + shifts)
  - Horizon-overlay voor weken > 14 dagen vooruit
  - Onderbalk met statistieken
- AI-planning: toast "komt binnenkort" (nog te implementeren)
- LocalStorage persistentie (keys: weekflow_weeks/blocks/categories/workshifts/settings)

### Tech stack
- **marketing-analyse.html**: React 18 (UMD), Tailwind CSS (CDN), Babel Standalone, Anthropic API
- **WeekFlow**: Vanilla JS SPA, localStorage, geen build tool, geen dependencies
