import React, { useEffect, useState } from "react";
import { options } from "../utils/Options";

const useSearch = (queryTerm) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `http://api.themoviedb.org/3/search/movie?query=${queryTerm}`,
        options
      );
      const jsonData = await response.json();
      setData(jsonData.results);
    }
    fetchMovies();
  }, [queryTerm]);

  console.log(data);

  return { data };
};

export default useSearch;
