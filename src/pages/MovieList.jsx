import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

const MovieList = ({ apiPath, title }) => {
  const { data: movies, error, loading } = useFetch(apiPath);

  if (loading) return <div className="min-h-screen">Loading...</div>;
  if (error) return <div className="min-h-screen">Error:{error.message}</div>;

  useEffect(() => {
    document.title = `${title} / MovieBite`;
  }, [title]);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto py-7">
        <h2 className="text-2xl text-center font-bold mb-4">{title}</h2>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MovieList;
