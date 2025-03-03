// //RecordApp.js
// import React, { useState, useRef, useEffect } from 'react';
// import './RecordApp.css';
// import MicRecorder from 'mic-recorder-to-mp3';
// import RecordingStorage from './components/RecordingStorage';
// import PlaybackList from './components/PlaybackList';


// const Mp3Recorder = new MicRecorder({ bitRate: 128 });

// function RecordApp() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [recordings, setRecordings] = useState([]);
//   const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [darkMode, setDarkMode] = useState(false);
//   const { saveRecording, deleteRecording } = RecordingStorage(setRecordings);

//   const audioRef = useRef(null);
//   const timerRef = useRef(null);

//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => !prevMode);
//   };

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleEnded = () => {
//       setIsPlaying(false);
//       setCurrentTime(0);
//       setStatusMessage('');
//       setCurrentlyPlayingId(null);
//     };

//     audio.addEventListener('timeupdate', updateTime);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('timeupdate', updateTime);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, []);

//   const handleRecord = () => {
//     isRecording ? stopRecording() : startRecording();
//   };

//   const startRecording = () => {
//     Mp3Recorder.start()
//       .then(() => {
//         setIsRecording(true);
//         setRecordingTime(0);
//         setStatusMessage('New Recording');

//         timerRef.current = setInterval(() => {
//           setRecordingTime((prev) => prev + 1);
//         }, 1000);
//       })
//       .catch(console.error);
//   };

//   const stopRecording = () => {
//     clearInterval(timerRef.current);
//     Mp3Recorder.stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         saveRecording(blob);
//         setIsRecording(false);
//         setRecordingTime(0);
//       })
//       .catch(console.error);
//   };

//   const handlePlayPause = () => {
//     if (audioRef.current) {
//       if (audioRef.current.paused) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   };

//   const handleSkip = (seconds) => {
//     if (audioRef.current) {
//       let newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration));
//       audioRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const handlePlayFromList = (blob, id) => {
//     const url = URL.createObjectURL(blob);
//     audioRef.current.src = url;
//     audioRef.current.play();
//     setCurrentlyPlayingId(id);
//   };

//   const handleSeek = (e) => {
//     const newTime = parseInt(e.target.value);
//     setCurrentTime(newTime);
//     if (audioRef.current) {
//       audioRef.current.currentTime = newTime;
//     }
//   };

//   const formatTime = (time) => {
//     const hrs = Math.floor(time / 3600);
//     const mins = Math.floor((time % 3600) / 60);
//     const secs = Math.floor(time % 60);
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className={`record-app ${darkMode ? "dark-mode" : ""}`}>

//       <div className="header">
//         {/* <button className="menu-button">☰</button> */}
//         <button onClick={toggleDarkMode}>
//           {darkMode ? <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full"/> : <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />}
//         </button>
        
//         <input type="text" placeholder="Search" className="search-bar" />

//         <button className="profile-button">
//         {darkMode ? <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" /> : <img src="/user1.png" alt="User Profile" className="w-8 h-8 rounded-full" />}
//         </button>
        
//       </div>

//       <div className="record-section">
//         <div className="record-circle">
//           <div className="record-button" onClick={handleRecord}>
//             <div className={`microphone ${isRecording ? 'recording' : ''}`}></div>
//           </div>
//         </div>
//         <button className={`record-text ${darkMode ? "dark-mode" : ""}`}>{isRecording ? 'STOP' : 'RECORD'}</button>
//         {isRecording && <div className={`recording-time ${darkMode ? "dark-mode" : ""}`}>{formatTime(recordingTime)}</div>}
//       </div>

//       {statusMessage && <div className="status-message">{statusMessage}</div>}

//       <div className="timeline">
//         <input
//           type="range"
//           min="0"
//           max={audioRef.current?.duration || 0}
//           value={currentTime}
//           onChange={handleSeek}
//           className="timeline-slider"
//         />
//         <div className="time-labels">
//           <span>{formatTime(currentTime)}</span>
//           <span>{formatTime(audioRef.current?.duration || 0)}</span>
//         </div>
//       </div>

//       <div className="controls">
//         <button className="control-button" onClick={() => handleSkip(-5)}>⏮</button>
//         <button className="control-button play-button" onClick={handlePlayPause}>
//           {isPlaying ? '⏸' : '▶'}
//         </button>
//         <button className="control-button" onClick={() => handleSkip(5)}>⏭</button>
//       </div>

//       <audio ref={audioRef} />

//       <PlaybackList
//         recordings={recordings}
//         deleteRecording={deleteRecording}
//         handlePlayFromList={handlePlayFromList}
//         currentlyPlayingId={currentlyPlayingId}
//         darkMode={darkMode}
//       />
//     </div>
//   );
// }

// export default RecordApp;

//RecordApp.js
import React, { useState, useRef, useEffect } from 'react';
import './RecordApp.css';
import MicRecorder from 'mic-recorder-to-mp3';
import RecordingStorage from './components/RecordingStorage';
import PlaybackList from './components/PlaybackList';


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function RecordApp() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [recordingName, setRecordingName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const { saveRecording, deleteRecording } = RecordingStorage(setRecordings);

  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setStatusMessage('');
      setCurrentlyPlayingId(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleRecord = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const startRecording = () => {
    Mp3Recorder.start()
      .then(() => {
        setIsRecording(true);
        setRecordingTime(0);
        setStatusMessage('New Recording');

        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      })
      .catch(console.error);
  };

  // const stopRecording = () => {
  //   clearInterval(timerRef.current);
  //   Mp3Recorder.stop()
  //     .getMp3()
  //     .then(([buffer, blob]) => {
  //       saveRecording(blob);
  //       setIsRecording(false);
  //       setRecordingTime(0);
  //     })
  //     .catch(console.error);
  // };
  const stopRecording = () => {
    clearInterval(timerRef.current);
    Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
            setShowNameInput(true); // Show name input prompt
            setRecordingBlob(blob); // Store blob temporarily
            setIsRecording(false);
            setRecordingTime(0);
        })
        .catch(console.error);
  };

  const handleSaveRecording = () => {
    saveRecording(recordingBlob, recordingName);
    setShowNameInput(false);
    setRecordingName(''); // Reset name input
    setRecordingBlob(null); // Reset blob
  };

  const handleCancelRecording = () => {
    setShowNameInput(false);
    setRecordingName('');
    setRecordingBlob(null);
  }

  const [recordingBlob, setRecordingBlob] = useState(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      let newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handlePlayFromList = (blob, id) => {
    const url = URL.createObjectURL(blob);
    audioRef.current.src = url;
    audioRef.current.play();
    setCurrentlyPlayingId(id);
  };

  const handleSeek = (e) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`record-app ${darkMode ? "dark-mode" : ""}`}>

      <div className="header">
        {/* <button className="menu-button">☰</button> */}
        <button onClick={toggleDarkMode}>
          {darkMode ? <img src="/lightm.png" alt="Light Mode" className="w-8 h-8 rounded-full"/> : <img src="/sleep-mode.png" alt="Dark Mode" className="w-8 h-8 rounded-full" />}
        </button>
        
        <input type="text" placeholder="Search" className="search-bar" />

        <button className="profile-button">
        {darkMode ? <img src="/account.png" alt="User Profile" className="w-8 h-8 rounded-full" /> : <img src="/user1.png" alt="User Profile" className="w-8 h-8 rounded-full" />}
        </button>
        
      </div>

      <div className="record-section">
        <div className="record-circle">
          <div className="record-button" onClick={handleRecord}>
            <div className={`microphone ${isRecording ? 'recording' : ''}`}></div>
          </div>
        </div>
        <button className={`record-text ${darkMode ? "dark-mode" : ""}`}>{isRecording ? 'STOP' : 'RECORD'}</button>
        {isRecording && <div className={`recording-time ${darkMode ? "dark-mode" : ""}`}>{formatTime(recordingTime)}</div>}
      </div>

      {statusMessage && <div className="status-message">{statusMessage}</div>}

      {showNameInput && (
                <div className="name-input-modal">
                    <div className="name-input-content">
                        <input
                            type="text"
                            placeholder="Enter recording name"
                            value={recordingName}
                            onChange={(e) => setRecordingName(e.target.value)}
                            className="name-input-field"
                        />
                        <div className="name-input-buttons">
                            <button onClick={handleSaveRecording}>Save</button>
                            <button onClick={handleCancelRecording}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
      }

      <div className="timeline">
        <input
          type="range"
          min="0"
          max={audioRef.current?.duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="timeline-slider"
        />
        <div className="time-labels">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(audioRef.current?.duration || 0)}</span>
        </div>
      </div>

      <div className="controls">
        <button className="control-button" onClick={() => handleSkip(-5)}>⏮</button>
        <button className="control-button play-button" onClick={handlePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-button" onClick={() => handleSkip(5)}>⏭</button>
      </div>

      <audio ref={audioRef} />

      <PlaybackList
        recordings={recordings}
        deleteRecording={deleteRecording}
        handlePlayFromList={handlePlayFromList}
        currentlyPlayingId={currentlyPlayingId}
        darkMode={darkMode}
      />
    </div>
  );
}

export default RecordApp;
