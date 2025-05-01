/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import {useNetflixStore} from "../../store/netflixStore";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import axios from "axios";
import { options } from "../../constant";
import SearchMovie from "./SearchMovie";

const Browse = () => {
  const {
    user,
    setNowPlayingMovies,
    setPopularMovies,
    setTopRatedMovies,
    setUpcomingMovies,
    toggle,
  } = useNetflixStore();
  const navigate = useNavigate();

  const getNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        options
      );
      setNowPlayingMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        options
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        options
      );
      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
        options
      );
      setUpcomingMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getNowPlayingMovies();
    getPopularMovies();
    getTopRatedMovies();
    getUpcomingMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {toggle ? (
          <SearchMovie />
        ) : (
          <>
            <MainContainer />
            <MovieContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
