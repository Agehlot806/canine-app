import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  console.log('dataLength: ', dataLength);
  const [dataLengthpetshop, setDataLengthpetshop] = useState();
  console.log('dataLengthpetshop: ', dataLengthpetshop);

  const BASE_URL = "https://eduadmin.digiatto.online/api/v1";
  const loginType = localStorage.getItem("loginType");
  const customer_id =
    loginType === "wholeseller"
      ? Number(localStorage.getItem("UserWholesellerId"))
      : localStorage.getItem("userInfo");

  let storedUserId;

  try {
    storedUserId = JSON.parse(customer_id);
  } catch (error) {
    storedUserId = null;
  }

  const addToCartData = async (id, quantity) => {
    try {
      console.log("Before API call: storedUserId", storedUserId);

      const response = await axios.get(
        `${BASE_URL}/customer/wish-list/add_to_card/${storedUserId}`,
        {
          params: {
            id: id,
            quantity: quantity,
          },
        }
      );

      console.log("API Response: ", response.data);

      const savedCartItem =
        JSON.parse(localStorage.getItem("savedCartItems")) || [];
      console.log("Saved Cart Items: ", savedCartItem);

      console.log("Data Length (Before Setting): ", dataLength);

      setDataLength(savedCartItem.length);
      setDataLengthpetshop(response.data.data.length);

      const newCartData = response.data.data.map((item) => ({
        item_id: item.item_id,
        variant: item.variant,
        price: item.price,
        quantity: item.quantity,
      }));

      setCartData([...newCartData]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const removeFromSavedCart = (itemIdToRemove) => {
    const savedCartItem =
      JSON.parse(localStorage.getItem("savedCartItems")) || [];

    const itemIndexToRemove = savedCartItem.findIndex(
      (item) => item.id === itemIdToRemove
    );

    if (itemIndexToRemove !== -1) {
      savedCartItem.splice(itemIndexToRemove, 1);
      localStorage.setItem("savedCartItems", JSON.stringify(savedCartItem));
      setDataLength(savedCartItem.length);
    }
  };

  const value = {
    cartData,
    dataLength,
    dataLengthpetshop,
    addToCartData,
    removeFromSavedCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
