# Skyrise Furniture - Angular E-commerce Project

## Project Overview

Create a modern, responsive furniture e-commerce listing page using Angular, featuring an elegant product grid with functional filtering capabilities and Docker containerization.

## 🎯 Core Requirements

### Product Display
- **Product Grid**: Responsive grid layout showing furniture products
- **Product Cards**: Individual cards for each product containing:
  - Product title
  - Product price
  - Product image/photo
  - Hover interactions and visual feedback

### Filtering System
- **Category Filters**: Visual filter sidebar (can be non-functional for MVP)
- **Price Range Filter**: **MUST be functional** with:
  - Interactive price range slider/input
  - Real-time filtering of product list
  - State persistence during user interaction
  - Dynamic update of displayed products

### Responsive Design
- **Mobile-first approach**: Optimized for all screen sizes
- **Breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Flexible Layout**: Elements should adapt gracefully to different screen sizes

### Containerization
- **Docker**: Complete Dockerfile for production deployment
- **Production-ready**: Optimized build with nginx or similar web server

## 🎨 Design System Specifications

### Color Palette
```css
Primary: #1E1E1E
Secondary: #5A5A5A
Background: #FFFFFF
Surface: #FFFFFF
Border: #E6E6E6
Light Background: #F5F5F5

Accent Colors:
- Light Blue: #D4E2E8
- Pink: #FADADD
- Sky Blue: #D9EEFF
- Light Green: #D4EDDA
- Pale Green: #EAF6E3
- Light Purple: #DFDBF0
```

### Typography
- **Font Family**: 'Manrope', sans-serif
- **Logo**: 24px, 700 weight
- **Main Heading**: 80px, 800 weight
- **Section Heading**: 48px, 700 weight
- **Product Name**: 18px, 500 weight
- **Product Price**: 16px, 400 weight, #5A5A5A color
- **Body Text**: 16px, 400 weight
- **Small Text**: 14px, 400 weight

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px
- **xxxl**: 64px

### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 16px
- **Full**: 9999px (circular)

### Component Styles
#### Buttons
- **Primary**: #1E1E1E background, white text, 8px radius, 12px 24px padding
- **Secondary**: White background, #5A5A5A text, #E6E6E6 border, 20px radius, 8px 16px padding
- **Icon**: #1E1E1E background, white text, circular, 40px × 40px

#### Cards
- **Background**: #FFFFFF
- **Border Radius**: 16px
- **Padding**: 16px
- **Shadow**: 0px 4px 12px rgba(0, 0, 0, 0.05)

## 🏗️ Technical Architecture

### Project Structure
```
skyrise-furniture/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── product-card/
│   │   │   │   ├── product-card.component.ts
│   │   │   │   ├── product-card.component.html
│   │   │   │   ├── product-card.component.scss
│   │   │   │   └── product-card.component.spec.ts
│   │   │   ├── product-filter/
│   │   │   │   ├── product-filter.component.ts
│   │   │   │   ├── product-filter.component.html
│   │   │   │   ├── product-filter.component.scss
│   │   │   │   └── product-filter.component.spec.ts
│   │   │   ├── product-grid/
│   │   │   │   ├── product-grid.component.ts
│   │   │   │   ├── product-grid.component.html
│   │   │   │   ├── product-grid.component.scss
│   │   │   │   └── product-grid.component.spec.ts
│   │   │   ├── header/
│   │   │   └── layout/
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   └── filter.service.ts
│   │   ├── models/
│   │   │   ├── product.interface.ts
│   │   │   └── filter.interface.ts
│   │   ├── pages/
│   │   │   └── product-listing/
│   │   ├── shared/
│   │   │   ├── pipes/
│   │   │   └── directives/
│   │   └── styles/
│   │       ├── _variables.scss
│   │       ├── _mixins.scss
│   │       ├── _typography.scss
│   │       └── globals.scss
│   ├── assets/
│   │   ├── images/
│   │   │   └── products/
│   │   └── icons/
│   └── environments/
├── Dockerfile
├── .dockerignore
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

### Data Models

#### Product Interface (Updated for FakeStoreAPI)
```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCategory {
  name: string;
  value: string;
}
```

#### Filter Interface (Updated for FakeStoreAPI)
```typescript
interface ProductFilter {
  categories: ProductCategory[];
  selectedCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  currentPriceRange: {
    min: number;
    max: number;
  };
  sortOrder: 'asc' | 'desc' | null;
}
```

## 🌐 API Integration - FakeStoreAPI

### API Base URL
```
https://fakestoreapi.com
```

### Available Endpoints
- **All Products**: `GET /products`
- **Single Product**: `GET /products/{id}`
- **Categories**: `GET /products/categories`
- **Products by Category**: `GET /products/category/{category}`
- **Limit Results**: `GET /products?limit={number}`
- **Sort Results**: `GET /products?sort=asc|desc`

### API Response Structure
```typescript
// Single Product Response
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}

// Categories Response
["electronics", "jewelery", "men's clothing", "women's clothing"]
```

### Service Implementation Requirements
```typescript
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://fakestoreapi.com';

  // Required methods:
  getAllProducts(): Observable<Product[]>
  getProductById(id: number): Observable<Product>
  getCategories(): Observable<string[]>
  getProductsByCategory(category: string): Observable<Product[]>
  getProductsWithLimit(limit: number): Observable<Product[]>
  getSortedProducts(sort: 'asc' | 'desc'): Observable<Product[]>
}

## 🚀 Functional Requirements

## 🚀 Functional Requirements (Updated for FakeStoreAPI)

### API Integration
1. **Service Layer**: Create ProductService to handle all API calls
2. **Error Handling**: Implement proper error handling and user feedback
3. **Loading States**: Show loading spinners/skeletons during API calls
4. **Caching**: Implement basic caching to avoid unnecessary API calls
5. **Offline Handling**: Basic offline state detection and messaging

