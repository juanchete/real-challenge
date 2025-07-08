import React from 'react';
import { SkeletonBox, SkeletonText, SkeletonImage } from './index';
import styles from '../ProductDetail/ProductDetail.module.css';

export function ProductDetailSkeleton() {
  return (
    <>
      <div className={styles.productDetail}>
        <div className={styles.productDetail__imageSection}>
          <div className={styles.productDetail__mainImageWrapper}>
            <SkeletonImage width={400} height={400} />
            
            <div className={styles.productDetail__thumbnails}>
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className={styles.productDetail__thumbnail}
                  style={{ padding: '4px' }}
                >
                  <SkeletonImage width={80} height={80} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.productDetail__infoSection}>
          <div className={styles.productDetail__header}>
            <SkeletonText width="120px" height="16px" />
            <div style={{ marginTop: '12px' }}>
              <SkeletonText lines={2} lastLineWidth="60%" height="24px" />
            </div>
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <SkeletonBox width={100} height={20} />
              <SkeletonText width="60px" height="14px" />
            </div>
            <div style={{ marginTop: '16px' }}>
              <SkeletonText width="80px" height="32px" />
            </div>
          </div>

          <div className={styles.productDetail__description}>
            <SkeletonText lines={3} />
          </div>

          <div className={styles.productDetail__options}>
            <div className={styles.productDetail__optionGroup}>
              <SkeletonText width="140px" height="16px" />
              <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                {[1, 2, 3, 4].map((_, index) => (
                  <SkeletonBox key={index} width={32} height={32} rounded />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.productDetail__actions}>
            <div className={styles.productDetail__quantityRow}>
              <SkeletonBox width={120} height={40} />
            </div>
            
            <SkeletonBox width="100%" height={48} />
          </div>
        </div>
      </div>

      <div className={styles.productDetail__additionalInfo}>
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className={styles.productDetail__infoSection} style={{ padding: '16px 0' }}>
            <SkeletonText width="200px" height="20px" />
          </div>
        ))}
      </div>
    </>
  );
}