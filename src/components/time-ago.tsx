"use client";

import { useEffect, useState } from "react";
import { format } from "timeago.js";

interface TimeAgoProps {
  date: Date;
}
export function TimeAgo({ date }: TimeAgoProps) {
  const [relativeDate, setRelativeDate] = useState(() => format(date));
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeDate(format(date));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);
  return <time dateTime={date.toISOString()}>{relativeDate}</time>;
}
