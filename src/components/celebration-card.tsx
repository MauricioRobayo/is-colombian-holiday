import { Card } from "./card";
import { Celebration } from "./celebration";
import Image from "next/image";
import happyFace from "svg-emojis/twemoji/1f600.svg";
import { ReactNode } from "react";

interface CelebrationCardProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}
export function CelebrationCard({
  children,
  title = "Is Holiday!",
  className,
}: CelebrationCardProps) {
  return (
    <Card variant="hero" disableHover className={className}>
      <Celebration className="h-16 text-2xl font-bold">{title}</Celebration>
      <Image src={happyFace} alt="smiley face" />
      {children}
    </Card>
  );
}
