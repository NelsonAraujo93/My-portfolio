import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ErrorPage from '../components/ErrorPage';
import Filter from '../components/Filter';
import MatchDetail from '../components/MatchDetail';

describe('Tests for <Match /> component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Filter />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MatchDetail />,
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
    }, {
      id: '2',
      name: 'Hawks',
      code: 'ATL',
      logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/…on_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
      nbaFranchise: true,
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
    selectedGame: {
      id: '1',
      name: 'Hawks',
      code: 'ATL',
      status: { long: 'Finished' },
      date: {
        start: new Date(),
      },
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
  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(<MatchDetail />)).toJSON()).toMatchSnapshot();
  });
  it('Should render two items', () => {
    render(wrapper(<MatchDetail />));
    expect(screen.queryByTestId('match-container').children.length).toBe(2);
  });
});
