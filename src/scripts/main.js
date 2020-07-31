//Sass import
import '../styles/styles.sass';

//DrawJS Import
import * as renderer from './draw';

//NetworkJS Import
import * as network from './network';


//Start Canvas Renderer
renderer.InitRenderer();

//Add Initial Canvas
renderer.AddCanvas();

//Add Layer to Canvas
renderer.AddLayer();

//Join Network Room
network.IJoinRoom(renderer.globalInput.currentCanvas);