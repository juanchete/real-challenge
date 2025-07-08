import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

// Import feature states
import { ProductState } from './products/product.state';
import { FilterState } from './filters/filter.state';
import { CartState } from './cart/cart.state';
import { UiState } from './ui/ui.state';

// Import feature reducers
import { productReducer } from './products/product.reducer';
import { filterReducer } from './filters/filter.reducer';
import { cartReducer } from './cart/cart.reducer';
import { uiReducer } from './ui/ui.reducer';

// Root state interface
export interface AppState {
  products: ProductState;
  filters: FilterState;
  cart: CartState;
  ui: UiState;
}

// Root reducers
export const reducers: ActionReducerMap<AppState> = {
  products: productReducer,
  filters: filterReducer,
  cart: cartReducer,
  ui: uiReducer
};

// Meta reducers for development (e.g., logger)
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];