import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 86400 }, // Cache for 24 hours (categories change less frequently)
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return response.json();
}