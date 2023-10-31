import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/api/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEditSellerDialog } from "@/state/EditSellerDialogState";

type Props = {
  seller: User;
  admin?: boolean;
  refetch?: any;
};
export default function SellerItem({ seller, admin = false, refetch }: Props) {
  const setAll = useEditSellerDialog((state) => state.setAll);
  const handleOpen = () => {
    setAll({ seller, refetch, show: true });
  };
  return (
    <div className="flex gap-x-5 border p-3">
      <Avatar className="h-20 w-20">
        <AvatarImage src={seller.image?.url} />

        <AvatarFallback>{`${seller.name.at(0)}${
          seller?.name?.split(" ")?.at(-1)?.at(0) || ""
        }`}</AvatarFallback>
      </Avatar>
      <div className="mt-3 grow">
        <div className="flex w-full items-center justify-between">
          <Link href={`/seller/${seller.id}`} className="text-xl">
            {seller.name || seller.username}
          </Link>
          {admin && (
            <Button variant="outline" onClick={handleOpen}>
              Edit
            </Button>
          )}
        </div>
        <div className="text-sm">{seller.description}</div>
      </div>
    </div>
  );
}
