import React from "react";
import { useLocation } from "react-router-dom";

export const Logo = () => {
  const location = useLocation()
  return (
    <div className="size-60 hidden lg:flex  justify-center items-center w-2/5 h-svh">
      {
        location.pathname  === '/joinUs/shipper-join'?(
          <img className="w-full" src="/public/assets/join-illust.png" alt="logo" />
        ):(
          <img className="w-full" src="/public/assets/register-ililus.png" alt="logo" />
        )
      }
    </div>
  );
};
