"use client";

import SellerItem from "@/components/sellers/seller-item";
import useBrokers from "@/hooks/useBrokers";
import { PropagateLoader } from "react-spinners";
import { InView } from "react-intersection-observer";
import EditSellerDialog from "@/app/(site)/user/account/admin/components/edit-seller-dialog";

export default function AdminBrokersPage() {
  const {
    data,
    isInitialLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useBrokers();
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="py-5">
      {isInitialLoading ? (
        <div className="col-span-2 grid h-[50vh] place-content-center">
          <PropagateLoader color="#ef4444" />
        </div>
      ) : (
        <div className="relative space-y-5">
          {data?.pages.map((page, pageIndex) => (
            <div className="grid gap-5 sm:grid-cols-2" key={pageIndex}>
              {page.data.map((seller) => (
                <SellerItem
                  admin={true}
                  seller={seller}
                  key={seller.id}
                  refetch={() =>
                    refetch({
                      refetchPage: (page, index) => index === pageIndex,
                    })
                  }
                />
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

      <EditSellerDialog />
    </div>
  );
}
