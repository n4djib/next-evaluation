import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentTime() {
  var today = new Date();

  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  const hours_str = hours < 10 ? "0" + hours : hours;
  const minutes_str = minutes < 10 ? "0" + minutes : minutes;
  const seconds_str = seconds < 10 ? "0" + seconds : seconds;

  var time = hours_str + ":" + minutes_str + ":" + seconds_str;
  return time;
}
