//Sass import
import '../styles/styles.sass';

//P5 Import
import './p5';

//SocketIO Import
import io from 'socket.io-client';


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