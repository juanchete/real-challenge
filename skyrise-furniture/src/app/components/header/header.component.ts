import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isScrolled = false;

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScroll();
  }

  /**
   * Toggle mobile menu open/closed state
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Update aria-expanded attribute
    const toggleButton = document.querySelector('.header__menu-toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
    }
    
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  /**
   * Listen for scroll events to add shadow on scroll
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  /**
   * Check scroll position
   */
  private checkScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  /**
   * Listen for window resize to close mobile menu on desktop
   */
  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (window.innerWidth >= 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}