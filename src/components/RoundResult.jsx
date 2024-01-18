import React from "react";

export default function RoundResult({setScreen}) {
  return (
        <div>
            <p>Round Result</p>
            <button onClick={e => {setScreen(2)}}>Submit</button>
        </div>
  );
}