import { BallTriangle } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import '../styles/filter.css';

function Filter() {
  const { status } = useSelector((store) => store.games);

  return (
    <>
      {
        status === 'loading' && (
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
      <section>
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