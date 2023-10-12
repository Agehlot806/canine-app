import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the context
const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [dataLengthpetshop, setDataLengthpetshop] = useState();

  // Your BASE_URL and storedUserId
  const BASE_URL = "https://caninetest.xyz/api/v1";
  const loginType = localStorage.getItem("loginType");
  const customer_id =
    loginType == "wholeseller"
      ? Number(localStorage.getItem("UserWholesellerId"))
      : localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  // ----------------------------------------

  const addToCartData = async (id, quantity) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/wish-list/add_to_card/${storedUserId}`,
        {
          params: {
            id: id,
            quantity: quantity,
          },
        }
      );

      setDataLength(response.data.data.length);
      setDataLengthpetshop(response.data.data.length);

      const newCartData = response.data.data.map((item) => ({
        item_id: item.item_id,
        variant: item.variant,
        price: item.price,
        quantity: item.quantity,
      }));

      setCartData([...newCartData]);

      // Clear the quantity input field after adding the item to the cart
      //   setQuantity(1);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    cartData,
    dataLength,
    dataLengthpetshop,
    addToCartData,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
