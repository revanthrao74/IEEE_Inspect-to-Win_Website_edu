import { useEffect, useState } from "react";

const memes = [
  {
    title: "When you remove one console.log and everything breaks 💀",
    img: "https://i.imgflip.com/4/1bhw.jpg",
    gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif"
  },
  {
    title: "When the code works only on your laptop 😭",
    img: "https://i.imgflip.com/4/3si4.jpg",
    gif: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
  },
  {
    title: "When you debug for 3 hours and realize WiFi was off 🤡",
    img: "https://i.imgflip.com/4/2hgfw.jpg",
    gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
  },
  {
    title: "When you push code without testing and pray 🙏",
    img: "https://i.imgflip.com/4/1ur9b0.jpg",
    gif: "https://media.giphy.com/media/3o7aD4o5fJ5pN1pGvC/giphy.gif"
  },
  {
    title: "When the judge says: 'Explain your project in 30 seconds' 😭",
    img: "https://i.imgflip.com/4/39t1o.jpg",
    gif: "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
  },
  {
    title: "When you fix the bug but don’t know how 🤯",
    img: "https://i.imgflip.com/4/1g8my4.jpg",
    gif: "https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif"
  },
  {
    title: "When your teammate says: 'It works on my machine' 😡",
    img: "https://i.imgflip.com/4/1jwhww.jpg",
    gif: "https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif"
  },
  {
    title: "When your code finally compiles after 27 errors 😭🔥",
    img: "https://i.imgflip.com/4/26am.jpg",
    gif: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif"
  },
  {
    title: "When you realize the bug was a spelling mistake 🥲",
    img: "https://i.imgflip.com/4/2wifvo.jpg",
    gif: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif"
  },
  {
    title: "When you see 'undefined' and your soul leaves your body 👻",
    img: "https://i.imgflip.com/4/2xscjb.jpg",
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
  },
  {
    title: "When you copy code from StackOverflow and it works immediately 😎",
    img: "https://i.imgflip.com/4/1yxkcp.jpg",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
  },
  {
    title: "When you forget to save the file and wonder why nothing changes 🤡",
    img: "https://i.imgflip.com/4/2p3dw.jpg",
    gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
  },

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
    title: "When you push to main branch without testing 🤡",
    img: "https://i.imgflip.com/4/1otk96.jpg",
    gif: "https://media.giphy.com/media/9M5jK4GXmD5o1irGrF/giphy.gif"
  },
  {
    title: "When your senior says 'just a small change' 💀",
    img: "https://i.imgflip.com/4/30b1gx.jpg",
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
  },
  {
    title: "When the bug disappears in demo 😭",
    img: "https://i.imgflip.com/4/2cp1.jpg",
    gif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
  }
];

export default function IceBreakerCard({ onClose }) {
  // Random meme changes on refresh
  const [randomMeme] = useState(() => {
    return memes[Math.floor(Math.random() * memes.length)];
  });

  // Icebreaker end time (30 sec) stored in sessionStorage
  const [endTime] = useState(() => {
    const stored = sessionStorage.getItem("iceEndTime");

    if (stored) return Number(stored);

    const newEnd = Date.now() + 30000; // 30 sec
    sessionStorage.setItem("iceEndTime", newEnd);
    return newEnd;
  });

  const [secondsLeft, setSecondsLeft] = useState(() => {
    const diff = Math.floor((endTime - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.floor((endTime - Date.now()) / 1000);

      if (diff <= 0) {
        clearInterval(timer);
        sessionStorage.removeItem("iceEndTime");
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
        <h2>🎭 Chill Break</h2>

        <p className="ice-timer">
          Relax Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
        </p>

        <h3 className="ice-title">{randomMeme.title}</h3>

        <div className="ice-media">
          <img className="ice-img" src={randomMeme.img} alt="meme" />
          <img className="ice-gif" src={randomMeme.gif} alt="gif" />
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
//   // Pick random meme each refresh
//   const [randomMeme] = useState(() => {
//     return memes[Math.floor(Math.random() * memes.length)];
//   });

//   // Create or restore icebreaker end time
//   const [endTime] = useState(() => {
//     const storedEnd = sessionStorage.getItem("iceEndTime");

//     if (storedEnd) return Number(storedEnd);

//     const newEnd = Date.now() + 30000; // 3 minutes from now
//     sessionStorage.setItem("iceEndTime", newEnd);
//     return newEnd;
//   });

//   const [secondsLeft, setSecondsLeft] = useState(() => {
//     const diff = Math.floor((endTime - Date.now()) / 1000);
//     return diff > 0 ? diff : 0;
//   });

//   // Countdown interval
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const diff = Math.floor((endTime - Date.now()) / 1000);

//       if (diff <= 0) {
//         clearInterval(timer);
//         sessionStorage.removeItem("iceEndTime"); // cleanup
//         onClose();
//       } else {
//         setSecondsLeft(diff);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [endTime, onClose]);

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
//           <img className="ice-img" src={randomMeme.img} alt="funny meme" />
//           <img className="ice-gif" src={randomMeme.gif} alt="funny gif" />
//         </div>

//         <p className="ice-note">
//           Relax 😌 Timer is paused. Game resumes automatically when chill time ends.Refresh the page to Magic.
//         </p>
//       </div>
//     </div>
//   );
// }


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
