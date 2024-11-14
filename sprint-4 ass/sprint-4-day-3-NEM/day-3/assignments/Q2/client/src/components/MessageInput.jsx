import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
function MessageInput({ socket, channel }) {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // eslint-disable-next-line react/prop-types
      socket.emit('send_message', { channelName: channel, message });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
