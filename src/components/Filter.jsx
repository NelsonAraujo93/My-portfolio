import PropTypes from 'prop-types';
import { BallTriangle } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles/filter.css';
import {
  AiFillCloseCircle, AiOutlineArrowLeft, AiOutlineHome, AiOutlineMenu,
} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getAllTeamsAPI, selectTeam } from '../redux/teams/teamsSlice';
import { getAllGamesAPI } from '../redux/games/gamesSlice';
import SideMenuItem from './SideMenuItem';

const SideMenu = ({ teams, closeMenu, chooseTeam }) => (
  <ul data-testid="side-container" className="side-teams">
    {
      teams.map((team) => (
        <SideMenuItem closeMenu={closeMenu} chooseTeam={chooseTeam} team={team} key={`${team.id}-key`} />
      ))
    }
  </ul>
);

SideMenu.propTypes = {
  teams: PropTypes.instanceOf(Array).isRequired,
  closeMenu: PropTypes.func.isRequired,
  chooseTeam: PropTypes.func.isRequired,
};

function Filter() {
  const [home, setHome] = useState(true);
  const teamsStatus = useSelector((store) => store.teams.status);
  const gamesStatus = useSelector((store) => store.games.status);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teams } = useSelector((store) => store.teams);

  useEffect(() => {
    if (teamsStatus === 'failed') return;
    if (gamesStatus === 'failed') return;
    if (teams) return;
    dispatch(getAllTeamsAPI());
    dispatch(getAllGamesAPI());
  }, [selectTeam]);
  return (
    <>
      {
        gamesStatus && teamsStatus === 'loading' && (
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
        )
      }
      <section
        className={openMenu ? 'side-menu active' : 'side-menu'}
      >
        <div className="menu-btn-container">
          <button type="button" className="btn-menu" onClick={() => setOpenMenu(false)}>
            <AiFillCloseCircle size={26} color="#fff" />
          </button>
        </div>
        {
          teams && (
            <SideMenu
              teams={teams}
              closeMenu={() => setOpenMenu(false)}
              chooseTeam={() => { setHome(false); }}
            />
          )
        }
      </section>
      <section className="navbar">
        {
          !home ? (
            <div className="menu-btn-container">
              <button type="button" className="btn-menu">
                <AiOutlineArrowLeft
                  size={26}
                  color="#fff"
                  onClick={() => {
                    setHome(true);
                    dispatch(selectTeam(null));
                    navigate('/');
                  }}
                />
              </button>
            </div>
          ) : (
            <div className="menu-btn-container">
              <button type="button" className="btn-menu" onClick={() => setOpenMenu(true)}>
                <AiOutlineMenu size={26} color="#fff" />
              </button>
            </div>
          )
        }
        <h4>NBA SEASON 2022 - 2023</h4>
        <div className="menu-btn-container">
          <NavLink
            to="/"
          >
            <button type="button" className="btn-menu">
              <AiOutlineHome size={26} color="#fff" />
            </button>
          </NavLink>
        </div>
      </section>
      {
        gamesStatus && teamsStatus === 'succeed' && (
          <Outlet />
        )
      }
    </>
  );
}

export default Filter;
