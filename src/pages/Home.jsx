import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function Home() {
  const navigate = useNavigate();
  const { setStarted, setCompleted, setTimeLeft, MAX_TIME } = useGame();

  const handleStart = () => {
    // Clear old session data
    sessionStorage.clear();

    // Fresh start time
    sessionStorage.setItem("startTime", Date.now());

    // Reset context
    setStarted(true);
    setCompleted(false);
    setTimeLeft(MAX_TIME);

    navigate("/game");
  };

  return (
    <div className="home">
       <div className="logos">
       <img height="120px" width="150px" src="IEEE CBIT LOGO.jpg"></img>
       <img height="120px" width="150px" src="IEEE EdSoc LOGO.png"></img>
       <img height="120px" width="150px" src="IEEE PES LOGO.png"></img>
       <img height="120px" width="150px" src="IEEE RAS LOGO.png"></img>
       <img height="120px" width="150px" src="IEEE AESS LOGO.png"></img>
       </div>
      <h1>🔍 Inspect To Win</h1>

      <p>
        Welcome to Inspect To Win! A fun debugging challenge where you must use
        DevTools, Inspect Element, and hidden clues across pages.
      </p>

      <ul>
        <li>⏱ Total time: 15 minutes</li>
        <li>🕵️ Find answers using Inspect Element, Console, and hidden pages</li>
        <li>🎭 Chill breaks will appear automatically</li>
        <li>🏆 Finish all questions before time runs out</li>
        <li>🚫 Using Third party apps are not Encouraged </li>
      </ul>

      <button className="start-btn" onClick={handleStart}>
        Start Challenge
      </button>
    </div>
  );
}

