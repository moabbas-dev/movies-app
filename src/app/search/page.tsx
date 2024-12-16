import SearchBar from '@/components/SearchBar/SearchBar'
import React from 'react'

const Home = () => {
  return (
    <div className='my-6 h-[calc(100vh-80px-56px-3rem)] flex justify-center items-center flex-col'>
      <h1 className='text-center font-bold text-5xl mb-10'>Find your favorite movies</h1>
      <SearchBar />

    </div>
  )
}

export default Home