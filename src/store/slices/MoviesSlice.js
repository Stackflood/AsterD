import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  isLoading: false,
};

const MoviesSlice = createSlice({
  name: 'MoviesRecords',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      var payload = action.payload;
      state.isLoading = true;
      var moviesData = payload[0];
      var records = moviesData;
      state.movies = records;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setMovies, setLoading} = MoviesSlice.actions;

export const selectMovies = state => state.MoviesRecords.movies;
export const selectIsLoading = state => state.MoviesRecords.isLoading;

export default MoviesSlice.reducer;
