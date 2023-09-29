import getTopCars from "@/actions/server/getTopCars";
import CarsSlider from "../../cars-slider";
import SectionHeading from "@/components/data-display/section-heading";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export default async function Sec02TopCars({ className }: Props) {
  const topCars = await getTopCars({
    "pagination[limit]": "12",
  });
  return (
    <div className={cn("m-1 space-y-10 sm:container", className)}>
      <SectionHeading
        className="ml-5 sm:ml-0"
        textAccent="Top cars this week"
      />
      <CarsSlider cars={topCars.data.data} />
    </div>
  );
}
