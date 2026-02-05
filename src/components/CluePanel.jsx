

export default function CluePanel({ type }) {
  if (type === "blinking") {
    return (
      <div className="clue blinking">
        A B C D E P A U S E J S F G H
      </div>
    );
  }

  if (type === "image-alt") {
    return <img src="/broken.png" alt="ALT_TEXT" />;
  }

  return <div className="clue">Use your tools wisely.</div>;
}
