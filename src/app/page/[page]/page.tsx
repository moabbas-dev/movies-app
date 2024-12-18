"use client";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const TotalPages = 12;
  // to access dynamic routing (page/[page])
  const { page } = useParams<{page: string}>();
  const router = useRouter();

  let pageNumber = parseInt(page, 10);
  if (pageNumber > TotalPages)
  {
    pageNumber = 1;
    useEffect(() => router.replace('/page/1'), [router]);
  }
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    router.replace(`/page/${newPage}`);
  };

  const handleNextPage = () => {
    if (currentPage === TotalPages) return;
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    router.replace(`/page/${newPage}`);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    router.replace(`/page/${page}`);
  };

  const generateLink = (page: number) => `/page/${page}`

  return (
    <div className="flex flex-col mb-4">
      <MovieList currentPageNumber={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={TotalPages}
        PreviousPageClick={handlePrevPage}
        NextPageClick={handleNextPage}
        currentPageClick={handleCurrentPage}
        link={generateLink}
      />
    </div>
  );
};

export default Page;
