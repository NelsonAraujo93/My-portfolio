import { BallTriangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import '../styles/filter.css';
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getAllTeamsAPI } from "../redux/teams/teamsSlice";
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
  const gamesStatus = useSelector((store) => store.games.status);
  const teamsStatus = useSelector((store) => store.teams.status);
  const [ openMenu, setOpenMenu ] = useState(false);

  const dispatch = useDispatch();
  const { teams } =  useSelector((store) => store.teams);
  useEffect(() => {
    if (teamsStatus === 'failed') return;
    if (teams) return;
    dispatch(getAllTeamsAPI());
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
              color="#F88158"
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
            <AiFillCloseCircle />
          </button>
        </div>
        <div className="side-title">
          <h2>NBA 2022-2023 TEAMS</h2>
        </div>
        {
          teams && (
            <SideMenu teams={teams} closeMenu={()=> setOpenMenu(false)}/>
          )
        }
      </section>
      <section>
        <div className="menu-btn-container">
          <button className="btn-menu" onClick={()=> setOpenMenu(true)}>
            <AiOutlineMenu />
          </button>
        </div>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search your country..."
          ></input>
        </div>
      </section>
      <Outlet />
    </>
  )  
}

export default Filter;