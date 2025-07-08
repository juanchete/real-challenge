import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../store';
import * as UiActions from '../../store/ui/ui.actions';
import * as UiSelectors from '../../store/ui/ui.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Observables from store
  isMobileMenuOpen$: Observable<boolean>;
  isScrolled$: Observable<boolean>;
  
  // Local state for template bindings
  isMobileMenuOpen = false;
  isScrolled = false;
  
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    // Initialize observables
    this.isMobileMenuOpen$ = this.store.select(UiSelectors.selectIsMobileMenuOpen);
    this.isScrolled$ = this.store.select(UiSelectors.selectIsScrolled);
  }

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScroll();
    
    // Subscribe to store state
    this.isMobileMenuOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        this.isMobileMenuOpen = isOpen;
        // Update body overflow
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
    
    this.isScrolled$
      .pipe(takeUntil(this.destroy$))
      .subscribe(scrolled => {
        this.isScrolled = scrolled;
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up body overflow style
    document.body.style.overflow = '';
  }

  /**
   * Toggle mobile menu open/closed state
   */
  toggleMobileMenu(): void {
    this.store.dispatch(UiActions.toggleMobileMenu());
    
    // Update aria-expanded attribute
    const toggleButton = document.querySelector('.header__menu-toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', (!this.isMobileMenuOpen).toString());
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.store.dispatch(UiActions.closeMobileMenu());
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
    const isScrolled = window.scrollY > 0;
    this.store.dispatch(UiActions.setScrolled({ isScrolled }));
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