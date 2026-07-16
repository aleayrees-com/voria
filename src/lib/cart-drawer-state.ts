export const CART_DRAWER_EXIT_DELAY_MS = 300;

export const shouldKeepCartDrawerMounted = (
  isOpen: boolean,
  hasFinishedClosing: boolean,
): boolean => isOpen || !hasFinishedClosing;
