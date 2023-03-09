"use client";

import { useHasShare } from "@/hooks/use-share";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import cn from "clsx";

interface ShareButtonProps {
  className?: string;
  children: ReactNode;
  variant?: "default" | "icon";
}
export function ShareButton({
  className,
  children,
  variant = "default",
}: ShareButtonProps) {
  const hasShare = useHasShare();

  const clickHandler = () => {
    return window.navigator.share({
      url: window.location.href,
      title: window.document.title,
    });
  };

  if (!hasShare) {
    return null;
  }

  return (
    <button
      onClick={clickHandler}
      className={twMerge(
        cn({
          "flex items-center gap-2 rounded border-2 border-blue-600 bg-blue-600 py-2 px-4 text-white hover:bg-blue-500":
            variant === "default",
          "text-blue-600": variant === "icon",
        }),
        className
      )}
    >
      {children}
    </button>
  );
}
