# 🎬 CinemaHub

CinemaHub is a sleek React-based movie discovery app that fetches trending, top-rated, upcoming, and popular movies using the TMDB API. It includes a beautiful slider for featured movies, categories for filtering, and fallback data support if the API fails.

---

## 🚀 Features

- 🔥 Trending, Popular, Top-Rated, and Upcoming movies
- 🎞️ Featured movie slider with auto-advance
- ⚠️ Fallback data in case API fails
- 🧼 Clean and responsive UI
- ⏱ Runtime and release year formatting

---

## 🛠️ Tech Stack

- React
- Vite
- TMDB API
- CSS Modules / Tailwind (based on your project)
- Chart.js (optional if you're visualizing anything)

---

## 🧪 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cinemaHub.git
   cd cinemaHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add your TMDB API key:**
   ```
   VITE_API_KEY=your_tmdb_api_key
   VITE_BASE_URL=https://api.themoviedb.org/3
   VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```
---

## 🧩 Fallback Support

In case the TMDB API is unavailable or fails, the app uses predefined fallback movie data to ensure the UI remains populated and functional.

---


## 🔗 Live Demo

Check out the deployed app here:  
👉 [https://cinema-hub-one.vercel.app/](https://cinema-hub-one.vercel.app/)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Credits

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data.




