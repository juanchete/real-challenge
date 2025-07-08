import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return response.json();
}