// Filter interface for product filtering
export interface ProductFilter {
  categories: ProductCategory[];
  selectedCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  currentPriceRange: {
    min: number;
    max: number;
  };
  sortOrder: 'asc' | 'desc' | null;
}

// Price range for filter slider
export interface PriceRange {
  min: number;
  max: number;
}

// Filter state for maintaining filter selections
export interface FilterState {
  categoryFilters: string[];
  priceFilter: PriceRange;
  colorFilters?: string[];
}