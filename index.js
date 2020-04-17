const express = require("express"); // подгрузка модуля express сервера
const app = express(); // наше приложение/сервер
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");


app.get("/", (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'index.html'))
    res.end('deployed')
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on("connection", (socket) => {
    console.log("A user connected!");
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

if (process.env.NODE_ENV === "production") {
    //
}

http.listen(8080,() => {
    console.log('app started');
});

