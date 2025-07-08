# Skyrise Furniture

A modern, responsive furniture e-commerce listing page built with Angular 18, featuring an elegant product grid with functional filtering capabilities and Docker containerization.

## 🚀 Features

- **Product Grid**: Responsive layout showcasing furniture products from FakeStoreAPI
- **Functional Price Range Filter**: Real-time filtering with dual sliders
- **Category Filters**: Filter products by categories
- **Color Filters**: Visual color selection
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: User-friendly error messages
- **BEM CSS Methodology**: Clean and maintainable styling
- **TypeScript Strict Mode**: Type-safe code
- **Docker Support**: Production-ready containerization

## 🛠️ Tech Stack

- **Angular 18** with standalone components
- **TypeScript** with strict mode
- **RxJS** for reactive programming
- **CSS** with BEM methodology
- **Docker** & **nginx** for production deployment
- **FakeStoreAPI** for product data

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker (optional, for containerized deployment)

## 🏃‍♂️ Getting Started

### Development Server

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Navigate to `http://localhost:4200/`

The application will automatically reload if you change any of the source files.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/skyrise-furniture` directory.

## 🐳 Docker Deployment

### Using Docker

1. Build the Docker image:
```bash
docker build -t skyrise-furniture .
```

2. Run the container:
```bash
docker run -p 8080:80 skyrise-furniture
```

3. Navigate to `http://localhost:8080/`

### Using Docker Compose

1. Build and start the container:
```bash
docker-compose up --build
```

2. Navigate to `http://localhost:8080/`

To stop the container:
```bash
docker-compose down
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/         # Navigation header
│   │   ├── product-card/   # Individual product display
│   │   ├── product-filter/ # Sidebar filters
│   │   └── product-grid/   # Product grid layout
│   ├── models/             # TypeScript interfaces
│   ├── pages/              # Page components
│   │   └── product-listing/
│   ├── services/           # Business logic
│   │   ├── product.service.ts
│   │   └── filter.service.ts
│   └── styles/             # Global styles
├── assets/                 # Static assets
└── environments/           # Environment configs
```

## 🧪 Running Tests

### Unit Tests
```bash
npm test
```

### Linting
```bash
ng lint
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🎨 Design System

The project uses a custom design system with:
- **Colors**: Primary (#1E1E1E), Secondary (#5A5A5A)
- **Typography**: Manrope font family
- **Spacing**: 4px base unit system
- **Components**: Cards, buttons, form elements

## 🔧 Configuration

### Environment Variables

Configure API endpoints in `src/environments/`:
- `environment.ts` - Development
- `environment.prod.ts` - Production

## 📄 License

This project is part of a technical challenge.
