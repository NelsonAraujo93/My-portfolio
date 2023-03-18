import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGame } from "../redux/games/gamesSlice";

function Match({ data, team, odd }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(team) {
    if (data.league !== 'standard' || data.status.long !== 'Finished') {
      return;
    }
    return (
      <article
        className={odd ? "match-card pair" : "match-card"}
        onClick={() => {
          debugger;
          dispatch(selectGame(data));
          const url = `../match/${data.id}`;
          //navigate(url, {replace: true});
        }}
      >
        <h2 className="match-status">{data.status.long}</h2>
        <div className="vs">
          <div className="home">
            <img className="match-icon" src={data.teams.home.logo} alt={`${data.teams.home.nickname}-logo`}></img>
            <h2>{data.scores.home.points}</h2>
            <h3>{data.teams.home.code}</h3>
          </div>
          <div className="visitor">
            <img className="match-icon" src={data.teams.visitors.logo} alt={`${data.teams.visitors.code}-logo`}></img>
            <h2>{data.scores.visitors.points}</h2>
            <h3>{data.teams.visitors.code}</h3>
          </div>
        </div>
      </article>
    )
  }
  return (
    <article
      className={odd ? "match-card pair" : "match-card"}
      onClick={() => navigate(`match/${data.id}`) }
    >
      <h2 className="match-status">{data.status.long}</h2>
      <div className="vs">
        <div className="home">
          <img className="match-icon" src={data.teams.home.logo} alt={`${data.teams.home.code}-logo`}></img>
          <h2>{data.scores.home.points}</h2>
          <h3>{data.teams.home.code}</h3>
        </div>
        <div className="visitor">
          <img className="match-icon" src={data.teams.visitors.logo} alt={`${data.teams.visitors.code}-logo`}></img>
          <h2>{data.scores.visitors.points}</h2>
          <h3>{data.teams.visitors.code}</h3>
        </div>
      </div>
    </article>
  )
}

export default Match;
