import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.interface';
import { AppState } from '../../store';
import * as ProductActions from '../../store/products/product.actions';
import * as ProductSelectors from '../../store/products/product.selectors';
import * as FilterActions from '../../store/filters/filter.actions';
import * as CartActions from '../../store/cart/cart.actions';
import * as UiActions from '../../store/ui/ui.actions';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent implements OnInit, OnDestroy {
  @Input() productsPerPage = 12;
  @Output() productClick = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() clearFilters = new EventEmitter<void>();

  // Observables from store
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  isLoading$: Observable<boolean>;
  isLoadingMore$: Observable<boolean>;
  error$: Observable<string | null>;
  hasMore$: Observable<boolean>;

  // Local state for UI
  products: Product[] = [];
  isLoading = true;
  isLoadingMore = false;
  hasMore = false;
  error: string | null = null;
  loadingSkeletons = Array(this.productsPerPage).fill(null);

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    // Initialize observables
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.filteredProducts$ = this.store.select(
      ProductSelectors.selectFilteredProducts
    );
    this.isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.isLoadingMore$ = this.store.select(
      ProductSelectors.selectProductsLoadingMore
    );
    this.error$ = this.store.select(ProductSelectors.selectProductsError);
    this.hasMore$ = this.store.select(ProductSelectors.selectHasMoreProducts);
  }

  ngOnInit(): void {
    // Load products on init
    this.store.dispatch(ProductActions.loadProducts());

    // Subscribe to filtered products for display
    this.filteredProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
      });

    // Subscribe to loading state
    this.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.isLoading = loading;
    });

    // Subscribe to error state
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.error = error;
    });

    // Subscribe to loading more state
    this.isLoadingMore$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loadingMore) => {
        this.isLoadingMore = loadingMore;
      });

    // Subscribe to has more state
    this.hasMore$.pipe(takeUntil(this.destroy$)).subscribe((hasMore) => {
      this.hasMore = hasMore;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.store.dispatch(ProductActions.clearProductError());
    this.store.dispatch(ProductActions.loadProducts());
  }

  /**
   * Handle clear filters
   */
  onClearFilters(): void {
    this.store.dispatch(FilterActions.resetFilters());
    this.clearFilters.emit();
  }

  /**
   * Handle load more products
   */
  onLoadMore(): void {
    this.store.dispatch(ProductActions.loadMoreProducts());
  }

  /**
   * Handle add to cart event
   */
  onAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product }));
    this.store.dispatch(
      UiActions.showNotification({
        message: `${product.title} added to cart!`,
        notificationType: 'success',
      })
    );
    this.addToCart.emit(product);

    // Hide notification after 3 seconds
    setTimeout(() => {
      this.store.dispatch(UiActions.hideNotification());
    }, 3000);
  }

  /**
   * Handle product click event
   */
  onProductClick(product: Product): void {
    this.store.dispatch(
      ProductActions.selectProduct({ productId: product.id })
    );
    this.productClick.emit(product);
  }
}
