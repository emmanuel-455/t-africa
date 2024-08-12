import { createStore, combineReducers } from 'redux';

// Reducers
const initialState = {
  user: null,
  cart: [],
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;
