# Skyrise Furniture - E-commerce Applications

This project consists of two separate e-commerce applications demonstrating modern web development practices:

1. **Angular Application** - Product listing page with filtering
2. **Next.js Application** - Product detail page with SSR

## 🚀 Quick Start

Run both applications with a single command:

```bash
docker compose up --build
```

Access the applications:
- Angular (Product Listing): http://localhost:4200
- Next.js (Product Detail): http://localhost:3000

## 📋 Project Structure

```
skyrise-furniture/
├── skyrise-furniture/          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # UI components with BEM CSS
│   │   │   ├── store/         # NgRx state management
│   │   │   ├── services/      # API services
│   │   │   └── models/        # TypeScript interfaces
│   │   └── styles/            # Global styles
│   ├── Dockerfile
│   └── package.json
│
├── skyrise-furniture-nextjs/   # Next.js application  
│   ├── src/
│   │   ├── app/
│   │   │   └── product/[id]/  # Dynamic product pages
│   │   ├── components/        # UI components with BEM CSS modules
│   │   ├── lib/              # API client & Zustand store
│   │   └── types/            # TypeScript types
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml         # Orchestration for both apps
```

## 🏗️ Architecture

### Angular Application
- **Framework**: Angular 18 with standalone components
- **State Management**: NgRx for centralized state
- **Styling**: CSS with BEM methodology
- **Font**: Manrope
- **Features**:
  - Responsive product grid
  - Functional price range filter
  - Category filters
  - Product search
  - Add to cart functionality

### Next.js Application
- **Framework**: Next.js 14 with App Router
- **Rendering**: Server-Side Rendering (SSR)
- **State Management**: Zustand for client state
- **Styling**: CSS Modules with BEM methodology
- **Font**: Inter
- **Features**:
  - Dynamic product pages
  - Image gallery with thumbnails
  - Quantity counter
  - Color selector
  - Rating display
  - Buy now functionality

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose (for containerized deployment)

### Angular Development

```bash
cd skyrise-furniture
npm install
npm start
```

Visit http://localhost:4200

### Next.js Development

```bash
cd skyrise-furniture-nextjs
npm install
npm run dev
```

Visit http://localhost:3000

## 🔧 API Integration

Both applications integrate with [FakeStoreAPI](https://fakestoreapi.com):

- Base URL: `https://fakestoreapi.com`
- Endpoints used:
  - `/products` - Get all products
  - `/products/{id}` - Get single product
  - `/products/categories` - Get categories

## 🎨 Design Systems

### Angular App (design-system.json)
- Primary Color: #1E1E1E
- Font: Manrope
- Clean, minimal design with card-based layout

### Next.js App (design-system2.json)
- Primary Color: #1E1E1E
- Font: Inter
- Modern product detail design with interactive elements

## 🐳 Docker Configuration

Each application has its own optimized Dockerfile:

### Build Individual Images

```bash
# Angular
docker build -t skyrise-angular ./skyrise-furniture

# Next.js
docker build -t skyrise-nextjs ./skyrise-furniture-nextjs
```

### Run with Docker Compose

```bash
# Build and start both applications
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

## 📦 Production Build

### Angular
```bash
cd skyrise-furniture
npm run build
# Output: dist/skyrise-furniture/
```

### Next.js
```bash
cd skyrise-furniture-nextjs
npm run build
# Output: .next/
```

## 🧪 Testing

### Angular
```bash
cd skyrise-furniture
npm test
```

### Next.js
```bash
cd skyrise-furniture-nextjs
npm test
```

## 📝 Key Features Implemented

### Angular Application ✅
- [x] Responsive product grid
- [x] Product cards with images, titles, and prices
- [x] NgRx state management
- [x] BEM CSS methodology
- [x] Functional price range filter
- [x] Category filters
- [x] Mobile responsive design
- [x] Docker production build

### Next.js Application ✅
- [x] Server-side rendering (SSR)
- [x] Dynamic routing `/product/[id]`
- [x] Zustand state management
- [x] BEM CSS methodology with modules
- [x] Quantity counter component
- [x] Color selector component
- [x] Rating display
- [x] Responsive design
- [x] Docker production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for technical assessment purposes.

## 🙏 Acknowledgments

- [FakeStoreAPI](https://fakestoreapi.com) for providing the product data
- Angular and Next.js teams for excellent frameworks
- Design inspiration from modern e-commerce platforms