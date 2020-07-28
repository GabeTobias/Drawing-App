//Load and connect to socket 3000
const server = require('http').createServer();
const io = require('socket.io')(3000);

io.on('connect', socket => {
    //Log Connection
    console.log("Client Connected!");
    
    //Send Response
    socket.send("Server: Hello Client!");
  
    //Message callback
    socket.on('message', (data) => {
        //Log Message
        console.log(data);
    });
});