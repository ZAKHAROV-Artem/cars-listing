import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/collections";
import Link from "next/link";

type Props = {
  seller: User;
};
export default function SellerItem({ seller }: Props) {
  return (
    <div className="flex gap-x-5 border p-3">
      <Avatar className="h-20 w-20">
        <AvatarImage src={seller.image?.url} />

        <AvatarFallback>{`${seller.name.at(0)}${
          seller?.name?.split(" ")?.at(-1)?.at(0) || ""
        }`}</AvatarFallback>
      </Avatar>
      <div className="mt-3">
        <Link href={`/seller/${seller.id}`} className="text-2xl">
          {seller.name || seller.username}
        </Link>
        <div>{seller.description}</div>
      </div>
    </div>
  );
}
