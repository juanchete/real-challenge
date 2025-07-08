import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

// Feature selector
export const selectCartState = createFeatureSelector<CartState>('cart');

// Cart items
export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

// Cart loading state
export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.isLoading
);

// Cart error
export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

// Cart item count
export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

// Cart total price
export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);

// Is cart empty
export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

// Get specific cart item
export const selectCartItemByProductId = (productId: number) => createSelector(
  selectCartItems,
  (items) => items.find(item => item.product.id === productId)
);

// Cart summary for display
export const selectCartSummary = createSelector(
  selectCartItemCount,
  selectCartTotal,
  selectIsCartEmpty,
  (itemCount, total, isEmpty) => ({
    itemCount,
    total,
    isEmpty
  })
);