# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ⚠️ **Development Guidelines (MANDATORY)**

This project enforces strict styling guidelines to maintain consistency and architectural integrity.

**When using Microsoft Copilot, VS Code, or other IDEs:**
- See `.cursorrules` for complete styling guidelines
- **NEVER use inline Tailwind classes** outside of `src/components/ui/`
- **ALWAYS use UI components** from `src/components/ui/` for styling
- **ALWAYS import components** from the UI system for typography, layout, cards, buttons, etc.

### Quick Reference:
```tsx
// ❌ NEVER do this
<div className="bg-white rounded-lg shadow-md p-6">
<h1 className="text-3xl font-bold text-center">
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg">

// ✅ ALWAYS do this  
<CardComponent id="my-card" variant="default">
<H1Component id="my-title" variant="page" align="center">
<ButtonComponent id="my-button" variant="primary">
```

### UI Component Import Pattern:
```tsx
import { 
  CardComponent, 
  H1Component, 
  ButtonComponent, 
  SectionComponent,
  TextComponent 
} from '../ui'
```

**📖 For complete guidelines:** See `.cursorrules` file in the project root.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
