'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { shimmerBlurDataURL } from '@/utils/imageUtils';
import styles from './OptimizedImage.module.css';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder.svg',
  showSkeleton = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`${styles.imageWrapper} ${isLoading ? styles.loading : ''}`}>
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`${styles.image} ${className} ${isLoading ? styles.imageLoading : styles.imageLoaded}`}
        onLoad={handleLoad}
        onError={handleError}
        placeholder="blur"
        blurDataURL={shimmerBlurDataURL}
        {...props}
      />
      {showSkeleton && isLoading && (
        <div className={styles.skeleton} />
      )}
    </div>
  );
}