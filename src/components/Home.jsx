import { BallTriangle } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/home.css';
import Match from './Match';

export default function Home() {
  const { games, inCommingGames } = useSelector((store) => store.games);
  let color = false;

  const createMatch = (item, col, i) => {
    color = col ? !color : color;
    return (
      <Match
        key={item.id}
        data={item}
        team={false}
        odd={color}
      />
    )
  }

  if(!games || !inCommingGames) {
    return (
      <div className="loading-screen">
        <BallTriangle
          height={150}
          width={150}
          radius={5}
          color="#712041"
          ariaLabel="ball-triangle-loading"
          visible={true}
        >
        </BallTriangle>
      </div>
    )
  }
  return (
    <>
      <section>
        <h1 className="subtitle">Last matches</h1>
        <div className="matches-list">
          {
            games.map((item, i) => (
              createMatch(item, (i+1)%2===0, i)
            ))
          }
        </div>
      </section>
      <section>
        <h1 className="subtitle">Comming matches</h1>
        <div className="matches-list">
          {
            inCommingGames.map((item, i) => (
              createMatch(item, (i+1)%2===0, i)
            ))
          }
        </div>
      </section>
    </>
  );
}
