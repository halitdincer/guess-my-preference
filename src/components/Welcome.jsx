import React from "react";

export default function Welcome({changeUsername, joinRoom}) {

    return (
        <>
            <input type="text" name="username" id="username" placeholder="Write your username here..." />
            <button onClick={e => {
                changeUsername(document.getElementById("username").value)
            }}>Set Username</button>

            <input type="text" name="roomId" id="roomID" placeholder="Write your room ID here..." />
            <button onClick={e => {
                joinRoom(document.getElementById("roomID").value)
            }}>Join Room</button>
        </>
    );
}