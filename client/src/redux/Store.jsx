// src/store/store.js
import { atom } from 'jotai';

// Atom for user state
export const userAtom = atom(null); // null means no user is logged in initially

// Atom for cart state
export const cartAtom = atom([]); // An empty array for cart items

// Atom for managing products
export const productsAtom = atom([]); // Initialize with an empty list of products

// Atom for managing featured products (if different from the main product list)
export const featuredProductsAtom = atom([]);

// Atom for managing the loading state
export const loadingAtom = atom(false);

// Atom for managing any error state
export const errorAtom = atom(null);

// Atom for managing email confirmation code state
export const codeAtom = atom(''); // Initialize with an empty string for the 6-digit code

export const selectedCategoryAtom = atom(null);
