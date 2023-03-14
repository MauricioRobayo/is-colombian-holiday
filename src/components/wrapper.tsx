import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface WrapperProps<T extends ElementType = "div"> {
  children: ReactNode;
  as?: T;
  className?: string;
}
type Props<T extends ElementType> = WrapperProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof WrapperProps<T>>;
export function Wrapper<T extends ElementType = "div">({
  children,
  className,
  as,
  ...other
}: Props<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={twMerge(
        "mx-auto w-full max-w-lg self-center p-4 text-center",
        className
      )}
      {...other}
    >
      {children}
    </Component>
  );
}
