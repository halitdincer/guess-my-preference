import React from "react";
import { io } from "socket.io-client";
import {socket} from "../App";

export default function Welcome({nextScreen, changeNickname}) {

    // send a message to the server
    socket.emit ("howdy", "stranger");  
  
    return (
        <>
            <h2>Nickname:</h2>
            <input type="text" name="nickname" id="nickname" />
            <button onClick={e => {
                changeNickname(document.getElementById("nickname").value)
                nextScreen()
            }}>Submit</button>
        </>
    );
}