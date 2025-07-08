import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonBoxProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'shimmer' | 'pulse';
  rounded?: boolean;
}

export function SkeletonBox({
  width = '100%',
  height = '20px',
  className = '',
  variant = 'shimmer',
  rounded = false,
}: SkeletonBoxProps) {
  const variantClass = variant === 'pulse' ? styles['skeleton-pulse'] : '';
  const roundedClass = rounded ? styles['skeleton-circle'] : '';
  
  return (
    <div
      className={`${styles.skeleton} ${styles['skeleton-box']} ${variantClass} ${roundedClass} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}