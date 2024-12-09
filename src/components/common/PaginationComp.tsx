import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PaginationComp = ({ pagesCount }: { pagesCount: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const { floor, min, max } = Math;
  const range = (lo: number, hi: number) =>
    Array.from({ length: hi - lo }, (_, i) => i + lo);

  const pagination =
    (count: number, ellipsis = true) =>
    (page: number, total: number) => {
      const start = max(
        1,
        min(page - floor((count - 3) / 2), total - count + 2)
      );
      const end = min(total, max(page + floor((count - 2) / 2), count - 1));
      return [
        ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
        ...range(start, end + 1),
        ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
      ];
    };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              searchParams.set("page", Math.max(+page - 1, 1).toString());
              setSearchParams(searchParams);
            }}
            aria-disabled={+page <= 1}
            tabIndex={+page <= 1 ? -1 : undefined}
            className={`!p-2 ${
              +page <= 1 ? "pointer-events-none opacity-50" : undefined
            }`}
          />
        </PaginationItem>
        {pagination(4)(+page, pagesCount)?.map((e, i) =>
          e === true ? (
            <PaginationItem key={`keyforpaginationellip${i}`}>
              <PaginationEllipsis className="w-8 sm:w-10 h-8 sm:h-10" />
            </PaginationItem>
          ) : (
            <PaginationItem className="" key={`keyforpagination${i}`}>
              <PaginationLink
                className={`w-8 sm:w-10 h-8 sm:h-10 ${
                  +page === e ? "bg-[#e9ecef] hover:bg-[#e9ecef]" : ""
                }`}
                onClick={() => {
                  searchParams.set("page", e.toString());
                  setSearchParams(searchParams);
                }}
              >
                {e}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              searchParams.set("page", (+page + 1).toString());
              setSearchParams(searchParams);
            }}
            aria-disabled={+page >= +pagesCount}
            tabIndex={+page >= +pagesCount ? -1 : undefined}
            className={`!p-2 ${
              +page >= +pagesCount
                ? "pointer-events-none opacity-50"
                : undefined
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
