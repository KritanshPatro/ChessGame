// Whose turn it is, plus a banner for check / checkmate / stalemate / draws.
export default function GameStatus({ turn, status }) {
  const isWhite = turn === 'w';
  const over = status.type === 'checkmate' || status.type === 'draw';
  return (
    <div className="panel-box">
      <div className="turn">
        <span className="turn-piece">{isWhite ? '♔' : '♚'}</span>
        <div>
          <div className="turn-text">{over ? 'Game over' : `${isWhite ? 'White' : 'Black'} to move`}</div>
          <div className="turn-sub">Local two-player game</div>
        </div>
      </div>
      {status.type !== 'normal' && (
        <div className={`status-banner ${status.type}`} role="status">{status.text}</div>
      )}
    </div>
  );
}
