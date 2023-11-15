import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime, Duration } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(dateString: string) {
  const currentDate: DateTime = DateTime.utc();
  const inputDate: DateTime = DateTime.fromISO(dateString);

  const duration: Duration = currentDate.diff(inputDate);

  const seconds: number = duration.as("seconds");
  const minutes: number = duration.as("minutes");
  const hours: number = duration.as("hours");
  const days: number = duration.as("days");

  if (seconds < 60) {
    return `${Math.floor(seconds)} ${
      seconds === 1 ? "Just now" : "seconds ago"
    } `;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${Math.floor(days)} ${days === 1 ? "day" : "days"} ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
