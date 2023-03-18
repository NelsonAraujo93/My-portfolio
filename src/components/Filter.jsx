import { BallTriangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import '../styles/filter.css';
import { AiFillCloseCircle, AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getAllTeamsAPI } from "../redux/teams/teamsSlice";
import { getAllGamesAPI } from '../redux/games/gamesSlice';
import SideMenuItem from "./SideMenuItem";

const SideMenu = ({ teams, closeMenu }) => {
  return (
    <ul className="side-teams">
      {
        teams.map((team)=> (
          <SideMenuItem closeMenu={closeMenu} team={team} key={`${team.id}-key`} />
        ))
      }
    </ul>
  )
}

function Filter() {
  const teamsStatus = useSelector((store) => store.teams.status);
  const gamesStatus = useSelector((store) => store.games.status);
  const [ openMenu, setOpenMenu ] = useState(false);
  const dispatch = useDispatch();
  const { teams } =  useSelector((store) => store.teams);
  useEffect(() => {
    if (teamsStatus === 'failed') return;
    if (gamesStatus === 'failed') return;
    if (teams) return;
    dispatch(getAllTeamsAPI());
    dispatch(getAllGamesAPI());
  }, []);
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
              visible={true}
            >
            </BallTriangle>
          </div>
        )
      }
      <section
        className={openMenu ? "side-menu active" : "side-menu"}
      >
        <div className="menu-btn-container">
          <button className="btn-menu" onClick={()=> setOpenMenu(false)}>
            <AiFillCloseCircle size={26} color="#fff" />
          </button>
        </div>
        {
          teams && (
            <SideMenu teams={teams} closeMenu={()=> setOpenMenu(false)}/>
          )
        }
      </section>
      <section className="navbar">
        <div className="menu-btn-container">
          <button className="btn-menu" onClick={()=> setOpenMenu(true)}>
            <AiOutlineMenu size={26} color="#fff" />
          </button>
        </div>
        <h4>NBA SEASON 2022 - 2023</h4>
        <div className="menu-btn-container">
          <NavLink
            to="/"
          >
            <button className="btn-menu">
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
  )  
}

export default Filter;