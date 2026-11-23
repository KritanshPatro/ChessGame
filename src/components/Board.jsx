import { Chessboard } from 'react-chessboard';

const LIGHT = '#e8d5b7';
const DARK = '#6b4423';

// Presentational wrapper around react-chessboard. It knows nothing about chess rules:
// it shows the position it is given and reports drops and clicks back to the parent.
export default function Board({
  fen, orientation, turn, disabled, selected, legalTargets, lastMove, checkSquare,
  onMove, onSquareClick,
}) {
  const squareStyles = {};
  if (lastMove) {
    squareStyles[lastMove.from] = { backgroundColor: 'rgba(201,168,76,0.45)' };
    squareStyles[lastMove.to] = { backgroundColor: 'rgba(201,168,76,0.45)' };
  }
  if (checkSquare) {
    squareStyles[checkSquare] = {
      background: 'radial-gradient(circle, rgba(255,40,40,0.85) 0%, rgba(200,0,0,0.35) 55%, transparent 75%)',
    };
  }
  if (selected) {
    squareStyles[selected] = { backgroundColor: 'rgba(255,220,50,0.55)' };
  }
  for (const sq of legalTargets) {
    squareStyles[sq] = {
      ...squareStyles[sq],
      backgroundImage: 'radial-gradient(circle, rgba(40,180,40,0.6) 22%, transparent 24%)',
    };
  }

  const options = {
    id: 'main-board',
    position: fen,
    boardOrientation: orientation,
    allowDragging: !disabled,
    canDragPiece: ({ piece }) => !disabled && piece.pieceType[0] === turn,
    onPieceDrop: ({ sourceSquare, targetSquare }) =>
      targetSquare ? onMove(sourceSquare, targetSquare) : false, // false = snap back
    onSquareClick: ({ square }) => onSquareClick(square),
    squareStyles,
    lightSquareStyle: { backgroundColor: LIGHT },
    darkSquareStyle: { backgroundColor: DARK },
    boardStyle: {
      borderRadius: '4px',
      border: '3px solid #8a6f32',
      boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
    },
    animationDurationInMs: 200,
  };

  return (
    <div className="board">
      <Chessboard options={options} />
    </div>
  );
}
