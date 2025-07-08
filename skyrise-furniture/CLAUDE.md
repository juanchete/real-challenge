# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 18 e-commerce application for Skyrise Furniture. The project uses standalone components (no NgModules) and follows modern Angular best practices with TypeScript strict mode enabled.

## Essential Commands

### Development
- `npm start` - Start development server at http://localhost:4200/
- `npm run build` - Build production bundle to dist/skyrise-furniture/
- `npm run watch` - Build and watch for changes in development mode
- `npm test` - Run unit tests with Karma

### Angular CLI Commands
- `ng generate component components/component-name` - Generate new component
- `ng generate service services/service-name` - Generate new service
- `ng serve --port 4201` - Run dev server on different port
- `ng test --watch=false` - Run tests once without watching

## Architecture & Key Implementation Details

### API Integration (FakeStoreAPI)
The project integrates with FakeStoreAPI (https://fakestoreapi.com) for product data:
- Base URL: `https://fakestoreapi.com`
- Key endpoints: `/products`, `/products/categories`, `/products/category/{category}`
- Products have: id, title, price, description, category, image, rating

### Core Feature Requirements
1. **Functional Price Range Filter** - Must be implemented with real-time filtering
2. **Responsive Product Grid** - Mobile (1 col), Tablet (2-3 cols), Desktop (3-4 cols)
3. **Product Categories**: electronics, jewelery, men's clothing, women's clothing
4. **Design System**: Uses Manrope font, specific color palette in design-system.json

### Project Structure Pattern
```
src/app/
  components/         # UI components (product-card, product-filter, product-grid, header)
  services/          # Business logic (product.service.ts, filter.service.ts)
  models/            # TypeScript interfaces (product.interface.ts, filter.interface.ts)
  pages/             # Page components (product-listing)
  styles/            # Global SCSS (_variables.scss, _mixins.scss, _typography.scss)
```

### TypeScript Configuration
- Strict mode is enabled with all strict checks
- Target: ES2022
- Standalone components pattern (no modules)

### Styling Approach
- SCSS preprocessor
- Design tokens from design-system.json should be converted to SCSS variables
- Mobile-first responsive design
- Global styles in src/styles.scss, component styles in .component.scss files

### Testing Strategy
- Unit tests with Karma/Jasmine
- Test files: *.spec.ts
- Run specific test: `ng test --include='**/component-name.spec.ts'`

## Docker Deployment
The project requires a multi-stage Dockerfile:
1. Build stage: Node.js image for Angular build
2. Production stage: nginx:alpine for serving static files