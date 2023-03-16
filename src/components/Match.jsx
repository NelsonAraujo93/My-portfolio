function Match({ data }) {
  const winner = data.scores.home.points > data.scores.visitors.points;
  if (data.league !== 'standard' || data.status.long !== 'Finished') {
    return;
  }
  return (
    <article className="match-card">
      <h2>{data.status.long}</h2>
      <div className="vs">
        <div className={winner ? "home winner" : "home"}>
          <img className="match-icon" src={data.teams.home.logo} alt={`${data.teams.home.nickname}-logo`}></img>
          <h2>{data.scores.home.points}</h2>
          <h3>{data.teams.home.nickname}</h3>
        </div>
        <div className={winner ? "visitor" : "winner visitor"}>
          <img className="match-icon" src={data.teams.visitors.logo} alt={`${data.teams.visitors.nickname}-logo`}></img>
          <h2>{data.scores.visitors.points}</h2>
          <h3>{data.teams.visitors.nickname}</h3>
        </div>
      </div>
    </article>
  )
}

export default Match;
