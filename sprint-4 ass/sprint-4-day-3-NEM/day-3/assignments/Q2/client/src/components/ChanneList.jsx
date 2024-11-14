/* eslint-disable react/prop-types */
import  { useState } from 'react';

function ChannelList({ channels, joinChannel, socket }) {
  const [newChannel, setNewChannel] = useState('');

  const handleCreateChannel = () => {
    socket.emit('create_channel', newChannel);
    setNewChannel('');
  };

  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels.map((channel, idx) => (
          <li key={idx} onClick={() => joinChannel(channel)}>{channel}</li>
        ))}
      </ul>
      <input 
        type="text"
        value={newChannel}
        onChange={(e) => setNewChannel(e.target.value)}
        placeholder="New Channel Name"
      />
      <button onClick={handleCreateChannel}>Create Channel</button>
    </div>
  );
}

export default ChannelList;
