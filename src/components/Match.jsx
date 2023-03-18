import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BallTriangle } from 'react-loader-spinner';
import { selectGameMatch } from '../redux/games/gamesSlice';

function Match({ data, team, odd }) {
  const navigate = useNavigate();
  if (team) {
    if (data.league !== 'standard' || data.status.long !== 'Finished') {
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
    return (
      <button
        type="button"
        className={odd ? 'match-card pair' : 'match-card'}
        onClick={() => {
          selectGameMatch(data);
          const url = `../match/${data.id}`;
          navigate(url, { replace: true });
        }}
      >
        <h2 className="match-status">{data.status.long}</h2>
        <div className="vs">
          <div className="home">
            <img className="match-icon" src={data.teams.home.logo} alt={`${data.teams.home.nickname}-logo`} />
            <h2>{data.scores.home.points}</h2>
            <h3>{data.teams.home.code}</h3>
          </div>
          <div className="visitor">
            <img className="match-icon" src={data.teams.visitors.logo} alt={`${data.teams.visitors.code}-logo`} />
            <h2>{data.scores.visitors.points}</h2>
            <h3>{data.teams.visitors.code}</h3>
          </div>
        </div>
      </button>
    );
  }
  return (
    <button
      type="button"
      className={odd ? 'match-card pair' : 'match-card'}
      onClick={() => {
        selectGameMatch(data);
        const url = `../match/${data.id}`;
        navigate(url, { replace: true });
      }}
    >
      <h2 className="match-status">{data.status.long}</h2>
      <div className="vs">
        <div className="home">
          <img className="match-icon" src={data.teams.home.logo} alt={`${data.teams.home.code}-logo`} />
          <h2>{data.scores.home.points}</h2>
          <h3>{data.teams.home.code}</h3>
        </div>
        <div className="visitor">
          <img className="match-icon" src={data.teams.visitors.logo} alt={`${data.teams.visitors.code}-logo`} />
          <h2>{data.scores.visitors.points}</h2>
          <h3>{data.teams.visitors.code}</h3>
        </div>
      </div>
    </button>
  );
}

Match.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  team: PropTypes.bool.isRequired,
  odd: PropTypes.bool.isRequired,
};

export default Match;
