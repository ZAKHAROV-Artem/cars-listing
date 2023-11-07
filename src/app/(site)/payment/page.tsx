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
      <div className="flex">
          <div className="flex-initial w-75 flex justify-center gap-x-3 py-5 text-light-light">
              <p>Payment can be done via CBE mobile app or your nearest branch of CBE <br/> After payment notify us on whatsapp /telegram /viber on: 0944333333</p>
              <p>CBE Account number: 1000036123428</p>
          </div>
          <div className="flex-initial w-32 w-32">
            <Image 
              src="imgs/cbe-qr.png"
              width={200}
              height={200}
              quality={72}
              alt="qr code for cbe payment"
            />
        </div>
      </div>
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
