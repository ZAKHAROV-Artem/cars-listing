import CarItem from "./car-item";
import CarsNotFound from "./cars-not-found";
import { Car } from "@/types/api/car";
type Props = {
  cars: Car[];
};
export default function CarsList({ cars }: Props) {
  return (
    <div className="relative">
      <div className="m-1 grid grid-cols-2 gap-1 sm:m-0 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarItem car={car} key={car.id} />
        ))}
      </div>
      {!cars.length && <CarsNotFound />}
    </div>
  );
}
