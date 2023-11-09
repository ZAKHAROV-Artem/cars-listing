import SearchInput from "@/components/navigation/search-input";
import SecBodyTypes from "./components/sections/sec-body-types";
import SecTopCars from "./components/sections/sec-top-cars";
import SecFeaturedCars from "./components/sections/sec-featured-cars";
import SecTabs from "./components/sections/sec-tabs";
import SecBrands from "./components/sections/sec-brands";
import PostCarFloatingButton from "@/components/ui/post-car-floating-button";
import Filters from "./cars/search/components/filters";
import FiltersSearch from "./cars/search/components/filters-search";

export const revalidate = 600;
// export const dynamic = "force-dynamic";
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
        <SecBodyTypes />
        <SecTabs />
        <SecFeaturedCars />
        <SecTopCars />
        <SecBrands />
      </div>
      <PostCarFloatingButton />
    </div>
  );
}
