//movieActions.js
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_MOVIE_APP_API_KEY; // Replace with your OMDb API key
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchTerm, { rejectWithValue }) => {
    if (!searchTerm.trim()) return rejectWithValue([]); // Avoids unnecessary API calls

    try {
      const response = await axios.get(`${API_URL}&s=${searchTerm}`);
      return response.data.Search || [];
    } catch (error) {
      return rejectWithValue([]); // Ensures errors don't break the app
    }
  }
);



export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id) => {
    const response = await axios.get(`${API_URL}&i=${id}`);
    return response.data;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    const popularSearches = ['Avengers', 'Batman', 'Star Wars', 'Jurassic Park'];
    const trendingMovies = [];

    for (const searchTerm of popularSearches) {
      const response = await axios.get(`${API_URL}&s=${searchTerm}`);
      if (response.data.Search) {
        trendingMovies.push(...response.data.Search);
      }
    }

    return trendingMovies;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [], // For random movies
    searchResults: [], // For search results
    selectedMovie: null,
    favorites: [],
    trending: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload; // Update searchResults
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = movieSlice.actions;
export default movieSlice.reducer;