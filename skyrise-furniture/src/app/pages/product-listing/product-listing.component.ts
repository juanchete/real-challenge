import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ProductFilterComponent,
    ProductGridComponent
  ],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  displayedProductsCount = 0;
  totalProductsCount = 0;
  isLoading = true;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToProductChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all products
   */
  private loadProducts(): void {
    this.isLoading = true;
    
    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.allProducts = products;
          this.totalProductsCount = products.length;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Subscribe to product count changes from grid
   */
  private subscribeToProductChanges(): void {
    // You could add a service to track displayed products count
    // For now, we'll update this when filters change
    this.filterService.filterState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // This will be updated by the product grid component
        this.updateProductCount();
      });
  }

  /**
   * Update product count based on filters
   */
  private updateProductCount(): void {
    const filterState = this.filterService.getCurrentState();
    
    let filteredCount = this.allProducts.filter(product => {
      // Category filter
      if (filterState.categoryFilters.length > 0) {
        if (!filterState.categoryFilters.includes(product.category)) {
          return false;
        }
      }

      // Price filter
      if (product.price < filterState.priceFilter.min || 
          product.price > filterState.priceFilter.max) {
        return false;
      }

      return true;
    }).length;

    this.displayedProductsCount = filteredCount;
  }

  /**
   * Handle filters changed event
   */
  onFiltersChanged(): void {
    this.updateProductCount();
  }

  /**
   * Handle product click event
   */
  onProductClick(product: Product): void {
    // In a real app, you would navigate to product detail page
    console.log('Product clicked:', product);
    // Example: this.router.navigate(['/product', product.id]);
  }

  /**
   * Handle add to cart event
   */
  onAddToCart(product: Product): void {
    // In a real app, you would add to cart service
    console.log('Added to cart:', product);
    // Example: this.cartService.addItem(product);
    
    // You could show a toast notification here
    alert(`${product.title} added to cart!`);
  }

  /**
   * Handle clear filters event
   */
  onClearFilters(): void {
    this.filterService.resetFilters();
  }
}