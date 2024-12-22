import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pageComponent: boolean;
  searchQuery?: string;
}

const ServerPagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  pageComponent,
  searchQuery
}) => {
  const ellipsis = '...';

  const showPages = (currentPage: number, totalPages: number) => {
    const pagesToShow: (number | string)[] = [];

    if (currentPage !== 1)
      pagesToShow.push(1);
    if (currentPage > 3)
      pagesToShow.push(ellipsis);

    if (currentPage === totalPages)
      pagesToShow.push(currentPage - 2);

    if (currentPage > 2)
      pagesToShow.push(currentPage - 1);

	pagesToShow.push(currentPage);

    if (currentPage < totalPages) {
      pagesToShow.push(currentPage + 1);
    }

    if (currentPage < totalPages - 2) pagesToShow.push(ellipsis);
    if (totalPages > 1 && totalPages !== currentPage + 1)
      pagesToShow.push(totalPages);


    return pagesToShow;
  };

  const paginationNumbersWithEllipsis = showPages(currentPage, totalPages);

  const buttonStyle: string =
    'h-fit mx-2 px-4 py-2 rounded-md text-white text-base';

  const staticButton = (pageNumber: string | number, index?: number) => {
    const pageUrl = pageComponent
      ? `/page/${pageNumber}`
      : `/search/${searchQuery}?page=${pageNumber}`;
	if (pageNumber === ellipsis) {
		return (
	    <div key={index} className={`${buttonStyle} bg-blue-900`}>
          {pageNumber}
        </div>
		)
	}

    return (
      <Link key={index} href={pageUrl}>
        <div
          className={`${buttonStyle} ${pageNumber === currentPage ? 'bg-blue-500' : 'bg-blue-900'}`}
        >
          {pageNumber}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex justify-center full">
      {currentPage > 1 && (
        <Link href={pageComponent ? `/page/${currentPage - 1}` : `/search/${searchQuery}?page=${currentPage - 1}`}>
          <div className={`${buttonStyle} bg-blue-900`}>
            Prev
          </div>
        </Link>
      )}

      {paginationNumbersWithEllipsis.map((pageNumber, index) =>
        staticButton(pageNumber, index)
      )}

      {currentPage < totalPages && (
        <Link href={pageComponent ? `/page/${currentPage + 1}` : `/search/${searchQuery}?page=${currentPage + 1}`}>
          <div className={`${buttonStyle} bg-blue-900`}>
            Next
          </div>
        </Link>
      )}
    </div>
  );
};

export default ServerPagination;
