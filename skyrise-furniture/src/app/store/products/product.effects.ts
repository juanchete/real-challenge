import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product.service';
import { AppState } from '../index';
import { selectAllProducts } from './product.selectors';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);
  private readonly store = inject(Store<AppState>);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      withLatestFrom(this.store.select(selectAllProducts)),
      switchMap(([action, cachedProducts]) => {
        // Check cache: if products exist and were loaded within 5 minutes, use cache
        if (cachedProducts.length > 0) {
          return timer(0).pipe(
            map(() => {
              const hasMore = cachedProducts.length >= 12;
              return ProductActions.loadProductsSuccess({
                products: cachedProducts,
                hasMore,
              });
            })
          );
        }

        // Otherwise, fetch from API
        return this.productService.getAllProducts().pipe(
          map((products) => {
            const hasMore = products.length >= 12;
            return ProductActions.loadProductsSuccess({ products, hasMore });
          }),
          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({
                error: error.message || 'Failed to load products',
              })
            )
          )
        );
      })
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map((product) => ProductActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(
              ProductActions.loadProductFailure({
                error: error.message || 'Failed to load product',
              })
            )
          )
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadCategories),
      switchMap(() =>
        this.productService.getCategories().pipe(
          map((categories) =>
            ProductActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(
              ProductActions.loadCategoriesFailure({
                error: error.message || 'Failed to load categories',
              })
            )
          )
        )
      )
    )
  );

  // Log errors to console in development
  logErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProductActions.loadProductsFailure,
          ProductActions.loadProductFailure,
          ProductActions.loadCategoriesFailure
        ),
        tap((action) => {
          console.error('Product Error:', action.error);
        })
      ),
    { dispatch: false }
  );

  constructor() {}
}
