import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const { data: movies } = useSearch(queryTerm);

  useEffect(() => {
    document.title = `${queryTerm} / MovieBite`;
  }, queryTerm);
  return (
    <main>
      <section className="max-w-7xl py-7 m-auto">
        <p className="text-4xl text-gray-500 mt-6 text-center">
          {movies.length === 0
            ? `No results found for ${queryTerm}`
            : `Results for ${queryTerm}`}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie}></Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Search;
