import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import RoundPlay from "./components/RoundPlay";
import RoundResult from "./components/RoundResult";

function App() {
  const [screen, setScreen] = useState(0);
  const [nickname, setNickname] = useState(0);
  let content = 0

  useEffect(() => {
    // Socket 
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
