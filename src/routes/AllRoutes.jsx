import { Routes, Route } from "react-router-dom";
import {
  MovieList,
  MovieDetails,
  PageNotFound,
  Search,
  Player,
} from "../pages";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import PrivateRoute from "../auth/PrivateRoute";
import ResetPassword from "../auth/ResetPassword";
import HandlePasswordReset from "../auth/HandlePasswordReset";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/handle-reset-password" element={<HandlePasswordReset />} />

      {/* now playing */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MovieList apiPath="movie/now_playing" title="Home" />
          </PrivateRoute>
        }
      />

      {/* movie details */}
      <Route
        path="movie/:id"
        element={
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        }
      />

      {/* videos */}
      <Route
        path="movie/:id/videos"
        element={
          <PrivateRoute>
            <Player />
          </PrivateRoute>
        }
      />

      {/* popular */}
      <Route
        path="movies/popular"
        element={
          <PrivateRoute>
            <MovieList apiPath="movie/popular" title="Popular" />
          </PrivateRoute>
        }
      />

      {/* top rated */}
      <Route
        path="movies/top"
        element={
          <PrivateRoute>
            <MovieList apiPath="movie/top_rated" title="Top" />
          </PrivateRoute>
        }
      />

      {/* upcoming */}
      <Route
        path="movies/upcoming"
        element={
          <PrivateRoute>
            <MovieList apiPath="movie/upcoming" title="Upcoming" />
          </PrivateRoute>
        }
      />

      {/* search */}
      <Route
        path="search"
        element={
          <PrivateRoute>
            <Search apiPath="search/movie" />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
