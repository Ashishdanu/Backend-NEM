import  { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChannelList from './components/ChannelList';
import ChatRoom from './components/ChatRoom';

const socket = io.connect("http://localhost:4000");

function App() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState('');

  useEffect(() => {
    socket.on('channel_list', (channelList) => {
      setChannels(channelList);
    });
    socket.emit('create_channel', 'General'); // Default channel
  }, []);

  const joinChannel = (channel) => {
    setCurrentChannel(channel);
    socket.emit('join_channel', channel);
  };

  return (
    <div>
      <h1>Multi-Channel Chat</h1>
      <ChannelList channels={channels} joinChannel={joinChannel} socket={socket} />
      {currentChannel && <ChatRoom socket={socket} channel={currentChannel} />}
    </div>
  );
}

export default App;
