import { Link } from "@/components/link";
import { twMerge } from "tailwind-merge";

interface Nav {
  name: string;
  path: string;
}
interface NavProps {
  prev: Nav;
  next: Nav;
  className?: string;
}
export function Nav({ prev, next, className }: NavProps) {
  return (
    <div className={twMerge("flex justify-between text-sm", className)}>
      <div>
        <Link href={prev.path}>&larr; {prev.name}</Link>
      </div>
      <div>
        <Link href={next.path}>{next.name} &rarr;</Link>
      </div>
    </div>
  );
}
