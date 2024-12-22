"use client"
interface PaginationProps {
  PreviousPageClick: () => void;
  NextPageClick: () => void;
  currentPageClick: (page: number) => void;
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  PreviousPageClick,
  NextPageClick,
  currentPageClick,
  totalPages,
  currentPage,
}) => {
  const ellipsis = "...";

  const showPages = (currentPage: number, totalPages: number) => {
    const pagesToShow: (number | string)[] = [];

    if (currentPage !== 1)
      pagesToShow.push(1);
    if (currentPage > 3)
      pagesToShow.push(ellipsis);

    if (currentPage === totalPages)
      pagesToShow.push(currentPage - 2);

    if (currentPage > 1)
      pagesToShow.push(currentPage - 1);

    pagesToShow.push(currentPage);

    if (currentPage < totalPages) {
      pagesToShow.push(currentPage + 1);
      pagesToShow.push(currentPage + 2);
    }

    if (currentPage < totalPages - 2) pagesToShow.push(ellipsis);
    if (totalPages > 1 && totalPages !== currentPage)
      pagesToShow.push(totalPages);


    return pagesToShow;
  };

  const paginationNumbersWithEllipsis = showPages(currentPage, totalPages);

  const buttonStyle: string =
    "h-fit mx-2 px-4 py-2 rounded-md text-white text-base hover:bg-blue-800 max-md:px-2 max-md:py-1";

  const staticButton = (pageNumber: string | number, index?: number) => {
    return (
      <button
        className={`${buttonStyle} ${
          pageNumber === currentPage ? "bg-blue-500" : "bg-blue-900"
        }`}
        onClick={() =>
          pageNumber !== ellipsis && currentPageClick(pageNumber as number)
        }
        disabled={pageNumber === ellipsis}
        key={index}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className="flex justify-center full">
      {currentPage > 1 && (
          <button
            onClick={PreviousPageClick}
            className={`${buttonStyle} bg-blue-900`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
      )}
      {paginationNumbersWithEllipsis.map((pageNumber, index) =>
        staticButton(pageNumber, index)
      )}
      {currentPage < totalPages && (
          <button
            onClick={NextPageClick}
            className={`${buttonStyle} bg-blue-900`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
      )}
    </div>
  );
};

export default Pagination;
