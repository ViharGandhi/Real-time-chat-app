import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({socket,username,room}) {
    const[message,setMessage] = useState('')
    const[messagelist,setMessagelist] = useState([])

    const sendmessage = async()=>{
        if(message !== "")
        {
            const messagedata  = {
                room:room,
                author:username,
                message:message,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message",messagedata)
            setMessagelist( (list) =>[...list,messagedata])
            setMessage("")
            
        }
    }
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
           setMessagelist( (list) =>[...list,data])
        })
    },[socket])
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>LiveChat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {
                messagelist.map((message)=>{
                    return <div className='message' id={username===message.author?"you":"other"}>
                        <div>
                            <div className='message-content'>
                                <p>{message.message}</p>
                                </div>
                                <div className='message-meta'>
                                <p id='time'>{message.time}</p>
                                <p id='author'>{message.author}</p>
                               
                                </div>
                                
                            </div>
                        </div>
                })
            }
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='hey...' value={message} onChange={e => setMessage(e.target.value)} onKeyPress={
                (event)=>{
                    event.key === "Enter" && sendmessage()
                }
            }/>
            <button onClick={sendmessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat