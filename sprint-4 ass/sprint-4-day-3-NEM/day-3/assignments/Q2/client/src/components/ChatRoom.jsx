/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MessageInput from './MessageInput';

 
function ChatRoom({ socket, channel }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
     
    socket.on('message_history', (history) => {
      setMessages(history);
    });
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, [channel, socket]);

  return (
    <div>
      <h2>Channel: {channel}</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.userId}</strong>: {msg.message}</p>
        ))}
      </div>
      <MessageInput socket={socket} channel={channel} />
    </div>
  );
}

export default ChatRoom;
