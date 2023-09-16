import getSeller from "@/actions/server/getSeller";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import SellerCarsList from "./components/seller-cars-list";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};
export default async function SellerDetails({ params: { id } }: Props) {
  const { data: seller } = await getSeller(id).catch(() => {
    notFound();
  });
  if (!seller) notFound();
  return (
    <div className="container grid gap-x-3 py-5 md:grid-cols-[1fr,300px]">
      <div>
        {/* HEADER */}
        <div className="flex gap-x-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src={seller.image?.url} />

            <AvatarFallback>{`${seller.name.at(0)}${
              seller?.name?.split(" ")?.at(-1)?.at(0) || ""
            }`}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-3xl">{seller.name}</div>
            <div>{seller.description}</div>
          </div>
        </div>
        <Separator className="my-3" />
        {/* CARS LIST */}
        <h3 className="ml-2 text-2xl">{"User's cars"}</h3>
        <SellerCarsList sellerId={id} />
      </div>
      <div className="hidden bg-paper-light p-4 dark:bg-paper-dark md:block md:rounded-2xl lg:p-8 "></div>
    </div>
  );
}
