import React from 'react';
import styles from './Rating.module.css';

interface RatingProps {
  rate: number;
  count: number;
}

const Rating: React.FC<RatingProps> = ({ rate, count }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  
  return (
    <div className={styles.rating}>
      <div className={styles.rating__stars}>
        {[...Array(maxStars)].map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;
          
          return (
            <svg
              key={index}
              className={`${styles.rating__star} ${
                isFilled ? styles['rating__star--filled'] : 
                isHalf ? styles['rating__star--half'] : ''
              }`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={isFilled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1"
              />
              {isHalf && (
                <defs>
                  <clipPath id={`half-${index}`}>
                    <rect x="0" y="0" width="12" height="24" />
                  </clipPath>
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    fill="currentColor"
                    clipPath={`url(#half-${index})`}
                  />
                </defs>
              )}
            </svg>
          );
        })}
      </div>
      <span className={styles.rating__text}>
        {rate.toFixed(1)} ({count} reviews)
      </span>
    </div>
  );
};

export default Rating;