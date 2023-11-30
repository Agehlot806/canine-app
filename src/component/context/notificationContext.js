import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const NotificationContext = createContext();
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
export const NotificationProvider = ({ children }) => {
  const [notificationLength, setNotificationLength] = useState(0);
  console.log("notificationLengthhhhhhhh", notificationLength);
  const [dataLengthpetnotification, setDataLengthpetnotification] =
    useState(null); // Initialize as null
  console.log("dataLengthpetnotificationnnnnnnnnnn", dataLengthpetnotification);
  const [notifisecondLength, setNotifisecondLength] = useState();
  console.log("secondddddddddd", notifisecondLength);
  const [notifisecondData, setNotifisecondData] = useState();
  const [notifithirdLength, setNotifithirdLength] = useState();
  const [notifithirdData, setNotifithirdData] = useState();
  const BASE_URL = "https://caninetest.xyz/api/v1";
  const loginType = localStorage.getItem("loginType");
  
  const customer_id = loginType === "wholeseller"
  ? Number(localStorage.getItem("UserWholesellerId"))
  : localStorage.getItem("userInfo");

let storedUserId;

try {
  storedUserId = JSON.parse(customer_id);
} catch (error) {
  // Handle the error here, or provide a default value if needed
  storedUserId = null; // You can choose a suitable default value
}
  
  const Notifynotification = () => {
    axios
      .get(`${BASE_URL}/items/notify_list/${customer_id}`)
      .then((response) => {
       const responselenght = response.data.notification.length 
        + response.data.all_notification.length + response.data.data.length
        console.log("responselenght",responselenght);
        setNotificationLength(responselenght)
      })
      .catch((error) => {
        console.log("EEEEEEEEEErrrrorrrrrrr", error);
      });
  };
  useEffect(() => {
     Notifynotification();
  }, []);
  
  return (
    <NotificationContext.Provider
      value={{
        notificationLength,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
