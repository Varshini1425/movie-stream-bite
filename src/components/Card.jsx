import { Link } from "react-router-dom";
import backUpImg from "../assets/backupImg.jpg";

const Card = ({ movie }) => {
  const { id, original_title, overview, poster_path } = movie;

  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : backUpImg;

  return (
    <Link to={`/movie/${id}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6 h-full flex flex-col">
        <img
          className="rounded-t-lg w-full h-auto object-cover"
          src={image}
          alt={original_title}
        />
        <div className="p-5 flex flex-col flex-grow">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {original_title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-1 flex-grow">
            {overview}
          </p>
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto">
            Read more
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
