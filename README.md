# Emeis Marketing Website

A professional, responsive marketing website for Emeis (elderly care / nursing homes) that rebuilds trust through transparency.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd emeis-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Deploy to GitHub Pages

#### Option 1: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages:
   ```bash
   npx gh-pages -d dist
   ```

#### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. In your repository settings, set GitHub Pages source to "gh-pages" branch.

### Base URL Configuration

For GitHub Pages with a project subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

## 🧪 A/B Testing

The site includes a built-in A/B testing framework. See [docs/ab-tests.md](docs/ab-tests.md) for details.

### Quick Usage

- Add URL params to force variants: `?exp_transparency=B&exp_reviews=B`
- Enable debug panel: `?debug=1`
- View analytics: `/debug/analytics`

## 📊 Analytics

All user interactions are tracked locally:

- Events logged to `console.log` and `localStorage`
- View all events at `/debug/analytics`
- Export events as JSON for analysis

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/         # Shared components (badges, headers)
│   ├── debug/          # Debug panel for A/B tests
│   ├── home/           # Homepage sections
│   ├── layout/         # Header, Footer, Layout
│   └── ui/             # shadcn/ui components
├── data/
│   └── mockData.ts     # JSON mock data
├── lib/
│   ├── analytics.ts    # Event tracking
│   ├── experiments.ts  # A/B testing framework
│   └── utils.ts        # Utility functions
├── pages/              # Route pages
└── index.css           # Design system tokens
```

## 🎨 Design System

Colors, typography, and spacing are defined in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind configuration

Key design tokens:
- `--primary` - Trust green (sage)
- `--warm-gold` - Accent for ratings/highlights
- `--calm-blue` - Secondary accent
- `--soft-coral` - Tertiary accent

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with all key sections |
| `/transparency` | Virtual tours, care tracking demo |
| `/reviews` | Filtered, verified family reviews |
| `/admission` | Guided checklist for admission |
| `/family-portal` | Family Trust Loop features |
| `/about-transformation` | Documentary-style story |
| `/debug/analytics` | Analytics debug view |

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (customized)
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📄 License

MIT License - See LICENSE file for details.
