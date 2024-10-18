import { Routes, Route } from "react-router-dom";
import { MovieList, MovieDetails, PageNotFound, Search } from "../pages";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MovieList apiPath="movie/now_playing" title="Home" />}
      />
      <Route path="movie/:id" element={<MovieDetails />} />
      <Route
        path="movies/popular"
        element={<MovieList apiPath="movie/popular" title="Popular" />}
      />
      <Route
        path="movies/top"
        element={<MovieList apiPath="movie/top_rated" title="Top" />}
      />
      <Route
        path="movies/upcoming"
        element={<MovieList apiPath="movie/upcoming" title="Upcoming" />}
      />
      <Route path="search" element={<Search />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
