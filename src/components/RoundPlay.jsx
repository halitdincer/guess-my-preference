import React from "react";

export default function RoundPlay({nextScreen}) {
  return (
        <div>
            <p>Game Begin</p>
            <button onClick={e => {nextScreen()}}>Submit</button>
        </div>
  );
}