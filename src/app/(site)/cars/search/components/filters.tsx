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
import { useRouter, useSearchParams } from "next/navigation";
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
  } = useFilters();
  const router = useRouter();
  const { data: bodyTypes } = useBodyTypes();
  const { data: brands } = useBrands();
  const { data: models } = useModels({ slug: brand });
  const { data: sellerTypes } = useSellerTypes();
  const { data: categories } = useCategories();
  const searchParams = useSearchParams();
  const handleSearch = () => {
    setIsOpen(false);
    let query = `/cars/search?`;
    if (category) query += `category=${category}`;
    if (bodyType) query += `&bodyType=${bodyType}`;
    if (brand) query += `&brand=${brand}`;
    if (model) query += `&model=${model}`;
    if (color) query += `&color=${color}`;
    if (fuel) query += `&fuel=${fuel}`;
    if (yearMade) query += `&yearMade=${yearMade}`;
    if (transmission) query += `&transmission=${transmission}`;
    if (sellerType) query += `&sellerType=${sellerType}`;
    if (minPrice) query += `&minPrice=${minPrice}`;
    if (maxPrice) query += `&maxPrice=${maxPrice}`;
    if (minMileage) query += `&minMileage=${minMileage}`;
    if (maxMileage) query += `&maxMileage=${maxMileage}`;
    if (searchParams.has("q")) query += `&q=${searchParams.get("q")}`;
    router.push(query);
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
                  {categories?.data.data.map((category) => (
                    <SelectItem
                      value={category.attributes.slug}
                      key={category.attributes.slug}
                    >
                      {category.attributes.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* BRAND */}
            <div>
              <Select
                value={brand || "all"}
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
                value={model || "all"}
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
                  <SelectItem value={"all"}>All models</SelectItem>
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
                value={color || "all"}
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
                value={fuel || "all"}
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
                value={yearMade || "all"}
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
                value={transmission || "all"}
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
                value={sellerType || "all"}
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
                value={bodyType || "all"}
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
                  type="text"
                  maxLength={10}
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Number(e.target.value.replace(/[,.\D]/g, "")))
                  }
                />
                <Input
                  placeholder="Max price"
                  type="text"
                  maxLength={10}
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Number(e.target.value.replace(/[,.\D]/g, "")))
                  }
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
                  type="text"
                  maxLength={10}
                  value={minMileage}
                  onChange={(e) =>
                    setMinMileage(Number(e.target.value.replace(/[,.\D]/g, "")))
                  }
                />
                <Input
                  placeholder="Max mileage"
                  type="text"
                  maxLength={10}
                  value={maxMileage}
                  onChange={(e) =>
                    setMaxMileage(Number(e.target.value.replace(/[,.\D]/g, "")))
                  }
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
