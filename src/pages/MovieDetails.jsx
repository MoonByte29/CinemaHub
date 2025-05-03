import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Calendar, Clock, ChevronLeft, Heart } from 'lucide-react';

const API_KEY = '35fe74fbe9e1311a5d12663d63ce3178'; // replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, similarRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`),
          axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
        ]);
        
        setMovie(movieRes.data);
        setSimilar(similarRes.data.results.slice(0, 4));
        
        // Add slight delay for animation
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    fetchMovie();
    // Reset loaded state when id changes
    setIsLoaded(false);
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center text-white p-10">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <button
        onClick={() => navigate('/')}
        className={`fixed top-6 left-6 z-50  text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="font-medium">Back</span>
      </button>

      {/* Backdrop image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/1920/1080";
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Poster */}
          <div 
            className={`w-64 h-96 rounded-lg overflow-hidden shadow-xl transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/600";
              }}
            />
          </div>

          {/* Movie details */}
          <div className="flex-1">
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {movie.title}
            </h1>
            
            <div 
              className={`flex items-center flex-wrap gap-4 text-gray-300 text-sm md:text-base mb-4 transition-all duration-500 delay-100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {movie.release_date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-emerald-500" />
                  {new Date(movie.release_date).getFullYear()}
                </div>
              )}
              
              {movie.runtime > 0 && (
                <>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-emerald-500" />
                    {formatRuntime(movie.runtime)}
                  </div>
                </>
              )}
              
              {movie.vote_average > 0 && (
                <>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-emerald-400 mr-1" fill="currentColor" />
                    {Math.round(movie.vote_average * 10) / 10}
                  </div>
                </>
              )}
            </div>

            <div 
              className={`flex flex-wrap gap-2 mb-6 transition-all duration-500 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p 
              className={`text-gray-300 mb-8 transition-all duration-500 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {movie.overview}
            </p>

            <div 
              className={`flex gap-4 mb-8 transition-all duration-500 delay-400 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold flex items-center transition-colors duration-300">
                Watch Now
              </button> */}
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold flex items-center transition-colors duration-300">
                <Heart className="h-5 w-5 mr-2" /> Add to Watchlist
              </button>
            </div>

            {/* Cast section */}
            {movie.credits?.cast?.length > 0 && (
              <div 
                className={`transition-all duration-500 delay-500 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">Top Cast</h3>
                <div className="flex flex-wrap gap-6">
                  {movie.credits.cast.slice(0, 5).map((person) => (
                    <div key={person.id} className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-800">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                            {person.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium">{person.name}</p>
                      <p className="text-xs text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div 
            className={`py-12 transition-all duration-500 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {similar.map((movie) => (
                <div 
                  key={movie.id} 
                  className="cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-2">
                    {movie.poster_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium truncate">{movie.title}</h3>
                  <p className="text-xs text-gray-400">{movie.release_date ? new Date(movie.release_date).getFullYear() : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;