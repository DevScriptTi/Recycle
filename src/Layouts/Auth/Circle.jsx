import React from "react";
import { useLocation } from "react-router-dom";

export const CircleUpp = () => {
  const location = useLocation();
  console.log(location.pathname); // /joinUs/shipper-join
  return (
    <div className={`hidden xl:block size-64 rounded-full ${location.pathname === '/joinUs/shipper-join' ? 'bg-green-600 dark:bg-green-400' : 'text-light-primary dark:text-dark-primary'} absolute top-0 start-0 translate-x-1/2 -translate-y-1/2`}></div>
  );
};

export const CircleBottom = () => {
  const location = useLocation();
  console.log(location.pathname); // /joinUs/shipper-join
  return (
    <div className={`hidden xl:block size-96 rounded-full ${location.pathname === '/joinUs/shipper-join' ? 'bg-green-600 dark:bg-green-400' : 'text-light-primary dark:text-dark-primary'} absolute bottom-0 end-0 -translate-x-1/2 translate-y-1/2`}></div>
  );
};
