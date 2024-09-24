import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { axiosClient } from "../../../../Http/axiosClient";
import {
  getLocator,
  getUserLocation,
  isShipper,
} from "../../../../helpers/Algo/Auth";
import { LocateIcon, RefreshCcwIcon } from "lucide-react";
import { Card } from "./Card";
import { ShipptingRequest } from "../ShippingRequest/ShipptingRequest";
import { OrderRequestContext, OrderRequestProvider } from "./Context";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../../../StateManagement/Slices/Extras/MapSlices";

export function Map() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex gap-2  items-center relative ">
        <h1 className="text-title-large text-light-primary dark:text-dark-primary">
          مكانك على الخارطة
        </h1>
        <span className="flex gap-1">
          <span className="flex gap-2 items-center">
            <span className="text-lable-medium text-light-on-surface-variant dark:text-light-on-surface-variant">
              غير متصل
            </span>
            <span className="size-3 bg-green-700 dark:bg-green-400 rounded-full"></span>
          </span>
        </span>
      </div>
      {isShipper() && <ShipptingRequest />}
      <div className="rounded-xl overflow-hidden border-4 border-light-primary dark:border-dark-primary w-full">
        <MapContainer
          center={getUserLocation()}
          zoom={16}
          style={{ height: "400px", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocateUser />
        </MapContainer>
      </div>
    </div>
  );
}

function LocateUser() {
  const user_location = getUserLocation()
  const dispatch = useDispatch();
  const ordersRequests = useSelector(state=>state.ordersRequests);
  const currentLocation = useSelector((state) => state.maps.currentLocation);
  const [locating, setLocating] = useState(false);
  const locator = getLocator();
  const map = useMap();

  const locate = () => {
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const newPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        dispatch(setCurrentLocation(user_location))
        setLocation({ lat: newPosition[0], lng: newPosition[1] });
        setLocating(false);
        map.setView(newPosition, 16);
      });
    }
  };

  const setLocation = async (data) => {
    try {
      const response = await axiosClient.post(`api/${locator}/location`, {
        lat: data.lat,
        lng: data.lng,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    map.setView(currentLocation, 16);
  }, [map,currentLocation]);

  useEffect(() => {
    dispatch(setCurrentLocation(user_location))
  }, []);

  return (
    <>
      <div
        onClick={locate}
        className="flex cursor-pointer items-center justify-center text-light-on-surface  bg-light-surface-container-highest border-2 border-light-outline-variant size-8 z-[1000] absolute top-4 right-4"
      >
        <LocateIcon />
      </div>
      {locating && (
        <div className="animate-pulse absolute inset-0 bg-black/50 z-[1100]"></div>
      )}
      <Marker position={user_location}>
        <Popup className="w-[250px] bg-light-surface">
          <Card />
        </Popup>
      </Marker>
      {ordersRequests.data.map((order) => (
        <Marker
          icon={
            new L.Icon({
              iconUrl: "/public/assets/box.png",
              iconSize: [40, 40],
            })
          }
          key={order.id}
          position={[order.order.location.lat, order.order.location.lng]}
        >
          <Popup className="w-[250px] bg-light-surface">
            <Card order={order} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}



