import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import { shuffle } from "../utils/shuffle";
import QuestionPanel from "../components/QuestionPanel";
import CluePanel from "../components/CluePanel";
import ProgressBar from "../components/ProgressBar";
import IceBreakerCard from "../components/IceBreakerCard";
import { useGame } from "../context/GameContext";

/* -------------------------------
   LOCK QUESTION ORDER PER SESSION
-------------------------------- */
const storedQuestions = sessionStorage.getItem("questionOrder");

const shuffledQuestions = storedQuestions
  ? JSON.parse(storedQuestions)
  : shuffle(questions);

if (!storedQuestions) {
  sessionStorage.setItem("questionOrder", JSON.stringify(shuffledQuestions));
}

export default function Game() {
  const navigate = useNavigate();

  const {
    timeLeft,
    setCompleted,
    paused,
    setPaused,
    iceUsed,
    setIceUsed,
    iceActive,
    setIceActive
  } = useGame();

  // Restore question index
  const [index, setIndex] = useState(
    Number(sessionStorage.getItem("currentIndex")) || 0
  );

  // Restore scoreboard
  const [attempted, setAttempted] = useState(
    Number(sessionStorage.getItem("attempted")) || 0
  );

  const [correctCount, setCorrectCount] = useState(
    Number(sessionStorage.getItem("correctCount")) || 0
  );

  const [incorrectCount, setIncorrectCount] = useState(
    Number(sessionStorage.getItem("incorrectCount")) || 0
  );

  /* -------------------------------
     STORE START TIME ONLY ONCE
  -------------------------------- */
  useEffect(() => {
    if (!sessionStorage.getItem("startTime")) {
      sessionStorage.setItem("startTime", Date.now());
    }
  }, []);

  /* -------------------------------
     SAVE PROGRESS & SCOREBOARD
  -------------------------------- */
  useEffect(() => {
    sessionStorage.setItem("currentIndex", index);
    sessionStorage.setItem("attempted", attempted);
    sessionStorage.setItem("correctCount", correctCount);
    sessionStorage.setItem("incorrectCount", incorrectCount);
  }, [index, attempted, correctCount, incorrectCount]);

  /* -------------------------------
     TIME UP → RESULT PAGE
  -------------------------------- */
  useEffect(() => {
    if (timeLeft === 0) {
      setCompleted(true);
      navigate("/result");
    }
  }, [timeLeft, navigate, setCompleted]);

  /* -------------------------------
     GO NEXT QUESTION
  -------------------------------- */
  const goNext = () => {
    const nextIndex = index + 1;

    // Save instantly for refresh safety
    sessionStorage.setItem("currentIndex", nextIndex);

    if (nextIndex >= shuffledQuestions.length) {
      setCompleted(true);
      navigate("/result");
    } else {
      setIndex(nextIndex);
    }
  };

  /* -------------------------------
     SCORE HANDLERS
  -------------------------------- */
  const handleCorrect = () => {
    setAttempted((prev) => prev + 1);
    setCorrectCount((prev) => prev + 1);
    goNext();
  };

  const handleWrong = () => {
    setAttempted((prev) => prev + 1);
    setIncorrectCount((prev) => prev + 1);
    goNext();
  };

  /* -------------------------------
     ICEBREAKER HANDLERS
  -------------------------------- */
  const openIceBreaker = () => {
    if (iceUsed) return;

    setPaused(true);
    setIceUsed(true);
    setIceActive(true);
  };

  const closeIceBreaker = () => {
    setIceActive(false);
    setPaused(false);
  };

  /* -------------------------------
     SAFETY CHECK
  -------------------------------- */
  if (!shuffledQuestions[index]) {
    navigate("/result");
    return null;
  }

  return (
    <>
      {/* Progress bar */}
      <ProgressBar current={index} total={shuffledQuestions.length} />

      {/* Question Status Bar */}
      <div className="question-status-bar">
        <p>
          Question <b>{index + 1}</b> / <b>{shuffledQuestions.length}</b>
        </p>

        <p>
          Completed: <b>{index}</b> | Left:{" "}
          <b>{shuffledQuestions.length - index}</b>
        </p>
      </div>

      {/* Ice Breaker Button */}
      <button
        className={`ice-btn ${iceUsed ? "disabled" : ""}`}
        onClick={openIceBreaker}
        disabled={iceUsed}
      >
        🎭 Ice Break (30 sec)
      </button>

      {/* Ice Breaker Card */}
      {iceActive && <IceBreakerCard onClose={closeIceBreaker} />}

      {/* Game Layout */}
      <div className="game-layout">
        <QuestionPanel
          data={shuffledQuestions[index]}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          questionNo={index + 1}
          totalQuestions={shuffledQuestions.length}
        />

        <CluePanel type={shuffledQuestions[index].type} />
      </div>
    </>
  );
}


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import questions from "../data/questions";
// import { shuffle } from "../utils/shuffle";
// import QuestionPanel from "../components/QuestionPanel";
// import CluePanel from "../components/CluePanel";
// import ProgressBar from "../components/ProgressBar";
// import { useGame } from "../context/GameContext";
// import IceBreakerCard from "../components/IceBreakerCard";


