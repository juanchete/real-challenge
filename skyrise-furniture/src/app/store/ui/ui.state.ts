export interface UiState {
  isMobileMenuOpen: boolean;
  isMobileFilterOpen: boolean;
  isScrolled: boolean;
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  } | null;
}

export const initialUiState: UiState = {
  isMobileMenuOpen: false,
  isMobileFilterOpen: false,
  isScrolled: false,
  notification: null
};