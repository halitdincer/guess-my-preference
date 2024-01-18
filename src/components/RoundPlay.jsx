import React from "react";

export default function RoundPlay({putVote, users, question}) {
  return (
        <div>
            <p>Game Begin</p>
            <p>Question:{question[0]}</p>
            <button onClick={e => {putVote(1)}}>{question[1]}</button>
            <button onClick={e => {putVote(2)}}>{question[2]}</button>
            <button onClick={e => {putVote(3)}}>{question[3]}</button>
            <button onClick={e => {putVote(4)}}>{question[4]}</button>
        </div>
  );
}