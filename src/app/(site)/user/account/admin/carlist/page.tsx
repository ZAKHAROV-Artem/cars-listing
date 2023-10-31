"use client";

import { PropagateLoader } from "react-spinners";
import { InView } from "react-intersection-observer";
import EditSellerDialog from "@/app/(site)/user/account/admin/components/edit-seller-dialog";
import useCars from "@/hooks/useCars";
import { Fragment, useState } from "react";
import ListCarItem from "@/components/cars/list-car-item";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { Car } from "@/types/api/car";
import { cn, range } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AdminCarlistPage() {
  const [page, setPage] = useState<number>(1);
  const { data, isInitialLoading, refetch } = useCars(page);

  return (
    <div className="py-5">
      {isInitialLoading ? (
        <div className="col-span-2 grid h-[50vh] place-content-center">
          <PropagateLoader color="#ef4444" />
        </div>
      ) : (
        <div className="relative space-y-5">
          {data?.data.data.map((car, carIndex) => (
            <div key={car.id}>
              <ListCarItem admin={true} car={car} refetch={refetch} />
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      )}
      {data?.data.meta.pagination?.pageCount && (
        <div className="flex w-fit items-center gap-x-3 ">
          <FaArrowLeft
            onClick={() => page > 1 && setPage(page - 1)}
            className={cn("cursor-pointer", {
              "cursor-not-allowed": page <= 1,
            })}
          />
          {data.data.meta.pagination.pageCount > 10 ? (
            <>
              <div className="flex overflow-hidden rounded-md">
                {page > 1 && (
                  <div
                    onClick={() => setPage(1)}
                    className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main"
                  >
                    1
                  </div>
                )}
                <div className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main">
                  {page}
                </div>
                {page + 1 < data.data.meta.pagination.pageCount && (
                  <div
                    onClick={() => setPage(page + 1)}
                    className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main"
                  >
                    {page + 1}
                  </div>
                )}
                <div className="mx-3 flex items-end gap-x-1">
                  <div className="h-1 w-1 rounded-full bg-primary-light" />
                  <div className="h-1 w-1 rounded-full bg-primary-light" />
                  <div className="h-1 w-1 rounded-full bg-primary-light" />
                </div>
                <div
                  onClick={() =>
                    setPage(data.data.meta.pagination?.pageCount || 1)
                  }
                  className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main"
                >
                  {data.data.meta.pagination.pageCount}
                </div>{" "}
              </div>
            </>
          ) : (
            <div className="flex overflow-hidden rounded-md">
              {range(1, data?.data.meta.pagination?.pageCount, 1).map((i) => (
                <div
                  key={i}
                  onClick={() => setPage(i)}
                  className={cn(
                    "grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main",
                    { "bg-primary-main": page === i },
                  )}
                >
                  {i}
                </div>
              ))}
            </div>
          )}
          <FaArrowRight
            onClick={() =>
              page < (data.data.meta.pagination?.pageCount || page - 1) &&
              setPage(page + 1)
            }
            className={cn("cursor-pointer", {
              "cursor-not-allowed": page >= data.data.meta.pagination.pageCount,
            })}
          />
        </div>
      )}
      <EditSellerDialog />
    </div>
  );
}
