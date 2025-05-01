import React from "react";
import MovieLists from "./MovieLists";
import {useNetflixStore} from "../../store/netflixStore.js"

const MovieContainer = () => {

  const {popularMovies,topRatedMovies,upcomingMovies,nowPlayingMovies}=useNetflixStore()
  
  return (
    <div className="bg-black">
      <div className=" -mt-52 z-10 relative">
        <MovieLists title={"Now Playing Movies"} movies={nowPlayingMovies} />
        <MovieLists title={"Top Rated Movies"} movies={topRatedMovies} />
        <MovieLists title={"Popular Movies"} movies={popularMovies} />
        <MovieLists title={"Upcoming Movies"} movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;
