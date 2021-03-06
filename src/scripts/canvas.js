//P5 Import
import * as p5 from './p5';

//layer class Import
import * as layer from './layer';


//Define layer class for cavnas
class Canvas {

  constructor(p, size) {
    //create new graphics object to draw to
    this.graphics = p.createGraphics(size.width,size.height);

    //Define a new list of layers
    this.layers = [];

    //Define Index of layer being edited
    this.currentLayer = 0;

    //Store the size of the current canvas
    this.size = size;

    //Generate Unique ID
    this.uid = '#1111';
  }

  Render(p) {
    //Clear the canvas
    this.graphics.clear();

    //Loop threw all registered layers
    for (let l = 0; l < this.layers.length; l++) {
      //Get Layer from array
      let layer = this.layers[l];

      //Draw the layer to the Canvas
      layer.Draw(this.graphics);
    }

    //Draw Canvas to screen
    p.image(this.graphics, 0, 0);
  }

  AddLayer(p) {
    //Create new Layer instance
    let l = new layer.Layer(p, this.size);

    //Add Layer to layers array
    this.layers.push(l);

    //Log the layer
    console.log("layer added");

    //Return the new layer
    return l;
  }

  SortLayers(layerElem){
    let arr = [];
    
    //Loop threw array elements in order
    for(let i in layerElem)
    {
      //Loop threw all layers in canvas
      for(let j in this.layers)
      {
        //Check if names are equal
        if(this.layers[j].name == layerElem[i]){
          //Add layer to new list
          arr.push(this.layers[j]);
          break;
        }
      }
    }

    this.layers = arr;

    console.log(this.layers);
  }
};

export { Canvas };