import React, { useState, useEffect } from 'react';
import { Film, Search, User, Menu, X, Heart, Clock, Star } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Animation on initial load
    setIsLoaded(true);
    
    // Track scroll position for header style changes
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div 
            className={`flex items-center transition-all duration-500 transform ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <Film className={`h-8 w-8 text-emerald-400 mr-2 transition-transform duration-300 ${isScrolled ? 'rotate-0' : 'rotate-12'}`} />
            <span className="text-white text-xl font-bold">CinemaHub</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-8">
            {['Home', 'Movies', 'TV Shows', 'New Releases', 'My List'].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-white px-3 py-2 rounded-md font-medium hover:text-emerald-400 transition-all duration-300 relative overflow-hidden group ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          {/* Right Side Tools */}
          <div 
            className={`hidden md:flex items-center space-x-6 transition-all duration-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            {/* Search Bar */}
            <div className={`relative transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-emerald-400 transition-colors duration-300">
                <User className="h-6 w-6" />
              </button>
              
              {/* Dropdown Menu with Animation */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg overflow-hidden transform origin-top-right scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                <div className="py-1">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800">
                    <Clock className="h-4 w-4 mr-2" />
                    Watch Later
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800">
                    <Star className="h-4 w-4 mr-2" />
                    Reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-emerald-400 transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {['Home', 'Movies', 'TV Shows', 'New Releases', 'My List'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          
          {/* Mobile Search */}
          <div className="pt-2 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Mobile User Menu */}
          <div className="border-t border-gray-800 pt-4 pb-3">
            <div className="flex items-center px-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">User Profile</div>
                <div className="text-sm font-medium text-gray-400">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
                Profile
              </a>
              <a href="#" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
                Favorites
              </a>
              <a href="#" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
                Watch Later
              </a>
              <a href="#" className="block px-3 py-2 text-white font-medium hover:bg-gray-800 rounded-md">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;