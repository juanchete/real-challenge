# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo containing two e-commerce applications:
- *Angular app* in /skyrise-furniture/ - Product listing page with filtering
- *Next.js app* in /skyrise-furniture-nextjs/ - Product detail pages with SSR

Both integrate with FakeStoreAPI (https://fakestoreapi.com).

## Common Development Commands

### Angular Application (skyrise-furniture/)
bash
cd skyrise-furniture
npm install              # Install dependencies
npm start               # Start dev server on http://localhost:4200
npm run build           # Production build
npm test                # Run tests


### Next.js Application (skyrise-furniture-nextjs/)
bash
cd skyrise-furniture-nextjs
npm install              # Install dependencies
npm run dev             # Start dev server on http://localhost:3000
npm run build           # Production build
npm run lint            # Run ESLint


### Docker Commands
bash
# Run both applications
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down


## Architecture Overview

### Angular App Architecture
- *State Management*: NgRx with four feature stores
  - store/cart/: Shopping cart management
  - store/filters/: Product filtering state
  - store/products/: Product data and API integration
  - store/ui/: UI state (loading, errors)
- *Components*: Follow standalone component pattern
- *Services*: API integration in services/
- *Styling*: CSS with BEM methodology

### Next.js App Architecture
- *Routing*: App Router with dynamic routes /product/[id]
- *State Management*: Zustand store in lib/store.ts
- *API*: Client in lib/api.ts with server-side data fetching
- *Components*: React 19 with TypeScript
- *Styling*: CSS Modules with BEM methodology

### Key Technical Details
- *API Endpoints*: 
  - GET /products - List all products
  - GET /products/{id} - Product details
  - GET /products/categories - Categories list
- *Shared Design*: Both apps use consistent color schemes and typography
- *Docker*: Multi-stage builds with production optimizations
- *TypeScript*: Strict typing in both applications

### Important Files
- /specs/specs.md - Detailed technical specifications
- /docker-compose.yml - Container orchestration
- Design systems: skyrise-furniture/design-system.json and skyrise-furniture-nextjs/design-system.json

When making changes:
1. Follow existing patterns (NgRx for Angular, Zustand for Next.js)
2. Maintain BEM CSS naming conventions
3. Ensure TypeScript types are properly defined
4. Test API integration against FakeStoreAPI endpoints
5. Check Docker builds after significant changes