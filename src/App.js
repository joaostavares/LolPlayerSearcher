import React, {useState, useRef} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const playerSearch = useRef(null);
    const [playerData, setPlayerData] = useState(null);
    const API_KEY = "YOUR API_KEY RIGHT HERE";

    function searchPlayer() {
        const apiCall = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerSearch.current.value + "?api_key=" + API_KEY;
        const getPlayerData = async () => {
            try {
                const resp = await axios.get(apiCall);
                setPlayerData(resp.data);
            } catch (err) {
                console.error(err);
            }
        };
        getPlayerData();
    }
    return (
        <div className="App" >
          <div className="container">
            <h5>League of Legends Player Searcher</h5>
            <input
                ref={playerSearch}
                type="text"
                id="playerName"
                name="playerName"
            />
            <button onClick={e => searchPlayer(e)}>Search for player</button>
          </div>
            {playerData &&
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
