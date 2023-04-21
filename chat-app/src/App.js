import { useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';
import './App.css'
const socket = io.connect("http://localhost:3001")
function App() {
  
  const[username,setUsername] = useState('')
  const[room,setRoom] = useState('')
  const[showchat,setshowchat] = useState(false)
  const joinroom = (e) => {
    if(username !=="" && room !==""){
      socket.emit("join_room",room)
    setshowchat(true)

    }

  }

  return (
    <div className="App">
      <div className='joinChatContainer'>

      
      <h3>Join chat</h3>
      <input type="text" value={username} onChange={e =>{
        setUsername(e.target.value)
      }} />
      <input type="text" placeholder='joinroom..' value={room} onChange={e =>{
        setRoom(e.target.value)
      }} />
      <button onClick={joinroom}>Join the room</button>
      </div>
      {
        showchat&&<Chat socket={socket} username={username} room={room}/>
      }
      
    </div>
  );
}

export default App;
