// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import Login from "./components/login";
// import SignUp from "./components/register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import RecordApp from "./RecordApp";
// import { auth } from "./components/firebase";

// function AppWrapper() {
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Conditionally apply class based on route
//   const isRecordApp = location.pathname === "/app";

//   return (
//     <div className={isRecordApp ? "record-mode" : "App"}>
//       <div className={isRecordApp ? "record-mode" : "auth-wrapper"}>
//         <div className={isRecordApp ? "record-mode" : "auth-inner"}>
//           <Routes>
//             <Route path="/" element={user ? <Navigate to="/app" /> : <Login />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<SignUp />} />
//             <Route path="/app" element={<RecordApp />} />
//           </Routes>
//           <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }

// export default App;

// MovieFinderApp.jsx (Main App Component)
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import './MovieFinderApp.css'; // Import your CSS
import ThemeContext from './context/ThemeContext';

function MovieFinderApp() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<MovieSearch darkMode={darkMode}/>} />
              <Route path="/movie/:id" element={<MovieDetails darkMode={darkMode}/>}/>
              <Route path="/favorites" element={<Favorites darkMode={darkMode}/>}/>
            </Routes>
          </Router>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default MovieFinderApp;