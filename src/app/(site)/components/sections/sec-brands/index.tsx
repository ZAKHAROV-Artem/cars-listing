import getBrands from "@/actions/get/getBrands";
import SectionHeading from "@/components/data-display/section-heading";
import Image from "next/image";
import Link from "next/link";

export default async function SecBrands() {
  const brands = await getBrands();
  return (
    <div className="rounded-[20px] bg-paper-light py-10 dark:bg-paper-dark md:rounded-[80px]">
      <div className="container space-y-10">
        <SectionHeading textAccent="Brands" />
        <div className="grid grid-cols-4  md:grid-cols-8">
          {brands.data.data.map((brand) => (
            <Link
              href={`/cars/search?brand=${brand.attributes.slug}`}
              className="flex cursor-pointer flex-col items-center justify-between   gap-y-5  p-2 duration-200 hover:bg-default-light dark:hover:bg-default-dark sm:p-5"
              key={brand.id}
            >
              <Image
                src={brand.attributes.image.data.attributes.url}
                alt={brand.attributes.name}
                width={100}
                height={100}
                className="h-full max-h-[80px] w-full max-w-[80px] object-contain sm:max-h-[100px] sm:max-w-[100px]"
              />
              <div className="text-sm sm:text-lg md:text-xl">
                {brand.attributes.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
