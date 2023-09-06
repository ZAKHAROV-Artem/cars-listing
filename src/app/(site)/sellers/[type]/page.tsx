"use client";
import getSellers from "@/actions/server/getSellers";
import SellerItem from "./components/seller-item";
import useSellers from "@/hooks/useSellers";
import { Fragment } from "react";
import { PropagateLoader } from "react-spinners";
import { InView } from "react-intersection-observer";

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
            <div className="grid grid-cols-2 gap-5" key={i}>
              {page.data.map((seller) => (
                <SellerItem seller={seller} key={seller.id} />
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