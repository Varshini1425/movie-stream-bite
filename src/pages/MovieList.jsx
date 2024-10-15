import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

const MovieList = ({ apiPath, title }) => {
  const { data: movies } = useFetch(apiPath);

  useEffect(() => {
    document.title = `${title} / MovieBite`;
  }, [title]);
  // console.log(movies);
  return (
    <>
      <main className="min-h-screen">
        <section className="max-w-7xl py-7 m-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie}></Card>
            ))}
          </div>
        </section>
      </main>
      ;
    </>
  );
};

export default MovieList;
