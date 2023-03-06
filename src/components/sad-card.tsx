import Image from "next/image";
import { ReactNode } from "react";
import sadFace from "svg-emojis/twemoji/1f622.svg";
import { Card } from "./card";

interface SadCardProps {
  children?: ReactNode;
}
export function SadCard({ children }: SadCardProps) {
  return (
    <Card variant="hero">
      <div>{children}</div>
      <Image src={sadFace} alt="crying face" />
    </Card>
  );
}
