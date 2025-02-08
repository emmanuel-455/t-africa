import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Persist user login state in local storage
export const isUserLoggedInAtom = atomWithStorage('isUserLoggedIn', false);

export const userDetailsAtom = atom({
    name: 'userDetails',
    default: {
      firstName: '',
      lastName: '',
      email: '',
    },
});

// Atom for cart state
export const cartAtom = atom([]); 

// Atom for managing products
export const productsAtom = atom([]); 

// Atom for managing featured products
export const featuredProductsAtom = atom([]);

// Atom for managing the loading state
export const loadingAtom = atom(false);

// Atom for managing any error state
export const errorAtom = atom(null);

// Atom for managing email confirmation code state
export const codeAtom = atom(''); 

export const selectedCategoryAtom = atom(null);

// Store review rating filter
export const ratingFilterAtom  = atom(null);

// Price range filter
export const priceRangeAtom = atom({ min: '', max: '' });

// Minimum order filter
export const minOrderAtom = atom('');

export const minPriceAtom = atom(null);
export const maxPriceAtom = atom(null);
