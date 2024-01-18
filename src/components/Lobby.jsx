import React from "react";

export default function Lobby({nickname, nextScreen}) {
  return (
        <div>
            <p>Welcome, {nickname}</p>
            <button onClick={e => {nextScreen()}}>Submit</button>
        </div>
  );
}