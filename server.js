const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


let val = []
app.get("/",function (req,res) {
    res.sendFile(
        path.join(__dirname,"./index.html")
    );
});

io.on('connection', (socket) => {
    console.log("user connection")
    socket.on('disconnection', ()=>{
        // val.remove()
        console.log("Disconnect");
    })
    socket.on('input', inputVal => {
        val.push(inputVal)
        socket.emit('output', val);
        socket.on('delate',deleteval => {
            let filteredValues = val.filter((value) => value !== deleteval);
            val = filteredValues;
            socket.emit('output', val);
        })
        console.log(val)
    });
});

server.listen(3000, () => console.log('Socket.io app listening on port 3000!'));
