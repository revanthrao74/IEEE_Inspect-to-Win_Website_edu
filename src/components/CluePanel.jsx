export default function CluePanel({ type, hints }) {
  // For Python and C questions, display the code from hints
  if ((type === "pythonLang" || type === "cLang") && typeof hints === "string") {
    return (
      <div className="clue code-display">
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "14px" }}>
          {hints}
        </pre>
      </div>
    );
  }

  // For regular questions with object hints (primary and misleading)
  if (hints && typeof hints === "object" && hints.primary) {
    return (
      <div className="clue">
        <div style={{ marginBottom: "10px" }}>
          <strong>Primary Hint:</strong> {hints.primary}
        </div>
        {hints.misleading && (
          <div style={{ opacity: 0.7 }}>
            <strong>Alternative:</strong> {hints.misleading}
          </div>
        )}
      </div>
    );
  }

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
