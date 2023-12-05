"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export type LinkHomeProps = {
  withLogo?: boolean;
  className?: string;
  preventDefault?: boolean;
};

export function LinkHome({
  withLogo,
  className,
  preventDefault,
}: LinkHomeProps) {
  return (
    <Link
      href="/"
      className={clsx(className)}
      onClick={(e) => {
        if (preventDefault) {
          e.preventDefault();
        }
      }}
    >
      {withLogo && (
        <img
          src="/ASSEMBLEE.PNG"
          className="mr-3 h-8 rounded"
          alt="Flowbite Logo"
        />
      )}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        A N M
      </span>
    </Link>
  );
}
