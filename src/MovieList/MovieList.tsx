"use client";
import Pagination from "@/Pagination/Pagination";
import { useState, useEffect } from "react";
import Link from "next/link";

const MovieList: React.FC= () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const TotalPages = 12;
  const postsPerPage = 18;
  const [search, setSearch] = useState<string>("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchMovies = async () => {
    const API_KEY = "3e22881aa72aedea24fe8343a338c1ff";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}&include_adult=false`
      );
      const data: APIResponse = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    const pageQuery = urlParams.get('page') ? parseInt(urlParams.get('page')!) : 1;

    setSearch(searchQuery);
    setCurrentPage(pageQuery);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.release_date.includes(search) ||
          movie.overview.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else
      setFilteredMovies(movies);
  }, [search, movies]);

  const handlePrevPage = () => {
    if (currentPage === 1)
      return ;
    setCurrentPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage === TotalPages)
      return ;
    setCurrentPage((prev) => prev + 1)
  }

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto my-6 gap-y-4 flex flex-col">
      <div title='search by title, date or description'
        className='container mx-auto mt-6 flex items-center'>
          <form className="w-full">
            <input type="text"
                  placeholder="Search..."
                  className='w-full h-12 px-4 border rounded-md'
                  onChange={handleSearchChange}/>
          <Link href={search !== "" ?`/?page=${currentPage}&search=${search}`:`/?page=${currentPage}`}>
            <button type="submit" className="hidden"></button>
          </Link>
          </form>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-x-4 gap-y-6 mb-6">
        {filteredMovies.map((movie) => (
          <li key={movie.id} className="bg-gray-300 rounded-lg p-2 shadow-xl">
            <div className="flex mb-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={100}
                className="rounded-lg shadow-blue-900"
              />
              <div className="pl-4">
                <h2 className="font-bold text-lg text-blue-900 ">{movie.title}</h2>
                <i className="text-gray-700">Release Date: <u>{movie.release_date}</u></i>
              </div>
            </div>
            <p className="tracking-wider">{movie.overview}</p>

          </li>
        ))}
      </ul>
      <Pagination 
        currentPage={currentPage}
        totalPages={TotalPages}
        postsPerPage={postsPerPage}
        PreviousPageClick={handlePrevPage}
        NextPageClick={handleNextPage}
        currentPageClick={handleCurrentPage}/>
    </div>
  );
};

export default MovieList;
