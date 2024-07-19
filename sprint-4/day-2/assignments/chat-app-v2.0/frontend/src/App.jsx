import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChannelList from './components/ChannelList';
import Chat from './components/Chat';
import MessageInput from './components/MessageInput';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('channelList', (channelList) => {
            setChannels(channelList);
        });

        socket.on('channelCreated', (channel) => {
            setChannels((prevChannels) => [...prevChannels, channel]);
        });

        socket.on('channelJoined', (channel, channelMessages) => {
            setCurrentChannel(channel);
            setMessages(channelMessages);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('channelList');
            socket.off('channelCreated');
            socket.off('channelJoined');
            socket.off('message');
        };
    }, []);

    const createChannel = (channelName) => {
        socket.emit('createChannel', channelName);
    };

    const joinChannel = (channelName) => {
        socket.emit('joinChannel', channelName);
    };

    const sendMessage = (message) => {
        if (currentChannel) {
            socket.emit('sendMessage', currentChannel, message);
        }
    };

    return (
        <div className="App">
            <ChannelList channels={channels} createChannel={createChannel} joinChannel={joinChannel} />
            {currentChannel && <Chat messages={messages} />}
            {currentChannel && <MessageInput sendMessage={sendMessage} />}
        </div>
    );
}

export default App;
