import React from "react";

export default function LobbyScreen({username, users, room, putVote}) {
  return (
        <section className="screen">
            <h1>Room: {room}</h1>
            <p>Welcome, {username}</p>
            <p>Users: {JSON.stringify(users)}</p>

            <button onClick={e => {
                putVote(1)
            }}>I'm Ready</button>
        </section>
  );
}