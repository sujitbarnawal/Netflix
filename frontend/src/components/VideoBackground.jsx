/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { useNetflixStore } from "../../store/netflixStore";
import { options } from "../../constant";

const VideoBackground = ({ movieId }) => {
  const { setBackgroundMovie, backgroundMovie } = useNetflixStore();

  const getMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        options
      );
      const trailerMovie = response?.data?.results?.filter(
        (movie) => movie.type === "Trailer"
      );
      if (trailerMovie.length === 0) {
        setBackgroundMovie(response.data.results[0]);
      }else{

        setBackgroundMovie(trailerMovie[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovie();
    }
  }, [movieId]);

  if (!backgroundMovie) {
    return <div className="text-white p-4">Loading video...</div>;
  }

  return (
    <div className="w-screen">
      <iframe
        className="w-screen h-screen aspect-video"
        src={`https://www.youtube.com/embed/${backgroundMovie.key}?autoplay=1&mute=1&loop=1&playlist=${backgroundMovie.key}`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
