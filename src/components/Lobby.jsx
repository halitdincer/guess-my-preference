import React from "react";

export default function Lobby({username, users, room, putVote}) {
  return (
        <div>
            <h1>Room: {room}</h1>
            <p>Welcome, {username}</p>
            <p>Users: {JSON.stringify(users)}</p>

            <button onClick={e => {
                putVote(1)
            }}>I'm Ready</button>
        </div>
  );
}