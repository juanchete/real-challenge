// Product interface matching FakeStoreAPI structure
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Product category for filters
export interface ProductCategory {
  name: string;
  value: string;
  displayName?: string;
}