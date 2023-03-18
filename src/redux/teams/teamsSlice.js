import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTeamsAPI = createAsyncThunk('teams/fetch', () => (
  new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/teams',
      headers: {
        'X-RapidAPI-Key': '218e368c20msh165c2ac646da4abp112c29jsn5f28157a5ba2',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };
    axios.request(options)
      .then(({ data }) => {
        resolve(data.response);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

export const getTeamGamesAPI = createAsyncThunk('team/fetch', (id) => (
  new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/games',
      params: { season: '2022', team: id },
      headers: {
        'X-RapidAPI-Key': '218e368c20msh165c2ac646da4abp112c29jsn5f28157a5ba2',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };
    axios.request(options)
      .then(({ data }) => {
        resolve(data.response.slice(-20));
      })
      .catch((error) => {
        reject(error);
      });
  })
));

export const getTeamPlayerAPI = createAsyncThunk('team/players', (id) => (
  new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/players',
      params: { team: id, season: '2022' },
      headers: {
        'X-RapidAPI-Key': '218e368c20msh165c2ac646da4abp112c29jsn5f28157a5ba2',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };
    axios.request(options)
      .then(({ data }) => {
        resolve(data.response);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const initialState = {
  teams: null,
  status: 'idle',
  selectedTeam: null,
  selectedTeamGames: null,
  selectedTeamPlayers: null,
  selectedGameTeam: null,
  error: '',
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    selectTeam: (state, { payload }) => ({ ...state, selectedTeam: payload }),
    selectTeamById: (state, { payload }) => {
      let selected = null;
      state.teams.map((team) => {
        if (team.id === parseInt(payload, 10)) {
          selected = team;
        }
        return team;
      });
      return { ...state, selectedTeam: selected };
    },
    selectGameById: (state, { payload }) => {
      let selected = null;
      state.selectedTeamGames.map((game) => {
        if (game.id === parseInt(payload, 10)) {
          selected = game;
        }
        return game;
      });
      return { ...state, selectedGameTeam: selected };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeamsAPI.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getAllTeamsAPI.fulfilled, (state, { payload }) => ({
        ...state,
        teams: payload,
        status: 'succeed',
      }))
      .addCase(getAllTeamsAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }))
      .addCase(getTeamGamesAPI.pending, (state) => ({ ...state, status: 'loading', selectedTeamGames: null }))
      .addCase(getTeamGamesAPI.fulfilled, (state, { payload }) => ({
        ...state,
        selectedTeamGames: payload,
        status: 'succeed',
      }))
      .addCase(getTeamGamesAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }))
      .addCase(getTeamPlayerAPI.pending, (state) => ({ ...state, status: 'loading', selectedTeamPlayers: null }))
      .addCase(getTeamPlayerAPI.fulfilled, (state, { payload }) => ({
        ...state,
        selectedTeamPlayers: payload,
        status: 'succeed',
      }))
      .addCase(getTeamPlayerAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export const { selectTeam, selectTeamById, selectGameById } = teamsSlice.actions;

export default teamsSlice.reducer;
