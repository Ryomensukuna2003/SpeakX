# React + Vite + shadcn/ui Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. It comes pre-configured with shadcn/ui components and includes a basic navbar setup.

## Features

- ⚡️ Vite for fast development and building
- ⚛️ React 18
- 🎨 shadcn/ui for beautiful, customizable UI components
- 🧭 Pre-configured navbar component
- 🔧 ESLint configured for code quality

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm or yarn

### Installation

1. Clone this repository:
   ```
   https://github.com/Ryomensukuna2003/Shadcn-Template.git
   cd Shadcn-Template
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:5173` to see your app running.

## Project Structure

```
react-vite-shadcn-template/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── Navbar.tsx
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.json
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customizing shadcn/ui

This template uses shadcn/ui components. To customize the theme or add more components:

1. Modify the global CSS file in `src/index.css`.
2. Use the shadcn/ui CLI to add more components:
   ```
   npx shadcn-ui add [component-name]
   ```

## Adding Pages and Routing

This template doesn't include a router by default. To add routing:

1. Install your preferred routing library (e.g., React Router).
2. Set up your routes in `App.tsx`.
3. Create new page components in the `src/pages/` directory.
