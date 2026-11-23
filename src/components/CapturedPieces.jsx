const GLYPH = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛' },
};

// Pieces each side has taken, derived from the move history.
export default function CapturedPieces({ history }) {
  const takenBy = { w: [], b: [] };
  for (const move of history) {
    if (move.captured) {
      const victimColor = move.color === 'w' ? 'b' : 'w';
      takenBy[move.color].push(GLYPH[victimColor][move.captured]);
    }
  }
  return (
    <div className="panel-box">
      <h3>Captured</h3>
      <div className="captured-row" title="Taken by White">{takenBy.w.join('') || '—'}</div>
      <div className="captured-row" title="Taken by Black">{takenBy.b.join('') || '—'}</div>
    </div>
  );
}
