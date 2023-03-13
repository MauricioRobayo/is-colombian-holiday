import { Card } from "./card";
import { Celebration } from "./celebration";
import Image from "next/image";
import happyFace from "svg-emojis/twemoji/1f600.svg";

interface CelebrationCardProps {
  holidayName: string;
  longFormattedDate: string;
  title?: string;
  className?: string;
}
export function CelebrationCard({
  longFormattedDate,
  holidayName,
  title = "Is Holiday!",
  className,
}: CelebrationCardProps) {
  return (
    <Card variant="hero" disableHover className={className}>
      <Celebration className="h-16 text-2xl font-bold">{title}</Celebration>
      <Image src={happyFace} alt="smiley face" />
      <div>
        <p>{longFormattedDate}</p>
        <p>{holidayName}</p>
      </div>
    </Card>
  );
}
