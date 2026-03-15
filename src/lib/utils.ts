/**
 * Houses cross-cutting utility helpers used throughout the component tree.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind conflicts.
 *
 * @param inputs - The class name fragments to merge.
 * @returns A normalized class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
