import MovieList from "@/components/MovieList/MovieList";
import ServerPagination from "@/components/ServerPagination/ServerPagination";
import { redirect } from "next/navigation";
import axios from "axios";

async function fetchMovies(page: number | undefined): Promise<APIResponse | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

interface PageProps {
  params : {
    page: string
  }
}

const Page = async ({ params }: PageProps ) => {
  const TotalPages = 12;
  const { page } = await params
  const pageNumber = parseInt(page, 10);

  // Redirect if the page number is invalid or exceeds TotalPages
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > TotalPages) {
    redirect("/page/1");
  }
  const data = await fetchMovies(pageNumber);
  const movies = data? data.results : []

  const handlePrevPage = () => {
    if (pageNumber === 1) return;
    redirect(`/page/${pageNumber - 1}`);
  };

  const handleNextPage = () => {
    if (pageNumber < TotalPages)
      redirect(`/page/${pageNumber + 1}`);
  };

  const handleCurrentPage = (page: number) => {
    redirect(`/page/${page}`)
  };

  return (
    <div className="flex flex-col mb-4">
      <MovieList 
        movieList={movies} />
      <ServerPagination
        currentPage={pageNumber}
        totalPages={TotalPages}
        pageComponent={true}
      />
    </div>
  );
};

export default Page;
