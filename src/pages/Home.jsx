import React, { useState, useEffect } from "react";
import {
  Play,
  Star,
  ChevronRight,
  ChevronLeft,
  Info,
  Plus,
  Calendar,
} from "lucide-react";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const api_key = "35fe74fbe9e1311a5d12663d63ce3178";
  const base_url = "https://api.themoviedb.org/3";
  const image_base_url = "https://image.tmdb.org/t/p/";

  // Unique fallback movies for different categories
  const fallbackMovies = {
    featured: [
      {
        id: 1,
        title: "Inception",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        runtime: 148,
        vote_average: 8.8,
        release_date: "2010-07-16",
      },
      {
        id: 2,
        title: "The Shawshank Redemption",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        runtime: 142,
        vote_average: 9.2,
        release_date: "1994-09-23",
      },
    ],
    trending: [
      {
        id: 2,
        title: "Interstellar",
        backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        runtime: 169,
        vote_average: 8.6,
        release_date: "2014-11-07",
      },
    ],
    topRated: [
      {
        id: 3,
        title: "The Dark Knight",
        backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        runtime: 152,
        vote_average: 9.0,
        release_date: "2008-07-18",
      },
    ],
    upcoming: [
      {
        id: 4,
        title: "Tenet",
        backdrop_path: "/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
        poster_path: "/zXWTfKvcpaDExA4HLpT9ZL9jOhm.jpg",
        runtime: 150,
        vote_average: 7.5,
        release_date: "2020-08-26",
      },
    ],
  };

  const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Animation",
    "Thriller",
    "Documentary",
  ];

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);

        const trendingRes = await fetch(
          `${base_url}/trending/movie/week?api_key=${api_key}`
        );
        const popularRes = await fetch(
          `${base_url}/movie/popular?api_key=${api_key}`
        );
        const topRatedRes = await fetch(
          `${base_url}/movie/top_rated?api_key=${api_key}`
        );
        const upcomingRes = await fetch(
          `${base_url}/movie/upcoming?api_key=${api_key}`
        );

        const [trendingData, popularData, topRatedData, upcomingData] =
          await Promise.all([
            trendingRes.ok ? trendingRes.json() : { results: [] },
            popularRes.ok ? popularRes.json() : { results: [] },
            topRatedRes.ok ? topRatedRes.json() : { results: [] },
            upcomingRes.ok ? upcomingRes.json() : { results: [] },
          ]);

        // Fetch detailed featured movies (first 5 from trending)
        const detailedFeaturedMovies = await Promise.all(
          (trendingData.results || []).slice(0, 5).map(async (movie) => {
            const detailsRes = await fetch(
              `${base_url}/movie/${movie.id}?api_key=${api_key}&append_to_response=credits,videos`
            );
            return detailsRes.ok ? await detailsRes.json() : null;
          })
        );

        setFeaturedMovies(
          detailedFeaturedMovies.filter(Boolean).length
            ? detailedFeaturedMovies
            : fallbackMovies.featured
        );
        setTrendingMovies(
          popularData.results.length
            ? popularData.results.slice(0, 6)
            : fallbackMovies.trending
        );
        setTopRatedMovies(
          topRatedData.results.length
            ? topRatedData.results.slice(0, 6)
            : fallbackMovies.topRated
        );
        setUpcomingMovies(
          upcomingData.results.length
            ? upcomingData.results.slice(0, 6)
            : fallbackMovies.upcoming
        );

        setIsLoading(false);
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error("API error:", error);
        setFeaturedMovies(fallbackMovies.featured);
        setTrendingMovies(fallbackMovies.trending);
        setTopRatedMovies(fallbackMovies.topRated);
        setUpcomingMovies(fallbackMovies.upcoming);
        setIsLoading(false);
        setTimeout(() => setIsLoaded(true), 100);
      }
    };

    fetchMovieData();
  }, [base_url, api_key]);

  // Separate effect for slider auto-advance
  useEffect(() => {
    if (!featuredMovies.length) return;

    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);

    return () => clearInterval(sliderTimer);
  }, [featuredMovies.length]);

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const getYear = (date) => (date ? new Date(date).getFullYear() : "N/A");

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Slider Section */}
      <div className="relative pt-16 overflow-hidden">
        {/* Loading state */}
        {isLoading && (
          <div className="h-96 md:h-screen max-h-[800px] bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="text-white">Loading featured movies...</div>
          </div>
        )}

        {/* Featured movies slider */}
        {!isLoading && featuredMovies.length > 0 && (
          <div className="relative h-96 md:h-screen max-h-[800px]">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
                <img
                  src={
                    movie.backdrop_path?.startsWith("/api")
                      ? movie.backdrop_path
                      : `${image_base_url}original${movie.backdrop_path}`
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-16 max-w-4xl">
                  <h1
                    className={`text-4xl md:text-6xl font-bold text-white mb-2 transition-all duration-700 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    {movie.title}
                  </h1>

                  <div
                    className={`flex items-center space-x-4 text-gray-300 text-sm md:text-base mb-4 transition-all duration-700 delay-100 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <span>{getYear(movie.release_date)}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span>{formatRuntime(movie.runtime)}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <div className="flex items-center">
                      <Star
                        className="h-4 w-4 text-yellow-400 mr-1"
                        fill="currentColor"
                      />
                      {Math.round(movie.vote_average * 10) / 10}
                    </div>
                  </div>

                  <div
                    className={`flex flex-wrap gap-2 mb-4 transition-all duration-700 delay-200 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    {movie.genres?.slice(0, 3).map((genre) => (
                      <span
                        key={genre.name}
                        className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <p
                    className={`text-gray-300 mb-6 max-w-2xl line-clamp-3 md:line-clamp-none transition-all duration-700 delay-300 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    {movie.overview}
                  </p>

                  <div
                    className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold flex items-center transition-colors duration-300">
                      <Play className="h-5 w-5 mr-2" /> Watch Now
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-bold flex items-center transition-colors duration-300">
                      <Info className="h-5 w-5 mr-2" /> More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider navigation */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex space-x-2">
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + featuredMovies.length) % featuredMovies.length
                  )
                }
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
                }
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slider indicators */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
              {featuredMovies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-red-600 w-8" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Movies Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl md:text-3xl font-bold text-white transition-all duration-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            Trending Now
          </h2>
          <a
            href="#"
            className={`text-red-500 hover:text-red-400 flex items-center transition-all duration-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {trendingMovies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              isLoaded={isLoaded}
              IMAGE_BASE_URL={image_base_url}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2
          className={`text-2xl md:text-3xl font-bold text-white mb-6 transition-all duration-500 ${
            isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <a
              key={category}
              href="#"
              className={`bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-4 text-center transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* Top Rated Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl md:text-3xl font-bold text-white transition-all duration-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            Top Rated
          </h2>
          <a
            href="#"
            className={`text-red-500 hover:text-red-400 flex items-center transition-all duration-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {topRatedMovies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              isLoaded={isLoaded}
              IMAGE_BASE_URL={image_base_url}
            />
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl md:text-3xl font-bold text-white transition-all duration-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-red-500" />
              Coming Soon
            </div>
          </h2>
          <a
            href="#"
            className={`text-red-500 hover:text-red-400 flex items-center transition-all duration-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {upcomingMovies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              isLoaded={isLoaded}
              IMAGE_BASE_URL={image_base_url}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 md:p-12 shadow-xl transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with the Latest Releases
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter and never miss new movies, exclusive
              content, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-700 text-white px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-red-500 flex-grow sm:max-w-md"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
