//Sass import
import '../styles/styles.scss';

//DrawJS Import
import * as renderer from './draw';

//NetworkJS Import
import * as network from './network';

//DOM Manipulation Import
import * as dom from './dom'

//Pass Input to dom
window.globalInput = renderer.globalInput;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Start Canvas Renderer
renderer.InitRenderer();

//Add Initial Canvas
renderer.AddCanvas();

//Join Network Room
network.IJoinRoom(renderer.globalInput.currentCanvas);


//Initial Canvas Render
dom.RenderLayers(); 
dom.RenderCanvas();
dom.RenderTool();
dom.RenderColor();