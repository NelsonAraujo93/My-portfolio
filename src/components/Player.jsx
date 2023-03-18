import PropTypes from 'prop-types';

function Player({ data }) {
  return (
    <article className="player-card">
      <h3>{data.firstname}</h3>
      <h3>{data.lastname}</h3>
      <h4>{data.leagues.standard.jersey || 'N/A'}</h4>
      <h4>{data.leagues.standard.pos}</h4>
      <h5>{data.birth.date}</h5>
    </article>
  );
}

Player.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Player;
