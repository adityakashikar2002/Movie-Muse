//store.js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieReducer';

const store = configureStore({
  reducer: movieReducer, // Or an object of reducers if you have multiple
});

export default store;