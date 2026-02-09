import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import questions from "../data/questions";
import { buildGameQuestions } from "../utils/buildGameQuestions";
// import { shuffle } from "../utils/shuffle";
import QuestionPanel from "../components/QuestionPanel";
import CluePanel from "../components/CluePanel";
import ProgressBar from "../components/ProgressBar";
import IceBreakerCard from "../components/IceBreakerCard";
import { useGame } from "../context/GameContext";

/* -------------------------------
   LOCK QUESTION ORDER PER SESSION
-------------------------------- */
// const storedQuestions = sessionStorage.getItem("questionOrder");

// const shuffledQuestions = storedQuestions
//   ? JSON.parse(storedQuestions)
//   : shuffle(questions);

// if (!storedQuestions) {
//   sessionStorage.setItem("questionOrder", JSON.stringify(shuffledQuestions));
// }

const storedQuestions = sessionStorage.getItem("questionOrder");

const shuffledQuestions = storedQuestions
  ? JSON.parse(storedQuestions)
  : buildGameQuestions();

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
    iceActive,
    setIceActive,
    iceStage,
    setIceStage
  } = useGame();

  const [index, setIndex] = useState(
    Number(sessionStorage.getItem("currentIndex")) || 0
  );

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
     STORE START TIME ONCE
  -------------------------------- */
  useEffect(() => {
    if (!sessionStorage.getItem("startTime")) {
      sessionStorage.setItem("startTime", Date.now());
    }
  }, []);

  /* -------------------------------
     SAVE GAME STATE
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
     AUTO ICEBREAKER AT Q4 & Q8
  -------------------------------- */
  useEffect(() => {
    // Q4 (index 3)
    if (index === 3 && iceStage === 0 && !iceActive) {
      sessionStorage.removeItem("iceEndTime");
      setPaused(true);
      setIceActive(true);
      setIceStage(1);
    }

    // Q8 (index 7)
    if (index === 7 && iceStage === 1 && !iceActive) {
      sessionStorage.removeItem("iceEndTime");
      setPaused(true);
      setIceActive(true);
      setIceStage(2);
    }
  }, [index, iceStage, iceActive, setPaused, setIceActive, setIceStage]);

  /* -------------------------------
     CLOSE ICEBREAKER
  -------------------------------- */
  const closeIceBreaker = () => {
    sessionStorage.removeItem("iceEndTime");
    setIceActive(false);
    setPaused(false);
  };

  /* -------------------------------
     GO NEXT QUESTION
  -------------------------------- */
  const goNext = () => {
    const nextIndex = index + 1;
    sessionStorage.setItem("currentIndex", nextIndex);

    if (nextIndex >= shuffledQuestions.length) {
      setCompleted(true);
      navigate("/result");
    } else {
      setIndex(nextIndex);
    }
  };

  /* -------------------------------
     ANSWER HANDLERS
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
     SAFETY CHECK
  -------------------------------- */
  if (!shuffledQuestions[index]) {
    navigate("/result");
    return null;
  }

  return (
    <>
      <ProgressBar current={index} total={shuffledQuestions.length} />
      <div className="question-status-bar">
        <p>
          Question <b>{index + 1}</b> / <b>{shuffledQuestions.length}</b>
        </p>

        <p>
          Completed: <b>{index}</b> | Left:{" "}
          <b>{shuffledQuestions.length - index}</b>
        </p>
      </div>

      {/* ICEBREAKER MODAL */}
      {iceActive && <IceBreakerCard onClose={closeIceBreaker} />}

      <div className="game-layout">
        <QuestionPanel
          data={shuffledQuestions[index]}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          questionNo={index + 1}
          totalQuestions={shuffledQuestions.length}
        />

        <CluePanel type={shuffledQuestions[index].type} hints={shuffledQuestions[index].hints} />
      </div>
    </>
  );
}

