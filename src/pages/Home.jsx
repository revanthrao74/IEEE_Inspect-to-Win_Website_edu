import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function Home() {
  const navigate = useNavigate();
  const { setStarted } = useGame();

  const startGame = () => {
    setStarted(true);
    navigate("/game");
  };

  return (
    <div className="home">
      <div className="logos">
      <img height="120px" width="150px" src="./public/IEEE Edsoc LOGO.png"></img>
      <img height="120px" width="150px" src="IEEE PES LOGO.png"></img>
      <img height="120px" width="150px" src="IEEE RAS LOGO.png"></img>
      <img height="120px" width="150px" src="IEEE AESS LOGO.png"></img>
      </div>
      <h1>🔍 Inspect to Win</h1>
      <p>
        A fast-paced interactive event where your debugging skills are tested.
        Use Inspect Element, DevTools, React DevTools, and logic to uncover hidden clues.
      </p>

      <ul>
        <li>⏱ Max Time: 15 Minutes</li>
        <li>🔀 Questions & options are randomized</li>
        <li>🛠 DevTools allowed & encouraged</li>
        <li>🚫 Using Third party apps are not Encouraged </li>
      </ul>

      <button onClick={startGame} className="start-btn">
        Start Challenge
      </button>
    </div>
  );
}
