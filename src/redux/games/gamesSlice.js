import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const gatAllGamesAPI = createAsyncThunk('games/fetch', () => (
  new Promise((resolve, reject) => {
    axios.get('https://www.balldontlie.io/api/v1/games?seasons[]=2022&page=49')
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const initialState = {
  games: [],
  status: 'idle',
  error: '',
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    bookMission: (state, { payload }) => {
      const bookMissions = state.missions.map((mission) => {
        if (mission.mission_id !== payload) return mission;
        return { ...mission, reserved: true };
      });
      return { ...state, missions: bookMissions };
    },
    leaveMission: (state, { payload }) => {
      const bookMissions = state.missions.map((mission) => {
        if (mission.mission_id !== payload) return mission;
        return { ...mission, reserved: false };
      });
      return { ...state, missions: bookMissions };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gatAllGamesAPI.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(gatAllGamesAPI.fulfilled, (state, { payload }) => ({
        ...state,
        games: payload,
        status: 'succeed',
      }))
      .addCase(gatAllGamesAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export const { bookMission, leaveMission } = gamesSlice.actions;

export default gamesSlice.reducer;
