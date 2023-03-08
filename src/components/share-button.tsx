"use client";

import { useHasShare } from "@/hooks/use-share";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ShareButtonProps {
  className?: string;
  children: ReactNode;
}
export function ShareButton({ className, children }: ShareButtonProps) {
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
        "flex items-center gap-2 rounded border-2 border-violet-600 bg-violet-600 py-2 px-4 text-white hover:bg-violet-500",
        className
      )}
    >
      {children}
    </button>
  );
}
