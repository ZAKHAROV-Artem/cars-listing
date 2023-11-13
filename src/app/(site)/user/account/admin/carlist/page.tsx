"use client";

import { PropagateLoader } from "react-spinners";
import EditSellerDialog from "@/app/(site)/user/account/admin/components/edit-seller-dialog";
import useCars from "@/hooks/useCars";
import { useState } from "react";
import ListCarItem from "@/components/cars/list-car-item";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { QueryParams } from "@/actions/client/getSearchedCars";
import { Button } from "@/components/ui/button";

export default function AdminCarlistPage() {
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [filters, setFilters] = useState<QueryParams>({});
  const { data, isInitialLoading, refetch } = useCars(page, filters);
  const handleSearch = () => {
    const filters: QueryParams = {};
    if (title) {
      filters["filters[title][$containsi]"] = title;
    }
    if (id) {
      filters["filters[id][$eq]"] = id;
    }
    setFilters(filters);
  };
  return (
    <div>
      {isInitialLoading ? (
        <div className="col-span-2 grid h-[50vh] place-content-center">
          <PropagateLoader color="#ef4444" />
        </div>
      ) : (
        <div className="relative space-y-5">
          <div className="flex flex-wrap gap-3">
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
            />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          {data?.data.data.map((car, carIndex) => (
            <div key={car.id}>
              <ListCarItem admin={true} car={car} refetch={refetch} />
              <Separator className="my-2" />
            </div>
          ))}
          <Pagination
            page={page}
            pageCount={data?.data.meta.pagination?.pageCount || 0}
            setPage={setPage}
          />
        </div>
      )}

      <EditSellerDialog />
    </div>
  );
}
