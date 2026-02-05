const questions = [
  {
    id: 1,
    question: "You are currently staring at the answer.",
    options: ["BLUE", "WHITE", "SAME_AS_BODY", "TRANSPARENT"],
    correct: "SAME_AS_BODY",
    hints: {
      primary: "Sometimes visibility is an illusion.",
      misleading: "Try zooming the page."
    },
    targetPages: ["/game"],
    answerSplit: ["SAME_", "AS_", "BODY"],
    type: "css-hidden"
  },

  {
    id: 2,
    question: "You’ll find the answer when the image fails to load.",
    options: ["BROKEN", "ALT_TEXT", "SRC", "404"],
    correct: "ALT_TEXT",
    hints: {
      primary: "Images can speak even when silent.",
      misleading: "Check the network tab."
    },
    targetPages: ["/game"],
    answerSplit: ["ALT_", "TEXT"],
    type: "image-alt"
  },

  {
    id: 3,
    question: "The person who wrote the code left a note behind.",
    options: ["DEBUG", "TODO", "COMMENT", "WARNING"],
    correct: "COMMENT",
    hints: {
      primary: "Developers talk to themselves.",
      misleading: "Look inside console logs."
    },
    targetPages: ["/docs/api"],
    answerSplit: ["COM", "MENT"],
    type: "comment"
  },

  {
    id: 4,
    question: "Too fast for the eyes. Slow it down.",
    options: ["PAUSE_JS", "WAIT", "ZOOM", "REFRESH"],
    correct: "PAUSE_JS",
    hints: {
      primary: "Time obeys developers.",
      misleading: "Try refreshing the page."
    },
    targetPages: ["/playground/experimental"],
    answerSplit: ["PAUSE_", "JS"],
    type: "blinking"
  },

  {
    id: 5,
    question: "The truth is scattered, not stored.",
    options: ["SESSION", "FRAGMENT", "CHAIN", "SPLIT"],
    correct: "CHAIN",
    hints: {
      primary: "One page is never enough.",
      misleading: "Try checking settings…"
    },
    targetPages: ["/logs/session", "/docs/deprecated"],
    answerSplit: ["CH", "AIN"],
    type: "multi-page"
  },

  {
    id: 6,
    question: "Errors aren’t always useless.",
    options: ["IGNORE", "404", "DEBUG", "FAIL"],
    correct: "DEBUG",
    hints: {
      primary: "Sometimes the wrong path is the right one.",
      misleading: "Check the console only."
    },
    targetPages: ["/404-not-found-but-useful"],
    answerSplit: ["DE", "BUG"],
    type: "hidden-page"
  },

  {
    id: 7,
    question: "The browser remembers what you don’t.",
    options: ["CACHE", "SESSION", "LOCAL", "MEMORY"],
    correct: "LOCAL",
    hints: {
      primary: "Storage is not just for files.",
      misleading: "Try reloading the page."
    },
    targetPages: ["/profile/settings"],
    answerSplit: ["LO", "CAL"],
    type: "local-storage"
  },

  {
    id: 8,
    question: "Not everything is rendered, but it exists.",
    options: ["STATE", "PROP", "CONTEXT", "HOOK"],
    correct: "STATE",
    hints: {
      primary: "Look inside the component.",
      misleading: "Check the DOM tree."
    },
    targetPages: ["/game"],
    answerSplit: ["ST", "ATE"],
    type: "react-state"
  },

  {
    id: 9,
    question: "Passed down silently, never shown.",
    options: ["STATE", "PROP", "STORE", "CACHE"],
    correct: "PROP",
    hints: {
      primary: "Parents know more than children.",
      misleading: "Inspect CSS values."
    },
    targetPages: ["/game"],
    answerSplit: ["PR", "OP"],
    type: "react-props"
  },

  {
    id: 10,
    question: "This route was never linked.",
    options: ["HIDDEN", "SECRET", "MANUAL", "DIRECT"],
    correct: "MANUAL",
    hints: {
      primary: "URLs don’t need permission.",
      misleading: "Click every button."
    },
    targetPages: ["/docs/deprecated"],
    answerSplit: ["MAN", "UAL"],
    type: "route-navigation"
  }
];

export default questions;

