import React from "react";

export default function Welcome({nextScreen, changeNickname}) {
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