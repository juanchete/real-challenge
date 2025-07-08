import React from 'react';
import { SkeletonBox, SkeletonText, SkeletonImage } from './index';
import styles from './ProductCardSkeleton.module.css';

export function ProductCardSkeleton() {
  return (
    <div className={styles.productCardSkeleton}>
      <div className={styles.productCardSkeleton__imageWrapper}>
        <SkeletonImage aspectRatio="1" />
      </div>
      <div className={styles.productCardSkeleton__content}>
        <SkeletonText lines={2} lastLineWidth="70%" height="16px" />
        <div className={styles.productCardSkeleton__rating}>
          <SkeletonBox width={80} height={16} />
        </div>
        <div className={styles.productCardSkeleton__price}>
          <SkeletonText width="60px" height="20px" />
        </div>
      </div>
    </div>
  );
}