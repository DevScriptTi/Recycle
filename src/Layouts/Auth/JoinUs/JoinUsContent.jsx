import React from "react";
import { FilledButton } from "../../../DevScript/Buttons/FilledButton";
import { NavLink, useLocation } from "react-router-dom";

export const JoinUsContent = () => {

  return (
    <div
      className={`$"animate-pulse"
         w-full h-content flex items-center overflow-auto`}
    >
      <div className="w-full flex flex-col items-center gap-8 ">
        <h1 className="w-fit m-auto  text-headline-large font-bold text-light-primary dark:text-dark-primary">
          هل أنتم شركة جمع أم رسلة ؟
        </h1>
        <div className="flex gap-4">
          <FilledButton>
            <NavLink to={'/joinUs/shipper-join'} >شركة جمع</NavLink>
          </FilledButton>
          <FilledButton>
            <NavLink to={'/joinUs/vendor-join'}>شركة رسكلة</NavLink>
          </FilledButton>
        </div>
      </div>
    </div>
  );
};
