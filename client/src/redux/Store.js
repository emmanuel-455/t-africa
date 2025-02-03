// src/store/store.js
import { atom } from 'jotai';
//import { atomWithStorage } from 'jotai/utils';

//export const isUserLoggedInAtom = atom(false);

export const isUserLoggedInAtom = atom(false);

export const userDetailsAtom = atom({
    name: 'userDetails',
    default: {

      firstName: '',
      lastName: '',
      email: '',
    },
  });


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

// Store review rating filter (e.g., 4.0 & up, 4.5 & up, etc.)
export const ratingFilterAtom  = atom(null);

// Price range filter
export const priceRangeAtom = atom({ min: '', max: '' });

// Minimum order filter
export const minOrderAtom = atom('');

export const minPriceAtom = atom(null); // To store minimum price
export const maxPriceAtom = atom(null); // To store maximum price



