import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const baseStore = (set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  toggle: false,
  setToggle: (value) => set({ toggle: value }),

  nowPlayingMovies: [],
  setNowPlayingMovies: (movies) => set({ nowPlayingMovies: movies }),
  popularMovies: [],
  setPopularMovies: (movies) => set({ popularMovies: movies }),
  topRatedMovies: [],
  setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),
  upcomingMovies: [],
  setUpcomingMovies: (movies) => set({ upcomingMovies: movies }),


  hasHydrated: false,
  setHasHydrated: () => set({ hasHydrated: true }),
});


const useNetflixPersistedStore = create(
  devtools(
    persist(baseStore, {
      name: "netflix-store",
    })
  )
);


const useNetflixTempStore = create(devtools((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
  movieId: "",
  setMovieId: (id) => set({ movieId: id }),
  backgroundMovie: null,
  setBackgroundMovie: (link) => set({ backgroundMovie: link }),
  dialogMovie: null,
  setDialogMovie: (link) => set({ dialogMovie: link }),
})));

export const useNetflixStore = () => ({
  ...useNetflixPersistedStore(),
  ...useNetflixTempStore(),
});
