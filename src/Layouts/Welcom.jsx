import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Demand } from "./Client/Elements/Quantities/Demand";

export const Welcom = () => {
  
  return (
    <div>
      <Nav />
      <Demand/>
    </div>
  );
};



const Nav = () => {
  return (
    <div className="px-6 h-11 flex items-center justify-start  text-light-on-surface dark:text-dark-on-surface  ">
      <Nav.Item to={"/"}>قطع غيار</Nav.Item>
      <Nav.Item to={"/primary"}>مواد أولية</Nav.Item>
    </div>
  );
};
Nav.Item = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "px-4 text-lable-small text-light-primary dark:text-dark-primary"
          : "px-4 text-lable-small"
      }
    >
      {children}
    </NavLink>
  );
};

