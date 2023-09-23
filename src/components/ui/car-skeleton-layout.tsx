import { cn } from "@/lib/utils";
import CarSkeleton from "./car-skeleton";

type Props = {
  className?: string;
};
export default function CarSkeletonLayout({ className }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 mx-1 sm:mx-0",
        className,
      )}
    >
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
    </div>
  );
}
