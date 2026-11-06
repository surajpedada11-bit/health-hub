# Health Hub

Privacy-first, rule-based health decision assistant (MVP v5). Guidance logic is mapped to Mayo C## Project Structure

```
health-hub/
├── index.html           ← The whole app: assessment engine, profiles, chat UI
├── api/
│   └── chat.js          ← Serverless proxy to Gemini (API key stays on the server)
├── docs/
│   └── RULES.md         ← Every decision rule mapped to its Mayo Clinic source (review checklist)
├── vercel.json
├── package.json
└── .env.example
```

- The assessment runs entirely in the browser. Profiles and testing data are saved
  **only on the device** (localStorage).
- **Testing stats:** tap "📊 Testing stats" at the bottom of the home screen to see the PRD
  success metrics (clarity, reduced worry, time to result, abandonment) and export a CSV.
- Medical rules: see `docs/RULES.md` before changing any threshold.

---

less function —
which holds the API key securely on the server.

---

## Deploy to Vercel (step by step)

### 1. Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free — sign up with GitHub)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)
- [Node.js](https://nodejs.org) installed locally (v18+)

---

### 2. Put the project on GitHub

```bash
# Inside the health-hub folder:
git init
git add .
git commit -m "Initial Health Hub commit"
```

Then go to github.com → New Repository → name it `health-hub` → Create.
Copy the two commands GitHub shows you (they look like):

```bash
git remote add origin https://github.com/YOUR_USERNAME/health-hub.git
git push -u origin main
```

---

### 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"** and select your `health-hub` repo
3. Leave all build settings as-is (Vercel auto-detects everything)
4. Before clicking Deploy, click **"Environment Variables"** and add:

   | Name | Value |
   |------|-------|
   | `GEMINI_API_KEY` | `your-gemini-key` |

5. Click **Deploy**

Vercel will give you a live URL like `https://health-hub-xyz.vercel.app` in ~30 seconds.

---

### 4. Run locally (optional)

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your real GEMINI_API_KEY

npm run dev
# → App runs at http://localhost:3000
```

---

## Making changes

Edit `index.html` for any UI or rule changes (and update `docs/RULES.md`).
Edit `api/chat.js` to change AI behavior, add rate limiting, etc.

After changes:
```bash
git add .
git commit -m "describe your change"
git push
```
Vercel auto-redeploys on every push to `main`.

---

## Security notes

- Your API key is **only** in Vercel's encrypted environment variables
- It is **never** sent to the browser
- The `.gitignore` prevents `.env.local` from ever being committed
- For production, change the CORS `Access-Control-Allow-Origin` in `api/chat.js`
  from `*` to your actual domain (e.g. `https://health-hub-xyz.vercel.app`)
