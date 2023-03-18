import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './games/gamesSlice';
import teamsReducer from './teams/teamsSlice';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    teams: teamsReducer,
  },
});

export default store;
