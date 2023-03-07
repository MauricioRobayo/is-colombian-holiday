import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Nav {
  name: string;
  path: string;
}
interface NavProps {
  prev: Nav;
  next: Nav;
  className?: string;
  children?: ReactNode;
}
export function Nav({ prev, next, className, children }: NavProps) {
  return (
    <div className={twMerge("flex justify-between text-sm", className)}>
      <div>
        <Link href={prev.path}>&larr; {prev.name}</Link>
      </div>
      {children && <div>{children}</div>}
      <div>
        <Link href={next.path}>{next.name} &rarr;</Link>
      </div>
    </div>
  );
}
