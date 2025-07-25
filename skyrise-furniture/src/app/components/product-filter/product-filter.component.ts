import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product, ProductCategory } from '../../models/product.interface';
import { PriceRange } from '../../models/filter.interface';
import { AppState } from '../../store';
import * as FilterActions from '../../store/filters/filter.actions';
import * as FilterSelectors from '../../store/filters/filter.selectors';
import * as ProductSelectors from '../../store/products/product.selectors';
import * as UiActions from '../../store/ui/ui.actions';

interface ColorOption {
  name: string;
  value: string;
  hex: string;
}

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];
  @Output() filtersChanged = new EventEmitter<void>();

  // Categories
  displayCategories: ProductCategory[] = [
    { name: 'all', value: 'all', displayName: 'All' },
    { name: 'electronics', value: 'electronics', displayName: 'Electronics' },
    { name: 'jewelery', value: 'jewelery', displayName: 'Jewelery' },
    { name: 'mens-clothing', value: "men's clothing", displayName: "Men's Clothing" },
    { name: 'womens-clothing', value: "women's clothing", displayName: "Women's Clothing" }
  ];

  // Based on the design image, adding furniture categories
  furnitureCategories: ProductCategory[] = [
    { name: 'chairs', value: 'chairs', displayName: 'Chairs' },
    { name: 'couches', value: 'couches', displayName: 'Couches' },
    { name: 'decor', value: 'decor', displayName: 'Decor' },
    { name: 'furniture', value: 'furniture', displayName: 'Furniture' },
    { name: 'lightings', value: 'lightings', displayName: 'Lightings' },
    { name: 'sofas', value: 'sofas', displayName: 'Sofas' }
  ];

  // Colors from design system
  availableColors: ColorOption[] = [
    { name: 'Pink', value: 'pink', hex: '#FADADD' },
    { name: 'Light Blue', value: 'lightBlue', hex: '#D4E2E8' },
    { name: 'Sky Blue', value: 'skyBlue', hex: '#D9EEFF' },
    { name: 'Light Green', value: 'lightGreen', hex: '#D4EDDA' },
    { name: 'Pale Green', value: 'paleGreen', hex: '#EAF6E3' },
    { name: 'Light Purple', value: 'lightPurple', hex: '#DFDBF0' }
  ];

  // Price range
  priceRange: PriceRange = { min: 0, max: 1000 };
  currentPriceRange: PriceRange = { min: 0, max: 1000 };

  // Selected filters
  selectedCategories: string[] = [];
  selectedColors: string[] = [];

  // UI state
  expandedSections: { [key: string]: boolean } = {
    categories: true,
    price: true,
    colors: true
  };
  isMobileFilterOpen = false;
  activeFilterCount = 0;

  // Category counts
  categoryCounts: { [key: string]: number } = {};

  private destroy$ = new Subject<void>();
  private priceChangeSubject = new Subject<PriceRange>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToStoreSelectors();
    this.setupPriceDebounce();
    this.subscribeToCategoryCounts();
    this.subscribeToPriceRange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Subscribe to store selectors
   */
  private subscribeToStoreSelectors(): void {
    // Subscribe to category filters
    this.store.select(FilterSelectors.selectCategoryFilters)
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.selectedCategories = [...categories];
      });

    // Subscribe to price filter
    this.store.select(FilterSelectors.selectPriceFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe(priceFilter => {
        this.currentPriceRange = { ...priceFilter };
      });

    // Subscribe to color filters
    this.store.select(FilterSelectors.selectColorFilters)
      .pipe(takeUntil(this.destroy$))
      .subscribe(colors => {
        this.selectedColors = [...colors];
      });

    // Subscribe to active filter count
    this.store.select(FilterSelectors.selectActiveFilterCount)
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.activeFilterCount = count;
      });
  }

  /**
   * Subscribe to category counts from products
   */
  private subscribeToCategoryCounts(): void {
    this.store.select(ProductSelectors.selectCategoryCounts)
      .pipe(takeUntil(this.destroy$))
      .subscribe(counts => {
        this.categoryCounts = counts;
      });
  }

  /**
   * Subscribe to dynamic price range from products
   */
  private subscribeToPriceRange(): void {
    this.store.select(ProductSelectors.selectProductPriceRange)
      .pipe(takeUntil(this.destroy$))
      .subscribe(range => {
        this.priceRange = range;
        // Update current range if it's outside the new bounds
        if (this.currentPriceRange.min < range.min || this.currentPriceRange.max > range.max) {
          this.store.dispatch(FilterActions.setPriceRange({ 
            min: Math.max(this.currentPriceRange.min, range.min),
            max: Math.min(this.currentPriceRange.max, range.max)
          }));
        }
      });
  }

  /**
   * Setup price change debounce
   */
  private setupPriceDebounce(): void {
    this.priceChangeSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged((a, b) => a.min === b.min && a.max === b.max),
        takeUntil(this.destroy$)
      )
      .subscribe(priceRange => {
        this.store.dispatch(FilterActions.updatePriceFilter({ priceRange }));
        this.filtersChanged.emit();
      });
  }

  /**
   * Toggle section expanded state
   */
  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  /**
   * Check if category is selected
   */
  isCategorySelected(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  /**
   * Handle category change
   */
  onCategoryChange(category: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    
    if (category === 'all') {
      if (checkbox.checked) {
        this.store.dispatch(FilterActions.resetCategoryFilters());
      }
    } else {
      this.store.dispatch(FilterActions.toggleCategory({ category }));
    }
    
    this.filtersChanged.emit();
  }

  /**
   * Get category product count
   */
  getCategoryCount(category: string): number {
    if (category === 'all') {
      return this.products.length;
    }
    return this.categoryCounts[category] || 0;
  }

  /**
   * Handle price input change
   */
  onPriceInputChange(type: 'min' | 'max', event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;
    
    if (type === 'min') {
      this.currentPriceRange.min = Math.min(value, this.currentPriceRange.max);
    } else {
      this.currentPriceRange.max = Math.max(value, this.currentPriceRange.min);
    }
    
    this.priceChangeSubject.next({ ...this.currentPriceRange });
  }

  /**
   * Handle slider change
   */
  onSliderChange(type: 'min' | 'max', event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    
    if (type === 'min') {
      this.currentPriceRange.min = Math.min(value, this.currentPriceRange.max - 10);
    } else {
      this.currentPriceRange.max = Math.max(value, this.currentPriceRange.min + 10);
    }
    
    this.priceChangeSubject.next({ ...this.currentPriceRange });
  }

  /**
   * Get slider range left position
   */
  getRangeLeft(): number {
    const range = this.priceRange.max - this.priceRange.min;
    return ((this.currentPriceRange.min - this.priceRange.min) / range) * 100;
  }

  /**
   * Get slider range width
   */
  getRangeWidth(): number {
    const range = this.priceRange.max - this.priceRange.min;
    return ((this.currentPriceRange.max - this.currentPriceRange.min) / range) * 100;
  }

  /**
   * Check if color is selected
   */
  isColorSelected(color: string): boolean {
    return this.selectedColors.includes(color);
  }

  /**
   * Toggle color selection
   */
  onColorToggle(color: string): void {
    this.store.dispatch(FilterActions.toggleColor({ color }));
    this.filtersChanged.emit();
  }

  /**
   * Clear all filters
   */
  onClearAllFilters(): void {
    this.store.dispatch(FilterActions.resetFilters());
    this.filtersChanged.emit();
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return this.activeFilterCount > 0;
  }

  /**
   * Open mobile filter
   */
  openMobileFilter(): void {
    this.store.dispatch(UiActions.openMobileFilter());
    this.isMobileFilterOpen = true;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile filter
   */
  closeMobileFilter(): void {
    this.store.dispatch(UiActions.closeMobileFilter());
    this.isMobileFilterOpen = false;
    document.body.style.overflow = '';
  }

  /**
   * Apply mobile filters
   */
  applyMobileFilters(): void {
    this.closeMobileFilter();
  }

  /**
   * Update price range based on products
   */
  @Input()
  set productList(products: Product[]) {
    this.products = products;
  }
}