"use client";
import React, { useEffect } from "react";
import isEqual from "lodash.isequal";

export function useLazyArgs<T>(args: T): T {
  const [lazyArgs, setLazyArgs] = React.useState(args);
  useEffect(() => {
    setLazyArgs((oldArgs) => {
      if (!isEqual(oldArgs, args)) {
        return args;
      }
      return oldArgs;
    });
  }, [args]);
  return lazyArgs;
}
