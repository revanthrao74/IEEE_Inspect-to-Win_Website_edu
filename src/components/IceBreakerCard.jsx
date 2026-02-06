import { useEffect, useState } from "react";

const memes = [
  {
    title: "When your code works but you don’t know why 😭",
    img: "https://i.imgflip.com/4/4t0m5.jpg",
    gif: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif"
  },
  {
    title: "When you fix one bug and 10 new bugs appear 💀",
    img: "https://i.imgflip.com/4/1bij.jpg",
    gif: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"
  },
  {
    title: "When you forget semicolon and blame React 🤡",
    img: "https://i.imgflip.com/4/30b1gx.jpg",
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
  },
  {
    title: "When you console.log() and feel like a hacker 😎",
    img: "https://i.imgflip.com/4/2wifvo.jpg",
    gif: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif"
  },
  {
    title: "When you push to main branch without testing 💀💀",
    img: "https://i.imgflip.com/4/1otk96.jpg",
    gif: "https://media.giphy.com/media/9M5jK4GXmD5o1irGrF/giphy.gif"
  },
  {
    title: "When the bug disappears in front of your senior 😭",
    img: "https://i.imgflip.com/4/2cp1.jpg",
    gif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
  }
];

export default function IceBreakerCard({ onClose }) {
  // Pick random meme each refresh
  const [randomMeme] = useState(() => {
    return memes[Math.floor(Math.random() * memes.length)];
  });

  // Create or restore icebreaker end time
  const [endTime] = useState(() => {
    const storedEnd = sessionStorage.getItem("iceEndTime");

    if (storedEnd) return Number(storedEnd);

    const newEnd = Date.now() + 30000; // 3 minutes from now
    sessionStorage.setItem("iceEndTime", newEnd);
    return newEnd;
  });

  const [secondsLeft, setSecondsLeft] = useState(() => {
    const diff = Math.floor((endTime - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  });

  // Countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.floor((endTime - Date.now()) / 1000);

      if (diff <= 0) {
        clearInterval(timer);
        sessionStorage.removeItem("iceEndTime"); // cleanup
        onClose();
      } else {
        setSecondsLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onClose]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="ice-overlay">
      <div className="ice-card">
        <h2>🎭 Ice Breaker Session</h2>

        <p className="ice-timer">
          Chill Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
        </p>

        <h3 className="ice-title">{randomMeme.title}</h3>

        <div className="ice-media">
          <img className="ice-img" src={randomMeme.img} alt="funny meme" />
          <img className="ice-gif" src={randomMeme.gif} alt="funny gif" />
        </div>

        <p className="ice-note">
          Relax 😌 Timer is paused. Game resumes automatically when chill time ends.Refresh the page to Magic.
        </p>
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";

// const memes = [
//   {
//     title: "When your code works but you don’t know why 😭",
//     img: "https://i.imgflip.com/4/4t0m5.jpg",
//     gif: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif"
//   },
//   {
//     title: "When you fix one bug and 10 new bugs appear 💀",
//     img: "https://i.imgflip.com/4/1bij.jpg",
//     gif: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"
//   },
//   {
//     title: "When you forget semicolon and blame React 🤡",
//     img: "https://i.imgflip.com/4/30b1gx.jpg",
//     gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
//   },
//   {
//     title: "When you console.log() and feel like a hacker 😎",
//     img: "https://i.imgflip.com/4/2wifvo.jpg",
//     gif: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif"
//   },
//   {
//     title: "When you push to main branch without testing 💀💀",
//     img: "https://i.imgflip.com/4/1otk96.jpg",
//     gif: "https://media.giphy.com/media/9M5jK4GXmD5o1irGrF/giphy.gif"
//   },
//   {
//     title: "When the bug disappears in front of your senior 😭",
//     img: "https://i.imgflip.com/4/2cp1.jpg",
//     gif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
//   }
// ];

// export default function IceBreakerCard({ onClose }) {
//   const [secondsLeft, setSecondsLeft] = useState(180);

//   // Pick random meme+gif each refresh
//   const [randomMeme] = useState(() => {
//     return memes[Math.floor(Math.random() * memes.length)];
//   });

//   // Countdown
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setSecondsLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Auto close after 3 min
//   useEffect(() => {
//     if (secondsLeft <= 0) {
//       onClose();
//     }
//   }, [secondsLeft, onClose]);

//   const minutes = Math.floor(secondsLeft / 60);
//   const seconds = secondsLeft % 60;

//   return (
//     <div className="ice-overlay">
//       <div className="ice-card">
//         <h2>🎭 Ice Breaker Session</h2>

//         <p className="ice-timer">
//           Chill Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
//         </p>

//         <h3 className="ice-title">{randomMeme.title}</h3>

//         <div className="ice-media">
//           <img
//             className="ice-img"
//             src={randomMeme.img}
//             alt="funny meme"
//           />

//           <img
//             className="ice-gif"
//             src={randomMeme.gif}
//             alt="funny gif"
//           />
//         </div>

//         <p className="ice-note">
//           Relax 😌 Timer is paused. Game resumes automatically after 3 minutes.
//         </p>
//       </div>
//     </div>
//   );
// }
