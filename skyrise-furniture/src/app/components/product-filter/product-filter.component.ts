import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { Product } from '../../models/product.interface';
import { ProductCategory, PriceRange } from '../../models/filter.interface';

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

  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.initializeFilters();
    this.subscribeToFilterChanges();
    this.setupPriceDebounce();
    this.updateCategoryCounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize filters from service
   */
  private initializeFilters(): void {
    const currentState = this.filterService.getCurrentState();
    this.selectedCategories = [...currentState.categoryFilters];
    this.selectedColors = [...(currentState.colorFilters || [])];
    this.currentPriceRange = { ...currentState.priceFilter };
    this.updateActiveFilterCount();
  }

  /**
   * Subscribe to filter changes
   */
  private subscribeToFilterChanges(): void {
    this.filterService.filterState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateActiveFilterCount();
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
        this.filterService.updatePriceFilter(priceRange);
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
        this.selectedCategories = [];
      }
    } else {
      if (checkbox.checked) {
        this.selectedCategories.push(category);
      } else {
        const index = this.selectedCategories.indexOf(category);
        if (index > -1) {
          this.selectedCategories.splice(index, 1);
        }
      }
    }
    
    this.filterService.updateCategoryFilters(this.selectedCategories);
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
   * Update category counts
   */
  private updateCategoryCounts(): void {
    this.categoryCounts = {};
    this.products.forEach(product => {
      if (this.categoryCounts[product.category]) {
        this.categoryCounts[product.category]++;
      } else {
        this.categoryCounts[product.category] = 1;
      }
    });
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
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    
    this.filterService.updateColorFilters(this.selectedColors);
    this.filtersChanged.emit();
  }

  /**
   * Clear all filters
   */
  onClearAllFilters(): void {
    this.filterService.resetFilters();
    this.initializeFilters();
    this.filtersChanged.emit();
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return this.filterService.hasActiveFilters();
  }

  /**
   * Update active filter count
   */
  private updateActiveFilterCount(): void {
    this.activeFilterCount = this.filterService.getActiveFilterCount();
  }

  /**
   * Open mobile filter
   */
  openMobileFilter(): void {
    this.isMobileFilterOpen = true;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile filter
   */
  closeMobileFilter(): void {
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
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      this.priceRange = {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices))
      };
      
      // Update current range if it's outside the new bounds
      if (this.currentPriceRange.min < this.priceRange.min) {
        this.currentPriceRange.min = this.priceRange.min;
      }
      if (this.currentPriceRange.max > this.priceRange.max) {
        this.currentPriceRange.max = this.priceRange.max;
      }
      
      this.updateCategoryCounts();
    }
  }
}