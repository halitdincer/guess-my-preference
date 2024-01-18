import React from "react";

export default function RoundResult({putVote, users}) {
  return (
        <div>
            <p>Round Result</p>
            <p>Users: {JSON.stringify(users)}</p>
            <button onClick={e => {
                putVote(1)
            }}>I'm Ready</button>
        </div>
  );
}