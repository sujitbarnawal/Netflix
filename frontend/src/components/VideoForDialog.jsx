/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { useNetflixStore } from "../../store/netflixStore";
import { options } from "../../constant.js";

const VideoForDialog = () => {
  const { movieId, dialogMovie, setDialogMovie } = useNetflixStore();

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
        setDialogMovie(response.data.results[0]);
        
      }else{

        setDialogMovie(trailerMovie[0]);
      }
    } catch (error) {
      console.log("Axios error:", error);
    }
  };

  useEffect(() => {
    if ( !movieId) return;
    getMovie();
  }, [movieId]);

  return (
    <div className="">
      {dialogMovie?.key? (
        <iframe
          className="w-full h-full aspect-video"
          src={`https://www.youtube.com/embed/${dialogMovie.key}?autoplay=1&mute=1&loop=1&playlist=${dialogMovie.key}`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="text-white text-center py-10 text-lg">
          No trailer found
        </div>
      )}
    </div>
  );
};

export default VideoForDialog;
