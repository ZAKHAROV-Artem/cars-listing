import getPaymentPage from "@/actions/server/getPaymentPage";
import PricePackage from "../cars/post/components/price-package";

export const revalidate = 3600;
export default async function PaymentPage() {
  const data = await getPaymentPage();
  return (
    <div className="container">
      <h1 className="py-5 text-center text-xl font-[500] sm:text-2xl md:text-3xl">
        Payments
      </h1>
      <div className="mb-5 flex w-full flex-wrap justify-center gap-5">
        {data?.data?.data?.attributes?.packages.map((pricePackage) => (
          <PricePackage
            className="grow"
            key={pricePackage.name}
            pricePackage={pricePackage}
          />
        ))}
      </div>
    </div>
  );
}
