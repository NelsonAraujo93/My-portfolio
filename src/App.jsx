import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Filter from './components/Filter';
import store from './redux/store';
import { Provider } from 'react-redux';
import Team from './components/Team';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Filter />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/team/:id',
        element: <Team />,
      },
    ],
  },
]);

function App() {
  return (
    <main className='main-app'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </main>
  );
}

export default App;
