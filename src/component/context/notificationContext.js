import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notificationLength, setNotificationLength] = useState(0);
  console.log('notificationLength: ', notificationLength);
  const [dataLengthpetnotification, setDataLengthpetnotification] = useState(null); // Initialize as null
  console.log('dataLengthpetnotification: ', dataLengthpetnotification);

  const BASE_URL = "https://canine.hirectjob.in/api/v1";
  const loginType = localStorage.getItem("loginType");
  const customer_id =
    loginType === "wholeseller"
      ? Number(localStorage.getItem("UserWholesellerId"))
      : localStorage.getItem("userInfo");
  const storedUserId = JSON.parse(customer_id);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/notifications?tergat=customer/${storedUserId}`
      );

      setNotificationLength(response.data.state.length);
      // Set the entire object in state
      setDataLengthpetnotification(response.data.state[0]);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationLength, dataLengthpetnotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
