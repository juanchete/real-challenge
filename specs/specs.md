# Skyrise Furniture - Complete Technical Test Specifications

## 🎯 Project Overview

This is a **dual-application technical test** requiring two separate e-commerce applications:

1. **Angular Application**: Product listing page with filtering capabilities
2. **Next.js Application**: Product detail page with SSR and interactive features
3. **Docker Compose**: Single command deployment for both applications

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

// Categories Response
["electronics", "jewelery", "men's clothing", "women's clothing"]
```

---

## 📱 Application 1: Angular Product Listing

### 🎨 Design System (Angular - First Image)
```json
{
  "colors": {
    "primary": "#1E1E1E",
    "secondary": "#5A5A5A",
    "background": "#FFFFFF",
    "surface": "#FFFFFF",
    "border": "#E6E6E6",
    "lightBackground": "#F5F5F5",
    "accent": {
      "lightBlue": "#D4E2E8",
      "pink": "#FADADD",
      "skyBlue": "#D9EEFF",
      "lightGreen": "#D4EDDA",
      "paleGreen": "#EAF6E3",
      "lightPurple": "#DFDBF0"
    }
  },
  "typography": {
    "fontFamily": "'Manrope', sans-serif",
    "product": {
      "name": { "fontSize": "18px", "fontWeight": 500 },
      "price": { "fontSize": "16px", "fontWeight": 400, "color": "#5A5A5A" }
    }
  },
  "components": {
    "card": {
      "backgroundColor": "#FFFFFF",
      "borderRadius": "16px",
      "padding": "16px",
      "boxShadow": "0px 4px 12px rgba(0, 0, 0, 0.05)"
    }
  }
}
```

### ✅ Angular Requirements

#### Core Features
- [x] **Product Grid**: Responsive grid layout for product listing
- [x] **Product Cards**: Each card must contain:
  - Product title
  - Product price
  - Product image
- [x] **Category Filters**: Visual filter sidebar (can be non-functional UI)
- [x] **Price Filter**: **FUNCTIONAL** price range filter with state management
- [x] **Responsive Design**: Mobile, tablet, desktop layouts
- [x] **State Management**: Use NgRx for state management
- [x] **CSS Methodology**: Use BEM (Block Element Modifier) methodology
- [x] **Dockerfile**: Individual Docker configuration

#### Technical Implementation
```typescript
// Required Angular Structure
src/
├── app/
│   ├── components/
│   │   ├── product-card/
│   │   │   ├── product-card.component.ts
│   │   │   ├── product-card.component.html
│   │   │   └── product-card.component.scss (BEM methodology)
│   │   ├── product-filter/
│   │   │   ├── product-filter.component.ts
│   │   │   ├── product-filter.component.html
│   │   │   └── product-filter.component.scss (BEM methodology)
│   │   ├── product-grid/
│   │   └── header/
│   ├── services/
│   │   └── product.service.ts
│   ├── store/ (NgRx)
│   │   ├── actions/
│   │   │   ├── product.actions.ts
│   │   │   └── filter.actions.ts
│   │   ├── reducers/
│   │   │   ├── product.reducer.ts
│   │   │   ├── filter.reducer.ts
│   │   │   └── index.ts
│   │   ├── effects/
│   │   │   └── product.effects.ts
│   │   ├── selectors/
│   │   │   ├── product.selectors.ts
│   │   │   └── filter.selectors.ts
│   │   └── models/
│   │       ├── product.model.ts
│   │       └── app.state.ts
│   ├── models/
│   │   └── product.interface.ts
│   └── pages/
│       └── product-listing/
├── styles/ (Global BEM styles)
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   └── main.scss
├── Dockerfile
└── package.json
```

#### NgRx State Management
```typescript
// store/models/app.state.ts
export interface AppState {
  products: ProductState;
  filters: FilterState;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

export interface FilterState {
  priceRange: { min: number; max: number };
  selectedCategories: string[];
  appliedPriceRange: { min: number; max: number };
}

// store/actions/product.actions.ts
export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

// store/actions/filter.actions.ts
export const setPriceRange = createAction(
  '[Filter] Set Price Range',
  props<{ min: number; max: number }>()
);
export const setSelectedCategories = createAction(
  '[Filter] Set Selected Categories',
  props<{ categories: string[] }>()
);
export const resetFilters = createAction('[Filter] Reset Filters');
```

#### BEM CSS Methodology
```scss
// product-card.component.scss
.product-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-card);
  
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius-md);
    
    &--loading {
      background-color: var(--color-light-background);
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
  
  &__content {
    padding: var(--spacing-md) 0 0 0;
  }
  
  &__title {
    font-size: var(--font-size-product-name);
    font-weight: var(--font-weight-medium);
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
    
    &--truncated {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  
  &__price {
    font-size: var(--font-size-product-price);
    font-weight: var(--font-weight-regular);
    color: var(--color-secondary);
  }
  
  &__category {
    font-size: var(--font-size-small);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--spacing-xs);
  }
  
  &--featured {
    border: 2px solid var(--color-accent-light-blue);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    transition: all var(--animation-duration-normal) var(--animation-easing-default);
  }
}

// product-filter.component.scss
.product-filter {
  background-color: var(--color-surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  
  &__section {
    margin-bottom: var(--spacing-xxl);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__title {
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
  }
  
  &__price-range {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  &__price-inputs {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
  }
  
  &__price-input {
    flex: 1;
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-regular);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(30, 30, 30, 0.1);
    }
  }
  
  &__category-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  &__category-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    cursor: pointer;
    
    &:hover {
      background-color: var(--color-light-background);
    }
    
    &--selected {
      background-color: var(--color-accent-light-blue);
    }
  }
  
  &__reset-button {
    width: 100%;
    padding: var(--spacing-md);
    background-color: var(--color-secondary);
    color: var(--color-surface);
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-regular);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    
    &:hover {
      background-color: var(--color-primary);
    }
  }
}
```

#### Filtering Logic (NgRx Integration)
1. **Price Filter with NgRx**: 
   - Range slider/inputs dispatching NgRx actions
   - Real-time filtering through NgRx selectors
   - State persistence in NgRx store
   - Filter applied to products in store

2. **Category Filter**:
   - Visual buttons for each category
   - NgRx actions for category selection
   - UI implementation (functionality optional)
   - Should match the design reference

```typescript
// Example NgRx integration in component
export class ProductGridComponent implements OnInit {
  products$ = this.store.select(selectFilteredProducts);
  loading$ = this.store.select(selectProductsLoading);
  priceRange$ = this.store.select(selectPriceRange);
  
