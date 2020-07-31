//P5 Import
import * as p5Canvas from './p5.js';

//Canvas class import
import * as canvas from './canvas'

//Input info import
import { globalInput } from './input'


//Listing of all Canvas's open
let canvasStack = {};

//Global p5 Conext
let globalCanvas = {};

//User Cursor Array
let userCursors = {};


function InitRenderer() {
    //Create Basic Canvas behaviour
    let s = function (p5) {
        //Store p5Canvas globally
        globalCanvas = p5;

        p5.setup = function () {
            //Start Canvas object
            p5.createCanvas(
                globalInput.canvasSize.width,
                globalInput.canvasSize.height
            );

            //Adjust Stroke
            p5.stroke(255);
            p5.strokeWeight(1);
        }

        p5.draw = function () {
            //Clear Screen
            p5.background(40);

            //Draw the current canvas
            canvasStack[globalInput.currentCanvas].Render(p5);
         
            //Draw User Cursors
            Object.keys(userCursors).forEach((key,index) =>{
                //Get Cursor object
                let c = userCursors[key];

                //Draw Cursor
                p5.fill(255, 50);
                p5.ellipse(c.x, c.y, c.radius, c.radius);
            })

            //Draw Cursor to screen
            p5.fill(255, 50);
            p5.ellipse(p5.mouseX, p5.mouseY, globalInput.toolSize, globalInput.toolSize);

            //Update Input Behaviour
            globalInput.Update(p5, canvasStack);
        }

        //Pass Scroll event to input
        p5.mouseWheel = function(event) {
            globalInput.Scroll(event.delta);
        }
    }

    //Bind to current window
    const P5 = new p5Canvas(s);
}


//////////////////////////////////////////////////////////////////////////////////////////


function AddCanvas(uid = '#0000') {
    //Create new test canvas object
    let c = new canvas.Canvas(globalCanvas, globalInput.canvasSize);
    
    //Pass UID of canvas
    c.uid = uid;

    //Add Generic Layer
    c.AddLayer(globalCanvas);

    //Add Canvas to canvas stack
    canvasStack[uid] = c;

    //Set current canvas
    globalInput.currentCanvas = c.uid;
}

function AddLayer() {
    //Get Current canvas
    let c = canvasStack[globalInput.currentCanvas];

    //Add Layer
    let l = c.AddLayer(globalCanvas);

    //Set the current Layer
    globalInput.currentLayer = c.layers.length - 1;

    //return the new layer
    return l;
}

function SetLayer(data) {
    //Get Current Canvas
    let canvas = canvasStack[data.uid];

    //Add Leyer if it doesn't exist
    if(canvas.layers.length < data.index+1)
    {
        canvas.AddLayer( globalCanvas);
    }

    //Set Layer name
    canvas.layers[data.index].name = data.layer.name;
}

//////////////////////////////////////////////////////////////////////////////////////////


//Helper function for getting the current slected layer of the current canvas
function getLayer(tool)
{
    //Get Current Canvas
    let canvas = canvasStack[tool.currentCanvas];

    //return Current layer in canvas
    return canvas.layers[tool.currentLayer];
}


//////////////////////////////////////////////////////////////////////////////////////////

function UpdateCursor(data)
{
    //Create and set Cursor Object from data packet
    userCursors[data.name] = {
        x: data.position.x,
        y: data.position.y,
        radius: data.radius
    };
}

//////////////////////////////////////////////////////////////////////////////////////////


function PenTool(x, y, tool = globalInput) {
    //Check if canvas is open
    if(canvasStack[tool.currentCanvas] === undefined) return;

    //Get Current layer in canvas
    let layer = getLayer(tool);

    //Draw Pen tool on current layer
    layer.Pen(tool.toolSize, tool.toolColor, x, y);
}


function BrushTool(x, y, tool = globalInput) {
    //Check if canvas is open
    if(canvasStack[tool.currentCanvas] === undefined) return;

    //Get Current layer in canvas
    let layer = getLayer(tool);

    //Draw Brush tool on current layer
    layer.Brush(tool.toolSize, tool.toolColor, tool.pressure, x, y);
}


function EraserTool(x, y, tool = globalInput) {
    //Check if canvas is open
    if(canvasStack[tool.currentCanvas] === undefined) return;

    //Get Current layer in canvas
    let layer = getLayer(tool);

    //Erase tool on current layer
    layer.Erase(tool.toolSize, tool.eraserStrength, tool.pressure, x, y);
}

//TODO: Implement Bucket tool behaviour
function BucketTool(x, y, tool = globalInput) { }


//////////////////////////////////////////////////////////////////////////////////////////


export {
    InitRenderer,                                   //Render Objects 
    AddCanvas, AddLayer, SetLayer,                  //Canvas DOM
    globalInput, globalCanvas,                      //Globals variables
    PenTool, BrushTool, EraserTool, BucketTool,     //User Interactions
    UpdateCursor                                    //HUD Functions
}