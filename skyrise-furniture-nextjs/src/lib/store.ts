import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface ProductDetailState {
  // Product state
  product: Product | null;
  loading: boolean;
  error: string | null;
  
  // Interactive state
  selectedColor: string;
  quantity: number;
  selectedImage: string;
  
  // Actions
  setProduct: (product: Product) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedColor: (color: string) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  setQuantity: (quantity: number) => void;
  setSelectedImage: (imageUrl: string) => void;
  resetState: () => void;
}

const useProductDetailStore = create<ProductDetailState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        product: null,
        loading: false,
        error: null,
        selectedColor: '',
        quantity: 1,
        selectedImage: '',

        // Actions
        setProduct: (product) => set({ product, selectedImage: product.image }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        setSelectedColor: (selectedColor) => set({ selectedColor }),
        
        incrementQuantity: () => set((state) => ({ 
          quantity: Math.min(state.quantity + 1, 10) // Max 10 items
        })),
        
        decrementQuantity: () => set((state) => ({ 
          quantity: Math.max(state.quantity - 1, 1) // Min 1 item
        })),
        
        setQuantity: (quantity) => set({ 
          quantity: Math.max(1, Math.min(quantity, 10)) 
        }),
        
        setSelectedImage: (selectedImage) => set({ selectedImage }),
        
        resetState: () => set({
          product: null,
          loading: false,
          error: null,
          selectedColor: '',
          quantity: 1,
          selectedImage: ''
        })
      }),
      {
        name: 'product-detail-storage', // unique name for localStorage
        partialize: (state) => ({ 
          selectedColor: state.selectedColor,
          quantity: state.quantity 
        }) // Only persist user selections
      }
    ),
    {
      name: 'product-detail-store' // devtools name
    }
  )
);

export default useProductDetailStore;