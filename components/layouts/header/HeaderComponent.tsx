"use client";
import React from "react";
import { HeaderNotification } from "./HeaderNotification";
import { HeaderApps } from "./HeaderApps";
import { HeaderUserProfile } from "./HeaderUserProfile";
import { LinkHome } from "@/components/antd/link/LinkHome";

export type HeaderComponentProps = {};

export function HeaderComponent({}: HeaderComponentProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <LinkHome
            withLogo
            className="flex items-center justify-between mr-4"
          />
          {/* <HeaderSearch /> */}
        </div>
        <div className="flex items-center lg:order-2">
          {/* <HeaderBtnSearch /> */}
          <HeaderNotification />
          <HeaderApps />
          <HeaderUserProfile />
        </div>
      </div>
    </nav>
  );
}
