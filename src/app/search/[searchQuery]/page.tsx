"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";

const page = () => {
  const { searchQuery } = useParams<{ searchQuery: string }>();
  const search = searchQuery.toLocaleLowerCase();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState<number>(12);
  const handlePrevPage = () => {
    if (currentPage > 1) handleCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handleCurrentPage(currentPage + 1);
  };

  const handleCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
	router.replace(`/search/${searchQuery}?page=${newPage}`);
  };

  useEffect(() => {
    const pageParam = Number(searchParams.get("page"));
	if (currentPage === 0)
		router.replace(`/search/${searchQuery}?page=1`);
	else if (Number(pageParam) !== currentPage)
		setCurrentPage(Number(pageParam));
  }, [searchParams]);

  const generateLink = (page: number) => `/search/${searchQuery}?page=${page}`;
  return (
    <div className="flex flex-col mb-4">
      <MovieList 
	  	searchQuery={search}
		currentPageNumber={currentPage}
		onTotalPagesChange={setTotalPages}/>
      <Pagination
        PreviousPageClick={handlePrevPage}
        currentPageClick={handleCurrentPage}
        NextPageClick={handleNextPage}
        currentPage={currentPage === 0? 1 : currentPage}
        totalPages={totalPages}
		link={generateLink}
      />
    </div>
  );
};

export default page;
