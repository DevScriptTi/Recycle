import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import echo from "../../../../../Sockets/Echo";
import {
  addNotification,
  setNotifications,
} from "../../../../../StateManagement/Slices/Extras/NotificationSlices";
import { axiosClient } from "../../../../../Http/axiosClient";
import { Bell } from "lucide-react";

export const NavUppbarNotifications = () => {
  const userId = useSelector((state) => state.user?.user?.key?.user?.id); // Access only the ID
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      const response = await axiosClient.get("api/ordersNotifications");
      const data = response.data.data.map((item) => item.data);
      dispatch(setNotifications(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    console.log("Fetching CSRF cookie and subscribing to channel...");

    const channel = echo.private(`App.Models.User.${userId}`);

    // Listen for notifications and update Redux store
    channel.notification((data) => {
      dispatch(addNotification(data.data));
      console.log("Received Notification Data:", data.data);
    });

    return () => {
      console.log("Unsubscribing from channel...");
      echo.leave(`App.Models.User.${userId}`);
    };
  }, [userId, dispatch]);

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="relative flex items-center px-4 text-light-on-surface dark:text-dark-on-surface">
      {notifications.length > 0 && (
        <span className="text-lable-medium size-4 bg-red-600 dark:bg-red-400 text-white rounded-full flex items-center justify-center absolute -top-1 start-2">
          {notifications.length}
        </span>
      )}
      <Bell
        onClick={() => {
          document.getElementById("notification-id").classList.toggle("hidden");
        }}
        className="fill-light-on-surface cursor-pointer dark:fill-dark-on-surface"
        size={30}
      />
      <ul
        id="notification-id"
        className="hidden fixed top-header divide-y-2 divide-light-outline-variant dark:divide-dark-outline-variant max-lg:inset-x-0 max-lg:mx-3 lg:absolute lg:top-full max-h-[200px] overflow-auto hidden-scrollbar bg-light-surface-container dark:bg-dark-surface-container rounded-lg"
      >
        {notifications.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return item.type == "collectingOrder" ? (
    <li className="flex justify-between w-full lg:w-96 cursor-pointer text-light-on-surface dark:text-dark-on-surface px-7 py-4">
      <div className="flex flex-col gap-2">
        <span className="text-title-large">
          {item.vendor.name} {item.vendor.last}
        </span>
        <span>{item.vendor.phone}</span>
      </div>
      <div className="flex flex-col gap-2">
        {item.sheppingType === "collect" ? (
          <>
            <span className="text-title-large text-green-600 dark:text-green-400">
              جمع
            </span>
            <span>
              {+item.location.lat.toPrecision(6)}° N{" "}
              {+item.location.lng.toPrecision(6)}° E
            </span>
          </>
        ) : (
          <>
            <span className="text-title-large text-indigo-600 dark:text-indigo-400">
              توصيل
            </span>
            <span>
              {+item.location.lat.toPrecision(6)}° N{" "}
              {+item.location.lng.toPrecision(6)}° E
            </span>
          </>
        )}
      </div>
    </li>
  ) : (
    <li className="flex justify-between w-full lg:w-96 cursor-pointer text-light-on-surface dark:text-dark-on-surface px-7 py-4">
      <div className="flex flex-col gap-2">
        <span className="text-title-large">
          {item.shipper.name} {item.shipper.last}
        </span>
        <span>{item.shipper.phone}</span>
      </div>
    </li>
  );
};
