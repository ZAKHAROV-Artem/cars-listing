import { Separator } from "@/components/ui/separator";

type Props = {
  params: { id: string };
};
export default function OrderPage({ params: { id } }: Props) {
  return (
    <div className="mx-auto max-w-4xl space-y-5 px-3 py-5 text-center">
      <div>
        Your car is successfully submitted. Please continue with payment.
      </div>
      <h4 className="font-bold">Payment: ETB 500 - Normal post</h4>
      <div className="flex justify-center">
        <h4 className="w-fit bg-primary-light p-1 font-bold text-white">
          {" "}
          Order ID: {id}
        </h4>
      </div>
      <span>
        Payment can be done via your nearest branch of CBE (Commercial Bank of
        Ethiopia)
      </span>
      <h4 className="font-bold">Account number: 1000036123428</h4>
      <h4 className="font-bold">Name: Araya Lakew</h4>
      <div>
        or in our office: Bole road, Getu Commercial Center 4th floor Room 405
      </div>
      <Separator />
      <div>Send payment slip on viber or whatsapp (0944 333333)</div>
      <div>
        After payment is done please send payment of proof and your order ID
        (216309) via one of the following:
      </div>
      <div>
        email: <span className="font-bold">info@mekina.net</span>
      </div>
      <div>
        whatsapp / viber / telegram:{" "}
        <span className="font-bold">0944 333333</span>
      </div>
    </div>
  );
}
