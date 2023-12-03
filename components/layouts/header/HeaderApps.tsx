"use client";
import React, { PropsWithChildren, ReactNode, useEffect } from "react";
import { Popover } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { privateRootes } from "@/configs/routes/privateRootes";
export type HeaderAppsProps = {};

export function HeaderApps({}: HeaderAppsProps) {
  const pathname = usePathname();
  const [openPopover, setOpenPopover] = React.useState(false);
  useEffect(() => setOpenPopover(false), [pathname]);
  return (
    <Popover
      content={<AppsMenu />}
      trigger={"click"}
      overlayInnerStyle={{ padding: 0, background: "transparent" }}
      onOpenChange={setOpenPopover}
      open={openPopover}
    >
      <button
        type="button"
        data-dropdown-toggle="apps-dropdown"
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span className="sr-only">View notifications</span>
        {/* Icon */}
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
    </Popover>
  );
}
function AppsMenu() {
  const [pathnameSelected, setPathnameSelected] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const className =
    "block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group";
  const activeClassName = "bg-gray-800";

  useEffect(() => setIsLoading(false), [pathname]);
  return (
    <div
      className="me-3 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
      id="apps-dropdown"
    >
      <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
        Apps
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {privateRootes.map((roote) => (
          <Link
            onClick={() => [setIsLoading(true), setPathnameSelected(roote.url)]}
            key={roote.url}
            href={roote.url}
            className={clsx(
              className,
              pathname.startsWith(roote.url) && activeClassName
            )}
          >
            <TextMenu
              icon={roote.icon}
              isLoading={isLoading && pathnameSelected.startsWith(roote.url)}
            >
              {roote.label}
            </TextMenu>
          </Link>
        ))}
      </div>
    </div>
  );
}
type LoadingProps = {
  isLoading?: boolean;
};
function Loading({ isLoading }: LoadingProps) {
  return isLoading && <LoadingOutlined />;
}
type TextMenuProps = PropsWithChildren<{
  isLoading?: boolean;
  icon?: ReactNode;
}>;
function TextMenu({ children, isLoading, icon }: TextMenuProps) {
  return (
    <>
      {icon}
      <div
        className={clsx(
          " text-sm text-gray-900 dark:text-white ",
          isLoading && "flex gap-1"
        )}
      >
        <Loading isLoading={isLoading} />
        {children}
      </div>
    </>
  );
}
