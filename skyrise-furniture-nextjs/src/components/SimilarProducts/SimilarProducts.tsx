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
                <circle cx="10" cy="10" r="10" fill="currentColor"/>
                <path d="M10 6V14M6 10H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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