import getFeaturedCars from "@/actions/server/getFeaturedCars";
import CarsList from "@/components/cars/cars-list";
import SectionHeading from "@/components/data-display/section-heading";

export const revalidate = 1800;
export default async function Sec03FeaturedCars() {
  const featuredCars = await getFeaturedCars({
    "pagination[limit]": "12",
  });
  return (
    <div className="rounded-[30px] bg-paper-light py-10 dark:bg-paper-dark md:rounded-[80px]">
      <div className="space-y-10 sm:container">
        <SectionHeading className="ml-5 sm:ml-0" textAccent="Featured cars" />
        <CarsList cars={featuredCars.data.data} />
      </div>
    </div>
  );
}
