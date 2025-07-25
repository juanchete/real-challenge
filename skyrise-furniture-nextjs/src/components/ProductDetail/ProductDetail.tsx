'use client';

import React, { useEffect, lazy, Suspense } from 'react';
import styles from './ProductDetail.module.css';
import Rating from '@/components/Rating/Rating';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import useProductDetailStore from '@/lib/store';
import { Product, productColors } from '@/types/product';
import { SkeletonBox } from '@/components/Skeletons';

const QuantityCounter = lazy(() => import('@/components/QuantityCounter/QuantityCounter'));
const ColorSelector = lazy(() => import('@/components/ColorSelector/ColorSelector'));

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const {
    selectedColor,
    quantity,
    selectedImage,
    setProduct,
    setSelectedColor,
    incrementQuantity,
    decrementQuantity,
    setSelectedImage,
  } = useProductDetailStore();


  useEffect(() => {
    setProduct(product);
    // Set default color if none selected
    if (!selectedColor && productColors.length > 0) {
      setSelectedColor(productColors[0].value);
    }
  }, [product, selectedColor, setProduct, setSelectedColor]);

  const handleBuyNow = () => {
    // In a real app, this would add to cart and navigate to checkout
    console.log('Buy now:', {
      product: product.id,
      quantity,
      color: selectedColor,
    });
    alert(`Added ${quantity} item(s) to cart!`);
  };

  // Mock thumbnail images (since API only provides one image)
  const thumbnails = [
    product.image,
    product.image,
    product.image,
  ];

  return (
    <>
      <div className={styles.productDetail}>
      <div className={styles.productDetail__imageSection}>
        <div className={styles.productDetail__mainImageWrapper}>
          <OptimizedImage
            src={selectedImage || product.image}
            alt={product.title}
            width={400}
            height={400}
            className={styles.productDetail__mainImage}
            priority
          />
          
          <div className={styles.productDetail__thumbnails}>
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(thumb)}
                className={`${styles.productDetail__thumbnail} ${
                  (selectedImage || product.image) === thumb 
                    ? styles['productDetail__thumbnail--active'] 
                    : ''
                }`}
              >
                <OptimizedImage
                  src={thumb}
                  alt={`${product.title} view ${index + 1}`}
                  width={80}
                  height={80}
                  className={styles.productDetail__thumbnailImage}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.productDetail__infoSection}>
        <div className={styles.productDetail__header}>
          <span className={styles.productDetail__category}>
            Modern Furniture
          </span>
          <h1 className={styles.productDetail__title}>
            {product.title}
          </h1>
          <div className={styles.productDetail__rating}>
            <Rating rate={product.rating.rate} count={product.rating.count} />
          </div>
          <p className={styles.productDetail__price}>
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className={styles.productDetail__description}>
          <p>{product.description}</p>
        </div>

        <div className={styles.productDetail__options}>
          <div className={styles.productDetail__optionGroup}>
            <label className={styles.productDetail__optionLabel}>
              Colours Available
            </label>
            <Suspense fallback={<SkeletonBox width="100%" height={40} />}>
              <ColorSelector
                colors={productColors}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            </Suspense>
          </div>
        </div>

        <div className={styles.productDetail__actions}>
          <div className={styles.productDetail__quantityRow}>
            <Suspense fallback={<SkeletonBox width={120} height={40} />}>
              <QuantityCounter
                quantity={quantity}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
              />
            </Suspense>
          </div>
          
          <button
            className={styles.productDetail__buyButton}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>

    <div className={styles.productDetail__additionalInfo}>
      <details className={styles.productDetail__infoSection}>
        <summary className={styles.productDetail__infoTitle}>
          Additional Information
        </summary>
        <div className={styles.productDetail__infoContent}>
          <p>The right coffee table can add the perfect finishing touch to your living room. Some of the latest trends include lift-top tables, storage tables and tables with mid-century or airy designs. If you have been looking for a coffee table that is in line with the latest trends, you probably know that the choice is endless.</p>
        </div>
      </details>

      <details className={styles.productDetail__infoSection}>
        <summary className={styles.productDetail__infoTitle}>
          Designer
        </summary>
        <div className={styles.productDetail__infoContent}>
          <p>Designed by our in-house team of furniture experts, combining modern aesthetics with functional design principles.</p>
        </div>
      </details>

      <details className={styles.productDetail__infoSection}>
        <summary className={styles.productDetail__infoTitle}>
          Usability
        </summary>
        <div className={styles.productDetail__infoContent}>
          <p>Perfect for modern living spaces. Easy to maintain and designed to complement various interior styles.</p>
        </div>
      </details>

      <details className={styles.productDetail__infoSection}>
        <summary className={styles.productDetail__infoTitle}>
          Home Decoration
        </summary>
        <div className={styles.productDetail__infoContent}>
          <p>This piece serves as both a functional furniture item and a decorative element that enhances your home&apos;s aesthetic.</p>
        </div>
      </details>
    </div>
    </>
  );
};

export default ProductDetail;