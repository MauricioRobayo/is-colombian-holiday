"use client";

import { useHasShare } from "@/hooks/use-has-share";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import cn from "clsx";
import { useHasClipboard } from "@/hooks/use-has-clipboard";

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
  const hasClipboard = useHasClipboard();
  const [copied, setCopied] = useState(false);

  const clickHandler = () => {
    if (hasShare) {
      window.navigator.share({
        url: window.location.href,
        title: window.document.title,
      });
      return;
    }

    window.navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  };

  if (hasShare || hasClipboard) {
    return (
      <button
        onClick={clickHandler}
        disabled={copied}
        className={twMerge(
          cn({
            "flex items-center gap-2 rounded bg-blue-600 py-2 px-4 text-white enabled:hover:bg-blue-700":
              variant === "default",
            "text-blue-600": variant === "icon",
            "bg-transparent text-slate-600": copied,
          }),
          className
        )}
      >
        {copied ? "Url copied!" : children}
      </button>
    );
  }

  return null;
}
