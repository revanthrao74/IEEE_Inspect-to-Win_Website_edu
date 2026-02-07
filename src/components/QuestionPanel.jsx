import { useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";

export default function QuestionPanel({
  data,
  onCorrect,
  onWrong,
  questionNo,
  totalQuestions
}) {
  const [selected, setSelected] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setSelected(null);

    const t = setTimeout(() => {
      setShuffledOptions(shuffle(data.options));
    }, 200);

    return () => clearTimeout(t);
  }, [data]);

  const handleSubmit = () => {
    if (!selected) return;

    if (selected === data.correct) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  return (
    <div className="question-panel">

      <h2>{data.question}</h2>

      {shuffledOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={selected === option ? "active" : ""}
        >
          {option}
        </button>
      ))}

      <button className="submit-btn" onClick={handleSubmit} disabled={!selected}>
        Submit
      </button>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { shuffle } from "../utils/shuffle";

// export default function QuestionPanel({
//   data,
//   onCorrect,
//   onWrong,
//   questionNo,
//   totalQuestions
// }) {
//   const [selected, setSelected] = useState(null);
//   const [shuffledOptions, setShuffledOptions] = useState([]);

//   useEffect(() => {
//     setSelected(null);

//     const t = setTimeout(() => {
//       setShuffledOptions(shuffle(data.options));
//     }, 200);

//     return () => clearTimeout(t);
//   }, [data]);

//   const handleSubmit = () => {
//     if (!selected) return;

//     if (selected === data.correct) {
//       onCorrect();
//     } else {
//       onWrong();
//     }
//   };

//   return (
//     <div className="question-panel">
//       <h2>{data.question}</h2>

//       {shuffledOptions.map((option) => (
//         <button
//           key={option}
//           onClick={() => setSelected(option)}
//           className={selected === option ? "active" : ""}
//         >
//           {option}
//         </button>
//       ))}

//       <button
//         onClick={handleSubmit}
//         className="submit-btn"
//         disabled={!selected}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }




