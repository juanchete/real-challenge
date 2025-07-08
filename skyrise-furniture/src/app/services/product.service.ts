import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  
  // Simple in-memory cache
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {}

  /**
   * Get all products from the API
   */
  getAllProducts(): Observable<Product[]> {
    const cacheKey = 'all-products';
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return of(cached);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      tap(products => this.setCache(cacheKey, products)),
      catchError(this.handleError)
    );
  }

  /**
   * Get a single product by ID
   */
  getProductById(id: number): Observable<Product> {
    const cacheKey = `product-${id}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return of(cached);
    }

    return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      tap(product => this.setCache(cacheKey, product)),
      catchError(this.handleError)
    );
  }

  /**
   * Get all available categories
   */
  getCategories(): Observable<string[]> {
    const cacheKey = 'categories';
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return of(cached);
    }

    return this.http.get<string[]>(`${this.baseUrl}/products/categories`).pipe(
      tap(categories => this.setCache(cacheKey, categories)),
      catchError(this.handleError)
    );
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    const cacheKey = `category-${category}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return of(cached);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category}`).pipe(
      tap(products => this.setCache(cacheKey, products)),
      catchError(this.handleError)
    );
  }

  /**
   * Get products with a limit
   */
  getProductsWithLimit(limit: number): Observable<Product[]> {
    const cacheKey = `products-limit-${limit}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return of(cached);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products?limit=${limit}`).pipe(
      tap(products => this.setCache(cacheKey, products)),
      catchError(this.handleError)
    );
  }

  /**
   * Get sorted products
   */
  getSortedProducts(sort: 'asc' | 'desc'): Observable<Product[]> {
    const cacheKey = `products-sort-${sort}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return of(cached);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products?sort=${sort}`).pipe(
      tap(products => this.setCache(cacheKey, products)),
      catchError(this.handleError)
    );
  }

  /**
   * Get products filtered by price range (client-side filtering)
   */
  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
      ))
    );
  }

  /**
   * Get products with combined filters (categories and price range)
   */
  getFilteredProducts(
    categories: string[], 
    priceRange: { min: number; max: number }
  ): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => {
        let filtered = products;
        
        // Filter by categories if any are selected
        if (categories.length > 0) {
          filtered = filtered.filter(product => 
            categories.includes(product.category)
          );
        }
        
        // Filter by price range
        filtered = filtered.filter(product => 
          product.price >= priceRange.min && product.price <= priceRange.max
        );
        
        return filtered;
      })
    );
  }

  /**
   * Cache management methods
   */
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Error handling
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}