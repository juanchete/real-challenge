import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { FilterState } from '../../models/filter.interface';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit, OnDestroy {
  @Input() productsPerPage = 12;
  @Output() productClick = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() clearFilters = new EventEmitter<void>();

  products: Product[] = [];
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  isLoadingMore = false;
  error: string | null = null;
  hasMore = false;
  currentPage = 1;
  loadingSkeletons = Array(8).fill(null); // Show 8 skeleton cards while loading

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToFilterChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load products from API
   */
  private loadProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.allProducts = products;
          this.applyFiltersAndPagination();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Failed to load products. Please try again.';
          this.isLoading = false;
          console.error('Error loading products:', error);
        }
      });
  }

  /**
   * Subscribe to filter changes
   */
  private subscribeToFilterChanges(): void {
    this.filterService.filterState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterState: FilterState) => {
        this.currentPage = 1; // Reset to first page when filters change
        this.applyFiltersAndPagination();
      });
  }

  /**
   * Apply filters and pagination
   */
  private applyFiltersAndPagination(): void {
    const filterState = this.filterService.getCurrentState();
    
    // Filter products
    this.filteredProducts = this.allProducts.filter(product => {
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
    });

    // Apply pagination
    const startIndex = 0;
    const endIndex = this.currentPage * this.productsPerPage;
    this.products = this.filteredProducts.slice(startIndex, endIndex);
    this.hasMore = endIndex < this.filteredProducts.length;
  }

  /**
   * Track by function for ngFor performance
   */
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  /**
   * Handle retry after error
   */
  onRetry(): void {
    this.loadProducts();
  }

  /**
   * Handle clear filters
   */
  onClearFilters(): void {
    this.filterService.resetFilters();
    this.clearFilters.emit();
  }

  /**
   * Handle load more products
   */
  onLoadMore(): void {
    this.isLoadingMore = true;
    this.currentPage++;
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.applyFiltersAndPagination();
      this.isLoadingMore = false;
    }, 500);
  }

  /**
   * Handle add to cart event
   */
  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
    // You could add a toast notification here
    console.log('Added to cart:', product.title);
  }

  /**
   * Handle product click event
   */
  onProductClick(product: Product): void {
    this.productClick.emit(product);
    // You could navigate to product detail page here
    console.log('Product clicked:', product.title);
  }

  /**
   * Get dynamic min/max prices from products
   */
  getPriceRange(): { min: number; max: number } {
    if (this.allProducts.length === 0) {
      return { min: 0, max: 1000 };
    }

    const prices = this.allProducts.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }
}