import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.interface';

// Load products actions
export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

// Load more products (pagination)
export const loadMoreProducts = createAction('[Product] Load More Products');

export const loadMoreProductsSuccess = createAction(
  '[Product] Load More Products Success',
  props<{ products: Product[]; hasMore: boolean }>()
);

export const loadMoreProductsFailure = createAction(
  '[Product] Load More Products Failure',
  props<{ error: string }>()
);

// Load single product
export const loadProduct = createAction(
  '[Product] Load Product',
  props<{ id: number }>()
);

export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  '[Product] Load Product Failure',
  props<{ error: string }>()
);

// Load categories
export const loadCategories = createAction('[Product] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Product] Load Categories Success',
  props<{ categories: string[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Product] Load Categories Failure',
  props<{ error: string }>()
);

// Select product
export const selectProduct = createAction(
  '[Product] Select Product',
  props<{ productId: number }>()
);

// Clear errors
export const clearProductError = createAction('[Product] Clear Error');

// Reset products
export const resetProducts = createAction('[Product] Reset Products');