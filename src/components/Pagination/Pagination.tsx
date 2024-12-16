"use client";
import Link from "next/link";

interface PaginationProps {
  PreviousPageClick: () => void;
  NextPageClick: () => void;
  currentPageClick: (page: number) => void;
  totalPages: number;
  postsPerPage: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  PreviousPageClick,
  NextPageClick,
  currentPageClick,
  totalPages,
  postsPerPage,
  currentPage,
}) => {
  const ellipsis = "...";
  const showPages = (currentPage: number) => {
    const pagesToShow = [];
    if (currentPage <= 2) pagesToShow.push(1);
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pagesToShow.push(i);
    }
    if (currentPage + 2 < totalPages - 1) pagesToShow.push(ellipsis);
    if (totalPages > 1) pagesToShow.push(totalPages);

    return pagesToShow;
  };

  const paginationNumbersWithEllipsis = showPages(currentPage);

  const buttonStyle: string =
    "h-fit mx-2 px-4 py-2 rounded-md text-white text-base hover:bg-blue-800 max-md:px-2 max-md:py-1";

  const staticButton = (pageNumber: string | number, index?: number) => {
    return (
      <button
            className={`${buttonStyle} ${pageNumber === currentPage ? "bg-blue-500" : "bg-blue-900"}`}
            onClick={() =>
              pageNumber !== ellipsis && currentPageClick(pageNumber as number)
            }
            disabled={pageNumber === ellipsis}
            key={index}
          >
            {pageNumber}
          </button>
    )
  }

  return (
    <div className="flex justify-center full">
      {currentPage > 1 && (
        <Link href={`/page/${currentPage - 1}`}>
          <button
            onClick={PreviousPageClick}
            className={`${buttonStyle} bg-blue-900`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </Link>
      )}
      {paginationNumbersWithEllipsis.map((pageNumber, index) => (
        pageNumber === ellipsis ? staticButton(pageNumber, index) : 
        <Link href={`/page/${pageNumber}`} key={index}>
          {staticButton(pageNumber)}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/page/${currentPage + 1}`}>
          <button
            onClick={NextPageClick}
            className={`${buttonStyle} bg-blue-900`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
