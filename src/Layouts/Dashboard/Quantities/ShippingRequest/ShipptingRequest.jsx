import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../Http/axiosClient";
import { setCurrentLocation } from "../../../../StateManagement/Slices/Extras/MapSlices";
import {
  addOrderRequest,
  setOrdersRequests,
} from "../../../../StateManagement/Slices/OrdersRequestsSlices/OrdersRequestsSlices";
import echo from "../../../../Sockets/Echo";

export const ShipptingRequest = () => {
  const userId = useSelector((state) => state.user?.user?.key?.user?.id); // Access only the ID

  const ordersRequests = useSelector((state) => state.ordersRequests);
  const dispatch = useDispatch();

  const getOrdersRequests = async () => {
    try {
      const response = await axiosClient.get("api/ordersRequests");
      dispatch(setOrdersRequests(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    console.log("Fetching CSRF cookie and subscribing to channel...");

    const channel = echo.private(`orderRequestCreated.${userId}`);

    channel.subscribed(() => {
      console.log("Successfully subscribed to orderRequestCreated channel");
    });

    channel.listen('.order-request', (data) => {
      console.log("Received Order Request Data:", data);
      dispatch(addOrderRequest(data.data));
    }).error((error) => {
      console.log("Error listening to order-request:", error);
    });

    return () => {
      console.log("Unsubscribing from channel...");
      echo.leave(`orderRequestCreated.${userId}`);
    };
  }, [userId, dispatch]);

  useEffect(() => {
    getOrdersRequests();
  }, []);
  return (
    <div className=" relative w-full min-h-fit  max-h-[400px] overflow-y-auto hidden-scrollbar">
      <ul className="divide-y-2 w-full">
        {ordersRequests.data.map((order) => (
          <ShipptingRequest.Item key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

ShipptingRequest.Item = ({ order }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    console.log("clicked");
    dispatch(
      setCurrentLocation([order.order.location.lat, order.order.location.lng])
    );
  };

  return (
    <li
      onClick={onClick}
      className="flex justify-between py-3 px-5 cursor-pointer bg-light-surface-container text-light-on-surface dark:bg-dark-surface-container dark:text-dark-on-surface"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-title-large font-bold">
          {order.order.vendor.name} {order.order.vendor.last}
        </h1>
        <span>{order.order.vendor.phone}</span>
      </div>
      <div>
        <div className="flex flex-col items-start gap-2">
          <span className="text-lable-large">{order.order.location.lat}</span>
          <span className="text-lable-large">{order.order.location.lng}</span>
          {order.type === "collect" && (
            <h1 className="text-title-medium font-bold text-green-600 dark:text-green-400">
              جمع
            </h1>
          )}
          {order.type === "deliver" && (
            <h1 className="text-title-medium font-bold text-indigo-600 dark:text-indigo-400">
              تسليم
            </h1>
          )}
        </div>
      </div>
    </li>
  );
};