// /* -------------------------------
//    LOCK QUESTION ORDER PER SESSION
// -------------------------------- */
// const storedQuestions = sessionStorage.getItem("questionOrder");

// const shuffledQuestions = storedQuestions
//   ? JSON.parse(storedQuestions)
//   : shuffle(questions);

// if (!storedQuestions) {
//   sessionStorage.setItem("questionOrder", JSON.stringify(shuffledQuestions));
// }

// export default function Game() {
//   const navigate = useNavigate();
//   const { timeLeft, setCompleted } = useGame();

//   const { setPaused, paused, iceUsed, setIceUsed } = useGame();
//   const [showIce, setShowIce] = useState(false);


//    const { iceActive, setIceActive } = useGame();


//    const [index, setIndex] = useState(
//     Number(sessionStorage.getItem("currentIndex")) || 0
//    );

//   // Restore scoreboard values
//   const [attempted, setAttempted] = useState(
//     Number(sessionStorage.getItem("attempted")) || 0
//   );

//   const [correctCount, setCorrectCount] = useState(
//     Number(sessionStorage.getItem("correctCount")) || 0
//   );

//   const [incorrectCount, setIncorrectCount] = useState(
//     Number(sessionStorage.getItem("incorrectCount")) || 0
//   );

//   /* -------------------------------
//      STORE START TIME ONLY ONCE
//   -------------------------------- */
//   useEffect(() => {
//     if (!sessionStorage.getItem("startTime")) {
//       sessionStorage.setItem("startTime", Date.now());
//     }
//   }, []);

//   /* -------------------------------
//      SAVE EVERYTHING
//   -------------------------------- */
//   useEffect(() => {
//     sessionStorage.setItem("currentIndex", index);
//     sessionStorage.setItem("attempted", attempted);
//     sessionStorage.setItem("correctCount", correctCount);
//     sessionStorage.setItem("incorrectCount", incorrectCount);
//   }, [index, attempted, correctCount, incorrectCount]);

//   /* -------------------------------
//      TIME UP → GO TO RESULT
//   -------------------------------- */
//   useEffect(() => {
//     if (timeLeft === 0) {
//       setCompleted(true);
//       navigate("/result");
//     }
//   }, [timeLeft, navigate, setCompleted]);

//   /* -------------------------------
//      NEXT QUESTION FUNCTION
//   -------------------------------- */
//   const goNext = () => {
//     const nextIndex = index + 1;

//     // Save immediately
//     sessionStorage.setItem("currentIndex", nextIndex);

//     if (nextIndex >= shuffledQuestions.length) {
//       setCompleted(true);
//       navigate("/result");
//     } else {
//       setIndex(nextIndex);
//     }
//   };

//   const openIceBreaker = () => {
//   if (iceUsed) return;

//   setPaused(true);
//   setIceUsed(true);
//   setShowIce(true);
//   };

//   const closeIceBreaker = () => {
//   setShowIce(false);
//   setPaused(false);
//   };


//   /* -------------------------------
//      CORRECT / WRONG HANDLERS
//   -------------------------------- */
//   const handleCorrect = () => {
//     setAttempted((prev) => prev + 1);
//     setCorrectCount((prev) => prev + 1);
//     goNext();
//   };

//   const handleWrong = () => {
//     setAttempted((prev) => prev + 1);
//     setIncorrectCount((prev) => prev + 1);
//     goNext();
//   };

//   /* -------------------------------
//      SAFETY CHECK
//   -------------------------------- */
//   if (!shuffledQuestions[index]) {
//     navigate("/result");
//     return null;
//   }

//   return (
//     <>
//       <ProgressBar current={index} total={shuffledQuestions.length} />
      
//       <div className="question-status-bar">
//         <p>
//           Question <b>{index + 1}</b> / <b>{shuffledQuestions.length}</b>
//         </p>
//         <p>
//           Completed: <b>{index}</b> | Left:{" "}
//           <b>{shuffledQuestions.length - index}</b>
//         </p>
//       </div>


//       <button
//         className={`ice-btn ${iceUsed ? "disabled" : ""}`}
//         onClick={openIceBreaker}
//         disabled={iceUsed}
//         >
//         🎭 Ice Break (3 min)
//         </button>

//         {/* {showIce && <IceBreakerCard onClose={closeIceBreaker} />} */}
//         {iceActive && <IceBreakerCard onClose={closeIceBreaker} />}


//       <div className="game-layout">
//         <QuestionPanel
//           data={shuffledQuestions[index]}
//           onCorrect={handleCorrect}
//           onWrong={handleWrong}
//           questionNo={index + 1}
//           totalQuestions={shuffledQuestions.length}
//         />

//         <CluePanel type={shuffledQuestions[index].type} />
//       </div>
//     </>
//   );
// }