  constructor(private store: Store<AppState>) {}
  
  ngOnInit() {
    this.store.dispatch(loadProducts());
  }
  
  onPriceRangeChange(min: number, max: number) {
    this.store.dispatch(setPriceRange({ min, max }));
  }
}
```

---

## 🔍 Application 2: Next.js Product Detail

### 🎨 Design System (Next.js - Second Image)
```json
{
  "colors": {
    "primary": "#1E1E1E",
    "secondary": "#5A5A5A",
    "background": "#FFFFFF",
    "surface": "#F8F9FA",
    "border": "#E6E6E6",
    "accent": {
      "lightBlue": "#B8D4E3",
      "teal": "#7EC8BD",
      "lightGreen": "#C8E6C9",
      "blue": "#6BA6CD"
    },
    "rating": {
      "star": "#FFD700",
      "starEmpty": "#E6E6E6"
    }
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif",
    "product": {
      "title": { "fontSize": "20px", "fontWeight": 600 },
      "price": { "fontSize": "18px", "fontWeight": 700 }
    }
  }
}
```

### ✅ Next.js Requirements

#### Core Features
- [x] **SSR**: Server-side rendering for product detail pages
- [x] **Dynamic Routing**: `/product/[id]` route structure
- [x] **Product Information**: Complete product details from API
- [x] **Quantity Counter**: Add/subtract product quantity
- [x] **Color Selector**: Functional color selection component
- [x] **Responsive Design**: Mobile, tablet, desktop layouts
- [x] **Zustand State Management**: Use Zustand for client-side state management
- [x] **CSS Methodology**: Use BEM (Block Element Modifier) methodology
- [x] **Dockerfile**: Individual Docker configuration

#### Technical Implementation
```typescript
// Required Next.js Structure
src/
├── app/
│   ├── product/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── page.module.scss (BEM methodology)
│   ├── components/
│   │   ├── ProductDetail/
│   │   │   ├── ProductDetail.tsx
│   │   │   └── ProductDetail.module.scss (BEM)
│   │   ├── QuantityCounter/
│   │   │   ├── QuantityCounter.tsx
│   │   │   └── QuantityCounter.module.scss (BEM)
│   │   ├── ColorSelector/
│   │   │   ├── ColorSelector.tsx
│   │   │   └── ColorSelector.module.scss (BEM)
│   │   └── Rating/
│   │       ├── Rating.tsx
│   │       └── Rating.module.scss (BEM)
│   ├── lib/
│   │   ├── api.ts
│   │   └── store.ts (Zustand store)
│   ├── styles/ (Global BEM styles)
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   ├── base.scss
│   │   └── globals.scss
│   └── types/
│       └── product.ts
├── Dockerfile
└── package.json
```

#### Zustand State Management
```typescript
// lib/store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ProductDetailState {
  // Product state
  product: Product | null;
  loading: boolean;
  error: string | null;
  
  // Interactive state
  selectedColor: string;
  quantity: number;
  selectedImage: string;
  
  // Actions
  setProduct: (product: Product) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedColor: (color: string) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  setQuantity: (quantity: number) => void;
  setSelectedImage: (imageUrl: string) => void;
  resetState: () => void;
}

