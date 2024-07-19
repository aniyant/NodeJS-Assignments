import React, { useState } from 'react';

function ChannelList({ channels, createChannel, joinChannel }) {
    const [channelName, setChannelName] = useState('');

    return (
        <div>
            <h2>Channels</h2>
            <ul>
                {channels.map((channel, index) => (
                    <li key={index} onClick={() => joinChannel(channel)}>{channel}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={channelName} 
                onChange={(e) => setChannelName(e.target.value)} 
                placeholder="New channel name" 
            />
            <button onClick={() => createChannel(channelName)}>Create Channel</button>
        </div>
    );
}

export default ChannelList;
