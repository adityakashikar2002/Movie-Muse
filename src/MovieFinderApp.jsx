// // MovieFinderApp.jsx (Main App Component)
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MovieSearch from './components/MovieSearch';
// import MovieDetails from './components/MovieDetails';
// import Favorites from './components/Favorites';
// import Navbar from './components/Navbar';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import './MovieFinderApp.css'; // Import your CSS
// import ThemeContext from './context/ThemeContext';

// function MovieFinderApp() {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <Provider store={store}>
//       <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//         <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//           <Router>
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<MovieSearch />} />
//               <Route path="/movie/:id" element={<MovieDetails />} />
//               <Route path="/favorites" element={<Favorites />} />
//             </Routes>
//           </Router>
//         </div>
//       </ThemeContext.Provider>
//     </Provider>
//   );
// }

// export default MovieFinderApp;

// // MovieFinderApp.jsx (Main App Component)
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MovieSearch from './components/MovieSearch';
// import MovieDetails from './components/MovieDetails';
// import Favorites from './components/Favorites';
// import Navbar from './components/Navbar';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import './MovieFinderApp.css'; // Import your CSS
// import ThemeContext from './context/ThemeContext';

// function MovieFinderApp() {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <Provider store={store}>
//       <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//         <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//           <Router>
//             <Navbar />
//             <Routes>
//               <Route path="/app" element={<MovieSearch darkMode={darkMode}/>} />
//               <Route path="/movie/:id" element={<MovieDetails darkMode={darkMode}/>}/>
//               <Route path="/favorites" element={<Favorites darkMode={darkMode}/>}/>
//             </Routes>
//           </Router>
//         </div>
//       </ThemeContext.Provider>
//     </Provider>
//   );
// }

// export default MovieFinderApp;

// // MovieFinderApp.jsx (Main App Component)
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MovieSearch from './components/MovieSearch';
// import MovieDetails from './components/MovieDetails';
// import Favorites from './components/Favorites';
// import Navbar from './components/Navbar';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import './MovieFinderApp.css'; // Import your CSS
// import ThemeContext from './context/ThemeContext';

// function MovieFinderApp() {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <Provider store={store}>
//       <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//         <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//           <Router>
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<MovieSearch darkMode={darkMode}/>} />
//               <Route path="/movie/:id" element={<MovieDetails darkMode={darkMode}/>}/>
//               <Route path="/favorites" element={<Favorites darkMode={darkMode}/>}/>
//             </Routes>
//           </Router>
//         </div>
//       </ThemeContext.Provider>
//     </Provider>
//   );
// }

// export default MovieFinderApp;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import './MovieFinderApp.css';
import ThemeContext from './context/ThemeContext';

function MovieFinderApp() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <div className={`movie-finder ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <Navbar />
          <Routes>
            {/* <Route path="/app" element={<MovieSearch darkMode={darkMode}/>} /> */}
            <Route index element={<MovieSearch darkMode={darkMode}/>} />
            <Route path="movie/:id" element={<MovieDetails darkMode={darkMode}/>}/>
            <Route path="favorites" element={<Favorites darkMode={darkMode}/>}/>
          </Routes>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default MovieFinderApp;