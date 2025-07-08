import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonTextProps {
  lines?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  lastLineWidth?: string | number;
}

export function SkeletonText({
  lines = 1,
  width = '100%',
  height = '1em',
  className = '',
  lastLineWidth = '80%',
}: SkeletonTextProps) {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${styles['skeleton-text']} ${className}`}
          style={{
            width: index === lines - 1 && lines > 1 ? lastLineWidth : width,
            height: typeof height === 'number' ? `${height}px` : height,
          }}
        />
      ))}
    </>
  );
}