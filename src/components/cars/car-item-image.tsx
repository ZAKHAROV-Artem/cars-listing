import { cn, formatNumberWithCommas } from "@/lib/utils";
import { Currency } from "@/types/api/price";
import Image from "next/image";

type Props = {
  image: string;
  featured?: boolean;
  alt?: string;
  width?: number;
  height?: number;
  brand?: string;
  model?: string;
  imgWrapperClassname?: string;
  price?: number;
  currency?: Currency;
  priceType?: string;
};
export default function CarItemImage({
  image,
  featured = false,
  width,
  height,
  brand,
  model,
  alt,
  price,
  currency,
  priceType,
  imgWrapperClassname,
}: Props) {
  return (
    <div className="relative">
      {featured && (
        <div className="absolute right-[-30px] top-[-8px] flex h-12 w-[100px] rotate-45 items-end justify-center bg-primary-light text-[12px] text-white">
          Featured
        </div>
      )}
      <div
        className={cn(
          "max-h-[120px] overflow-hidden xs:max-h-[150px] md:max-h-[200px]",
          imgWrapperClassname,
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={alt || ""}
            width={width || 230}
            height={height || 150}
            className="h-[120px] w-full object-cover xs:h-[150px] md:h-[200px]"
          />
        ) : (
          <Image
            src={"/imgs/car-placeholder.jpg"}
            alt={"Car placeholder"}
            width={400}
            height={300}
            className="h-[120px] w-full object-cover xs:h-[150px] md:h-[200px]"
          />
        )}
      </div>
      <div className="flex flex-col justify-between bg-primary-main px-2 py-1 font-bold text-white md:px-[10px] md:py-3">
        {model && brand && <div>{`${brand} ${model}`}</div>}
        <div>
          {priceType === "On call" ? (
            <>{priceType}</>
          ) : (
            <>
              {`${currency} ${formatNumberWithCommas(price || 0)}`}{" "}
              <span className="hidden xs:inline">{`(${priceType})`}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
