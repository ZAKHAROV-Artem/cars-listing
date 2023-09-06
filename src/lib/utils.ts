import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );
}

export function generateFilename(carId: number, i: number) {
  const date = dayjs().format("YYYY/MM/DD/HH/mm/ss");
  return `${date}-image-${i}-car-${carId}`;
}

export function formatNumberWithCommas(number: number): string {
  const numStr: string = String(number);

  const result: string[] = [];
  let count: number = 0;

  for (let i = numStr.length - 1; i >= 0; i--) {
    result.push(numStr[i]);
    count++;

    if (count === 3 && i !== 0) {
      result.push(",");
      count = 0;
    }
  }

  result.reverse();
  const finalStr: string = result.join("");

  return finalStr;
}
export function slugify(data: string) {
  return data.toLocaleLowerCase().split(" ").join("-");
}

export function addDomain(name?: string) {
  return name ? `${process.env.NEXT_PUBLIC_API}${name}` : "";
}
