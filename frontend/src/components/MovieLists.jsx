import React from 'react'
import MovieCard from './MovieCard'

const MovieLists = ({title,movies}) => {



  return (
    <div className='px-8'>
      <h1 className='text-3xl py-4 text-white'>{title}</h1>
      <div className='flex overflow-x-auto cursor-pointer hide-scrollbar '>
        <div className='flex items-center gap-2'>
            {movies?.map((movie)=>{
              return <MovieCard key={movie.id} movieId={movie.id} poster={movie?.poster_path}  />
            })}
        </div>
      </div>
    </div>
  )
}

export default MovieLists
