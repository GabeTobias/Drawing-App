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


//////////////////////////////////////////////////////////////////////////////////////////

// Pen Callback
socket.on('pen', data => { renderer.PenTool(data.x,data.y, data.tool); });

// Brush Callback
socket.on('brush', data => { renderer.BrushTool(data.x,data.y, data.tool); });

// Eraser Callback
socket.on('eraser', data => { renderer.EraserTool(data.x,data.y, data.tool); });

//Layer Update Callback
socket.on('UpdateLayer', data => { renderer.SetLayer(data); });

//////////////////////////////////////////////////////////////////////////////////////////

//Join room server message
function IJoinRoom(uid) { socket.emit('JoinRoom', {uid: uid}); }

//Update Layer server message
function ISetLayer(uid, data, index) { socket.emit('SetLayer', {uid: uid, index: index, layer: data}); }

//Send Event Server MEssage
function IEvent(type, data){ socket.emit(type,data); }

//////////////////////////////////////////////////////////////////////////////////////////


export { IJoinRoom, ISetLayer, IEvent };