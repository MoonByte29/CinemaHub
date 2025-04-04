import React from 'react';
import { Film, MessageCircle, Mail, Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Film className="h-8 w-8 text-emerald-400 mr-2" />
              <span className="text-white text-xl font-bold">CinemaHub</span>
            </div>
            <p className="text-sm mt-2">
              Your ultimate destination for movie reviews, ratings, and recommendations. Discover the best in cinema from around the world.
            </p>
          </div>
          
          {/* Quick Links - Two Columns */}
          <div className="mb-6 col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Column 1 - Movies */}
              <div>
                <h4 className="text-emerald-400 font-medium mb-3 text-sm">Movies</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">New Releases</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Top Rated</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Coming Soon</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Classics</a></li>
                </ul>
              </div>
              
              {/* Column 2 - Genres */}
              <div>
                <h4 className="text-emerald-400 font-medium mb-3 text-sm">Genres</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Action</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Comedy</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Drama</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Sci-Fi</a></li>
                </ul>
              </div>
              
              {/* Column 3 - Account */}
              <div>
                <h4 className="text-emerald-400 font-medium mb-3 text-sm">Account</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">My Profile</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Watchlist</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Reviews</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition duration-300 text-sm">Settings</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-emerald-400" />
                <a href="mailto:contact@cinemahub.com" className="hover:text-emerald-300 transition duration-300">contact@cinemahub.com</a>
              </li>
              <li className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-emerald-400" />
                <span>Live Chat Support</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white text-md font-semibold mb-3">Stay Updated</h4>
              <p className="text-sm mb-3">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-3 py-2 rounded-l outline-none flex-grow text-sm" 
                />
                <button className="bg-emerald-400 hover:bg-emerald-600 text-white px-4 py-2 rounded-r transition duration-300 text-sm font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="flex items-center text-sm">
              <span>© {currentYear} CinemaHub. All rights reserved.</span>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-emerald-300 transition duration-300">Privacy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-emerald-300 transition duration-300">Terms</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center text-xs text-gray-500">
          <div className="mb-2 md:mb-0">
            Made with <Heart className="h-3 w-3 inline text-emerald-500" /> by CinemaHub Team
          </div>
          <div>
            <span>Not affiliated with any movie studio or distributor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;