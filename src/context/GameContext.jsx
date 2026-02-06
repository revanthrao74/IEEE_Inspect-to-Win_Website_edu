import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const MAX_TIME = 900; // 15 minutes

  // Restore state from sessionStorage
  const [timeLeft, setTimeLeft] = useState(() => {
    const stored = sessionStorage.getItem("timeLeft");
    return stored ? Number(stored) : MAX_TIME;
  });

  const [started, setStarted] = useState(() => {
    return sessionStorage.getItem("started") === "true";
  });

  const [completed, setCompleted] = useState(() => {
    return sessionStorage.getItem("completed") === "true";
  });

  // Pause feature (used for IceBreaker)
  const [paused, setPaused] = useState(() => {
    return sessionStorage.getItem("paused") === "true";
  });

  // IceBreaker usable only once
  const [iceUsed, setIceUsed] = useState(() => {
    return sessionStorage.getItem("iceUsed") === "true";
  });

  // IceBreaker currently active (important for refresh)
  const [iceActive, setIceActive] = useState(() => {
    return sessionStorage.getItem("iceActive") === "true";
  });

  /* -------------------------------
     SAVE EVERYTHING TO SESSIONSTORAGE
  -------------------------------- */
  useEffect(() => {
    sessionStorage.setItem("timeLeft", timeLeft);
    sessionStorage.setItem("started", started);
    sessionStorage.setItem("completed", completed);
    sessionStorage.setItem("paused", paused);
    sessionStorage.setItem("iceUsed", iceUsed);
    sessionStorage.setItem("iceActive", iceActive);
  }, [timeLeft, started, completed, paused, iceUsed, iceActive]);

  /* -------------------------------
     TIMER LOGIC (STOPS IF PAUSED)
  -------------------------------- */
  useEffect(() => {
    if (!started || completed || paused) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed, paused]);

  return (
    <GameContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        started,
        setStarted,
        completed,
        setCompleted,
        MAX_TIME,

        paused,
        setPaused,

        iceUsed,
        setIceUsed,

        iceActive,
        setIceActive
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);


// import { createContext, useContext, useEffect, useState } from "react";

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const MAX_TIME = 900;

//   const [paused, setPaused] = useState(
//   sessionStorage.getItem("paused") === "true"
//   );

//   const [iceUsed, setIceUsed] = useState(
//   sessionStorage.getItem("iceUsed") === "true"
//   );


//   const [started, setStarted] = useState(
//     sessionStorage.getItem("started") === "true"
//   );

//   const [timeLeft, setTimeLeft] = useState(
//     Number(sessionStorage.getItem("timeLeft")) || MAX_TIME
//   );

//   const [completed, setCompleted] = useState(
//     sessionStorage.getItem("completed") === "true"
//   );

//   useEffect(() => {
//   sessionStorage.setItem("paused", paused);
//   sessionStorage.setItem("iceUsed", iceUsed);
//   }, [paused, iceUsed]);


//   // Persist state
//   useEffect(() => {
//     sessionStorage.setItem("started", started);
//     sessionStorage.setItem("timeLeft", timeLeft);
//     sessionStorage.setItem("completed", completed);
//   }, [started, timeLeft, completed]);

//   // Timer logic
//   useEffect(() => {
//   if (!started || completed || paused) return;

//   const timer = setInterval(() => {
//     setTimeLeft((t) => {
//       if (t <= 1) {
//         clearInterval(timer);
//         return 0;
//       }
//       return t - 1;
//     });
//   }, 1000);

//   return () => clearInterval(timer);
// }, [started, completed, paused]);


//   return (
//     <GameContext.Provider value={{
//      timeLeft,
//      setTimeLeft,
//      started,
//      setStarted,
//      completed,
//      setCompleted,
//      MAX_TIME,
//      paused,
//      setPaused,
//      iceUsed,
//      setIceUsed
//      }}>

//       {children}
//     </GameContext.Provider>
//   );
// };

// export const useGame = () => useContext(GameContext);


