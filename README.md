# Chess

A browser-based chess game built with **React**, using **chess.js** for the rules and **react-chessboard** for drag-and-drop.

Live: https://chessgame161.vercel.app

## Features
- **Drag-and-drop or click-to-move**, with legal-move hints and last-move highlighting.
- **Full chess rules via chess.js:** legal move validation, check, checkmate, stalemate, castling, en passant, promotion (to a queen), and draws by threefold repetition, insufficient material and the fifty-move rule.
- **Move history** in standard algebraic notation, captured pieces, undo, new game and flip board.
- Local two-player game on one device.

## How it works
- `App.jsx` owns a single `chess.js` game, the source of truth for all rules. Its FEN string is kept in React state, so each legal move re-renders every component from the same state.
- A drop calls `game.move({ from, to })`. chess.js rejects illegal moves, and the board snaps the piece back.
- Components (`Board`, `GameStatus`, `CapturedPieces`, `MoveHistory`, `Controls`) receive data and callbacks as props and hold no game logic of their own.

```
src/
├── App.jsx                 game state + move handling
├── components/
│   ├── Board.jsx           react-chessboard wrapper (drag, click, square highlights)
│   ├── GameStatus.jsx      turn and check / checkmate / draw banner
│   ├── CapturedPieces.jsx  pieces taken by each side
│   ├── MoveHistory.jsx     SAN move list
│   └── Controls.jsx        new game, undo, flip
└── App.css
```

## Run locally
```bash
npm install
npm run dev
```

## Version history
- **v1** (`legacy/chess.html`): single-file vanilla JavaScript with a hand-written move generator and legality check (make the move, test whether the king is attacked, undo).
- **v2** (current): rebuilt in React with chess.js and react-chessboard, which added en passant, correct castling rules and draw detection.

Deployed on Vercel (Vite preset: `npm run build`, output `dist`).
