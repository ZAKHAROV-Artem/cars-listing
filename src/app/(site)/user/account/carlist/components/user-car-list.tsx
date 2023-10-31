"use client";
import useCurrentUserCars from "@/hooks/useCurrentUserCars";
import { InView } from "react-intersection-observer";
import ListCarItem from "@/components/cars/list-car-item";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
type Props = {
  userId: string;
};
export default function UserCarList({ userId }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useCurrentUserCars(userId);
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="relative grid grid-cols-1 gap-2">
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.data?.map((car) => (
            <div key={car.id}>
              <ListCarItem
                car={car}
                refetch={() =>
                  refetch({ refetchPage: (page, index) => index === i })
                }
              />
              <Separator className="my-2" />
            </div>
          ))}
        </Fragment>
      ))}

      {hasNextPage && (
        <InView
          as="div"
          className="absolute bottom-[400px] h-2 w-full bg-transparent"
          onChange={handleNextPage}
        />
      )}
    </div>
  );
}
