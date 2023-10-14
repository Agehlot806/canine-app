import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const NotificationContext = createContext();
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
export const NotificationProvider = ({ children }) => {
  const [notificationLength, setNotificationLength] = useState(0);
  console.log("notificationLengthhhhhhhh",notificationLength);
  const [dataLengthpetnotification, setDataLengthpetnotification] = useState(null); // Initialize as null
  console.log("dataLengthpetnotificationnnnnnnnnnn",dataLengthpetnotification);
  const [notifisecondLength,setNotifisecondLength] = useState();
  console.log("secondddddddddd",notifisecondLength);
  const [notifisecondData,setNotifisecondData] = useState()
  const [notifithirdLength,setNotifithirdLength] = useState();
  const [notifithirdData,setNotifithirdData] = useState()
  const BASE_URL = "https://caninetest.xyz/api/v1";
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
  const Notifynotification = () => {
    axios
      .get(`${BASE_URL}/items/notify_list/${customer_id}`)
      .then((response) => {
        setNotifisecondLength(response.data.data.length);
        setNotifithirdLength(response.data.notification.length)
        console.log("88888",response.data.data.length);
        console.log("99999",response.data.notification.length)
        // setNotifithirdLength(response.data.notification);
        // console.log("Notify-Notificationnnnnnnnnnnnn", response.data.data);
        // console.log("Data Zero", response.data.notification);
      })
      .catch((error) => {
        console.log("EEEEEEEEEErrrrorrrrrrr", error);
      });
  };
  useEffect(() => {
    fetchNotifications(),
    Notifynotification()
  }, []);
  const totalLength = notificationLength + notifisecondLength + notifithirdLength
  console.log("totleeeee",totalLength);
  return (
    <NotificationContext.Provider value={{ notificationLength, dataLengthpetnotification,notifisecondLength,notifithirdLength,totalLength }}>
      {children}
    </NotificationContext.Provider>
  );
};

