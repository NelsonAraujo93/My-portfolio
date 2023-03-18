import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectGameMatchById } from '../redux/games/gamesSlice';
import { selectGameById } from '../redux/teams/teamsSlice';
import '../styles/team.css';

function MatchDetail() {
  const { selectedGameTeam, selectedTeam } = useSelector((state) => state.teams);
  const { selectedGame, games } = useSelector((state) => state.games);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!selectedTeam) {
      dispatch(selectGameMatchById(id));
    } else {
      if (!selectedGameTeam) {
        dispatch(selectGameById(id));
      }
    }
  }, [selectedGameTeam]);

  if (!selectedGameTeam && !selectedGame) {
    return (
      <h1>Select a team from side menu</h1>
    )
  };

  if(selectedGame) {
    return (
      <>
        <section className="team-header">
          <div className='home'>
            <h3 className="tittle">{selectedGame.teams.home.name}</h3>
            <img src={selectedGame.teams.home.logo} alt={`${selectedGame.teams.home.name}-logo`}></img>
          </div>
          <div className='visitor'>
            <h3 className="tittle">{selectedGame.teams.visitors.name}</h3>
            <img src={selectedGame.teams.visitors.logo} alt={`${selectedGame.teams.visitors.name}-logo`}></img>
          </div>
        </section>
        <section className="match-data">
          <h1 className="subtitle">Details</h1>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="team-header">
        <div className='home'>
          <h3 className="tittle">{selectedGameTeam.teams.home.name}</h3>
          <img src={selectedGameTeam.teams.home.logo} alt={`${selectedGameTeam.teams.home.name}-logo`}></img>
        </div>
        <div className='visitor'>
          <h3 className="tittle">{selectedGameTeam.teams.visitors.name}</h3>
          <img src={selectedGameTeam.teams.visitors.logo} alt={`${selectedGameTeam.teams.visitors.name}-logo`}></img>
        </div>
      </section>
      <section className="match-data">
        <h1 className="subtitle">Details</h1>
      </section>
    </>
  )
}

export default MatchDetail;