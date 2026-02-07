import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import questions from "../data/questions";

export default function Result() {
  const navigate = useNavigate();

  const {
    MAX_TIME,
    timeLeft,
    setStarted,
    setCompleted,
    setTimeLeft,
    setPaused,
    setIceActive,
    setIceStage
  } = useGame();

  const attempted = Number(sessionStorage.getItem("attempted")) || 0;
  const correctCount = Number(sessionStorage.getItem("correctCount")) || 0;
  const incorrectCount = Number(sessionStorage.getItem("incorrectCount")) || 0;

  const totalQuestions = questions.length;

  // PERFECT TIME TAKEN (MATCHES SCREEN TIMER)
  const timeTakenSeconds = MAX_TIME - timeLeft;

  const minutes = Math.floor(timeTakenSeconds / 60);
  const seconds = timeTakenSeconds % 60;

  const success = correctCount === totalQuestions && timeLeft > 0;

  const handleRestart = () => {
    sessionStorage.clear();

    setStarted(false);
    setCompleted(false);
    setTimeLeft(MAX_TIME);

    // IMPORTANT RESET FOR ICEBREAKER
    setPaused(false);
    setIceActive(false);
    setIceStage(0);

    navigate("/");
  };

  return (
    <div className="result">
      {success ? (
        <h1>🎉 Congratulations!</h1>
      ) : (
        <h1>⏱ Better Luck Next Time!</h1>
      )}

      <div className="score-card">
        <h2>Score Card</h2>

        <div className="score-row">
          <span>Attempted</span>
          <span>
            {attempted} / {totalQuestions}
          </span>
        </div>

        <div className="score-row correct">
          <span>Correct</span>
          <span>{correctCount}</span>
        </div>

        <div className="score-row incorrect">
          <span>Incorrect</span>
          <span>{incorrectCount}</span>
        </div>

        <div className="score-row time">
          <span>Time Taken</span>
          <span>
            {minutes} min {seconds.toString().padStart(2, "0")} sec
          </span>
        </div>
      </div>

      <button
        className="restart-btn"
        onClick={handleRestart}
        style={{ marginTop: "28px" }}
      >
        Restart Challenge
      </button>
    </div>
  );
}


// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";
// import questions from "../data/questions";

// export default function Result() {
//   const navigate = useNavigate();

//   // const { MAX_TIME, timeLeft, setStarted, setCompleted, setTimeLeft } = useGame();
//   const { MAX_TIME, timeLeft , setStarted, setCompleted, setTimeLeft, setPaused, setIceActive, setIceStage } = useGame();


//   const attempted = Number(sessionStorage.getItem("attempted")) || 0;
//   const correctCount = Number(sessionStorage.getItem("correctCount")) || 0;
//   const incorrectCount = Number(sessionStorage.getItem("incorrectCount")) || 0;

  
//   const totalQuestions = questions.length;


  
//   const timeTakenSeconds = MAX_TIME - timeLeft;

//   const minutes = Math.floor(timeTakenSeconds / 60);
//   const seconds = timeTakenSeconds % 60;

//   const success = correctCount === totalQuestions && timeLeft > 0;

//   const handleRestart = () => {
//     // sessionStorage.clear();
//     // setStarted(false);
//     // setCompleted(false);
//     // setTimeLeft(MAX_TIME);
//     // navigate("/");
//     const handleRestart = () => {
//     sessionStorage.clear();
  
//     setStarted(false);
//     setCompleted(false);
//     setTimeLeft(MAX_TIME);
  
//     setPaused(false);
//     setIceActive(false);
//     setIceStage(0);
  
//     navigate("/");
// };

//   };

//   return (
//     <div className="result">
//       {success ? (
//         <h1>🎉 Congratulations!</h1>
//       ) : (
//         <h1>⏱ Better Luck Next Time!</h1>
//       )}

//       <div className="score-card">
//         <h2>Score Card</h2>

//         <div className="score-row">
//           <span>Attempted</span>
//           <span>
//             {attempted} / {totalQuestions}
//           </span>
//         </div>

//         <div className="score-row correct">
//           <span>Correct</span>
//           <span>{correctCount}</span>
//         </div>

//         <div className="score-row incorrect">
//           <span>Incorrect</span>
//           <span>{incorrectCount}</span>
//         </div>

//         <div className="score-row time">
//           <span>Time Taken</span>
//           <span>
//             {minutes} min {seconds.toString().padStart(2, "0")} sec
//           </span>
//         </div>

//       </div>

//       <button
//         className="restart-btn"
//         onClick={handleRestart}
//         style={{ marginTop: "28px" }}
//       >
//         Restart Challenge
//       </button>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";
// import { useState } from "react";

// export default function Result() {
//   const navigate = useNavigate();
//   const { MAX_TIME, timeLeft, setStarted, setCompleted, setTimeLeft } = useGame();

