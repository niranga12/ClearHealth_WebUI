import React from "react";
import NotificationLayout from "src/_helpers/notification";
import { TheHeader } from "../../../containers";
import DashboardMenuItems from "./dashboardMenuItems";

const TheDashboardMenu = () => {
  return (
    <div className="c-app c-default-layout">
      <NotificationLayout />
      <div className="c-wrapper">
        <TheHeader />
        {/* <div className="c-body"> */}
        <div>
          <DashboardMenuItems />
        </div>
      </div>
    </div>
  );
};

export default TheDashboardMenu;
