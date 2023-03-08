import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface NavItem {
  name: string;
  path: string;
}
interface NavProps {
  prev: NavItem;
  next: NavItem;
  className?: string;
  children?: ReactNode;
}
export function Nav({ prev, next, className, children }: NavProps) {
  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      <div>
        <Link href={prev.path} scroll={false}>
          &larr; {prev.name}
        </Link>
      </div>
      {children && <div>{children}</div>}
      <div>
        <Link href={next.path} scroll={false}>
          {next.name} &rarr;
        </Link>
      </div>
    </div>
  );
}
