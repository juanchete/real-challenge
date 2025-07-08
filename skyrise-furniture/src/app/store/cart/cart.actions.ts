import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.interface';
import { CartItem } from './cart.state';

// Add to cart
export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: Product; quantity?: number }>()
);

// Remove from cart
export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

// Update quantity
export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ productId: number; quantity: number }>()
);

// Clear cart
export const clearCart = createAction('[Cart] Clear Cart');

// Load cart from storage
export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

// Save cart to storage
export const saveCart = createAction('[Cart] Save Cart');

export const saveCartSuccess = createAction('[Cart] Save Cart Success');

export const saveCartFailure = createAction(
  '[Cart] Save Cart Failure',
  props<{ error: string }>()
);