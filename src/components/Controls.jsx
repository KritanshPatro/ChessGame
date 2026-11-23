export default function Controls({ onNewGame, onUndo, onFlip, canUndo }) {
  return (
    <div className="controls">
      <button className="btn primary" onClick={onNewGame}>New game</button>
      <button className="btn" onClick={onUndo} disabled={!canUndo}>Undo</button>
      <button className="btn" onClick={onFlip}>Flip board</button>
    </div>
  );
}
