//P5 Import
import * as p5 from './p5.js';

//Define layer class for cavnas
class Layer {

    constructor(p, size) {
        //create new graphics object to draw to
        this.graphics = p.createGraphics(size.width,size.height);

        //Store layer size
        this.size = size;

        //Create Layer Name
        this.name = 'Base Layer';

        //Turn off stroke
        this.graphics.noStroke();

        //Center Draw
        this.graphics.rectMode(p5.CENTER);
    }

    Draw(p) {
        //Draw Layer to canvas
        p.image(this.graphics, 0, 0);
    }

    //TODO: Take in a brush object instead of a radius
    Pen(radius, color, x, y) {
        //Calculate color from params
        let c = this.graphics.color(color);
        
        //Set Color of the ellipse and draw
        this.graphics.fill(c);
        this.graphics.ellipse(x, y, radius);
    }

    Brush(radius, color, alpha, pressure, x, y) {
        //Calculate color from params
        let c = this.graphics.color(color);
        c.setAlpha(alpha);
        
        //Set Color of the ellipse and draw
        this.graphics.fill(c);
        this.graphics.ellipse(x, y, radius);
    }

    Erase(radius, strength, pressure, x,y){
        //Toggle Eraser mode
        this.graphics.erase(strength,0);
        
        //Erase Ellipse
        this.graphics.ellipse(x, y, radius);
        
        //Turn Off eraser mode
        this.graphics.noErase();
    }
};

export { Layer };