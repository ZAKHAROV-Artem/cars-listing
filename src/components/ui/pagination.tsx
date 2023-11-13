import { cn, range } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
};
export default function Pagination({ page, pageCount, setPage }: Props) {
  const handleChange = (page: number) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
  };
  return (
    <div className="flex w-fit items-center gap-x-3 ">
      <FaArrowLeft
        onClick={() => page > 1 && handleChange(page - 1)}
        className={cn("cursor-pointer", {
          "cursor-not-allowed": page <= 1,
        })}
      />
      {pageCount > 10 ? (
        <>
          <div className="flex overflow-hidden rounded-md">
            {page > 1 && (
              <div
                onClick={() => handleChange(1)}
                className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main"
              >
                1
              </div>
            )}
            <div className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main">
              {page}
            </div>
            {page + 1 < pageCount && (
              <div
                onClick={() => handleChange(page + 1)}
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
              onClick={() => handleChange(pageCount || 1)}
              className="grid h-8 w-8 cursor-pointer place-content-center bg-primary-light text-white duration-200 hover:bg-primary-main"
            >
              {pageCount}
            </div>{" "}
          </div>
        </>
      ) : (
        <div className="flex overflow-hidden rounded-md">
          {range(1, pageCount, 1).map((i) => (
            <div
              key={i}
              onClick={() => handleChange(i)}
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
        onClick={() => page < (pageCount || page - 1) && handleChange(page + 1)}
        className={cn("cursor-pointer", {
          "cursor-not-allowed": page >= pageCount,
        })}
      />
    </div>
  );
}
