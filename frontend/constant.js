export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_TOKEN}` ,
  },
};
