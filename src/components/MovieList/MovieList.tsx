import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { TbFaceIdError } from "react-icons/tb";

async function fetchMovies(page: number | undefined): Promise<Movie[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`,
    );
    const data: APIResponse = response.data;
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function fetchSearch(query: string): Promise<Movie[]> {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&language=en-US`,
    );
    const data:APIResponse = res.data
    return data.results
  } catch(error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const MovieList: React.FC<{ currentPageNumber?: number, searchQuery?: string}> = ({
  currentPageNumber, searchQuery
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = searchQuery
          ? await fetchSearch(searchQuery)
          : await fetchMovies(currentPageNumber);
        setMovies(data);
      } catch (err) {
        console.error(err);
        setMovies([]);
      }
    };
    fetchData();
  }, [currentPageNumber, searchQuery]);


  const handlePopupToggle = (movieId: number) => {
    if (selectedMovieId === movieId) setSelectedMovieId(null);
    else setSelectedMovieId(movieId);
  };

  return (
    <div className="container mx-auto my-4 gap-y-4 flex flex-col max-lg:px-4">
      <SearchBar />
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-4 gap-y-6 mb-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-gray-300 rounded-lg p-2 shadow-xl"
            onClick={() => handlePopupToggle(movie.id)}
          >
            <div className="flex mb-2 max-md:flex-col max-md:items-center max-md:justify-center max-md:mb-0">
              <div className="flex-shrink-0">
                {
                  movie.poster_path? 
                  <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={100}
                  height={100}
                  className="rounded-lg shadow-blue-900 w-auto"
                />:<TbFaceIdError className="w-20 h-20" title="No image found!"/>
                }
                
              </div>
              <div className="md:pl-4">
                <h2 className="font-bold text-lg text-blue-900 max-md:text-center">
                  {movie.title}
                </h2>
                {movie.release_date?
                  <i className="text-gray-700 max-md:hidden">
                    Released on: <u className="text-nowrap">{movie.release_date}</u>
                  </i> : null
                }
              </div>
            </div>
            <p className="tracking-wider max-md:hidden h-60 overflow-auto hide-scrollbar shadow-inner shadow-gray-300">
              {movie.overview}
            </p>
            {selectedMovieId === movie.id && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center max-md:block md:hidden">
                <div className="bg-white p-4 rounded-lg w-4/5 max-w-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <p className="text-gray-700">
                    {movie.overview}
                    <br />
                    <i className="text-gray-500">
                      Release Date: <u>{movie.release_date}</u>
                    </i>
                  </p>
                  <button
                    className="mt-2 text-white bg-blue-500 px-4 py-2 rounded-md"
                    onClick={() => handlePopupToggle(movie.id)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
