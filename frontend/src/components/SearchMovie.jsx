/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { options } from "../../constant.js";
import MovieLists from "./MovieLists.jsx";

const SearchMovie = () => {
  const [search, setSearch] = useState("");
  const[hasSearched,setHasSearched]=useState(false)
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${search}`,
        options
      );
      if (response.data.results.length>0) {
        setSearchedMovies(response.data.results);
        setHasSearched(false)
      } else {
        setSearchedMovies([]);
        setHasSearched(true)
      }
    } catch (error) {
      console.log(error);
    } finally {
      
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center pt-[30%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%] w-full bg-black opacity-90 h-screen">
        <form
          onSubmit={handleSearchMovie}
          className="w-4/5 sm:w-2/3 md:w-1/2  "
        >
          <div className="flex justify-between  shadow-md border-none rounded-lg w-full ">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full px-3 py-2 bg-white text-black text-lg border border-white rounded-tl-md rounded-bl-md"
              type="text"
              placeholder="Search movie"
            />
            {loading ? (
              <button
                className="px-3 py-2 cursor-pointer bg-netflix rounded-tr-md rounded-br-md text-white outline-none   bg-white  text-lg border border-white "
                type="submit"
              >
                searching...
              </button>
            ) : (
              <button
                className="px-3 py-2 cursor-pointer bg-netflix rounded-tr-md rounded-br-md text-white outline-none   bg-white  text-lg border border-white "
                type="submit"
              >
                Search
              </button>
            )}
          </div>
        </form>
      </div>

      <div className=" -mt-120 z-10 relative">
        <MovieLists
          title={
            hasSearched && searchedMovies.length === 0 && !loading
              ? "No Movies Found"
              : ""
          }
          movies={searchedMovies}
        />
      </div>
    </>
  );
};

export default SearchMovie;
