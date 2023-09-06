import CarSkeleton from "./car-skeleton";

export default function CarSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
