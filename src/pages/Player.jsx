import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { options } from "../utils/Options";
import { toast } from "react-toastify";

const Player = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieVideo();
  }, [params.id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data.key) return null;

  return (
    <main className="min-h-screen pt-8">
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="video-container">
            <div
              className="relative overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${data.key}?playsinline=1`}
                title={data.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                playsInline
              ></iframe>
            </div>
            {data && (
              <div className="flex flex-col md:flex-row m-6 md:justify-between items-center md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <p className="text-lg font-semibold text-center md:text-left">
                  {data.name || "Unknown"}
                </p>
                <p className="px-3 py-1 bg-blue-500 rounded-full text-white text-center">
                  {data.type || "Unknown Type"}
                </p>
                <p className="text-center md:text-left">
                  {data.published_at
                    ? new Date(data.published_at).toLocaleDateString()
                    : "Unknown Date"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Player;
