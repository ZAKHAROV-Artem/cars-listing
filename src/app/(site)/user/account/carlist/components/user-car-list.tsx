"use client";
import useCurrentUserCars from "@/hooks/useCurrentUserCars";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import AccountCarItem from "./account-car-item";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  userId: string;
};
export default function UserCarList({ userId }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCurrentUserCars(userId);
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  console.log(data);
  return (
    <div className="relative grid grid-cols-1 gap-2">
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.data?.map((car) => (
            <AccountCarItem car={car} key={car.id} />
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
