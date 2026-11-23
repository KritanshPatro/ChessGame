import { useRef, useState } from 'react';
import { Chess } from 'chess.js';
import Board from './components/Board.jsx';
import GameStatus from './components/GameStatus.jsx';
import MoveHistory from './components/MoveHistory.jsx';
import CapturedPieces from './components/CapturedPieces.jsx';
import Controls from './components/Controls.jsx';

// Single source of truth: one chess.js game. chess.js owns the rules (legal moves,
// check, checkmate, stalemate, draws, castling, en passant, promotion).
// `fen` is the React-visible snapshot of that game: every successful move updates it,
// which re-renders every component from the same state.

export function getStatus(game) {
  const side = game.turn() === 'w' ? 'White' : 'Black';
  const other = game.turn() === 'w' ? 'Black' : 'White';
  if (game.isCheckmate()) return { type: 'checkmate', text: `Checkmate! ${other} wins` };
  if (game.isStalemate()) return { type: 'draw', text: 'Stalemate: draw' };
  if (game.isThreefoldRepetition()) return { type: 'draw', text: 'Draw by threefold repetition' };
  if (game.isInsufficientMaterial()) return { type: 'draw', text: 'Draw: insufficient material' };
  if (game.isDraw()) return { type: 'draw', text: 'Draw by the fifty-move rule' };
  if (game.inCheck()) return { type: 'check', text: `${side} is in check` };
  return { type: 'normal', text: '' };
}

function findKing(game, color) {
  for (const row of game.board()) {
    for (const sq of row) {
      if (sq && sq.type === 'k' && sq.color === color) return sq.square;
    }
  }
  return null;
}

export default function App() {
  const gameRef = useRef(null);
  if (gameRef.current === null) gameRef.current = new Chess();
  const game = gameRef.current;

  const [fen, setFen] = useState(game.fen());
  const [orientation, setOrientation] = useState('white');
  const [selected, setSelected] = useState(null);

  // Everything below is derived from the game on each render.
  const history = game.history({ verbose: true });
  const lastMove = history.length ? history[history.length - 1] : null;
  const status = getStatus(game);
  const gameOver = game.isGameOver();
  const legalTargets = selected
    ? game.moves({ square: selected, verbose: true }).map((m) => m.to)
    : [];
  const checkSquare = game.inCheck() ? findKing(game, game.turn()) : null;

  // Returns true if the move was legal and played, false otherwise.
  function tryMove(from, to) {
    if (gameOver) return false;
    try {
      game.move({ from, to, promotion: 'q' }); // pawns always promote to a queen
    } catch {
      return false; // chess.js throws on an illegal move
    }
    setSelected(null);
    setFen(game.fen());
    return true;
  }

  // Click-to-move: first click selects one of your pieces, second click moves it.
  function handleSquareClick(square) {
    if (gameOver) return;
    if (selected && legalTargets.includes(square)) {
      tryMove(selected, square);
      return;
    }
    const piece = game.get(square);
    setSelected(piece && piece.color === game.turn() ? square : null);
  }

  function handleUndo() {
    game.undo();
    setSelected(null);
    setFen(game.fen());
  }

  function handleNewGame() {
    game.reset();
    setSelected(null);
    setFen(game.fen());
  }

  return (
    <>
      <header>
        <h1>♟ CHESS</h1>
        <p>React · chess.js · react-chessboard</p>
      </header>

      <main className="app">
        <section className="board-wrap">
          <Board
            fen={fen}
            orientation={orientation}
            turn={game.turn()}
            disabled={gameOver}
            selected={selected}
            legalTargets={legalTargets}
            lastMove={lastMove}
            checkSquare={checkSquare}
            onMove={tryMove}
            onSquareClick={handleSquareClick}
          />
          <Controls
            onNewGame={handleNewGame}
            onUndo={handleUndo}
            onFlip={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}
            canUndo={history.length > 0}
          />
        </section>

        <aside className="side-panel">
          <GameStatus turn={game.turn()} status={status} />
          <CapturedPieces history={history} />
          <MoveHistory moves={history.map((m) => m.san)} />
        </aside>
      </main>
    </>
  );
}
