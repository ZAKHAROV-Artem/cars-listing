import SearchInput from "@/components/navigation/search-input";
import Sec01BodyTypes from "./components/sections/sec-01-body-types";
import Sec02TopCars from "./components/sections/sec-02-top-cars";
import Sec03FeaturedCars from "./components/sections/sec-03-featured-cars";
import Sec04Tabs from "./components/sections/sec-04-tabs";
import Sec05Brands from "./components/sections/sec-05-brands";
import PostCarFloatingButton from "@/components/ui/post-car-floating-button";
import Filters from "./cars/search/components/filters";
import FiltersSearch from "./cars/search/components/filters-search";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div>
      <div className="mb-10  space-y-10">
        <div className="container">
          <div className="flex items-center justify-center">
            <FiltersSearch />
          </div>
          <Filters fromMain={true} />
        </div>
        <Sec01BodyTypes />
        <Sec02TopCars />
        <Sec03FeaturedCars />
        <Sec04Tabs />
        <Sec05Brands />
      </div>
      <PostCarFloatingButton />
    </div>
  );
}
