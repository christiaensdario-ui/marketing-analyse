# WeekFlow

Lokale weekplanner met AI-planning via de Anthropic API.

## Vereisten

- Node.js 18 of hoger
- Een Anthropic API-sleutel

## Starten

1. Stel je API-sleutel in als omgevingsvariabele:

   **Windows (Command Prompt)**
   ```
   set ANTHROPIC_API_KEY=sk-ant-...
   ```

   **Windows (PowerShell)**
   ```
   $env:ANTHROPIC_API_KEY="sk-ant-..."
   ```

   **macOS / Linux**
   ```
   export ANTHROPIC_API_KEY=sk-ant-...
   ```

2. Start de server vanuit de `WeekFlow` map:

   ```
   node server.js
   ```

   Of via npm:

   ```
   npm start
   ```

3. Open de app in je browser:

   ```
   http://localhost:3000
   ```

## Hoe het werkt

De server doet twee dingen:

- `GET /` — serveert `weekflow.html`
- `POST /api/chat` — proxyt verzoeken naar de Anthropic API en voegt de API-sleutel
  toe aan de headers (zodat de sleutel nooit in de browser terechtkomt)
