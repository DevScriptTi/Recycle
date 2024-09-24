import React from "react";
import { DashboardNavUpBar } from "../../component/NavBars/NavUpBar/DashboardNavUpBar/DashboardNavUpBar";
import { Outlet } from "react-router-dom";
import { NavSideBar } from "../../component/NavBars/NavSideBar/NavSideBar";
import { NavigationContext } from "../../DevScript/NavigationElements/NavigationContext";

export const Dashboard = () => {
 
  return (
    <>
      <DashboardNavUpBar></DashboardNavUpBar>
      <Content>
        <NavigationContext>
          <NavSideBar></NavSideBar>
        </NavigationContext>
        <div className="h-[2000px] overflow-hidden bg-light-background dark:bg-dark-background px-2 py-4 lg:px-4 lg:py-6 flex flex-col gap-2">
          <Outlet />
        </div>
      </Content>
    </>
  );
};

export const Content = ({ children }) => {
  return <div className="flex items-start w-full">{children}</div>;
};
