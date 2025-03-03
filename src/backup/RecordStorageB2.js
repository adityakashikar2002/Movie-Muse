// //RecordingStorage.js
// import { useEffect, useRef, useCallback } from 'react';

// const RecordingStorage = (setRecordings) => {
//   const dbRef = useRef(null);

//   const loadRecordings = useCallback(() => {
//     const transaction = dbRef.current.transaction(['recordings'], 'readonly');
//     const store = transaction.objectStore('recordings');
//     const request = store.getAll();

//     request.onsuccess = (event) => {
//       setRecordings(event.target.result);
//     };

//     request.onerror = (event) => {
//       console.error('Error loading recordings:', event.target.error);
//     };
//   }, [setRecordings]);

//   useEffect(() => {
//     const request = indexedDB.open('VoiceRecorderDB', 1);

//     request.onerror = (event) => {
//       console.error('Database error:', event.target.error);
//     };

//     request.onsuccess = (event) => {
//       dbRef.current = event.target.result;
//       loadRecordings();
//     };

//     request.onupgradeneeded = (event) => {
//       dbRef.current = event.target.result;
//       const store = dbRef.current.createObjectStore('recordings', {
//         keyPath: 'id',
//         autoIncrement: true,
//       });

//       // Ensure filenames are stored
//       store.createIndex('filename', 'filename', { unique: false });
//     };
//   }, [loadRecordings]);

//   const saveRecording = (blob, filename) => {
//     const transaction = dbRef.current.transaction(['recordings'], 'readwrite');
//     const store = transaction.objectStore('recordings');
//     const request = store.add({ blob, filename });

//     request.onsuccess = () => {
//       loadRecordings();
//     };
//     request.onerror = (event) => {
//       console.error('Error saving recording:', event.target.error);
//     };
//   };

//   const deleteRecording = (id) => {
//     const transaction = dbRef.current.transaction(['recordings'], 'readwrite');
//     const store = transaction.objectStore('recordings');
//     const request = store.delete(id);

//     request.onsuccess = () => {
//       loadRecordings();
//     };
//     request.onerror = (event) => {
//       console.error('Error deleting recording:', event.target.error);
//     };
//   };

//   return { saveRecording, deleteRecording };
// };

// export default RecordingStorage;

//RecordingStorage.js

import { useEffect, useRef, useCallback } from 'react';

const RecordingStorage = (setRecordings) => {
  const dbRef = useRef(null);

  const loadRecordings = useCallback(() => {
    const transaction = dbRef.current.transaction(['recordings'], 'readonly');
    const store = transaction.objectStore('recordings');
    const request = store.getAll();

    request.onsuccess = (event) => {
      setRecordings(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Error loading recordings:', event.target.error);
    };
  }, [setRecordings]);

  useEffect(() => {
    const request = indexedDB.open('VoiceRecorderDB', 1);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
    };

    request.onsuccess = (event) => {
      dbRef.current = event.target.result;
      loadRecordings();
    };

    request.onupgradeneeded = (event) => {
      dbRef.current = event.target.result;
      const store = dbRef.current.createObjectStore('recordings', {
        keyPath: 'id',
        autoIncrement: true,
      });

      // Ensure filenames are stored
      store.createIndex('filename', 'filename', { unique: false });
    };
  }, [loadRecordings]);

  // const saveRecording = (blob, filename) => {
  //   const transaction = dbRef.current.transaction(['recordings'], 'readwrite');
  //   const store = transaction.objectStore('recordings');
  //   const request = store.add({ blob, filename });

  //   request.onsuccess = () => {
  //     loadRecordings();
  //   };
  //   request.onerror = (event) => {
  //     console.error('Error saving recording:', event.target.error);
  //   };
  // };
  const saveRecording = (blob, filename) => {
    const transaction = dbRef.current.transaction(['recordings'], 'readwrite');
    const store = transaction.objectStore('recordings');
    const request = store.add({ blob, filename: filename || null }); // Save filename

    request.onsuccess = () => {
        loadRecordings();
    };
    request.onerror = (event) => {
        console.error('Error saving recording:', event.target.error);
    };
  };

  const deleteRecording = (id) => {
    const transaction = dbRef.current.transaction(['recordings'], 'readwrite');
    const store = transaction.objectStore('recordings');
    const request = store.delete(id);

    request.onsuccess = () => {
      loadRecordings();
    };
    request.onerror = (event) => {
      console.error('Error deleting recording:', event.target.error);
    };
  };

  return { saveRecording, deleteRecording };
};

export default RecordingStorage;

