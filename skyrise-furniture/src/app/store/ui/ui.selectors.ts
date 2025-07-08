import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.state';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectIsMobileMenuOpen = createSelector(
  selectUiState,
  (state: UiState) => state.isMobileMenuOpen
);

export const selectIsMobileFilterOpen = createSelector(
  selectUiState,
  (state: UiState) => state.isMobileFilterOpen
);

export const selectIsScrolled = createSelector(
  selectUiState,
  (state: UiState) => state.isScrolled
);

export const selectNotification = createSelector(
  selectUiState,
  (state: UiState) => state.notification
);

export const selectHasNotification = createSelector(
  selectNotification,
  (notification) => notification !== null && notification.isVisible
);