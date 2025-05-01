import React from 'react'
import {useNetflixStore} from '../../store/netflixStore'


const MovieCard = ({poster,movieId}) => {

  const {setOpen,setMovieId}=useNetflixStore()
  

  const handleOpen=()=>{
    setOpen(true)
    setMovieId(movieId)
  }



  return (
    <>
    <div onClick={handleOpen} className='w-48'>
      <img  src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={"Movie Poster"}/>
    </div>
    
    </>
  )
}

export default MovieCard
