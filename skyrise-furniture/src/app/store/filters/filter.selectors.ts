import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.state';

// Feature selector
export const selectFilterState = createFeatureSelector<FilterState>('filters');

// Individual selectors
export const selectCategoryFilters = createSelector(
  selectFilterState,
  (state: FilterState) => state.categoryFilters
);

export const selectPriceFilter = createSelector(
  selectFilterState,
  (state: FilterState) => state.priceFilter
);

export const selectColorFilters = createSelector(
  selectFilterState,
  (state: FilterState) => state.colorFilters
);

// Derived selectors
export const selectHasActiveFilters = createSelector(
  selectFilterState,
  (state: FilterState) => {
    const initialState = { min: 0, max: 1000 };
    return state.categoryFilters.length > 0 ||
           state.priceFilter.min !== initialState.min ||
           state.priceFilter.max !== initialState.max ||
           state.colorFilters.length > 0;
  }
);

export const selectActiveFilterCount = createSelector(
  selectFilterState,
  (state: FilterState) => {
    const initialState = { min: 0, max: 1000 };
    let count = 0;
    
    if (state.categoryFilters.length > 0) count++;
    if (state.priceFilter.min !== initialState.min ||
        state.priceFilter.max !== initialState.max) count++;
    if (state.colorFilters.length > 0) count++;
    
    return count;
  }
);

export const selectIsCategorySelected = (category: string) => createSelector(
  selectCategoryFilters,
  (categories: string[]) => categories.includes(category)
);

export const selectIsColorSelected = (color: string) => createSelector(
  selectColorFilters,
  (colors: string[]) => colors.includes(color)
);