import { useEffect, useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import LobbyScreen from "./components/LobbyScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import { io } from "socket.io-client";
import './App.css';

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
  const [question, setQuestion] = useState(['question1','op1','op2','op3','op4']);
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

    socket.on("update question", (question) => {
      setQuestion(question);
    });

  }, [users, screen, question]);

  // Choosing conten
  switch(screen) {
    case 1:
      content = <LobbyScreen username={username} users={users} room={room} putVote={(content) => putVote(content)} />;
      break;
    case 2:
      content = <GameScreen users={users} question={question} putVote={(content) => putVote(content)} />;
      break;
    case 3:
      content = <ResultScreen users={users} putVote={(content) => putVote(content)} />;
      break;
    default:
      content = <WelcomeScreen changeUsername={(username) => changeUsername(username)} joinRoom={(roomID) => joinRoom(roomID)} />;
  }

  return (
    <main>
      {content}
    </main>
  );
}

export default App;
