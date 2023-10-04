require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const harperSaveMessage = require('./services/harper-save-message');


app.use(cors())//add cors middleware

const server = http.createServer(app);

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
});

const CHAT_BOT = 'Chatbot';

let chatRoom = '';
let users = [];

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('join_room', (data) => {

        const { username, room } = data; // Data sent from client when join_room event emitted

        socket.join(room); // Join the user to a socket room

        let __createdtime__ = Date.now(); // Current timestamp

        socket.to(room).emit('recieve-message', {
            message: `${username}, has joined the room`,
            username: CHAT_BOT,
            __createdtime__
        });

        socket.emit('recieve-message',{
            message: `Welcome ${username} to ${room}!`,
            username: CHAT_BOT,
            __createdtime__
        });

        chatRoom = room;
        users.push({id:socket.id,username,room});
        chatroomUsers = users.filter((user) => {user.room === chatRoom});
        socket.to(room).emit('chatroom-users',chatroomUsers);
        socket.emit('chatroom-users',chatroomUsers);
    });

    socket.on('send_message', (data) => {
        const {username, message, room, __createdtime__} = data;
        socket.in(room).emit('recieve-message',{
            message,
            username,
            __createdtime__
        });
        harperSaveMessage(message, username, room, __createdtime__) // Save message in db
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    });

    
});

server.listen(4000, () => console.log('Server is running on port 4000'));