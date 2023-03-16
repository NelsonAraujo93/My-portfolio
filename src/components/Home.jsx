import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gatAllGamesAPI } from '../redux/games/gamesSlice';
import '../styles/home.css';

export default function Home() {
  const dispatch = useDispatch();
  const { games } = useSelector((store) => store.games);

  useEffect(() => {
    dispatch(gatAllGamesAPI());
  }, [dispatch]);

  return (
    <section>
      <div className="wrapper">
        <h1>Wellcome to world metrics</h1>
        <p>Choose one of the options or use the filter bellow</p>
        {
          games.map((game)=>(
            <div key={game.id}>{game.id}</div>
          ))
        }
      </div>
    </section>
  );
}
