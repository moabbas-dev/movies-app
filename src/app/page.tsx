"use client"
import MovieList from '@/MovieList/MovieList';
import Header from '../Header/Header'


export default function Home() {

  return (
    <>
      <Header />
      <MovieList />
      <footer className="bg-blue-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>2024 Mohamad Abbas © All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
