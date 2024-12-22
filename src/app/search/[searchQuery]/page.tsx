import React from "react";
import MovieList from "@/components/MovieList/MovieList";
import ServerPagination from "@/components/ServerPagination/ServerPagination";
import { redirect } from "next/navigation";
import axios from "axios";

async function fetchSearch(query: string, page: number | undefined): Promise<APIResponse | null> {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&language=en-US&page=${page}`,
    );
    return res.data
  } catch(error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

interface SearchProps {
  params: {
    searchQuery: string
  },
  searchParams: {
    page?: string;
  }
}

const page = async ({params, searchParams}: SearchProps) => {
  const { searchQuery } = await params
  const { page } = await searchParams
  const query = searchQuery.toLocaleLowerCase();
  const currentPage = parseInt(page || "1", 10);
  const data = await fetchSearch(query, currentPage);
  const movies = data? data.results : []
  const totalPages = data?.total_pages || 1;

  if (!data || currentPage < 1)
    redirect(`/search/${searchQuery}?page=1`);

  return (
    <div className="flex flex-col mb-4">
      <MovieList 
        movieList={movies}/>
      <ServerPagination
        currentPage={currentPage === 0? 1 : currentPage}
        totalPages={totalPages}
        pageComponent={false}
        searchQuery={query}
      />
    </div>
  );
};

export default page;
