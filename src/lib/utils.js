import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) return "";
  return format(new Date(date), 'MMM dd, yyyy');
}

export function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
