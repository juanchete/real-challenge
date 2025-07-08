import { createReducer, on } from '@ngrx/store';
import * as UiActions from './ui.actions';
import { initialUiState } from './ui.state';

export const uiReducer = createReducer(
  initialUiState,
  
  // Mobile menu
  on(UiActions.toggleMobileMenu, (state) => ({
    ...state,
    isMobileMenuOpen: !state.isMobileMenuOpen
  })),
  
  on(UiActions.openMobileMenu, (state) => ({
    ...state,
    isMobileMenuOpen: true
  })),
  
  on(UiActions.closeMobileMenu, (state) => ({
    ...state,
    isMobileMenuOpen: false
  })),
  
  // Mobile filter
  on(UiActions.toggleMobileFilter, (state) => ({
    ...state,
    isMobileFilterOpen: !state.isMobileFilterOpen
  })),
  
  on(UiActions.openMobileFilter, (state) => ({
    ...state,
    isMobileFilterOpen: true
  })),
  
  on(UiActions.closeMobileFilter, (state) => ({
    ...state,
    isMobileFilterOpen: false
  })),
  
  // Scroll state
  on(UiActions.setScrolled, (state, { isScrolled }) => ({
    ...state,
    isScrolled
  })),
  
  // Notifications
  on(UiActions.showNotification, (state, { message, type }) => ({
    ...state,
    notification: {
      message,
      type,
      isVisible: true
    }
  })),
  
  on(UiActions.hideNotification, (state) => ({
    ...state,
    notification: null
  })),
  
  // Reset
  on(UiActions.resetUiState, () => initialUiState)
);