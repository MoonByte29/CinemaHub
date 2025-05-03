import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails"; // Import the MovieDetail page

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
