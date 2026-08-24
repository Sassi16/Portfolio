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

## Contact form

The form in the Contact section is wired to **Netlify Forms** — it works automatically once deployed to Netlify, with no backend code or API keys needed. See the hosting steps below.

## Hosting for free (Netlify)

1. Go to **netlify.com** and sign up (free — GitHub, Google, or email).
2. From your dashboard, find **Deploy manually** and drag the whole `portfolio` folder onto it (not just `index.html` — Netlify needs `style.css`, `script.js`, and `assets/` alongside it).
3. Netlify gives you a live URL immediately, e.g. `https://sasidharan-portfolio.netlify.app`.
4. Optional: **Site settings → Domain management** to rename your free subdomain, or connect a custom domain.
5. To get emailed when someone submits the contact form: **Site settings → Forms → Form notifications → Add notification → Email notification**, and enter your email.

To update the live site later, drag the updated folder onto the same site's deploy area again — it replaces everything instantly.