const useProductDetailStore = create<ProductDetailState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        product: null,
        loading: false,
        error: null,
        selectedColor: '',
        quantity: 1,
        selectedImage: '',

        // Actions
        setProduct: (product) => set({ product, selectedImage: product.image }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        setSelectedColor: (selectedColor) => set({ selectedColor }),
        
        incrementQuantity: () => set((state) => ({ 
          quantity: Math.min(state.quantity + 1, 10) // Max 10 items
        })),
        
        decrementQuantity: () => set((state) => ({ 
          quantity: Math.max(state.quantity - 1, 1) // Min 1 item
        })),
        
        setQuantity: (quantity) => set({ 
          quantity: Math.max(1, Math.min(quantity, 10)) 
        }),
        
        setSelectedImage: (selectedImage) => set({ selectedImage }),
        
        resetState: () => set({
          product: null,
          loading: false,
          error: null,
          selectedColor: '',
          quantity: 1,
          selectedImage: ''
        })
      }),
      {
        name: 'product-detail-storage', // unique name for localStorage
        partialize: (state) => ({ 
          selectedColor: state.selectedColor,
          quantity: state.quantity 
        }) // Only persist user selections
      }
    ),
    {
      name: 'product-detail-store' // devtools name
    }
  )
);

export default useProductDetailStore;
```

#### BEM CSS Methodology (Next.js)
```scss
// components/ProductDetail/ProductDetail.module.scss
.productDetail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxxxl);
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  &__imageSection {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  &__mainImage {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: var(--radius-xl);
    background-color: var(--color-surface);
    
    &--loading {
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
  
  &__thumbnails {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
  }
  
  &__thumbnail {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: var(--radius-md);
    cursor: pointer;
    border: 2px solid transparent;
    
    &--active {
      border-color: var(--color-primary);
    }
    
    &:hover {
      border-color: var(--color-secondary);
    }
  }
  
  &__infoSection {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  &__category {
    font-size: var(--font-size-product-category);
    color: var(--color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: var(--font-weight-medium);
  }
  
  &__title {
    font-size: var(--font-size-product-title);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  
  &__rating {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  &__price {
    font-size: var(--font-size-product-price);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }
  
  &__description {
    font-size: var(--font-size-body-large);
    line-height: 1.6;
    color: var(--color-text-secondary);
  }
  
  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  &__optionGroup {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  &__optionLabel {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }
  
  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }
  
  &__quantityRow {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  &__buyButton {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-xl);
    background-color: var(--color-primary);
    color: var(--color-surface);
    border: none;
    border-radius: var(--radius-xxl);
    font-size: var(--font-size-body-large);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--animation-duration-normal) var(--animation-easing-default);
    
    &:hover {
      background-color: var(--color-secondary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

// components/QuantityCounter/QuantityCounter.module.scss
.quantityCounter {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  
  &__button {
    width: 40px;
    height: 40px;
    border: none;
    background-color: var(--color-surface);
    color: var(--color-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: var(--font-weight-medium);
    transition: all var(--animation-duration-fast) var(--animation-easing-default);
    
    &:hover {
      background-color: var(--color-light-background);
      color: var(--color-primary);
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    &--decrement {
      border-right: 1px solid var(--color-border);
    }
    
    &--increment {
      border-left: 1px solid var(--color-border);
    }
  }
  
  &__display {
    width: 60px;
    height: 40px;
    border: none;
    text-align: center;
    font-size: var(--font-size-body-regular);
    font-weight: var(--font-weight-medium);
    color: var(--color-primary);
    background-color: var(--color-surface);
  }
}

// components/ColorSelector/ColorSelector.module.scss
.colorSelector {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  
  &__option {
    width: var(--color-swatch-width);
    height: var(--color-swatch-height);
    border-radius: var(--radius-full);
    border: 2px solid var(--color-surface);
    cursor: pointer;
    position: relative;
    transition: all var(--animation-duration-fast) var(--animation-easing-default);
    box-shadow: var(--shadow-sm);
    
    &:hover {
      transform: scale(1.1);
      box-shadow: var(--shadow-md);
    }
    
    &--selected {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary);
    }
    
    &--lightBlue {
      background-color: var(--color-accent-light-blue);
    }
    
    &--teal {
      background-color: var(--color-accent-teal);
    }
    
    &--lightGreen {
      background-color: var(--color-accent-light-green);
    }
    
    &--blue {
      background-color: var(--color-accent-blue);
    }
  }
}
```

#### SSR Implementation
```typescript
// pages/product/[id].tsx or app/product/[id]/page.tsx
export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`);
  
  return {
    props: {
      product: await product.json()
    }
  };
}
```

#### Interactive Features
1. **Quantity Counter**:
   - Plus/minus buttons
   - Display current quantity
   - State managed with Zustand

2. **Color Selector**:
   - Color swatches (since API doesn't provide colors, use mock data)
   - Active state indication
   - State persistence

3. **Additional Information**:
   - Use API description field
   - Add mock data for features not in API (colors, specifications)

---

## 🐳 Docker Configuration

### Individual Dockerfiles

#### Angular Dockerfile
```dockerfile
# Angular Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/skyrise-angular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Next.js Dockerfile
```dockerfile
# Next.js Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  angular-app:
    build: ./angular-app
    ports:
      - "4200:80"
    container_name: skyrise-angular
    
  nextjs-app:
    build: ./nextjs-app
    ports:
      - "3000:3000"
    container_name: skyrise-nextjs
    environment:
      - NODE_ENV=production
```

---

## 📋 Complete Project Structure

```
skyrise-furniture/
├── angular-app/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── nextjs-app/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── README.md
└── scripts/
    └── password-encryption.js
```

## 🎯 Deliverables Checklist

### Angular Application
- [ ] Product listing page with responsive grid
- [ ] Product cards (title, price, image)
- [ ] **NgRx state management** for products and filters
- [ ] **BEM CSS methodology** for all component styles
- [ ] Functional price range filter with NgRx state
- [ ] Category filter UI (visual only)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Individual Dockerfile
- [ ] Manrope font implementation

### Next.js Application
- [ ] Product detail page with SSR
- [ ] Dynamic routing `/product/[id]`
- [ ] **Zustand state management** for client-side state
- [ ] **BEM CSS methodology** with CSS modules
- [ ] Quantity counter component
- [ ] Functional color selector
- [ ] Rating display component
- [ ] Responsive design
- [ ] Individual Dockerfile
- [ ] Inter font implementation

### Infrastructure
- [ ] Docker Compose configuration
- [ ] Single command deployment (`docker-compose up`)
- [ ] Both applications running simultaneously
- [ ] Angular on port 4200, Next.js on port 3000
- [ ] Production-ready builds

### Additional Requirements
- [ ] Password encryption script
- [ ] Public repository on GitHub/GitLab
- [ ] Complete README with setup instructions
- [ ] Code quality (ESLint, TypeScript)
- [ ] Error handling and loading states

## 🚀 Deployment Commands

```bash
# Single command to run both applications
docker-compose up --build

# Access applications
# Angular: http://localhost:4200
# Next.js: http://localhost:3000
```

## 🎨 Design Implementation Notes

### Angular (First Image)
- Clean, minimal design with Manrope font
- Product grid with card shadows
- Left sidebar with filters
- Neutral color palette with accent colors
- Category filter buttons and price range slider

### Next.js (Second Image)
- More detailed product view with Inter font
- Large product image with thumbnails
- Quantity counter and color selector
- Star rating system
- Additional information sections
- "Buy Now" call-to-action button

## 📝 Technical Notes

1. **API Limitations**: Since FakeStoreAPI doesn't include colors, implement mock color data for the Next.js color selector
2. **State Management**: Angular uses NgRx/Services, Next.js uses Zustand
3. **Responsive**: Both applications must work on mobile, tablet, and desktop
4. **Production Ready**: Both Dockerfiles should create optimized production builds
5. **Font Loading**: Implement proper font loading for Manrope (Angular) and Inter (Next.js)

This specification provides a complete roadmap for implementing both applications according to the technical test requirements.