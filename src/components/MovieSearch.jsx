// // MovieSearch.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTrendingMovies, addToFavorites, removeFromFavorites } from '../redux/movieActions';
// import { Link } from 'react-router-dom';
// import './MovieSearch.css';

// function MovieSearch({ darkMode }) {
//   const [filter, setFilter] = useState('All');
//   const [randomMovies, setRandomMovies] = useState([]);
//   const [initialLoad, setInitialLoad] = useState(true);

//   const dispatch = useDispatch();
//   const items = useSelector((state) => state.items);
//   const trendingMovies = useSelector((state) => state.trending);
//   const favorites = useSelector((state) => state.favorites);
//   const loading = useSelector((state) => state.loading);
//   const error = useSelector((state) => state.error);

//   useEffect(() => {
//     dispatch(fetchTrendingMovies());
//   }, [dispatch]);

//   const getRandomMovies = useCallback(() => {
//     const allMovies = [...trendingMovies, ...items];
//     const shuffled = allMovies.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, 12);
//   }, [trendingMovies, items]);

//   useEffect(() => {
//     if (trendingMovies.length > 0 && initialLoad) {
//       setRandomMovies(getRandomMovies());
//       setInitialLoad(false);
//     }
//   }, [trendingMovies, initialLoad, getRandomMovies]);

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const isFavorite = (movieId) => {
//     return favorites.some((fav) => fav.imdbID === movieId);
//   };

//   const handleFavoriteToggle = (movie) => {
//     if (isFavorite(movie.imdbID)) {
//       dispatch(removeFromFavorites(movie.imdbID));
//     } else {
//       dispatch(addToFavorites(movie));
//     }
//   };

//   const displayedMovies = filter === 'Only Favorites' ? favorites : randomMovies;

//   return (
//     <div className={`movie-search ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//       <div className="filter-dropdown pl-6">
//         <label htmlFor="filter">Filter:</label>
//         <select id="filter" value={filter} onChange={handleFilterChange}>
//           <option value="All">All</option>
//           <option value="Only Favorites">Only Favorites</option>
//         </select>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {/* <div>
//         <img src='./movie-icon.png' alt="Movie Logo" className="pl-4 h-16 rounded-full"/> Movies
//       </div> */}
//       <div className="flex items-center space-x-3">
//         <img src="./movie-icon.png" alt="Movie Logo" className="h-16 rounded-full pl-4" />
//         <span className="text-lg font-extrabold">MOVIES FOR YOU </span>
//       </div>

//       <div className="movie-grid">
//         {displayedMovies.map((movie) => (
//           <div key={movie.imdbID} className="movie-item">
//             <Link to={`/app/movie/${movie.imdbID}`}>
//             <img src={movie.Poster} alt={movie.Title} />
//             </Link>
//             <div className="movie-info">
//               <Link to={`/app/movie/${movie.imdbID}`}>
//                 <div className="movie-text">
//                   <h3>{movie.Title}</h3>
//                   <p className="movie-year">{movie.Year}</p>
//                 </div>
//               </Link>
//               <button
//                 className={`favorite-button ${isFavorite(movie.imdbID) ? 'favorited' : ''}`}
//                 onClick={() => handleFavoriteToggle(movie)}
//               >
//                 {isFavorite(movie.imdbID) ? '♥' : '♡'}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MovieSearch;
//---------------------------------------------------
//---------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies, addToFavorites, removeFromFavorites } from '../redux/movieActions';
import { Link } from 'react-router-dom';
import './MovieSearch.css';

function MovieSearch({ darkMode }) {
  const [filter, setFilter] = useState('All');
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const movieRefs = useRef({});

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const favorites = useSelector((state) => state.favorites);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.imdbID === movieId);
  };

  const handleFavoriteToggle = (movie) => {
    if (isFavorite(movie.imdbID)) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const handleMovieHover = (movie, event) => {
    const x = event.clientX; // Cursor X position
    const y = event.clientY + window.scrollY; // Cursor Y position with scroll offset
  
    setPopupPosition({ x, y });
    setHoveredMovie(movie);
  };
  

  const handleMovieLeave = () => {
    setHoveredMovie(null);
  };

  const displayedMovies = filter === 'Only Favorites' ? favorites : items;

  return (
    <div className={`movie-search ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="filter-dropdown pl-6">
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Only Favorites">Only Favorites</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="flex items-center space-x-3">
        <img src="./movie-icon.png" alt="Movie Logo" className="h-16 rounded-full pl-4" />
        <span className="text-lg font-extrabold">MOVIES FOR YOU </span>
      </div>

      <div className="movie-grid">
        {displayedMovies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-item"
            ref={(el) => (movieRefs.current[movie.imdbID] = el)}
          >
            <div
              className="movie-poster-container"
              onMouseEnter={(event) => handleMovieHover(movie, event)}
              onMouseLeave={handleMovieLeave}
            >
              <Link to={`/app/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
              </Link>
            </div>
            <div className="movie-info">
              <Link to={`/app/movie/${movie.imdbID}`}>
                <div className={`movie-text ${darkMode ? 'dark-mode' : 'light-mode'}`}>
                  <h3>{movie.Title}</h3>
                  <p className="movie-year">{movie.Year}</p>
                </div>
              </Link>
              <button
                className={`favorite-button ${isFavorite(movie.imdbID) ? 'favorited' : ''}`}
                onClick={() => handleFavoriteToggle(movie)}
              >
                {isFavorite(movie.imdbID) ? '♥' : '♡'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {hoveredMovie && (
        <div
          className="movie-popup"
          style={{ left: popupPosition.x, top: popupPosition.y, width: '400px', height: '300px' }}
        >
          <div className="popup-content">
            <img src={hoveredMovie.Poster} alt={hoveredMovie.Title}/>
            <div>
              <h3>{hoveredMovie.Title}</h3>
              <p className="movie-year">{hoveredMovie.Year}</p>
              {hoveredMovie.Plot ? (
                <p className="movie-plot">
                  {hoveredMovie.Plot.length > 150 ? hoveredMovie.Plot.substring(0, 150) + '...' : hoveredMovie.Plot}
                </p>
              ) : (
                <p className="movie-plot">Plot not available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
