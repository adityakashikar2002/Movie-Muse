// Favorites.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Favorites.css';

function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorite-list">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="favorite-item">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;