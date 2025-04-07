import React, { useEffect, useState } from 'react';

const API_HEADERS = {
  'x-rapidapi-key': '52b878b36075583d2e0649a4ce117ad0',
  'x-rapidapi-host': 'v1.baseball.api-sports.io',
};
// team ids are not in perfect order!!
const teamids = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37];

const App = () => {
  const [teams, setTeams] = useState([]);//start with a empty list
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [history, setHistory] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeRange, setActiveRange] = useState('500-600');
  const [expandedTeamStats, setExpandedTeamStats] = useState({});
//useEffect needed for running the call just once
  useEffect(() => {
    fetchAllTeams();
  }, []);

  const fetchAllTeams = async () => {
    let allTeams = [];

    for (const id of teamids) {
      try {
        const response = await fetch(`https://v1.baseball.api-sports.io/teams/statistics?league=1&season=2023&team=${id}`, {
          method: 'GET',
          headers: API_HEADERS,
        });

        const bballdata = await response.json();

        if (
          bballdata?.response?.games?.wins?.all?.total &&
          bballdata?.response?.games?.loses?.all?.total >= 0
        ) {
          const wins = bballdata.response.games.wins.all.total;
          const losses = bballdata.response.games.loses.all.total;
          const winPct = wins / (wins + losses);
          allTeams.push({ ...bballdata.response, winPct });
        }
      } catch (error) {
        console.error(`error finding team number ${id}:`, error);
      }
    }






    allTeams.sort((a, b) => b.winPct - a.winPct);
    setTeams(allTeams);
    filterByRange(activeRange, allTeams);
    setLoading(false);
  };
  const filterByRange = (range, source = teams) => {
    setActiveRange(range);
    const [min, max] = {
      '300-400': [0.3, 0.4],
      '400-500': [0.4, 0.5],
      '500-600': [0.5, 0.6],
      '600+': [0.6, 1],
    }[range];
    const filtered = source.filter(team => team.winPct >= min && team.winPct < max);
    setFilteredTeams(filtered);
  };




  
  const fetchHistory = async (teamName) => {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(teamName)}`);
      const data = await res.json();
      setHistory(data.extract || 'No history found.');
    } 
    catch (error) {
      
      setHistory('Could not load history.');
      }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    fetchHistory(team.name);
  };

  const toggleStats = (teamId, type) => {
   
    setExpandedTeamStats((previousState) => {
      const newExpandedState = { ...previousState };
  
      //what is expanded already?
      const currentlyExpanded = previousState[teamId];
  
      
      if (currentlyExpanded === type) {
        newExpandedState[teamId] = null;
      } 
      
      else {
        
        newExpandedState[teamId] = type;
      }
      return newExpandedState;
    });
  };

  return (
    <div className="container">
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #ffffff;
          color: #000000;
      
        }


         .container {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
        }
        header {
          text-align: center;
          margin-bottom: 1rem;
        }
        header h1 {
          color: #1d3557;
        }
        h2 {
          border-bottom: 2px solid #1d3557;
          padding-bottom: 0.3rem;
        }
        .nav {
          display: flex;
          justify-content: center;
          
          margin-bottom: 1.5rem;
        }
        .nav button {
          background-color: #1d3557;
          color: white;
          padding: .3rem 1rem;
          border: none;
          border-radius: 15px;
          cursor: pointer;
        }
        .nav button.active {
          background-color:rgb(115, 197, 248);
        }
        .layout {
          display: flex;
          gap: 2rem;
        }
        .column {
          flex: 1;
        }
        .team-box {
          margin-bottom: 1rem;
          padding: 1rem;
          background: #f9f9f9;
           border: 1px solid #ccc;
          
           
        }
        .team-box:hover {
          background-color: #eeeeee;
        }
        .team-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .team-header  {
          transition: color 0.3s ease;
        }
        .team-box:hover .team-header h3 {
          color: green;
        }
        .stat-line {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
          color:black;
        }
        .stat-box {
          padding: 0.3rem 0.6rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
        }

        .stat-box:hover  {
        background-color:green;}

        .expanded {
          margin-top: 0.5rem;
          font-size: 0.9rem;
         

          background: #f0f0f0;
          padding: 0.5rem;
          border-radius: 4px;
        }
        footer {
          text-align: center;
          border: 1px solid grey;
          color: grey;
          
        }
          @media (max-width: 800px) {
      .layout {
    flex-direction: column;
  }
}
      `}</style>

      <header>
        <h1>MLB 2023-24 Full Season Summary Sorted by Win Percentage</h1>
        <p>Click on a team to view a brief introduction from Wikipedia</p>
      </header>

      <div className="nav">
        <button className={activeRange === '300-400' ? 'active' : ''} onClick={() => filterByRange('300-400')}>.300–.400</button>
        <button className={activeRange === '400-500' ? 'active' : ''} onClick={() => filterByRange('400-500')}>.400–.500</button>
        <button className={activeRange === '500-600' ? 'active' : ''} onClick={() => filterByRange('500-600')}>.500–.600</button>
        <button className={activeRange === '600+' ? 'active' : ''} onClick={() => filterByRange('600+')}>.600+</button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="layout">
          <div className="column">
            <h2>Teams by Wins</h2>
            {filteredTeams.map((team) => (
              <div key={team.team.id} className="team-box">
                <div className="team-header" onClick={() => handleTeamClick(team.team)}>
                  <img src={team.team.logo} alt="Team Logo" width="50" />
                  <h3>{team.team.name}</h3>
                </div>

                <div className="stat-line">
                  <div className="stat-box" onClick={() => toggleStats(team.team.id, 'wins')}>W: {team.games.wins.all.total}</div>
                  <div className="stat-box" onClick={() => toggleStats(team.team.id, 'losses')}>L: {team.games.loses.all.total}</div>
                  <div className="stat-box">Pct: {team.winPct.toFixed(3)}</div>{/*tofixed(3) makes it just 3 digits*/}
                </div>

                {expandedTeamStats[team.team.id] === 'wins' && (
                  <div className="expanded">
                    Home Wins: {team.games.wins.home.total} | Away Wins: {team.games.wins.away.total}
                  </div>
                )}

                {expandedTeamStats[team.team.id] === 'losses' && (
                  <div className="expanded">
                    Home Losses: {team.games.loses.home.total} | Away Losses: {team.games.loses.away.total}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="column">
            
              <h2>Team Intro</h2>
            {selectedTeam ? (
              <div className="history-box" style={{ background:       '#f1f1f1', padding: '1rem', border: '1px solid #ddd' }}>
                <h3>{selectedTeam.name}</h3>
                <p>{history}</p>
              </div>
            ) : (
              <p>Select a team to view a brief introduction.</p>

            )}
          </div>





        </div>
      )}

      <footer>
        
        <p>Cameron Light | IST 363 | Project2</p>
        <p>APIs used: API-SPORTS & API Wikimedia</p>
      </footer>
    </div>
  );
};

export default App;