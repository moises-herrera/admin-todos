// 'use client'
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { StoredShoppingCart } from '@/shopping-cart/interfaces';

export const getCookieCart = (): StoredShoppingCart => {
  if (!hasCookie('cart')) return {};

  const cookieCart = JSON.parse(getCookie('cart') ?? '{}');
  return cookieCart;
};

export const updateCart = (cart: StoredShoppingCart) => {
  setCookie('cart', JSON.stringify(cart));
};

export const addProductToCart = (id: string): void => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  updateCart(cookieCart);
};

export const removeProductFromCart = (id: string): void => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    delete cookieCart[id];
    updateCart(cookieCart);
  }
};

export const removeSingleItemFromCart = (id: string): void => {
  const cookieCart = getCookieCart();
  if (cookieCart[id] === undefined) return;

  if (cookieCart[id] > 1) {
    cookieCart[id] -= 1;
  } else {
    delete cookieCart[id];
  }
  updateCart(cookieCart);
};
