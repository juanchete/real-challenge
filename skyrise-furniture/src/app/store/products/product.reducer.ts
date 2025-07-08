import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { productAdapter, initialProductState } from './product.state';

export const productReducer = createReducer(
  initialProductState,

  // Load products
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products, hasMore }) =>
    productAdapter.setAll(products, {
      ...state,
      isLoading: false,
      totalCount: products.length,
      hasMore: hasMore,
    })
  ),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Load more products
  on(ProductActions.loadMoreProducts, (state) => ({
    ...state,
    isLoadingMore: true,
    error: null,
  })),

  on(ProductActions.loadMoreProductsSuccess, (state, { products, hasMore }) =>
    productAdapter.addMany(products, {
      ...state,
      isLoadingMore: false,
      hasMore,
      currentPage: state.currentPage + 1,
    })
  ),

  on(ProductActions.loadMoreProductsFailure, (state, { error }) => ({
    ...state,
    isLoadingMore: false,
    error,
  })),

  // Load single product
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(ProductActions.loadProductSuccess, (state, { product }) =>
    productAdapter.upsertOne(product, {
      ...state,
      isLoading: false,
    })
  ),

  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Load categories
  on(ProductActions.loadCategories, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(ProductActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    isLoading: false,
  })),

  on(ProductActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Select product
  on(ProductActions.selectProduct, (state, { productId }) => ({
    ...state,
    selectedProductId: productId,
  })),

  // Clear error
  on(ProductActions.clearProductError, (state) => ({
    ...state,
    error: null,
  })),

  // Reset products
  on(ProductActions.resetProducts, () => initialProductState)
);
