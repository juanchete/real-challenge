import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.interface';

export interface ProductState extends EntityState<Product> {
  // Additional state properties
  categories: string[];
  selectedProductId: number | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  totalCount: number;
}

// Create entity adapter
export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false // Maintain API order
});

// Initial state
export const initialProductState: ProductState = productAdapter.getInitialState({
  categories: [],
  selectedProductId: null,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  currentPage: 1,
  hasMore: false,
  totalCount: 0
});