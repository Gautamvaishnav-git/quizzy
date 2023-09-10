import React from "react";
import { AddIcon, HomeIcon, SettingsIcon } from "./icons";

const BottomNavigation = () => {
  return (
    <section className="sm:hidden w-5/6 mx-auto bg-secondary/20 py-2 px-3 backdrop-blur-sm rounded-lg fixed bottom-4 left-0 right-0">
      <div className="flex items-center justify-between px-2 mx-auto">
        <HomeIcon />
        <AddIcon />
        <SettingsIcon />
      </div>
    </section>
  );
};

export default BottomNavigation;
