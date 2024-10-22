import React, { useEffect, useState } from "react";
import { options } from "../utils/Options";

const useSearch = (queryTerm) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      if (!queryTerm) return;

      setLoading(true);
      setError(null);
      try {
        const santizedQuery = encodeURIComponent(queryTerm);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${queryTerm}`,
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const jsonData = await response.json();
        setData(jsonData.results || []);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [queryTerm]);

  console.log(data);

  return { data, loading, error };
};

export default useSearch;
