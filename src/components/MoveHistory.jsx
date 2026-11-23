import { useEffect, useRef } from 'react';

// Move list in standard algebraic notation, two moves (white, black) per row.
export default function MoveHistory({ moves }) {
  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [moves.length]);

  const rows = [];
  for (let i = 0; i < moves.length; i += 2) {
    rows.push({ num: i / 2 + 1, white: moves[i], black: moves[i + 1] });
  }

  return (
    <div className="panel-box">
      <h3>Move history</h3>
      <div className="history-list" ref={listRef}>
        {rows.length === 0 && <div className="empty">No moves yet</div>}
        {rows.map((r, idx) => (
          <div className="history-pair" key={r.num}>
            <span className="move-num">{r.num}.</span>
            <span className={idx === rows.length - 1 && !r.black ? 'latest' : ''}>{r.white}</span>
            <span className={idx === rows.length - 1 && r.black ? 'latest' : ''}>{r.black || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
