import React from "react";

export default function RoundPlay({putVote}) {
  return (
        <div>
            <p>Game Begin</p>
            <button onClick={e => {
                putVote(1)
            }}>I'm Ready</button>
        </div>
  );
}