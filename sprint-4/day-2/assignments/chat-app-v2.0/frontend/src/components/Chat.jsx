import React from 'react';

function Chat({ messages }) {
    return (
        <div>
            <h2>Chat</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}><strong>{message.user}</strong>: {message.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Chat;
