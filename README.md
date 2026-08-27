# Sasidharan N — Portfolio

A responsive, animated personal portfolio built with plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies to install.

## Structure

```
portfolio/
├── index.html      Page structure and content
├── style.css        All styling, layout, responsive rules, animations
├── script.js         Scroll reveals, navbar behavior, lightbox, contact form
├── assets/
│   └── profile.jpg  Hero photo
└── README.md
```

## Running it locally

No build tools needed. Either:
- Double-click `index.html` to open it directly in a browser, or
- Serve it locally so relative paths and the contact form behave exactly like production:
  ```bash
  cd portfolio
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

## Editing content

- **Text and sections** — edit `index.html` directly; content is in plain, commented HTML blocks (Hero, About, Skills, Projects, Experience, Education, Achievements, Contact).
- **Colors and layout** — all design tokens (colors, fonts, spacing) are CSS variables at the top of `style.css` inside `:root { }`. Change a value there and it updates everywhere.
- **Photo** — replace `assets/profile.jpg` with a new image of the same filename, or update the `src` in `index.html` (search for `assets/profile.jpg`).
- **Behavior** — scroll animations, the mobile menu, the lightbox, and the contact form logic all live in `script.js`.

## Contact form (Web3Forms — works on any host, including Vercel)

The form posts to **Web3Forms**, a free form-to-email API that works no matter where the static site is hosted (Vercel, Netlify, GitHub Pages, anywhere) — no backend code needed.

**Before deploying, you must get a free access key:**

1. Go to **web3forms.com** and enter your email — no account/signup required.
2. You'll instantly get an access key emailed to you (looks like `a1b2c3d4-...`).
3. Open `index.html`, find this line near the Contact section:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real key and save.

Once that's done, every message submitted through the form is emailed straight to the inbox you registered with Web3Forms — no dashboard, no extra setup.

## Hosting for free (Vercel)

1. Push this project to a GitHub repo (see the Git steps below if you haven't already).
2. Go to **vercel.com** and sign up free — "Continue with GitHub" is easiest.
3. Click **Add New → Project**, select your `portfolio` repo, and import it.
4. Framework preset: choose **Other** (this is a plain static site, no build step). Leave build command and output directory blank.
5. Click **Deploy** — Vercel gives you a live URL immediately, e.g. `https://portfolio-yourname.vercel.app`.
6. Optional: **Project Settings → Domains** to rename it or connect a custom domain.

Every `git push` to your GitHub repo after this automatically redeploys the live site.

## Pushing to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

