"use client";
import React from "react";

export type DocumentIconProps = {};

export function DocumentIcon({}: DocumentIconProps) {
  return (
    <svg
      className="mx-auto mb-1 w-6 h-6 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 18"
    >
      <path d="M18 5H0v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5Zm-7.258-2L9.092.8a2.009 2.009 0 0 0-1.6-.8H2.049a2 2 0 0 0-2 2v1h10.693Z" />
    </svg>
  );
}
