const express = require('express');
const srv = express();
const socketio = require('socket.io');

const http = require('http');

const server = http.createServer(srv);

const io = socketio(server);


const clients = {};

srv.use('/public', express.static(__dirname + '/public_html'))

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('login', function (data) {
        clients[data.user] = socket.id;
        console.log(clients);
    });

    socket.on('send_msg', function (data) {
        console.log(data);

        if (data.message.startsWith('@')) {
            let fullMessage = data.message;
            let username = fullMessage.split(':')[0].substring(1);
            io.to(clients[username]).emit('recv_msg',{username:data.username,message:fullMessage.split(':')[1]});
        }
        else {
            socket.broadcast.emit('recv_msg', data)
        }

    })
});

server.listen(8090, () => {
    console.log("Server is up and running at 8090!")
});
