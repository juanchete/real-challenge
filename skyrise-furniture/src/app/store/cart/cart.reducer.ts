import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  
  // Add to cart
  on(CartActions.addToCart, (state, { product, quantity = 1 }) => {
    const existingItemIndex = state.items.findIndex(
      item => item.product.id === product.id
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      
      return {
        ...state,
        items: updatedItems
      };
    } else {
      // Add new item
      return {
        ...state,
        items: [...state.items, { product, quantity }]
      };
    }
  }),
  
  // Remove from cart
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.product.id !== productId)
  })),
  
  // Update quantity
  on(CartActions.updateCartItemQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId)
      };
    }
    
    const updatedItems = state.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    return {
      ...state,
      items: updatedItems
    };
  }),
  
  // Clear cart
  on(CartActions.clearCart, (state) => ({
    ...state,
    items: []
  })),
  
  // Load cart
  on(CartActions.loadCart, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    isLoading: false
  })),
  
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Save cart
  on(CartActions.saveCart, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(CartActions.saveCartSuccess, (state) => ({
    ...state,
    isLoading: false
  })),
  
  on(CartActions.saveCartFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);