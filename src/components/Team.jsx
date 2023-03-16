import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeamGamesAPI, getTeamPlayerAPI, selectTeamById } from "../redux/teams/teamsSlice";
import '../styles/team.css'
import Match from "./Match";
import Player from "./Player";

function Team() {
  const { selectedTeam, selectedTeamGames, selectedTeamPlayers, teams } = useSelector((store) => store.teams );
  const { id } = useParams();
  const dispatch = useDispatch();

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
    )
  };
  
  return (
    <>
      <section className="team-header">
        <h3 className="tittle">{selectedTeam.name}</h3>
        <img src={selectedTeam.logo} alt={`${selectedTeam.name}-logo`}></img>
      </section>
      <section className="team-players">
        <h1>Players</h1>
        <div className="players-list">
          {
            selectedTeamPlayers.map((item, i) => (
              <Player
                key={item.id}
                data={item}
              />
            ))
          }
        </div>
      </section>
      <section className="team-matches">
        <h1>Matches</h1>
        <div className="matches-list">
          {
            selectedTeamGames.map((item, i) => (
              <Match
                key={item.id}
                data={item}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Team;