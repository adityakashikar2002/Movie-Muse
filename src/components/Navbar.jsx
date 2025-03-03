import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieActions';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const navigate = useNavigate();
  
    const handleLogoClick = () => {
      navigate('/'); // Navigate to the home page
    };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(fetchMovies(searchTerm));
      setSearched(true);
      setSearchSuggestions([]);
      navigate(`/search?query=${searchTerm}`); // Navigate to a search results page
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      dispatch(fetchMovies(e.target.value));
    } else {
      setSearchSuggestions([]);
    }
  };

  useEffect(() => {
    if (!searched && searchResults.length > 0) {
      setSearchSuggestions(searchResults.slice(0, 5));
    }
  }, [searchResults, searched]);

  const handleSuggestionClick = (movie) => {
    setSearchTerm(movie.Title);
    setSearchSuggestions([]);
    navigate(`/movie/${movie.imdbID}`);
  };

  // return (
  //   <nav className={`nav ${darkMode ? 'dark-mode' : 'light-mode'}`}>
  //     <img src="/logo-bg.png" alt="Logo" className="h-20 logo" />
  //     <div className="search-bar">
  //       <input
  //         type="text"
  //         placeholder="Search Movies or Shows"
  //         value={searchTerm}
  //         onChange={handleInputChange}
  //       />
  //       <button onClick={handleSearch}>Search</button>
  //       {searchSuggestions.length > 0 && (
  //         <ul className="search-suggestions">
  //           {searchSuggestions.map((movie) => (
  //             <li key={movie.imdbID} onClick={() => handleSuggestionClick(movie)}>
  //               <img src={movie.Poster} alt={movie.Title} className="suggestion-poster" />
  //               {movie.Title}
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>

  //     {/* <button className="profile-button2">
  //         {darkMode ? <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" /> : <img src="/user1.png" alt="User Profile" className="w-8 h-8 rounded-full" />}
  //     </button> */}

  //     <button onClick={toggleDarkMode} className="dark-mode-button">
  //       {darkMode ? (
  //         <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full" />
  //       ) : (
  //         <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />
  //       )}
  //     </button>
  //   </nav>
  // );
  return (
    <nav className={`nav ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <img
        src="/logo-bg.png"
        alt="Logo"
        className="h-20 logo cursor-pointer" // Add cursor-pointer
        onClick={handleLogoClick} // Add onClick handler
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies or Shows"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        {searchSuggestions.length > 0 && (
          <ul className="search-suggestions">
            {searchSuggestions.map((movie) => (
              <li key={movie.imdbID} onClick={() => handleSuggestionClick(movie)}>
                <img src={movie.Poster} alt={movie.Title} className="suggestion-poster" />
                {movie.Title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={toggleDarkMode} className="dark-mode-button">
        {darkMode ? (
          <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full" />
        ) : (
          <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />
        )}
      </button>
    </nav>
  );
}

export default Navbar;
