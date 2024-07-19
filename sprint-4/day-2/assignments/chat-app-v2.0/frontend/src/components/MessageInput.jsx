import React, { useState } from 'react';

function MessageInput({ sendMessage }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message" 
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default MessageInput;
