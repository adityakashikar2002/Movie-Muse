// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./components/login";
// import SignUp from "./components/register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { auth } from "./components/firebase";
// import MovieFinderApp from "./MovieFinderApp";
// import './App.css';

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
//             {/* <Route path="/" element={user ? <Navigate to="/app" /> : <Login />} /> */}
//             <Route index element={user ? <Navigate to="/app" /> : <Login />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<SignUp />} />
//             <Route path="/app" element={<MovieFinderApp/>} />
//             <Route path="/app/*" element={<MovieFinderApp />} /> {/* Add the wildcard here */}
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

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";
import MovieFinderApp from "./MovieFinderApp";
import './App.css';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Check if the current route is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

  return (
    <div className={isAuthPage ? "App" : ""}>
      <div className={isAuthPage ? "auth-wrapper" : ""}>
        <div className={isAuthPage ? "auth-inner" : ""}>
          <Routes>
            <Route index element={user ? <Navigate to="/app" /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/app" element={<MovieFinderApp />} />
            <Route path="/app/*" element={<MovieFinderApp />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
