import Image from "next/image";
import { ReactNode } from "react";
import stars from "svg-emojis/twemoji/2728.svg";
import { twMerge } from "tailwind-merge";

interface CelebrationProps {
  children: ReactNode;
  className?: string;
}
export function Celebration({ className, children }: CelebrationProps) {
  return (
    <p
      className={twMerge(
        "flex h-4 items-center justify-center gap-4",
        className
      )}
    >
      <Image src={stars} alt="stars" className="h-full" />
      {children}
      <Image src={stars} alt="stars" className="h-full" />
    </p>
  );
}
