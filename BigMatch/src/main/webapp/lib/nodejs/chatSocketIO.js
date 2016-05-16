var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();
app.set('port', 3033);
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("express server listening on port " + app.get('port'));
});
app.get('/', function (req, res) {
    fs.readFile('../../main/chat.html', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

var io = socketio.listen(server);

// Socket Connection
io.sockets.on('connection', function (socket) {

    // room join
    // 사용자 접속 시 room join 및 접속한 사용자를 room 참여 인원들에게 알립니다.
    socket.on('join', function (data) {

       // socket join 을 합니다.
        socket.join(data.roomname);

        //socket.on('setroom', function(data){
        socket.room = data.roomname;
        //});
        //socket.set('room', data.roomname);

        // room join 인원들에게 메시지를 보냅니다.
        //socket.get('room', function (error, room) {
            //io.sockets.in(room).emit('join', data.userid);
        //});
        io.sockets.in(socket.room).emit('join', data.userid);

    });

    // message
    socket.on('message', function (message) {
        //socket.get('room', function (error, room) {
          //  io.sockets.in(room).emit('message', message);
        //});
        io.sockets.in(socket.room).emit('message', message);

    });
    socket.on('disconnect', function () { });
});
