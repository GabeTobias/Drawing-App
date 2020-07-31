//Load and connect to socket 3000
const server = require('http').createServer();
const io = require('socket.io')(3000);


//Debug Colors
const chalk = require('chalk');

//Room Data Array
let RoomArr = {};


//Log Server Created
console.log("Server", chalk.cyan("Initiated"));


//Process connection
io.on('connect', socket => {
    //Log Connection
    console.log("Client ", chalk.yellow(socket.id),);

    //Send Response
    socket.send("Server: Connected");

    //////////////////////////////////////////////////////////////////////////////////////////

    //Join an Existing Room
    socket.on('JoinRoom', (data) => {
        //Log Room Joined
        console.log(chalk.grey("[Room]"), "Joining", chalk.cyan(data.uid));

        //Create Room if empty
        if (RoomArr[data.uid] === undefined) {
            RoomArr[data.uid] = {
                events: [],
                layers: []
            };
        }

        //Get Room
        let room = RoomArr[data.uid];

        //Loop threw all layers
        for (let i in room.layers) {
            //Get layer object
            let layer = room.layers[i];

            //Send packet to socketID
            io.to(socket.id).emit('UpdateLayer', layer);
        }

        //Loop threw all events
        for (let i in room.events) {
            //Get event object
            let event = room.events[i];

            //Send packet to socketID
            io.to(socket.id).emit(event.ix, event.dat);
        }
    });

    //Update Layer for a given room
    socket.on('SetLayer', (data) => {
        //Log Layer Update
        console.log(chalk.grey('[Layer]'), 'Update', chalk.cyan(data.uid));

        //Emit Event to users
        socket.broadcast.emit('UpdateLayer', data);

        //Store Layer info in Room Array
        RoomArr[data.uid].layers[data.index] = data;
    });

    //////////////////////////////////////////////////////////////////////////////////////////

    //Ping Pong User Cursor Information
    socket.on('UpdateCursor', (data) => {
        //Emit Event to users
        socket.broadcast.emit('UpdateCursor', data);
    });

    //////////////////////////////////////////////////////////////////////////////////////////

    //Pen callback
    socket.on('pen', (data) => {
        //Emit Event to users
        socket.broadcast.emit('pen', data);

        //Store Event into array
        RoomArr[data.tool.currentCanvas].events.push({ ix: 'pen', dat: data });
    });

    //Brush callback
    socket.on('brush', (data) => {
        //Emit Event to users
        socket.broadcast.emit('brush', data);

        //Store Event into array
        RoomArr[data.tool.currentCanvas].events.push({ ix: 'brush', dat: data });
    });

    //Eraser callback
    socket.on('eraser', (data) => {
        //Emit event to users
        socket.broadcast.emit('eraser', data);

        //Store Event into array
        RoomArr[data.tool.currentCanvas].events.push({ ix: 'eraser', dat: data });
    });

    //////////////////////////////////////////////////////////////////////////////////////////
});