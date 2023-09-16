"use client";
import { cn, range } from "@/lib/utils";
import { BsSearch } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useBodyTypes from "@/hooks/useBodyTypes";
import useBrands from "@/hooks/useBrands";
import { Input } from "@/components/ui/input";
import useModels from "@/hooks/useModels";
import { colors, fuels, transmissions } from "@/data/filters-data";
import { Button } from "@/components/ui/button";
import { Filter, useFilters } from "@/state/FiltersState";
import useSellerTypes from "@/hooks/useSellerTypes";
import RangeSlider from "@/components/ui/range-slider";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";

type Props = {
  fromMain?: boolean;
};
export default function Filters({ fromMain = false }: Props) {
  const {
    isOpen,
    category,
    bodyType,
    brand,
    model,
    color,
    fuel,
    yearMade,
    transmission,
    sellerType,
    minPrice,
    maxPrice,
    minMileage,
    maxMileage,
    setIsOpen,
    setCategory,
    setBodyType,
    setBrand,
    setModel,
    setColor,
    setFuel,
    setYearMade,
    setTransmission,
    setSellerType,
    setMinPrice,
    setMaxPrice,
    setMinMileage,
    setMaxMileage,
    setFilters,
  } = useFilters();
  const router = useRouter();
  const { data: bodyTypes } = useBodyTypes();
  const { data: brands } = useBrands();
  const { data: models } = useModels();
  const { data: sellerTypes } = useSellerTypes();
  const { data: categories } = useCategories();
  const handleSearch = () => {
    setIsOpen(false);
    if (fromMain) router.push("/cars/search");
    const filtersArr: Filter[] = [];
    if (category)
      filtersArr.push({
        key: "filters[category][slug][$eq]",
        value: category,
      });
    if (bodyType)
      filtersArr.push({
        key: "filters[car_ch][body_type][slug][$eq]",
        value: bodyType,
      });
    if (brand)
      filtersArr.push({
        key: "filters[car_ch][brand][slug][$eq]",
        value: brand,
      });
    if (model)
      filtersArr.push({
        key: "filters[car_ch][model][slug][$eq]",
        value: model,
      });
    if (color)
      filtersArr.push({
        key: "filters[car_ch][color][$eq]",
        value: color,
      });
    if (fuel)
      filtersArr.push({
        key: "filters[car_ch][fuel][$eq]",
        value: fuel,
      });
    if (yearMade)
      filtersArr.push({
        key: "filters[car_ch][year_made][$eq]",
        value: yearMade,
      });
    if (transmission)
      filtersArr.push({
        key: "filters[car_ch][transmission][$eq]",
        value: transmission,
      });
    if (sellerType)
      filtersArr.push({
        key: "filters[seller][seller_type][slug][$eq]",
        value: sellerType,
      });
    if (minPrice)
      filtersArr.push({
        key: "filters[price][price][$gt]",
        value: String(minPrice),
      });
    if (maxPrice)
      filtersArr.push({
        key: "filters[price][price][$lt]",
        value: String(maxPrice),
      });
    if (minMileage)
      filtersArr.push({
        key: "filters[car_ch][mileage][$gt]",
        value: String(minMileage),
      });
    if (maxMileage)
      filtersArr.push({
        key: "filters[car_ch][mileage][$lt]",
        value: String(maxMileage),
      });

    setFilters(filtersArr);
  };
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl duration-500 dark:border-slate-700",
        {
          "h-[1100px]  xs:h-[580px]  lg:h-[340px]": isOpen,
          "h-0": !isOpen,
        },
      )}
    >
      <div className="space-y-5 p-8">
        <div className="grid gap-x-10 gap-y-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="w-full  space-y-3">
            {/* CATEGORY */}
            <div>
              <Select
                defaultValue={category || "all"}
                onValueChange={(value) =>
                  setCategory(value === "all" ? "" : value)
                }
              >
                <Label>የመኪናው ሁኔታ | Category</Label>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All categories</SelectItem>
                  {categories?.data.data.map((brand) => (
                    <SelectItem
                      value={brand.attributes.slug}
                      key={brand.attributes.slug}
                    >
                      {brand.attributes.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* BRAND */}
            <div>
              <Select
                defaultValue={brand || "all"}
                onValueChange={(value) =>
                  setBrand(value === "all" ? "" : value)
                }
              >
                <Label>ስሪት | Brand</Label>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select brand type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All brands</SelectItem>
                  {brands?.data.data.map((brand) => (
                    <SelectItem
                      value={brand.attributes.slug}
                      key={brand.attributes.slug}
                    >
                      {brand.attributes.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* MODEL */}
            <div>
              <Select
                defaultValue={model || "all"}
                onValueChange={(value) =>
                  setModel(value === "all" ? "" : value)
                }
                disabled={!brand.length}
              >
                <Label>Models</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"all"} className="mt-3">
                    All models
                  </SelectItem>
                  {models?.data.data
                    .filter(
                      (model) =>
                        String(model.attributes.brand?.data.attributes.slug) ===
                        brand,
                    )
                    .map((model) => (
                      <SelectItem
                        value={model.attributes.slug}
                        key={model.attributes.slug}
                      >
                        {model.attributes.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>{" "}
          <div className="w-full space-y-3">
            <div>
              <Select
                defaultValue={color || "all"}
                onValueChange={(value) =>
                  setColor(value === "all" ? "" : value)
                }
              >
                <Label>Color:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All colors</SelectItem>
                  {colors?.map(({ value, hex }) => (
                    <SelectItem value={value} key={value}>
                      <div className="flex items-center gap-x-3">
                        {hex && (
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ background: hex }}
                          />
                        )}
                        <div>{value}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                defaultValue={fuel || "all"}
                onValueChange={(value) => setFuel(value === "all" ? "" : value)}
              >
                <Label>Fuel:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"all"} className="mt-3">
                    All fuels
                  </SelectItem>
                  {fuels.map((fuel) => (
                    <SelectItem value={fuel} key={fuel}>
                      {fuel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>{" "}
            </div>
            <div>
              {" "}
              <Select
                defaultValue={yearMade || "all"}
                onValueChange={(value) =>
                  setYearMade(value === "all" ? "" : value)
                }
              >
                <Label>Year made:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select year made" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"all"} className="mt-3">
                    All years
                  </SelectItem>
                  {range(
                    new Date().getFullYear() - 100,
                    new Date().getFullYear(),
                    1,
                  )
                    .reverse()
                    .map((year) => (
                      <SelectItem value={String(year)} key={year}>
                        {year}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>{" "}
            </div>
          </div>
          <div className="w-full space-y-3">
            <div>
              <Select
                defaultValue={transmission || "all"}
                onValueChange={(value) =>
                  setTransmission(value === "all" ? "" : value)
                }
              >
                <Label>Transmission:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All transmissions</SelectItem>
                  {transmissions.map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                defaultValue={sellerType || "all"}
                onValueChange={(value) =>
                  setSellerType(value === "all" ? "" : value)
                }
              >
                <Label>Seller type:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All seller types</SelectItem>
                  {sellerTypes?.data.data.map((sellerType) => (
                    <SelectItem
                      value={sellerType.attributes.slug}
                      key={sellerType.attributes.slug}
                    >
                      {sellerType.attributes.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                defaultValue={bodyType || "all"}
                onValueChange={(value) =>
                  setBodyType(value === "all" ? "" : value)
                }
              >
                <Label>Body type:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All types</SelectItem>
                  {bodyTypes?.data.data.map((bodyType) => (
                    <SelectItem
                      value={bodyType.attributes.slug}
                      key={bodyType.attributes.slug}
                    >
                      {bodyType.attributes.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="relative">
              <Label>Price:</Label>
              <RangeSlider
                min={0}
                max={20000000}
                minValue={minPrice}
                maxValue={maxPrice}
                setMinValue={setMinPrice}
                setMaxValue={setMaxPrice}
              />
              <div className="flex gap-x-3">
                <Input
                  placeholder="Min price"
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <Input
                  placeholder="Max price"
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="relative">
              <Label>Mileage:</Label>
              <RangeSlider
                min={0}
                max={1000000}
                minValue={minMileage}
                maxValue={maxMileage}
                setMinValue={setMinMileage}
                setMaxValue={setMaxMileage}
              />
              <div className="flex gap-x-3">
                <Input
                  placeholder="Min mileage"
                  type="number"
                  min={0}
                  value={minMileage}
                  onChange={(e) => setMinMileage(Number(e.target.value))}
                />
                <Input
                  placeholder="Max mileage"
                  type="number"
                  min={0}
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleSearch} className="space-x-2">
          <BsSearch />
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
}
