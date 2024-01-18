import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import RoundPlay from "./components/RoundPlay";
import RoundResult from "./components/RoundResult";
import { io } from "socket.io-client";

//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const URL = 'http://localhost:3000'
export const socket = io(URL);
socket.on("connect", () => {
  console.log(socket.connected);
});

function App() {
  const [screen, setScreen] = useState(0);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  let content = 0

  // Change Username
  function changeUsername(username){
    socket.emit ("set username", username, (response) => {
      setUsername(username);
    });
  }

  // Join Room
  function joinRoom(roomID){
    socket.emit ("join room", roomID, (response) => {
      setRoom(roomID);
      setUsers(response.userlist);
      setScreen(1);
    }); 
  }

  // Put Vote
  function putVote(content){
    socket.emit ("vote", content);
  }

  // Effects
  useEffect(() => {
    socket.on("update users", (users) => {
      setUsers(users);
    });

    socket.on("set screen", (screen) => {
      setScreen(screen);
    });

  }, [users, screen]);

  // Choosing conten
  switch(screen) {
    case 1:
      content = <Lobby username={username} users={users} room={room} putVote={(content) => putVote(content)} />;
      break;
    case 2:
      content = <RoundPlay putVote={(content) => putVote(content)} />;
      break;
    case 3:
      content = <RoundResult putVote={(content) => putVote(content)} />;
      break;
    default:
      content = <Welcome changeUsername={(username) => changeUsername(username)} joinRoom={(roomID) => joinRoom(roomID)} />;
  }

  return (
    <main>
      {content}
    </main>
  );
}

export default App;
