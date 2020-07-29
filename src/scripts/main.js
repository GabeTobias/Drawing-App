//Sass import
import '../styles/styles.sass';

//SocketIO Import
import io from 'socket.io-client';

//DrawJS Import
import * as renderer from './draw';


//Connect to server
const socket = io('ws://localhost:3000');

//Connection Calback
socket.on('connect', () => {
    //Log Connection
    console.log("Connected to server!");
    
    //Send Response
    socket.send('Client: Hello Server!');
});
  
// Message Callback
socket.on('message', data => {
    //Log Message
    console.log(data);
});

//Start Canvas Renderer
renderer.InitRenderer();

//Add Layer Test
renderer.AddCanvas();