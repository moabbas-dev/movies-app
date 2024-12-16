"use client"
import React, { useState } from 'react'
import {useParams} from 'next/navigation'
import MovieList from '@/components/MovieList/MovieList';
import Pagination from '@/components/Pagination/Pagination';

const page = () => {
	const { searchQuery } = useParams<{searchQuery: string}>();
	const search = searchQuery.toLocaleLowerCase()
	const [currentPage, setCurrentPage] = useState<number>(1)
	
	const handlePrevPage = () => {
		if (currentPage === 1) return;
		const newPage = currentPage - 1;
		setCurrentPage(newPage);
	  };
	
	  const handleNextPage = () => {
		if (currentPage === 12) return;
		const newPage = currentPage + 1;
		setCurrentPage(newPage);
	  };
	
	  const handleCurrentPage = (page: number) => {
		setCurrentPage(page);
	  };
	

  return (
	<div >
		<MovieList searchQuery={search}/>
	</div>
  )
}

export default page