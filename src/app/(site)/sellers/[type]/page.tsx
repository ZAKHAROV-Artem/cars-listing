"use client";
import SellerItem from "@/components/sellers/seller-item";
import useSellers from "@/hooks/useSellers";
import { PropagateLoader } from "react-spinners";
import { InView } from "react-intersection-observer";
import dayjs from "dayjs";

type Props = {
  params: { type: string };
};
export default function SellersPage({ params: { type } }: Props) {
  const {
    data,
    isInitialLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSellers(type);
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="container py-5">
      {isInitialLoading ? (
        <div className="col-span-2 grid h-[50vh] place-content-center">
          <PropagateLoader color="#ef4444" />
        </div>
      ) : (
        <div className="relative space-y-5">
          {data?.pages.map((page, i) => (
            <div className="grid gap-5 sm:grid-cols-2" key={i}>
              {page.data.map((seller) => (
                dayjs() < dayjs(seller.pointsExpirationDate) && <SellerItem seller={seller} key={seller.id} />
              ))}
                
            </div>
          ))}
          <>
            {hasNextPage && (
              <InView
                as="div"
                className="absolute bottom-[400px] h-2 w-full bg-transparent"
                onChange={handleNextPage}
              />
            )}
          </>
        </div>
      )}
    </div>
  );
}
