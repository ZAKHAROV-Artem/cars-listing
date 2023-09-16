import { cn } from "@/lib/utils";
import CarSkeleton from "./car-skeleton";

type Props = {
  className?: string;
};
export default function CarSkeletonLayout({ className }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
