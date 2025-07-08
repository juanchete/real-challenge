'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import Rating from '@/components/Rating/Rating';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className={styles.productCard} prefetch>
      <div className={styles.productCard__imageWrapper}>
        <OptimizedImage
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className={styles.productCard__image}
          loading="lazy"
        />
      </div>
      <div className={styles.productCard__content}>
        <h3 className={styles.productCard__title}>{product.title}</h3>
        <div className={styles.productCard__rating}>
          <Rating rate={product.rating.rate} count={product.rating.count} />
        </div>
        <p className={styles.productCard__price}>${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}