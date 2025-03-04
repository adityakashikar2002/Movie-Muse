import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieActions';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Navbar.css';

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searched, setSearched] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const navigate = useNavigate();
  
    const handleLogoClick = () => {
      navigate('/app'); // Navigate to the home page
    };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(fetchMovies(searchTerm));
      setSearched(true);
      setSearchSuggestions([]);
      navigate(`/app/search?query=${searchTerm}`); // Navigate to a search results page
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
    navigate(`/app/movie/${movie.imdbID}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
        }
      });
    };
    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // return (
  //   <nav className={`nav ${darkMode ? 'dark-mode' : 'light-mode'}`}>
  //     <img
  //       src="/logo-bg.png"
  //       alt="Logo"
  //       className="h-20 logo cursor-pointer" // Add cursor-pointer
  //       onClick={handleLogoClick} // Add onClick handler
  //     />
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

  //     <button onClick={toggleDarkMode} className="dark-mode-button">
  //       {darkMode ? (
  //         <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full" />
  //       ) : (
  //         <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />
  //       )}
  //     </button>

  //     <button className="profile-button2" onClick={handleProfileClick}>
  //         {darkMode ? <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" /> : <img src="/user1.png" alt="User Profile" className="w-8 h-8 rounded-full" />}
  //     </button>
  //     {showProfile && userDetails && (
  //         <div className="profile-dropdown"> {/* Changed to profile-dropdown */}
  //           <div className="profile-dropdown-content"> {/* Changed to profile-dropdown-content */}
  //             {/* <div className="profile-image-container">
  //               <img src={userDetails.photo} alt="Profile" className="profile-image" />
  //             </div> */}
  //             <h3 className="profile-title">Welcome, {userDetails.firstName}</h3>
  //             <div className="profile-details">
  //               <p>Email: {userDetails.email}</p>
  //             </div>
  //             <button className="profile-button" onClick={handleLogout}>
  //               Logout
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //   </nav>
  // );
  return (
    <nav className={`nav ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <img
        src="/logo-bg.png"
        alt="Logo"
        className="h-20 logo cursor-pointer"
        onClick={handleLogoClick}
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
  
      {/* Grouped buttons in a flex container */}
      <div className="nav-buttons">
        <button onClick={toggleDarkMode} className="dark-mode-button">
          {darkMode ? (
            <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full" />
          ) : (
            <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />
          )}
        </button>
  
        <button className="profile-button2" onClick={handleProfileClick}>
          {darkMode ? (
            <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <img src="/user1.png" alt="User Profile" className="w-8 h-8 rounded-full" />
          )}
        </button>
  
        {showProfile && userDetails && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-content">
              <h3 className="profile-title">Welcome, {userDetails.firstName}</h3>
              <div className="profile-details">
                <p>Email: {userDetails.email}</p>
              </div>
              <button className="profile-button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
  
}

export default Navbar;