//   const attempted = Number(sessionStorage.getItem("attempted")) || 0;
//   const correctCount = Number(sessionStorage.getItem("correctCount")) || 0;
//   const incorrectCount = Number(sessionStorage.getItem("incorrectCount")) || 0;

//   const questionOrder = JSON.parse(sessionStorage.getItem("questionOrder")) || [];
//   const totalQuestions = questionOrder.length;

//   const startTime = Number(sessionStorage.getItem("startTime")) || Date.now();

//   // Freeze finish time only once
//   const [finishTime] = useState(() => {
//     const stored = sessionStorage.getItem("finishTime");

//     if (stored) return Number(stored);

//     const now = Date.now();
//     sessionStorage.setItem("finishTime", now);
//     return now;
//   });

//   const timeTakenSeconds = Math.floor((finishTime - startTime) / 1000);

//   const minutes = Math.floor(timeTakenSeconds / 60);
//   const seconds = timeTakenSeconds % 60;

//   const success = correctCount === totalQuestions && timeLeft > 0;

//   const handleRestart = () => {
//     sessionStorage.clear();
//     setStarted(false);
//     setCompleted(false);
//     setTimeLeft(MAX_TIME);
//     navigate("/");
//   };

//   return (
//     <div className="result">
//       {success ? (
//         <h1>🎉 Congratulations!</h1>
//       ) : (
//         <h1>⏱ Better Luck Next Time!</h1>
//       )}

//       <div className="score-card">
//         <h2>📊 Score Card</h2>

//         <div className="score-row">
//           <span>Attempted</span>
//           <span>
//             {attempted} / {totalQuestions}
//           </span>
//         </div>

//         <div className="score-row correct">
//           <span>Correct</span>
//           <span>{correctCount}</span>
//         </div>

//         <div className="score-row incorrect">
//           <span>Incorrect</span>
//           <span>{incorrectCount}</span>
//         </div>

//         <div className="score-row time">
//           <span>Time Taken</span>
//           <span>
//             {minutes} min {seconds.toString().padStart(2, "0")} sec
//           </span>
//         </div>
//       </div>

//       <button className="start-btn" onClick={handleRestart} style={{ marginTop: "28px" }}>
//         Restart Challenge
//       </button>
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";
// import { useEffect, useState } from "react";

// export default function Result() {
//   const navigate = useNavigate();
//   const { MAX_TIME, timeLeft, setStarted, setCompleted, setTimeLeft } = useGame();

//   const attempted = Number(sessionStorage.getItem("attempted")) || 0;
//   const correctCount = Number(sessionStorage.getItem("correctCount")) || 0;
//   const incorrectCount = Number(sessionStorage.getItem("incorrectCount")) || 0;

//   const questionOrder = JSON.parse(sessionStorage.getItem("questionOrder")) || [];
//   const totalQuestions = questionOrder.length;

//   const startTime = Number(sessionStorage.getItem("startTime")) || Date.now();

//   // Freeze finish time permanently
//   const storedFinishTime = sessionStorage.getItem("finishTime");

//   const [finishTime] = useState(() => {
//     if (storedFinishTime) return Number(storedFinishTime);

//     const now = Date.now();
//     sessionStorage.setItem("finishTime", now);
//     return now;
//   });

//   const timeTakenSeconds = Math.floor((finishTime - startTime) / 1000);
//   const minutes = Math.floor(timeTakenSeconds / 60);
//   const seconds = timeTakenSeconds % 60;

//   const success = correctCount === totalQuestions && timeLeft > 0;

//   const handleRestart = () => {
//     sessionStorage.clear();

//     setStarted(false);
//     setCompleted(false);
//     setTimeLeft(MAX_TIME);

//     navigate("/");
//   };

//   return (
//     <div className="result">
//       {success ? (
//         <h1>🎉 Congratulations!</h1>
//       ) : (
//         <h1>⏱ Better Luck Next Time!</h1>
//       )}

//       <div className="score-card">
//         <h2>Score Card</h2>

//         <div className="score-row">
//           <span>Attempted</span>
//           <span>{attempted} / {totalQuestions}</span>
//         </div>

//         <div className="score-row correct">
//           <span>Correct</span>
//           <span>{correctCount}</span>
//         </div>

//         <div className="score-row incorrect">
//           <span>Incorrect</span>
//           <span>{incorrectCount}</span>
//         </div>

//         <div className="score-row time">
//           <span>Time Taken</span>
//           <span>
//             {minutes} min {seconds.toString().padStart(2, "0")} sec
//           </span>
//         </div>
//       </div>

//       <button
//         onClick={handleRestart}
//         className="restart-btn"
//         style={{ marginTop: "30px" }}
//       >
//         Restart Challenge
//       </button>
//     </div>
//   );
// }
