# Health Hub

Privacy-first AI health decision assistant, powered by Claude and Mayo Clinic guidelines.

---

## Project Structure

```
health-hub/
├── api/
│   └── chat.js          ← Serverless API proxy (your API key lives here)
├── public/
│   └── index.html       ← The entire frontend app
├── vercel.json          ← Routing config
├── package.json
├── .env.example         ← Template for environment variables
└── .gitignore
```

**The key idea:** The frontend (`public/index.html`) never touches the
Anthropic API directly. It calls `/api/chat` — your own serverless function —
which holds the API key securely on the server.

---

## Deploy to Vercel (step by step)

### 1. Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free — sign up with GitHub)
- An [Anthropic API key](https://console.anthropic.com)
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
   | `ANTHROPIC_API_KEY` | `sk-ant-your-actual-key` |

5. Click **Deploy**

Vercel will give you a live URL like `https://health-hub-xyz.vercel.app` in ~30 seconds.

---

### 4. Run locally (optional)

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your real ANTHROPIC_API_KEY

npm run dev
# → App runs at http://localhost:3000
```

---

## Making changes

Edit `public/index.html` for any UI changes.
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
