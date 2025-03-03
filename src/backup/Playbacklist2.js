// //PlaybackList.js
// import React, { useState } from "react";

// const PlaybackList = ({
//   recordings,
//   deleteRecording,
//   handlePlayFromList,
//   currentlyPlayingId,
//   darkMode,
//   saveRecording
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter recordings based on search query
//   const filteredRecordings = recordings.filter((rec) =>
//     (rec.filename || `Recording ${rec.id}`)
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   // Function to download recording with its name
//   const downloadRecording = (blob, filename) => {
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-6 shadow-2xl rounded-2xl mt-6">
//       {/* Search Bar */}
//       <div className="flex justify-center items-center h-16 w-full">
//         <input 
//           type="text"
//           placeholder="Search Recording..."
//           className="search-bar px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-1/2 mb-4"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Title with GIF */}
//       <h2
//         className={`text-3xl font-extrabold bg-gradient-to-r ${
//           darkMode
//             ? "from-white via-green-300 to-teal-400"
//             : "from-gray-800 via-green-300 to-teal-400"
//         } text-transparent bg-clip-text drop-shadow-lg mb-6 flex items-start space-x-3 rounded-xl p-4`}
//       >
//         <img
//           src="/record.gif"
//           alt="Microphone GIF"
//           className="w-12 h-12 rounded-xl shadow-md"
//         />
//         <span className="tracking-wide">RECORDS</span>
//       </h2>

//       {filteredRecordings.length === 0 ? (
//         <p className="text-gray-300 italic text-center">
//           No matching recordings found.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[...filteredRecordings].reverse().map((rec) => (
//             <div
//               key={rec.id}
//               className="flex flex-col items-center space-y-4 p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
//             >
//               {/* Show filename if available, else default name */}
//               <div className="text-white font-bold text-lg">
//                 {rec.filename ? rec.filename : `Recording ${rec.id}`}
//               </div>

//               {/* Buttons: Play, Download, Delete */}
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handlePlayFromList(rec.blob, rec.id)}
//                   className={`${
//                     currentlyPlayingId === rec.id
//                       ? "bg-orange-500 hover:bg-orange-600"
//                       : "bg-green-500 hover:bg-green-600"
//                   } text-white px-4 py-2 rounded-full transition-colors`}
//                 >
//                   ▶ Play
//                 </button>

//                 <button
//                   onClick={() =>
//                     downloadRecording(
//                       rec.blob,
//                       rec.filename || `recording-${rec.id}.mp3`
//                     )
//                   }
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
//                 >
//                   Download
//                 </button>

//                 <button
//                   onClick={() => deleteRecording(rec.id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaybackList;

//PlaybackList.js
import React, { useState } from "react";

const PlaybackList = ({
  recordings,
  deleteRecording,
  handlePlayFromList,
  currentlyPlayingId,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter recordings based on search query
  const filteredRecordings = recordings.filter((rec) =>
    (rec.filename || `Recording ${rec.id}`)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Function to download recording with its name
  const downloadRecording = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 shadow-2xl rounded-2xl mt-6">
      {/* Search Bar */}
      <div className="flex justify-center items-center h-16 w-full">
        <input 
          type="text"
          placeholder="Search Recording..."
          className="search-bar px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-1/2 mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Title with GIF */}
      <h2
        className={`text-3xl font-extrabold bg-gradient-to-r ${
          darkMode
            ? "from-white via-green-300 to-teal-400"
            : "from-gray-800 via-green-300 to-teal-400"
        } text-transparent bg-clip-text drop-shadow-lg mb-6 flex items-start space-x-3 rounded-xl p-4`}
      >
        <img
          src="/record.gif"
          alt="Microphone GIF"
          className="w-12 h-12 rounded-xl shadow-md"
        />
        <span className="tracking-wide">RECORDS</span>
      </h2>

      {filteredRecordings.length === 0 ? (
        <p className="text-gray-300 italic text-center">
            No matching recordings found.
        </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...filteredRecordings].reverse().map((rec) => (
              <div
                key={rec.id}
                  className="flex flex-col items-center space-y-4 p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
              >
                {/* Display filename */}
                  <div className="text-white font-bold text-lg">
                    {rec.filename || `Recording ${rec.id}`}
                  </div>
                  
              {/* Buttons: Play, Download, Delete */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePlayFromList(rec.blob, rec.id)}
                  className={`${
                    currentlyPlayingId === rec.id
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-4 py-2 rounded-full transition-colors`}
                >
                  ▶ Play
                </button>

                <button
                  onClick={() =>
                    downloadRecording(
                      rec.blob,
                      rec.filename || `recording-${rec.id}.mp3`
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Download
                </button>

                <button
                  onClick={() => deleteRecording(rec.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaybackList;





