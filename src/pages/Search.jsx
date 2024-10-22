import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import Card from "../components/Card";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const { data: movies, loading, error } = useSearch(queryTerm);

  useEffect(() => {
    document.title = `${queryTerm} / MovieBite`;
  }, [queryTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto py-7">
        <p className="text-4xl text-gray-500 m-6 text-center">
          {movies.length === 0
            ? `No results found for ${queryTerm}`
            : `Results for ${queryTerm}`}
        </p>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie}></Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Search;
