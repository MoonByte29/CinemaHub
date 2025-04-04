import React from "react";
import { Play, Star } from "lucide-react";

const MovieCard = ({
  movie,
  index,
  isAnimated = true,
  isLoaded = true,  
  IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL,
}) => {
  console.log(movie.title + " " + IMAGE_BASE_URL);
  return (
    <div
      className={`relative group transition-all duration-500 transform hover:scale-105 ${
        isAnimated
          ? isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
          : ""
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
        <div className="relative">
          <img
            src={
              movie.poster_path?.startsWith("/api")
                ? movie.poster_path
                : `${IMAGE_BASE_URL}w500${movie.poster_path}`
            }
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-red-600 text-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-all duration-300">
              <Play className="h-6 w-6" />
            </button>
          </div>
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm font-bold rounded px-2 py-1 flex items-center">
              <Star
                className="h-3 w-3 text-yellow-400 mr-1"
                fill="currentColor"
              />
              {Math.round(movie.vote_average * 10) / 10}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
