import Image from "next/image";
import { ReactNode } from "react";
import stars from "svg-emojis/twemoji/1f386.svg";

import { twMerge } from "tailwind-merge";

interface CelebrationProps {
  children: ReactNode;
  className?: string;
}
export function Celebration({ className, children }: CelebrationProps) {
  return (
    <div
      className={twMerge(
        "flex h-4 items-center justify-center gap-4",
        className
      )}
    >
      <Image src={stars} alt="stars" className="h-full" />
      <span className="flex-shrink-0">{children}</span>
      <Image
        src={stars}
        alt="stars"
        className="h-full place-self-start self-start"
      />
    </div>
  );
}
