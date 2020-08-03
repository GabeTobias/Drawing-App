//DrawJS Import
import * as renderer from './draw';


function RenderLayers() {
  //get the sidebar div
  let div = document.getElementById('LayersGroup');

  //Clear the dom
  div.innerHTML = "";

  //Get Layers array
  let canvas = renderer.getCanvas();


  //Loop threw the layers
  for(let i in canvas.layers)
  {
    //Get the layer
    let layer = canvas.layers[i];
    let active = renderer.globalInput.currentLayer == i;

    //Add New Element to dom
    div.innerHTML += '<a class="layer ' + ((active) ? 'layer-active':'') + '" href="#" onclick="changeLayer('+i+') ">' + layer.name + '</a>';
  }
}

function RenderCanvas() {
  //get the sidebar div
  let div = document.getElementById('CanvasGroup');

  //Clear the dom
  div.innerHTML = "";

  //Get Layers array
  let canvases = renderer.getCanvasStack();


  //Loop threw the Canvas
  for(let i in canvases)
  {
    //Get the layer
    let canvas = canvases[i];
    let active = renderer.globalInput.currentCanvas == i;

    //Add New Element to dom
    div.innerHTML += '<li class=""> <a class="tab ' + ((active) ? 'tab-active':'') + '" href="#" onclick="changeCanvas('+canvas.uid+')">' + canvas.uid + '</a> </li>';
  }

  //Add Create Canvas Button
  div.innerHTML += '<li class="float-right"><a class="bg-white inline-block py-2 px-4 text-gray-600 hover:text-grey-800 font-light text-sm border-r border-l" href="#" onclick="ToggleCanvasMenu()">+</a></li>';
}

function RenderTool(){
  //get all tool buttons
  let tools = document.getElementsByClassName('tool-btn');

  //Loop threw all elements in array
  [].forEach.call(tools, function(el) {
    //TODO: This doesn't work if tools have icons
    //Get index of tool from html
    let cont = el.innerHTML.trim();

    //Check index
    if(globalInput.toolType+1 == cont){
      //Set Active
      el.classList.add('tool-active');
    } else {
      //Set Inactive
      el.classList.remove('tool-active');
    }
  });

}

function RenderColor() {
  //get all tool buttons
  let colors = document.getElementsByClassName('color-select');

  //Loop threw all elements in array
  [].forEach.call(colors, function(el) {
    //TODO: This doesn't work if tools have icons
    //Get index of tool from html
    let color = el.getAttribute("color");

    //Check index
    if(globalInput.toolColor == color){
      //Set Active
      el.classList.add('border-4');
    } else {
      //Set Inactive
      el.classList.remove('border-4');
    }
  });
}

//Add Functions to document
window.RenderLayers = RenderLayers;
window.RenderCanvas = RenderCanvas;
window.RenderTool = RenderTool;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function changeLayer(index) {
  //Change the current layer
  globalInput.currentLayer = index;
  
  //Rerender layers DOM
  RenderLayers();
}

function changeCanvas(uid) {
  //Change Current canvas 
  globalInput.currentCanvas = uid;
  
  //Rerender canvas DOM
  RenderCanvas();
}

function addLayer() {
  //Add Layer to renderer
  renderer.AddLayer();

  //Rerender DOM
  RenderLayers();
}

function addCanvas() {
  //Get Canvas name input value
  let uid = document.getElementById('canvasName').value;
  
  //Create Canvas with given name
  renderer.AddCanvas(uid);

  //Render DOM
  RenderCanvas();
  RenderLayers();

  //Hide Canvas Create Modal
  ToggleCanvasMenu();
}


//Add Functions to document
window.changeLayer = changeLayer;
window.changeCanvas = changeCanvas;

window.addLayer = addLayer;
window.addCanvas = addCanvas;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setColor(color){
  //Set the input color
  globalInput.toolColor = color;
  
  //Render Color DOM
  RenderColor();
}

function setTool(tool){
  //Set the input tool
  globalInput.toolType = tool;
  
  //Render Tool DOM
  RenderTool();
}

//Add Function to document
window.setColor = setColor;
window.setTool = setTool;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Handle Color Select Toggle
 function ToggleColorSelect() {
  let cToggle = document.getElementById('ColorToggle');
  cToggle.hidden = !cToggle.hidden;
}

//Toggle Create Canvas Modal
function ToggleCanvasMenu() {
  let Overlay = document.getElementById('CanvasOverlay');
  let Modal = document.getElementById('CreateMenu');
  
  globalInput.locked = !globalInput.locked;

  Overlay.hidden = !Overlay.hidden;
  Modal.hidden = !Modal.hidden;
}

//Add Functions to document
window.ToggleColorSelect = ToggleColorSelect;
window.ToggleCanvasMenu = ToggleCanvasMenu;


//Export final Elements
export {
  RenderCanvas, RenderLayers, RenderTool, RenderColor,
  changeLayer, changeCanvas, addLayer, addCanvas,
  setColor, setTool,
  ToggleCanvasMenu,ToggleColorSelect
}