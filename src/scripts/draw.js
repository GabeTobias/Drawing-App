//P5 Import
import * as p5Canvas from './p5.js';

//Canvas class import
import * as canvas from './canvas'

//Input info import
import * as input from './input'


//Listing of all Canvas's open
let canvasStack = {};

//Global p5 Conext
let globalCanvas = {};

//Create Global Input object
let globalInput = new input.Input();


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
        }

        p5.draw = function () {
            //Clear Screen
            p5.background(40);

            //Draw the current canvas
            canvasStack[globalInput.currentCanvas].Render(p5);
            
            //Update Input Behaviour
            globalInput.Update(p5, canvasStack);
        }
    }

    //Bind to current window
    const P5 = new p5Canvas(s);
}


//////////////////////////////////////////////////////////////////////////////////////////


function AddCanvas() {
    //Create new test canvas object
    let c = new canvas.Canvas(globalCanvas, globalInput.canvasSize);

    //Add Generic Layer
    c.AddLayer(globalCanvas);

    //Add Canvas to canvas stack
    canvasStack[c.uid] = c;

    //Set current canvas
    globalInput.currentCanvas = c.uid;
}

function AddLayer() {
    //Get Current canvas
    let c = canvasStack[globalInput.currentCanvas];

    //Add Layer
    c.AddLayer(globalCanvas);

    //Set the current Layer
    globalInput.currentLayer = c.layers.length - 1;
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


function PenTool(x, y, tool = globalInput) {
    //Get Current layer in canvas
    let layer = getLayer(tool);

    //Draw Pen tool on current layer
    layer.Pen(tool.toolSize, tool.toolColor, x, y);
}


function BrushTool(x, y, tool = globalInput) {
    //Get Current layer in canvas
    let layer = getLayer(tool);

    //Draw Brush tool on current layer
    layer.Brush(tool.toolSize, tool.toolColor, tool.pressure, x, y);
}


function EraserTool(x, y, tool = globalInput) {
    //Get Current layer in canvas
    let layer = getLayer(tool);

    //Erase tool on current layer
    layer.Erase(tool.toolSize, tool.eraserStrength, tool.pressure, x, y);
}

//TODO: Implement Bucket tool behaviour
function BucketTool(x, y, tool = globalInput) { }


//////////////////////////////////////////////////////////////////////////////////////////


export {
    InitRenderer,                                         //Render Objects 
    AddCanvas, AddLayer,                            //Canvas DOM
    globalInput, globalCanvas,                      //Globals variables
    PenTool, BrushTool, EraserTool, BucketTool      //User Interactions
}