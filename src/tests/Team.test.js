/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ErrorPage from '../components/ErrorPage';
import Filter from '../components/Filter';
import Team from '../components/Team';

describe('Tests for <Home /> component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Filter />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Team />,
        },
      ],
    },
  ]);
  const initialState = {
    teams: [{
      id: '1',
      name: 'Hawks',
      code: 'ATL',
      logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
      nbaFranchise: true,
    },
    {
      id: '2',
      name: 'Hawks',
      code: 'ATL',
      logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
      nbaFranchise: true,
    },
    ],
    selectedTeam: {
      id: '2',
      name: 'Hawks',
      code: 'ATL',
      logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
      nbaFranchise: true,
    },
    selectedTeamPlayers: [
      {
        id: '1',
        firstname: 'Nelson',
        lastname: 'Araujo',
        leagues: { standard: { jersey: 23, pos: 'FC' } },
        birth: { date: '1996-10-24' },
      },
      {
        id: '2',
        firstname: 'Nelson',
        lastname: 'Araujo',
        leagues: { standard: { jersey: 23, pos: 'FC' } },
        birth: { date: '1996-10-24' },
      },
    ],
    selectedTeamGames: [
      {
        id: '1',
        name: 'Hawks',
        code: 'ATL',
        status: { long: 'Finished' },
        teams: {
          home: {
            logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
            nickname: 'ATL',
            code: 'ATL',
          },
          visitors: {
            logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
            nickname: 'ATL',
            code: 'ATL',
          },
        },
        scores: {
          visitors: {
            points: 123,
          },
          home: {
            points: 123,
          },
        },
      },
      {
        id: '2',
        name: 'Hawks',
        code: 'ATL',
        status: { long: 'Finished' },
        teams: {
          home: {
            logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
            nickname: 'ATL',
            code: 'ATL',
          },
          visitors: {
            logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
            nickname: 'ATL',
            code: 'ATL',
          },
        },
        scores: {
          visitors: {
            points: 123,
          },
          home: {
            points: 123,
          },
        },
      },
    ],
    status: 'succeed',
    error: '',
  };
  const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
      changeStatus: (state, { payload }) => ({
        ...state, status: payload,
      }),
    },
  });
  const initialState2 = {
    games: [{
      id: '1',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      teams: {
        home: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
        visitors: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
      },
      scores: {
        visitors: {
          points: 123,
        },
        home: {
          points: 123,
        },
      },
    }, {
      id: '2',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      teams: {
        home: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
        visitors: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
      },
      scores: {
        visitors: {
          points: 123,
        },
        home: {
          points: 123,
        },
      },
    },
    ],
    fullGames: [{
      id: '1',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      teams: {
        home: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
        visitors: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
      },
      scores: {
        visitors: {
          points: 123,
        },
        home: {
          points: 123,
        },
      },
    }, {
      id: '2',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      teams: {
        home: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
        visitors: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
      },
      scores: {
        visitors: {
          points: 123,
        },
        home: {
          points: 123,
        },
      },
    },
    ],
    inCommingGames: [{
      id: '1',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      teams: {
        home: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
        visitors: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
      },
      scores: {
        visitors: {
          points: 123,
        },
        home: {
          points: 123,
        },
      },
    }, {
      id: '2',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      teams: {
        home: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
        visitors: {
          logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
          nickname: 'ATL',
          code: 'ATL',
        },
      },
      scores: {
        visitors: {
          points: 123,
        },
        home: {
          points: 123,
        },
      },
    },
    ],
    status: 'succeed',
    error: '',
  };
  const gamesSlice = createSlice({
    name: 'games',
    initialState: initialState2,
    reducers: {
      changeStatusGames: (state, { payload }) => ({
        ...state, status: payload,
      }),
    },
  });
  const store = configureStore({
    reducer: {
      teams: teamsSlice.reducer,
      games: gamesSlice.reducer,
    },
  });
  const wrapper = () => (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  it('Should render the content correctly', () => {
    render(wrapper(<Team />));
    // Title is rendering correctly
    expect(screen.getByText('Players')).not.toBeNull();
    // Description is rendering correctly
    expect(screen.getByText('Last Matches')).not.toBeNull();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(<Team />)).toJSON()).toMatchSnapshot();
  });
});
