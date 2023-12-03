"use client";
import Link from "next/link";
import React from "react";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderBtnSearch } from "./HeaderBtnSearch";
import { HeaderNotification } from "./HeaderNotification";
import { HeaderApps } from "./HeaderApps";
import { HeaderUserProfile } from "./HeaderUserProfile";

export type HeaderComponentProps = {};

export function HeaderComponent({}: HeaderComponentProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <Link href="/" className="flex items-center justify-between mr-4">
            <img
              src="/ASSEMBLEE.PNG"
              className="mr-3 h-8 rounded"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              A N M
            </span>
          </Link>
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
