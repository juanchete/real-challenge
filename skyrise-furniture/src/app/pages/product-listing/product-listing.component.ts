import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { Product } from '../../models/product.interface';
import { AppState } from '../../store';
import * as ProductActions from '../../store/products/product.actions';
import * as ProductSelectors from '../../store/products/product.selectors';
import * as CartActions from '../../store/cart/cart.actions';
import * as UiActions from '../../store/ui/ui.actions';
import * as FilterActions from '../../store/filters/filter.actions';

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
  // Observables from store
  allProducts$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  displayedProductsCount$: Observable<number>;
  totalProductsCount$: Observable<number>;
  isLoading$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    // Initialize observables
    this.allProducts$ = this.store.select(ProductSelectors.selectAllProducts);
    this.filteredProducts$ = this.store.select(ProductSelectors.selectFilteredProducts);
    this.displayedProductsCount$ = this.store.select(ProductSelectors.selectFilteredProductCount);
    this.totalProductsCount$ = this.store.select(ProductSelectors.selectTotalProductCount);
    this.isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);
  }

  ngOnInit(): void {
    // Products are loaded automatically by the ProductGridComponent
    // No need to load them here since grid component dispatches the action
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle filters changed event
   */
  onFiltersChanged(): void {
    // Filters are automatically applied through NgRx selectors
    // No manual update needed
  }

  /**
   * Handle product click event
   */
  onProductClick(product: Product): void {
    // Navigate to Next.js app for product detail
    window.open(`http://localhost:3000/product/${product.id}`, '_blank');
  }

  /**
   * Handle add to cart event
   */
  onAddToCart(product: Product): void {
    // Cart actions are handled by ProductGridComponent
    // This is just a pass-through for any additional logic
    console.log('Added to cart:', product);
  }

  /**
   * Handle clear filters event
   */
  onClearFilters(): void {
    // Clear filters action is handled by ProductGridComponent
    // This is just a pass-through for any additional logic
  }
}