import { describe, expect, it } from 'vitest';

import {
  CART_DRAWER_EXIT_DELAY_MS,
  shouldKeepCartDrawerMounted,
} from './cart-drawer-state';

describe('cart drawer transition state', () => {
  it('keeps the drawer mounted until its closing animation finishes', () => {
    expect(CART_DRAWER_EXIT_DELAY_MS).toBeGreaterThan(0);
    expect(shouldKeepCartDrawerMounted(true, false)).toBe(true);
    expect(shouldKeepCartDrawerMounted(false, false)).toBe(true);
    expect(shouldKeepCartDrawerMounted(false, true)).toBe(false);
  });
});
