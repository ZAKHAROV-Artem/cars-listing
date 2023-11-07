import getPaymentPage from "@/actions/server/getPaymentPage";
import PricePackage from "../cars/post/components/price-package";
import Image from "next/image";

export const revalidate = 3600;
export default async function PaymentPage() {
  const data = await getPaymentPage();
  return (
    <div className="container">
      <h1 className="py-5 text-center text-xl font-[500] sm:text-2xl md:text-3xl">
        Payments
      </h1>
      <p>Payment can be done via your nearest branch of CBE (Commercial Bank of Ethiopia) and notify us on whatsapp/telegram/viber: 0944333333</p>
      <p>CBE Account number: 1000036123428</p>
      <Image 
      src="imgs/cbe-qr.png"
      width={400}
      height={400}
      quality={72}
      alt="qr code for cbe payment"
      />

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
