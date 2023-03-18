import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getTeamGamesAPI, getTeamPlayerAPI, selectTeam } from '../redux/teams/teamsSlice';

const SideMenuItem = ({ team, closeMenu, chooseTeam }) => {
  const dispatch = useDispatch();

  const trigger = () => {
    dispatch(selectTeam(team));
    dispatch(getTeamGamesAPI(team.id));
    dispatch(getTeamPlayerAPI(team.id));
    chooseTeam();
    closeMenu();
  };

  if (!team.logo || !team.nbaFranchise) {
    return (
      <></>
    );
  }
  return (
    <li
      className="side-menu-item"
      style={{ background: 'linear-gradient(90deg,  #1e1e1e 1%, #1e1e1e, 90%, #1e1e1e 99%)' }}
    >
      <button
        type="button"
        onClick={() => { trigger(); }}
      >
        <NavLink
          to={`team/${team.id}`}
          className={({ isActive }) => {
            const active = isActive ? 'side-link active' : 'side-link';
            return active;
          }}
        >
          <h3>{team.code}</h3>
          <p>{team.name}</p>
          <div className="team-logo">
            <div className="hidden-text">
              <h3>{team.code}</h3>
              <p>{team.name}</p>
            </div>
            <img src={team.logo} alt={`${team.name}-logo`} />
          </div>
        </NavLink>
      </button>
    </li>
  );
};

SideMenuItem.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  team: PropTypes.instanceOf(Object).isRequired,
  chooseTeam: PropTypes.func.isRequired,
};

export default SideMenuItem;
