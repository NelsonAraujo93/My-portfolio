import { useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectGameMatchById } from '../redux/games/gamesSlice';
import '../styles/team.css';
import '../styles/match.css';

function MatchDetail() {
  const { selectedGame, fullGames } = useSelector((state) => state.games);
  const { id } = useParams();
  const dispatch = useDispatch();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };

  useEffect(() => {
    if (fullGames) {
      dispatch(selectGameMatchById(id));
    }
  }, [dispatch, fullGames]);

  if (!fullGames || !selectedGame) {
    return (
      <div className="loading-screen">
        <BallTriangle
          height={150}
          width={150}
          radius={5}
          color="#712041"
          ariaLabel="ball-triangle-loading"
          visible
        />
      </div>
    );
  }

  const date = new Date(selectedGame.date.start);

  return (
    <>
      <section className="team-header match-details">
        <div className="home">
          <h3 className="tittle">{selectedGame.teams.home.code}</h3>
          <img src={selectedGame.teams.home.logo} alt={`${selectedGame.teams.home.code}-logo`} />
          <h2>{selectedGame.scores.home.points}</h2>
        </div>
        <div className="visitor">
          <h3 className="tittle">{selectedGame.teams.visitors.code}</h3>
          <img src={selectedGame.teams.visitors.logo} alt={`${selectedGame.teams.visitors.code}-logo`} />
          <h2>{selectedGame.scores.visitors.points}</h2>
        </div>
      </section>
      <section className="match-data">
        <h1 className="subtitle">Details</h1>
        <h2>{date.toLocaleDateString('en-US', options)}</h2>
      </section>
    </>
  );
}

export default MatchDetail;
