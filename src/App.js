import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import RoundPlay from "./components/RoundPlay";
import RoundResult from "./components/RoundResult";
import { io } from "socket.io-client";

//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const URL = 'http://localhost:3000'
export const socket = io(URL);

function App() {
  const [screen, setScreen] = useState(0);
  const [nickname, setNickname] = useState(0);
  let content = 0

  useEffect(() => {

    socket.on("connect", () => {
        console.log(socket.connected);
    });

  }, []);

  if(screen == 0){
    content = <Welcome changeNickname={(nickname) => setNickname(nickname)} nextScreen={() => setScreen(1)} />
  }else if(screen == 1){
    content = <Lobby nickname={nickname} nextScreen={() => setScreen(2)} />
  }else if(screen == 2){
    content = <RoundPlay nextScreen={() => setScreen(3)} />
  }else{
    content = <RoundResult setScreen={(screen) => setScreen(screen)}/>
  }

  return (
    <main>
      {content}
    </main>
  );
}

export default App;
