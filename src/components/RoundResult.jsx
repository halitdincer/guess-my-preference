import React from "react";

export default function RoundResult({putVote}) {
  return (
        <div>
            <p>Round Result</p>
            <button onClick={e => {
                putVote(1)
            }}>I'm Ready</button>
        </div>
  );
}