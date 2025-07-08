import { createAction, props } from '@ngrx/store';

// Mobile menu actions
export const toggleMobileMenu = createAction('[UI] Toggle Mobile Menu');
export const openMobileMenu = createAction('[UI] Open Mobile Menu');
export const closeMobileMenu = createAction('[UI] Close Mobile Menu');

// Mobile filter actions
export const toggleMobileFilter = createAction('[UI] Toggle Mobile Filter');
export const openMobileFilter = createAction('[UI] Open Mobile Filter');
export const closeMobileFilter = createAction('[UI] Close Mobile Filter');

// Scroll actions
export const setScrolled = createAction(
  '[UI] Set Scrolled',
  props<{ isScrolled: boolean }>()
);

// Notification actions
export const showNotification = createAction(
  '[UI] Show Notification',
  props<{ 
    message: string; 
    notificationType: 'success' | 'error' | 'info' | 'warning' 
  }>()
);

export const hideNotification = createAction('[UI] Hide Notification');

// Reset UI state
export const resetUiState = createAction('[UI] Reset State');