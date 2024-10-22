import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { options } from "../utils/Options";
import { video } from "framer-motion/client";

const Player = () => {
  const params = useParams();
  console.log(params);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id, name, key, type, published_at } = data;

  useEffect(
    () => {
      async function fetchMovieVideo() {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`,
            options
          );
          const json = await response.json();
          if (!json.results || json.results.length === 0) {
            throw new Error("No videos available");
          }

          const videoData =
            json.results.find((video) => video.type === "Trailer") ||
            json.results.find((video) => video.type === "Clip");
          json.results[0];

          if (!videoData) {
            throw new Error("No suitable video found");
          }
          setData(videoData);
        } catch (error) {
          toast.error(
            "This movie doesn't have any available videos. Redirecting back...",
            {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              className: "bg-gradient-to-r from-red-500 to-orange-500",
            }
          );
          console.error("Error fetching the video", error);
          setTimeout(() => {
            navigate(-1);
          }, 3000);
        } finally {
          setLoading(false);
        }
      }
      fetchMovieVideo();
    },
    [params.id],
    navigate
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!key) return null;
  return (
    <main className="min-h-screen pt-8">
      {" "}
      {/* Reduced padding-top */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="video-container">
            {" "}
            {/* Added a wrapper div */}
            <iframe
              className="w-full h-[calc(90vh-100px)] rounded-lg shadow-xl" // Adjusted height
              src={`https://www.youtube.com/embed/${data.key}`}
              title={name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {data && (
              <div className="flex m-6 justify-between items-center ">
                <p className="text-lg font-semibold">{data.name} </p>
                <p className="px-3 py-1 bg-blue-500 rounded-full text-white">
                  {data.type}
                </p>
                <p>{new Date(data.published_at).toLocaleDateString()} </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Player;
