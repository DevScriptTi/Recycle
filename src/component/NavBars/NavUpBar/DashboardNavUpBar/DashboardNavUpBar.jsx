import React from "react";
import { DashboardNavUpBarContext } from "./DashboardNavUpBarContext";
import { NavUppBarContainer } from "../NavUppBar/NavUppBarElements/NavUppBarContainer";
import { NavUppBarMode } from "../NavUppBar/NavUppBarElements/NavUppBarMode";
import { NavUppBarLogo } from "../NavUppBar/NavUppBarElements/NavUppBarLogo";
import { showNav } from "../../../../helpers/Dom/NavUpBar";
import { Menu } from "lucide-react";
import { NavUppbarNotifications } from "../NavUppBar/NavUppBarElements/NavUppbarNotifications";

export const DashboardNavUpBar = () => {
  return (
    <DashboardNavUpBarContext>
      <div className="h-header sticky top-0 inset-x-0 z-20">
        <NavUppBarContainer color={true}>
          <span className="lg:hidden" onClick={showNav}>
            <Menu className="text-light-on-surface dark:text-dark-on-surface" />
          </span>
          <NavUppBarLogo
            logoPicture={"assets/dark-logo.png"}
            logoName={"Autorio-Logo"}
          />
          <NavUppBarMode />
          <NavUppbarNotifications/>
        </NavUppBarContainer>
      </div>
    </DashboardNavUpBarContext>
  );
};
