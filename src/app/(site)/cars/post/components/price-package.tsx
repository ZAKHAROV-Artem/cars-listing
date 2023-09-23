import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PricePackage } from "@/types/api/price-package";
type Props = {
  pricePackage: PricePackage;
  className?: string;
};
export default function PricePackage({ pricePackage, className }: Props) {
  return (
    <div
      className={cn("overflow-hidden max-w-[500px] rounded-xl bg-white shadow-md", className)}
    >
      <div className="bg-primary-main p-3 text-white">{pricePackage.name}</div>
      <div className="space-y-4 p-5 pb-8">
        <div className="flex justify-center gap-x-3 py-5 text-light-light">
          <div>{pricePackage.currency}</div>
          <div className="text-4xl">{pricePackage.price}</div>
          <div className="self-end">/ month</div>
        </div>
        <div>
          {pricePackage.includes.map((item) => (
            <>
              <div className="my-2" key={item}>
                {item}
              </div>
              <Separator />
            </>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="red">Buy</Button>
        </div>
      </div>
    </div>
  );
}
