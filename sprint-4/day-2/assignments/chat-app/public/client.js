const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const roomInput = document.getElementById('room-input');
const joinButton = document.getElementById('join-button');
const leaveButton = document.getElementById('leave-button');

sendButton.addEventListener('click', () => {
    const msg = messageInput.value;
    socket.emit('chat message', msg);
    messageInput.value = '';
});

socket.on('chat message', (msg) => {
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

joinButton.addEventListener('click', () => {
    const room = roomInput.value;
    socket.emit('join room', room);
});

leaveButton.addEventListener('click', () => {
    const room = roomInput.value;
    socket.emit('leave room', room);
});

socket.on('notification', (msg) => {
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('group message', (msg) => {
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
    const item = document.createElement('div');
    item.textContent = 'Connection error';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('disconnect', (reason) => {
    console.error('Disconnected:', reason);
    const item = document.createElement('div');
    item.textContent = 'Disconnected from server';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
