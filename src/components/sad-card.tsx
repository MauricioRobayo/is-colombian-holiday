import { Card } from "./card";
import Image from "next/image";
import sadFace from "svg-emojis/twemoji/1f622.svg";
import { ReactNode } from "react";

interface SadCardProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}
export function SadCard({
  title = "It is not holiday.",
  className,
  children,
}: SadCardProps) {
  return (
    <Card variant="hero" className={className}>
      <p className="text-2xl font-bold">{title}</p>
      <Image src={sadFace} alt="crying face" />
      {children}
    </Card>
  );
}
