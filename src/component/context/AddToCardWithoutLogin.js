// CartWithoutLoginContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define the context
const CartWithoutLoginContext = createContext();

// Define the initial state or load from localStorage
const initialState = JSON.parse(localStorage.getItem('cartWithoutLogin')) || [];

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// Define the CartWithoutLoginProvider component
export const CartWithoutLoginProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
console.log('cartttt', cart)
  useEffect(() => {
    localStorage.setItem('cartWithoutLogin', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartWithoutLoginContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartWithoutLoginContext.Provider>
  );
};

// Create a custom hook to access the context
export const useCartWithoutLogin = () => {
  return useContext(CartWithoutLoginContext);
};
