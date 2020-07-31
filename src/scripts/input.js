//P5 Import
import * as p5 from './p5.js';

//Renderer Functions
import { PenTool, BrushTool, EraserTool, AddCanvas, AddLayer } from './draw.js';

//Networl Interaction Events
import {IEvent, ISetLayer, IUpdateCursor} from './network'

class Input
{
  constructor(){
    //Canvas DOM State
    this.currentCanvas = 0;
    this.currentLayer = 0;

    //TODO: Resize when this value changes
    //Canvas window Details
    this.canvasSize = {width: 786, height: 543};

    //Brush Tool Properties
    this.toolType = 0;
    this.toolSize = 25;
    this.toolColor = { r:255, g:255, b:255, a:25 };
    this.toolPressure = 1;

    //Set Eraser Properties
    this.eraserStrength = 255;

    //Key Down boolean
    this.clickHold = false;
  }

  Update(p, canvasStack){
    //Check for mouse input
    if(p.mouseIsPressed){
      //Apply tool behaviour based on tool type
      if(this.toolType == 0) PenTool(p.mouseX, p.mouseY, this);
      if(this.toolType == 1) BrushTool(p.mouseX, p.mouseY, this);
      if(this.toolType == 2) EraserTool(p.mouseX, p.mouseY, this);

      //Send Interaction across network
      if(this.toolType == 0) IEvent('pen',{x:p.mouseX, y:p.mouseY, tool:this});
      if(this.toolType == 1) IEvent('brush',{x:p.mouseX, y:p.mouseY, tool:this});
      if(this.toolType == 2) IEvent('eraser',{x:p.mouseX, y:p.mouseY, tool:this});
    }

    //Send Cursor position Information
    IUpdateCursor({name: 'DefaultName', position: {x:p.mouseX, y:p.mouseY}, radius: this.toolSize });

    //Detect keypress
    if(p.keyIsPressed && !this.clickHold) {
      
      //@TEMP: Add Layer Hotkey
      if(p.key === 'x') 
      {
        let layer = AddLayer();
        ISetLayer(this.currentCanvas, {size: layer.size, name: layer.name}, this.currentLayer);
      }

      //@TEMP: Add Layer Hotkey
      if(p.key === 'a') 
      {
        this.toolType = (this.toolType+1) % 3;
      }

      //Process click
      this.clickHold = true;
    } 
    
    //Reset Click Hold on release
    if(!p.keyIsPressed) this.clickHold = false;

  }

  //Process Mouse Scroll
  Scroll(delta){
   //Change Tool Radius on scroll
   this.toolSize += delta * 0.1; 
  }
}

//Create Global Input object
let globalInput = new Input();

export { Input, globalInput }