import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Filter from './components/Filter';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);



function App() {
  return (
    <main className='main-app'>
      <Filter />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
