import React from "react";

export default function ResultScreen({putVote, users}) {
  return (
        <section className="screen">
            <p>Round Result</p>
            <p>Users: {JSON.stringify(users)}</p>
            <button onClick={e => {
                putVote(1)
            }}>I'm Ready</button>
        </section>
  );
}