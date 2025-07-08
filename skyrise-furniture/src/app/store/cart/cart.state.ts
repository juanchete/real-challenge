import { Product } from '../../models/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  isLoading: false,
  error: null
};