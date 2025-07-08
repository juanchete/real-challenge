import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonImageProps {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  className?: string;
}

export function SkeletonImage({
  width = '100%',
  height,
  aspectRatio = '1',
  className = '',
}: SkeletonImageProps) {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    '--aspect-ratio': aspectRatio,
  } as React.CSSProperties;

  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
    style.aspectRatio = 'unset';
  }

  return (
    <div
      className={`${styles.skeleton} ${styles['skeleton-image']} ${className}`}
      style={style}
    />
  );
}