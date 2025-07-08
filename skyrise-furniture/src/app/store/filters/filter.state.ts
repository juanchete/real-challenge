import { PriceRange } from '../../models/filter.interface';

export interface FilterState {
  categoryFilters: string[];
  priceFilter: PriceRange;
  colorFilters: string[];
  isLoading: boolean;
  error: string | null;
}

export const initialFilterState: FilterState = {
  categoryFilters: [],
  priceFilter: { min: 0, max: 1000 },
  colorFilters: [],
  isLoading: false,
  error: null
};