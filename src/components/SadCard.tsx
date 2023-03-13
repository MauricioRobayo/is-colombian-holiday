import { Card } from "./card";
import Image from "next/image";
import sadFace from "svg-emojis/twemoji/1f622.svg";

interface SadCardProps {
  title?: string;
  className?: string;
  longFormattedDate: string;
}
export function SadCard({
  title = "Not holiday",
  className,
  longFormattedDate,
}: SadCardProps) {
  return (
    <Card variant="hero" className={className}>
      <p className="text-2xl font-bold">{title}</p>
      <Image src={sadFace} alt="crying face" />
      <p>{longFormattedDate}</p>
    </Card>
  );
}
