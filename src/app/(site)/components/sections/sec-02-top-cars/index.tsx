import getTopCars from "@/actions/server/getTopCars";
import CarsSlider from "../../cars-slider";
import SectionHeading from "@/components/data-display/section-heading";

export default async function Sec02TopCars() {
  const topCars = await getTopCars({
    "pagination[limit]": "8",
  });
  return (
    <div className="m-1 space-y-10 sm:container ">
      <SectionHeading
        className="ml-5 sm:ml-0"
        textAccent="Top cars this week"
      />
      <CarsSlider cars={topCars.data.data} />
    </div>
  );
}
