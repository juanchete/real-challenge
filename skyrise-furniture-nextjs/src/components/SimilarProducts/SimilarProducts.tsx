'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SimilarProducts.module.css';
import { Product } from '@/types/product';

interface SimilarProductsProps {
  currentProductId: number;
  category?: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProductId, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        const data = await response.json();
        // Filter out current product and get only 3 items
        const filtered = data.filter((p: Product) => p.id !== currentProductId).slice(0, 3);
        setProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch similar products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentProductId, category]);

  if (loading) {
    return (
      <div className={styles.similarProducts__grid}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.similarProducts__skeleton}>
            <div className={styles.similarProducts__skeletonImage}></div>
            <div className={styles.similarProducts__skeletonTitle}></div>
            <div className={styles.similarProducts__skeletonPrice}></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles.similarProducts__grid}>
      {products.map((product) => (
        <a 
          key={product.id} 
          href={`/product/${product.id}`}
          className={styles.similarProducts__card}
        >
          <div className={styles.similarProducts__imageWrapper}>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className={styles.similarProducts__image}
            />
            <button className={styles.similarProducts__addButton} aria-label="Add to cart">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H4L6.68 12.39C6.77144 12.8504 7.02191 13.264 7.38755 13.5583C7.75318 13.8526 8.2107 14.009 8.68 14H16.4C16.8693 14.009 17.3268 13.8526 17.6925 13.5583C18.0581 13.264 18.3086 12.8504 18.4 12.39L19.8 5H5M8 19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19C6 18.4477 6.44772 18 7 18C7.55228 18 8 18.4477 8 19ZM18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19C16 18.4477 16.4477 18 17 18C17.5523 18 18 18.4477 18 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <h3 className={styles.similarProducts__title}>{product.title}</h3>
          <p className={styles.similarProducts__price}>${product.price.toFixed(0)}</p>
        </a>
      ))}
    </div>
  );
};

export default SimilarProducts;