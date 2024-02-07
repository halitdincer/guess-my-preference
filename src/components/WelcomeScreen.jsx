import React from "react";

export default function WelcomeScreen({changeUsername, joinRoom}) {
    return (
        <section className="screen">
            <h1>Guess My Preference?</h1>
            <p>Discover how well you know your friends in this fun and revealing card game!</p>
            <input type="text" name="username" id="username" placeholder="Write your username here..." />
            <input type="text" name="roomId" id="roomID" placeholder="Write your room ID here..." />
            <div className="button-container">
                
                <button onClick={e => {
                    changeUsername(document.getElementById("username").value)
                }}>Set Username</button>
                
                <button onClick={e => {
                    joinRoom(document.getElementById("roomID").value)
                }}>Join Room</button>

            </div>
        </section>
    );
}