import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTeamGamesAPI, getTeamPlayerAPI, selectTeamById } from '../redux/teams/teamsSlice';
import '../styles/team.css';
import Player from './Player';
import Match from './Match';

function Team() {
  const {
    selectedTeam, selectedTeamGames, selectedTeamPlayers, teams,
  } = useSelector((store) => store.teams);
  const { id } = useParams();
  const dispatch = useDispatch();
  let color = false;

  useEffect(() => {
    if (teams && !selectedTeam) {
      dispatch(selectTeamById(id));
      dispatch(getTeamGamesAPI(id));
      dispatch(getTeamPlayerAPI(id));
    }
  }, [teams, selectedTeam, selectedTeamGames, selectedTeamPlayers]);

  if (!selectedTeam || !selectedTeamGames || !selectedTeamPlayers) {
    return (
      <h1>Select a team from side menu</h1>
    );
  }

  const createMatch = (item, col) => {
    color = col ? !color : color;
    return (
      <Match
        key={item.id}
        data={item}
        team={false}
        odd={color}
      />
    );
  };

  return (
    <>
      <section className="team-header">
        <h3 className="tittle">{selectedTeam.name}</h3>
        <img src={selectedTeam.logo} alt={`${selectedTeam.name}-logo`} />
      </section>
      <section className="team-players">
        <h1 className="subtitle">Players</h1>
        <div className="players-list">
          {
            selectedTeamPlayers.map((item, i) => (
              <Player
                key={item.id}
                data={item}
                odd={i % 3 === 0}
              />
            ))
          }
        </div>
      </section>
      <section className="team-matches">
        <h1 className="subtitle">Last Matches</h1>
        <div className="matches-list">
          {
            selectedTeamGames.map((item, i) => (
              createMatch(item, (i + 1) % 2 === 0, i)
            ))
          }
        </div>
      </section>
    </>
  );
}

export default Team;
