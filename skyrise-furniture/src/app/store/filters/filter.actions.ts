import { createAction, props } from '@ngrx/store';
import { PriceRange } from '../../models/filter.interface';

// Category filter actions
export const updateCategoryFilters = createAction(
  '[Filter] Update Category Filters',
  props<{ categories: string[] }>()
);

export const toggleCategory = createAction(
  '[Filter] Toggle Category',
  props<{ category: string }>()
);

// Price filter actions
export const updatePriceFilter = createAction(
  '[Filter] Update Price Filter',
  props<{ priceRange: PriceRange }>()
);

export const setPriceRange = createAction(
  '[Filter] Set Price Range',
  props<{ min: number; max: number }>()
);

// Color filter actions
export const updateColorFilters = createAction(
  '[Filter] Update Color Filters',
  props<{ colors: string[] }>()
);

export const toggleColor = createAction(
  '[Filter] Toggle Color',
  props<{ color: string }>()
);

// Reset actions
export const resetFilters = createAction('[Filter] Reset All Filters');

export const resetCategoryFilters = createAction('[Filter] Reset Category Filters');

export const resetPriceFilter = createAction('[Filter] Reset Price Filter');

export const resetColorFilters = createAction('[Filter] Reset Color Filters');