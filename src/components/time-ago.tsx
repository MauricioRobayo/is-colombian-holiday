"use client";

import { format } from "timeago.js";

interface TimeAgoProps {
  date: Date;
}
export function TimeAgo({ date }: TimeAgoProps) {
  return <time dateTime={date.toISOString()}>{format(date)}</time>;
}
