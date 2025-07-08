import React from 'react';
import styles from './ColorSelector.module.css';
import { ProductColor } from '@/types/product';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className={styles.colorSelector}>
      {colors.map((color) => (
        <button
          key={color.value}
          className={`${styles.colorSelector__option} ${
            selectedColor === color.value ? styles['colorSelector__option--selected'] : ''
          }`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onColorSelect(color.value)}
          aria-label={`Select ${color.name} color`}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorSelector;