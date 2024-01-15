import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EnumLike } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createEnumFromObjectArray(
  objects: { label: string; value: string }[]
): EnumLike {
  const enumObject: EnumLike = {};

  for (const obj of objects) {
    enumObject[obj.value] = obj.value;
  }

  return enumObject;
}