### Filtering System
1. **Price Range**: 
   - Calculate dynamic min/max from API data
   - Client-side filtering after fetching products
   - Smooth range slider with live updates
2. **Category Filtering**:
   - Fetch categories from API endpoint
   - Visual category buttons/checkboxes
   - Multi-select functionality
   - Integration with API category endpoints
3. **Combined Filtering**: 
   - Combine price and category filters
   - Reset functionality
   - Filter state persistence

### Product Display
1. **Grid Layout**: Responsive product grid
2. **Product Cards**: Clean card design matching your specifications
3. **Image Handling**: Lazy loading, fallback images, proper sizing
4. **Price Formatting**: Consistent currency formatting
5. **Rating Display**: Show rating stars and count from API data

### Performance Requirements
1. **Fast Loading**: Optimized images and lazy loading
2. **Smooth Filtering**: Debounced filter updates (300ms)
3. **SEO Friendly**: Proper meta tags and semantic HTML
4. **Bundle Optimization**: Code splitting and lazy loading modules
5. **API Optimization**: Minimize API calls through smart caching

### Responsive Behavior
1. **Mobile**: Single column grid, collapsible filter sidebar
2. **Tablet**: 2-3 column grid, side-by-side filters
3. **Desktop**: 3-4 column grid, full sidebar with filters

### Environment Configuration
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://fakestoreapi.com'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://fakestoreapi.com'
};
```

### HTTP Client Setup
```typescript
// app.module.ts or main.ts (for standalone)
import { HttpClientModule } from '@angular/common/http';

// Add HttpClientModule to imports
```

### Error Handling
```typescript
// Implement proper error handling for API calls
// Handle network errors, API timeouts, and invalid responses
// Show user-friendly error messages
// Implement retry logic for failed requests
```

## 🐳 Docker Requirements

### Dockerfile Specifications
- **Base Image**: Node.js for building, nginx for serving
- **Multi-stage Build**: Separate build and production stages
- **Optimized Size**: Minimal production image
- **Port Configuration**: Expose port 80 for web traffic
- **Environment Variables**: Support for different environments

### Docker Configuration
```dockerfile
# Example structure (detailed implementation needed)
FROM node:18-alpine AS builder
# Build stage

FROM nginx:alpine AS production
# Production stage with nginx
```

## 🧪 Testing Requirements

### Unit Tests
- Component testing for all major components
- Service testing for filtering logic
- Pipe testing for any custom pipes

### Integration Tests
- Filter functionality end-to-end
- Responsive behavior testing
- User interaction flows

## 📱 UI/UX Features

### Interactive Elements
- **Hover Effects**: Product cards with subtle animations
- **Loading States**: Skeleton loaders for products
- **Empty States**: Graceful handling when no products match filters
- **Visual Feedback**: Active filter states and selection indicators

### Accessibility
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **ARIA Labels**: Proper labeling for screen readers
- **Color Contrast**: Meet WCAG 2.1 AA standards
- **Focus Management**: Clear focus indicators

## 🔧 Development Guidelines

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Consistent code formatting
- **Component Architecture**: Single responsibility principle
- **State Management**: Reactive patterns with RxJS

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari 14+, Chrome Mobile 90+

## 📋 Deliverables Checklist (Updated)

### Core Functionality
- [ ] Angular project with proper structure and routing
- [ ] ProductService with all FakeStoreAPI integrations
- [ ] Product listing page with responsive grid layout
- [ ] Functional price range filter with dynamic min/max
- [ ] Category filter using real API categories
- [ ] Combined filtering (price + category)
- [ ] Loading states and error handling
- [ ] Responsive design for all screen sizes (mobile, tablet, desktop)

### Technical Implementation
- [ ] TypeScript interfaces matching FakeStoreAPI structure
- [ ] HTTP client setup with proper error handling
- [ ] Service layer with caching strategy
- [ ] Component architecture following Angular best practices
- [ ] RxJS observables for reactive programming
- [ ] Debounced filtering for performance

### UI/UX Implementation
- [ ] Design system implementation matching JSON specifications
- [ ] Product cards with title, price, image, rating, and description
- [ ] Interactive filter sidebar
- [ ] Responsive grid layout
- [ ] Loading skeletons/spinners
- [ ] Empty states and error messages
- [ ] Smooth hover effects and transitions

### Quality Assurance
- [ ] Clean, maintainable Angular code with TypeScript
- [ ] Basic unit tests for components and services
- [ ] ESLint configuration and code formatting
- [ ] Proper component structure and separation of concerns
- [ ] Accessibility considerations (ARIA labels, keyboard navigation)

### Deployment
- [ ] Docker configuration for deployment
- [ ] Production build optimization
- [ ] Environment configuration for different stages
- [ ] Documentation and README with API integration details

### Bonus Features (Optional)
- [ ] Search functionality
- [ ] Sorting options (price, rating, alphabetical)
- [ ] Product detail view/modal
- [ ] Wishlist functionality (local storage)
- [ ] Shopping cart integration
- [ ] Progressive Web App (PWA) features

## 🎯 Success Criteria

1. **Visual Match**: UI matches the provided design reference
2. **Functional Filtering**: Price filter works correctly
3. **Responsive Design**: Works seamlessly on all device sizes
4. **Performance**: Fast loading and smooth interactions
5. **Code Quality**: Clean, maintainable Angular code
6. **Containerization**: Successfully runs in Docker container

---

**Note**: This project serves as a foundation for a larger e-commerce platform. Focus on creating scalable, maintainable code that can be extended with additional features like shopping cart, user authentication, and payment processing.