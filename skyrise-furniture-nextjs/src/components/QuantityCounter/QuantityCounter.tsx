import React from 'react';
import styles from './QuantityCounter.module.css';

interface QuantityCounterProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 10,
}) => {
  const isMinDisabled = quantity <= min;
  const isMaxDisabled = quantity >= max;

  return (
    <div className={styles.quantityCounter}>
      <button
        className={`${styles.quantityCounter__button} ${styles['quantityCounter__button--decrement']}`}
        onClick={onDecrement}
        disabled={isMinDisabled}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.quantityCounter__display}>
        {quantity}
      </span>
      <button
        className={`${styles.quantityCounter__button} ${styles['quantityCounter__button--increment']}`}
        onClick={onIncrement}
        disabled={isMaxDisabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;