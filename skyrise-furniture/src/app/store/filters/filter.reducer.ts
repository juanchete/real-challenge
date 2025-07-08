import { createReducer, on } from '@ngrx/store';
import * as FilterActions from './filter.actions';
import { initialFilterState } from './filter.state';

export const filterReducer = createReducer(
  initialFilterState,
  
  // Category filters
  on(FilterActions.updateCategoryFilters, (state, { categories }) => ({
    ...state,
    categoryFilters: categories
  })),
  
  on(FilterActions.toggleCategory, (state, { category }) => {
    const categories = [...state.categoryFilters];
    const index = categories.indexOf(category);
    
    if (index > -1) {
      categories.splice(index, 1);
    } else {
      categories.push(category);
    }
    
    return {
      ...state,
      categoryFilters: categories
    };
  }),
  
  // Price filter
  on(FilterActions.updatePriceFilter, (state, { priceRange }) => ({
    ...state,
    priceFilter: priceRange
  })),
  
  on(FilterActions.setPriceRange, (state, { min, max }) => ({
    ...state,
    priceFilter: { min, max }
  })),
  
  // Color filters
  on(FilterActions.updateColorFilters, (state, { colors }) => ({
    ...state,
    colorFilters: colors
  })),
  
  on(FilterActions.toggleColor, (state, { color }) => {
    const colors = [...state.colorFilters];
    const index = colors.indexOf(color);
    
    if (index > -1) {
      colors.splice(index, 1);
    } else {
      colors.push(color);
    }
    
    return {
      ...state,
      colorFilters: colors
    };
  }),
  
  // Reset actions
  on(FilterActions.resetFilters, () => initialFilterState),
  
  on(FilterActions.resetCategoryFilters, (state) => ({
    ...state,
    categoryFilters: []
  })),
  
  on(FilterActions.resetPriceFilter, (state) => ({
    ...state,
    priceFilter: initialFilterState.priceFilter
  })),
  
  on(FilterActions.resetColorFilters, (state) => ({
    ...state,
    colorFilters: []
  }))
);