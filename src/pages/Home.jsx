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
        <img height="60px" src="IEEE EdSoc LOGO.png" alt="IEEE EdSoc"></img>
        <img height="60px" src="IEEE PES LOGO.png" alt="IEEE PES"></img>
        <img height="60px" src="IEEE RAS LOGO.png" alt="IEEE RAS"></img>
        <img height="60px" src="IEEE AESS LOGO.png" alt="IEEE AESS"></img>
      </div>

      <div className="titles">
        <h1 className="main-title">UDHBAVA 3.0</h1>
        <h2 className="sub-title">Stratos Round 2</h2>
        <h2 className="event-name">🔍 Inspect To Win</h2>
      </div>




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
      {console.log("ANSWER: console_is_key")}
      <button className="start-btn" onClick={handleStart}>
        Start Challenge
      </button>
    </div>
  );
}

