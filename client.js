const http = require('http');
const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;

const io = require('socket.io-client');

var currentChatRoom;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
  });

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
  });

var socket = io.connect("ws://localhost:8080")
socket.emit('join', '604cb1aa228a8c10a42ce241', '604d1f6fd6bf493ec83523ee');
socket.on('joined', function(chat_id) {
   console.log("You have joined the chat room " + chat_id);
   currentChatRoom = chat_id;
   socket.emit('message', currentChatRoom, '604cb1aa228a8c10a42ce241', 'Hello!');
});

socket.on('message', function(chatRoom, author, message){
  console.log(author + " says: " + message + " on room " + chatRoom);
})
