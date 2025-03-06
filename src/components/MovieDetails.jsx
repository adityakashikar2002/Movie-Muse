// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovieById } from "../redux/movieActions";
// import "./MovieDetails.css";
// // import { FaStar, FaThumbsUp, FaRegNewspaper } from "react-icons/fa";


// function MovieDetails({ darkMode }) {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const movie = useSelector((state) => state.selectedMovie);
//   const loading = useSelector((state) => state.loading);
//   const error = useSelector((state) => state.error);

//   useEffect(() => {
//     dispatch(fetchMovieById(id));
//   }, [dispatch, id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!movie) return null;

//   return (
//     <div className={`movie-container`}>
//       {/* Left Section: Poster */}
//       <div className="movie-poster">
//         <img src={movie.Poster} alt={movie.Title} />
//       </div>
  
//       {/* Right Section: Movie Details */}
//       <div className={`movie-details ${darkMode ? "dark-mode" : ""}`}> {/* Apply dark-mode class here */}
//         <h2 className="movie-title">{movie.Title}</h2>
  
//         <div className="info-box">
//           <img src="/year.png" alt="year" className="info-icon" />
//           <p>
//             <strong>Year:</strong> {movie.Year}
//           </p>
//         </div>
  
//         {/* Ratings */}
//         <div className="ratings-box">
//           <p className="ratings-title"><strong>Ratings:</strong></p>
//           <div className="ratings-row">
//             {movie.Ratings?.map((rating, index) => {
//               let iconSrc;
//               if (rating.Source === "Internet Movie Database") {
//                 iconSrc = "/imdb.png";
//               } else if (rating.Source === "Rotten Tomatoes") {
//                 iconSrc = "/rotten.png";
//               } else if (rating.Source === "Metacritic") {
//                 iconSrc = "/metacritic.png";
//               }
//               return (
//                 <button key={index} className="rating-button">
//                   {iconSrc && <img src={iconSrc} alt={rating.Source} className="rating-icon" />}
//                   {rating.Source}: {rating.Value}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
  
//         <div className="info-box">
//           <img src="/actors.png" alt="actors" className="h-24" />
//           <p>
//             <strong>Actors:</strong> {movie.Actors}
//           </p>
//         </div>
  
//         <div className="info-box">
//           <img src="/plot.png" alt="plot" className="h-24" />
//           <p>
//             <strong>Plot:</strong> {movie.Plot}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
  
// }

// export default MovieDetails;

// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovieById } from "../redux/movieActions";
// import "./MovieDetails.css";

// function MovieDetails({ darkMode }) {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const movie = useSelector((state) => state.selectedMovie);
//   const loading = useSelector((state) => state.loading);
//   const error = useSelector((state) => state.error);

//   useEffect(() => {
//     dispatch(fetchMovieById(id));
//   }, [dispatch, id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!movie) return null;

//   return (
//     <div className={`movie-container`}>
//       {/* Left Section: Poster */}
//       <div className="movie-poster">
//         <img src={movie.Poster} alt={movie.Title} />
//       </div>

//       {/* Right Section: Movie Details */}
//       <div className={`movie-details ${darkMode ? "dark-mode" : ""}`}>
//         <h2 className="movie-title">{movie.Title}</h2>

//         <div className="info-box">
//           <img src="/year.png" alt="year" className="info-icon" />
//           <p>
//             <strong>Year:</strong> {movie.Year}
//           </p>
//         </div>

//         {/* Ratings */}
//         <div className="ratings-box">
//           <p className="ratings-title"><strong>Ratings:</strong></p>
//           <div className="ratings-row">
//             {movie.Ratings?.map((rating, index) => {
//               let iconSrc;
//               if (rating.Source === "Internet Movie Database") {
//                 iconSrc = "/imdb.png";
//               } else if (rating.Source === "Rotten Tomatoes") {
//                 iconSrc = "/rotten.png";
//               } else if (rating.Source === "Metacritic") {
//                 iconSrc = "/metacritic.png";
//               }
//               return (
//                 <button key={index} className="rating-button">
//                   {iconSrc && <img src={iconSrc} alt={rating.Source} className="rating-icon" />}
//                   {rating.Source}: {rating.Value}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div className="info-box">
//           <img src="/actors.png" alt="actors" className="h-24" />
//           <p>
//             <strong>Actors:</strong> {movie.Actors}
//           </p>
//         </div>

//         <div className="info-box">
//           <img src="/plot.png" alt="plot" className="h-24" />
//           <p>
//             <strong>Plot:</strong> {movie.Plot || "Plot not available."}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById } from "../redux/movieActions";
import "./MovieDetails.css";

function MovieDetails({ darkMode }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.selectedMovie);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  return (
    <div className={`movie-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>

      <div className="movie-details">
        <h2 className="movie-title">{movie.Title}</h2>

        <div className="info-box">
          <img src="/year.png" alt="year" className="info-icon" />
          <p><strong>Year:</strong> {movie.Year}</p>
        </div>

        <div className="info-box">
          <img src="/country.png" alt="country" className="info-icon" />
          <p><strong>Country:</strong> {movie.Country}</p>
        </div>

        <div className="info-box">
          <img src="/language.png" alt="language" className="info-icon" />
          <p><strong>Language:</strong> {movie.Language}</p>
        </div>

        <div className="info-box">
          <img src="/awards.png" alt="awards" className="info-icon" />
          <p><strong>Awards:</strong> {movie.Awards || "Awards not available."}</p>
        </div>

        <div className="ratings-box">
          <p className="ratings-title"><strong>Ratings:</strong></p>
          <div className="ratings-row">
            {movie.Ratings?.map((rating, index) => {
              let iconSrc;
              if (rating.Source === "Internet Movie Database") iconSrc = "/imdb.png";
              else if (rating.Source === "Rotten Tomatoes") iconSrc = "/rotten.png";
              else if (rating.Source === "Metacritic") iconSrc = "/metacritic.png";
              return (
                <button key={index} className="rating-button">
                  {iconSrc && <img src={iconSrc} alt={rating.Source} className="rating-icon" />}
                  {rating.Source}: {rating.Value}
                </button>
              );
            })}
          </div>
        </div>

        <div className="info-box">
          <img src="/actors.png" alt="actors" className="info-icon" />
          <p><strong>Actors:</strong> {movie.Actors}</p>
        </div>

        <div className="info-box">
          <img src="/plot.png" alt="plot" className="info-icon" />
          <p><strong>Plot:</strong> {movie.Plot || "Plot not available."}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;