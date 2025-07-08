import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product | null = null;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() productClick = new EventEmitter<Product>();

  // Fallback image for error handling
  private readonly fallbackImage = 'images/placeholder.svg';

  /**
   * Handle add to cart button click
   */
  onAddToCart(): void {
    if (this.product) {
      this.addToCart.emit(this.product);
      // Prevent event from bubbling to card click
      event?.stopPropagation();
    }
  }

  /**
   * Handle product card click
   */
  onProductClick(): void {
    if (this.product) {
      this.productClick.emit(this.product);
    }
  }

  /**
   * Handle image loading error
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Add error class for styling
    img.classList.add('product-card__image--error');
    // Set fallback image (we'll create a placeholder later)
    img.src = this.fallbackImage;
  }

  /**
   * Get array for star rating display
   */
  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  /**
   * Format product title for display
   */
  getFormattedTitle(): string {
    if (!this.product) return '';
    // Truncate very long titles
    const maxLength = 50;
    if (this.product.title.length > maxLength) {
      return this.product.title.substring(0, maxLength) + '...';
    }
    return this.product.title;
  }

  /**
   * Get formatted price with currency
   */
  getFormattedPrice(): string {
    if (!this.product) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(this.product.price);
  }
}