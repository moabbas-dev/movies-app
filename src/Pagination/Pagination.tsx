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
    pagesToShow.push(1);
    if (currentPage - 2 > 2) pagesToShow.push(ellipsis);
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
    "mx-2 bg-blue-900 px-4 py-2 rounded-md \
	text-white text-base hover:bg-blue-800 ";

  return (
    <div className="flex justify-center full">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`}>
          <button
            onClick={PreviousPageClick}
            className={buttonStyle}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </Link>
      )}
      {paginationNumbersWithEllipsis.map((pageNumber, index) => (
		<Link href={`/?page=${pageNumber}`} key={index}>
			<button
			key={index}
			className={buttonStyle}
			onClick={() =>
				pageNumber !== ellipsis && currentPageClick(pageNumber as number)
			}
			disabled={pageNumber === ellipsis}
			>
			{pageNumber}
			</button>
		</Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`}>
          <button
            onClick={NextPageClick}
            className={buttonStyle}
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
