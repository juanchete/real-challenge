import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterState, PriceRange } from '../models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // Initial filter state
  private initialState: FilterState = {
    categoryFilters: [],
    priceFilter: { min: 0, max: 1000 },
    colorFilters: []
  };

  // BehaviorSubject to manage filter state
  private filterStateSubject = new BehaviorSubject<FilterState>(this.initialState);
  
  // Observable for components to subscribe to filter changes
  filterState$: Observable<FilterState> = this.filterStateSubject.asObservable();

  constructor() {}

  /**
   * Get current filter state
   */
  getCurrentState(): FilterState {
    return this.filterStateSubject.value;
  }

  /**
   * Update category filters
   */
  updateCategoryFilters(categories: string[]): void {
    const currentState = this.getCurrentState();
    this.filterStateSubject.next({
      ...currentState,
      categoryFilters: categories
    });
  }

  /**
   * Toggle a single category filter
   */
  toggleCategory(category: string): void {
    const currentState = this.getCurrentState();
    const categories = [...currentState.categoryFilters];
    const index = categories.indexOf(category);
    
    if (index > -1) {
      categories.splice(index, 1);
    } else {
      categories.push(category);
    }
    
    this.updateCategoryFilters(categories);
  }

  /**
   * Update price filter
   */
  updatePriceFilter(priceRange: PriceRange): void {
    const currentState = this.getCurrentState();
    this.filterStateSubject.next({
      ...currentState,
      priceFilter: priceRange
    });
  }

  /**
   * Update color filters
   */
  updateColorFilters(colors: string[]): void {
    const currentState = this.getCurrentState();
    this.filterStateSubject.next({
      ...currentState,
      colorFilters: colors
    });
  }

  /**
   * Toggle a single color filter
   */
  toggleColor(color: string): void {
    const currentState = this.getCurrentState();
    const colors = [...(currentState.colorFilters || [])];
    const index = colors.indexOf(color);
    
    if (index > -1) {
      colors.splice(index, 1);
    } else {
      colors.push(color);
    }
    
    this.updateColorFilters(colors);
  }

  /**
   * Reset all filters to initial state
   */
  resetFilters(): void {
    this.filterStateSubject.next(this.initialState);
  }

  /**
   * Reset specific filter type
   */
  resetFilterType(filterType: 'category' | 'price' | 'color'): void {
    const currentState = this.getCurrentState();
    
    switch (filterType) {
      case 'category':
        this.filterStateSubject.next({
          ...currentState,
          categoryFilters: []
        });
        break;
      case 'price':
        this.filterStateSubject.next({
          ...currentState,
          priceFilter: this.initialState.priceFilter
        });
        break;
      case 'color':
        this.filterStateSubject.next({
          ...currentState,
          colorFilters: []
        });
        break;
    }
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    const state = this.getCurrentState();
    return state.categoryFilters.length > 0 ||
           state.priceFilter.min !== this.initialState.priceFilter.min ||
           state.priceFilter.max !== this.initialState.priceFilter.max ||
           (state.colorFilters?.length || 0) > 0;
  }

  /**
   * Get active filter count
   */
  getActiveFilterCount(): number {
    const state = this.getCurrentState();
    let count = 0;
    
    if (state.categoryFilters.length > 0) count++;
    if (state.priceFilter.min !== this.initialState.priceFilter.min ||
        state.priceFilter.max !== this.initialState.priceFilter.max) count++;
    if ((state.colorFilters?.length || 0) > 0) count++;
    
    return count;
  }
}