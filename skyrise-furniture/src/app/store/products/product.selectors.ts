import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './product.state';
import { selectFilterState } from '../filters/filter.selectors';
import { Product } from '../../models/product.interface';

// Feature selector
export const selectProductState = createFeatureSelector<ProductState>('products');

// Entity selectors
export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts
} = productAdapter.getSelectors(selectProductState);

// Individual selectors
export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.isLoading
);

export const selectProductsLoadingMore = createSelector(
  selectProductState,
  (state: ProductState) => state.isLoadingMore
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectCategories = createSelector(
  selectProductState,
  (state: ProductState) => state.categories
);

export const selectHasMoreProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.hasMore
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state: ProductState) => state.currentPage
);

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

// Selected product
export const selectSelectedProduct = createSelector(
  selectProductEntities,
  selectSelectedProductId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Filtered products based on filter state
export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectFilterState,
  (products: Product[], filterState) => {
    let filtered = [...products];
    
    // Apply category filters
    if (filterState.categoryFilters.length > 0) {
      filtered = filtered.filter(product => 
        filterState.categoryFilters.includes(product.category)
      );
    }
    
    // Apply price filters
    filtered = filtered.filter(product => 
      product.price >= filterState.priceFilter.min && 
      product.price <= filterState.priceFilter.max
    );
    
    // Note: Color filters are not applicable to FakeStoreAPI products
    // but keeping the structure for future enhancement
    
    return filtered;
  }
);

// Product count selectors
export const selectTotalProductCount = createSelector(
  selectAllProducts,
  (products: Product[]) => products.length
);

export const selectFilteredProductCount = createSelector(
  selectFilteredProducts,
  (products: Product[]) => products.length
);

// Price range from all products
export const selectProductPriceRange = createSelector(
  selectAllProducts,
  (products: Product[]) => {
    if (products.length === 0) {
      return { min: 0, max: 1000 };
    }
    
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }
);

// Category counts
export const selectCategoryCounts = createSelector(
  selectAllProducts,
  (products: Product[]) => {
    const counts: { [key: string]: number } = {};
    
    products.forEach(product => {
      if (counts[product.category]) {
        counts[product.category]++;
      } else {
        counts[product.category] = 1;
      }
    });
    
    return counts;
  }
);

// Loading state combining both loading flags
export const selectIsLoading = createSelector(
  selectProductsLoading,
  selectProductsLoadingMore,
  (loading, loadingMore) => loading || loadingMore
);