import { ElementType, ReactNode } from "react";
import cn from "clsx";
import { twMerge } from "tailwind-merge";

export interface Props<T extends ElementType> {
  variant?: "dim" | "highlight" | "hero" | "default";
  children: ReactNode;
  as?: T;
  className?: string;
  disableHover?: boolean;
}
type CardProps<T extends React.ElementType> = Props<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>;
export function Card<T extends ElementType = "div">({
  variant = "default",
  children,
  as,
  className,
  disableHover = false,
  ...other
}: CardProps<T>) {
  const dim = variant === "dim";
  const highlight = variant === "highlight";
  const hero = variant === "hero";
  const Component = as ?? "div";
  return (
    <Component
      className={twMerge(
        "rounded-lg border-2 border-orange-200 bg-white p-4 shadow-sm",
        cn({
          "border-none bg-slate-200 opacity-75": dim,
          "transition hover:scale-105 hover:shadow-md":
            !hero && !disableHover && !dim,
          "bg-amber-50": highlight,
          "flex flex-col items-center gap-4 p-8 text-lg sm:text-xl": hero,
        }),
        className
      )}
      {...other}
    >
      {children}
    </Component>
  );
}
