import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllGamesAPI = createAsyncThunk('games/fetch', () => (
  new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/games',
      params: { league: 'standard', season: '2022' },
      headers: {
        'X-RapidAPI-Key': '218e368c20msh165c2ac646da4abp112c29jsn5f28157a5ba2',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };
    axios.request(options)
      .then(({ data }) => {
        const allGames = data.response;
        const scheduledMatches = data.response.filter((game) => game.status.long === 'Scheduled');
        const finishedMatches = data.response.filter((game) => game.status.long === 'Finished');
        const array = finishedMatches.slice(-14);
        const scheduleArray = scheduledMatches.slice(-14);
        resolve({ array, scheduleArray, allGames });
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const initialState = {
  games: [],
  fullGames: null,
  inCommingGames: null,
  selectedGame: null,
  status: 'idle',
  error: '',
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    selectGameMatch: (state, { payload }) => ({ ...state, selectedGame: payload }),
    selectGameMatchById: (state, { payload }) => {
      let selected = null;
      state.fullGames.map((game) => {
        if (game.id === parseInt(payload, 10)) {
          selected = game;
        }
        return game;
      });
      return { ...state, selectedGame: selected };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGamesAPI.pending, (state) => ({
        ...state, status: 'loading', games: null, inCommingGames: null,
      }))
      .addCase(getAllGamesAPI.fulfilled, (state, { payload }) => ({
        ...state,
        games: payload.array,
        inCommingGames: payload.scheduleArray,
        fullGames: payload.allGames,
        status: 'succeed',
      }))
      .addCase(getAllGamesAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export const { selectGameMatch, selectGameMatchById } = gamesSlice.actions;

export default gamesSlice.reducer;
