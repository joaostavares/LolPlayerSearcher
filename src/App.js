import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "YOUR API RIGHT HERE";

  function searchPlayer(event) {
      var apiCall = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
      axios.get(apiCall).then(function (response) {
          setPlayerData(response.data);
      }).catch(function (error) {
          console.log(error);
      });
  }
  return (
    <div className="App" >
      <div className="container">
        <h5>League of Legends Player Searcher</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchPlayer(e)}>Search for player</button>
      </div>
        {JSON.stringify(playerData) !== '{}' &&
            <>
            <p> {playerData.name}</p>
            <img width = "100" height = "100" src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" + playerData.profileIconId + ".png"} alt={"Player Icon"}></img>
            <p> Summoner Level {playerData.summonerLevel}</p>
            </>
        }
    </div>
  );
}

export default App;
