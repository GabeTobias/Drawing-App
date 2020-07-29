//P5 Import
import * as p5 from './p5.js';
import { PenTool, BrushTool, EraserTool } from './draw.js';

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
    }

    //Detect keypress 'a'
    if(p.keyIsPressed && p.key === 'a' && !this.clickHold) {
      //Cycle threw tool states
      this.toolType = (this.toolType + 1) % 3;
      
      //Process click
      this.clickHold = true;
    } 
    
    //Reset Click Hold on release
    if(!p.keyIsPressed || p.key !== 'a') this.clickHold = false;
  
  }
}

export { Input }