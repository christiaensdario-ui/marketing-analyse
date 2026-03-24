# WeekFlow

Lokale weekplanner met AI-planning via de Anthropic API.

## Deployen op Netlify

1. Verbind deze repository met Netlify (via de Netlify-dashboard of CLI)
2. Stel de omgevingsvariabele in via **Site settings → Environment variables**:
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```
3. Deploy — Netlify detecteert `netlify.toml` automatisch

De redirect `/api/chat → /.netlify/functions/chat` zorgt dat de API-sleutel
nooit in de browser terechtkomt.

## Lokaal draaien (Netlify CLI)

```
npm install -g netlify-cli
ANTHROPIC_API_KEY=sk-ant-... netlify dev
```

Open: `http://localhost:8888`

## Projectstructuur

```
WeekFlow/
  index.html               # de app
  netlify.toml             # build- en redirectconfiguratie
  netlify/
    functions/
      chat.js              # serverless proxy naar Anthropic API
  server.js                # alternatief: standalone Node.js server
  package.json
```
