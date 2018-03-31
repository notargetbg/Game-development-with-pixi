import * as PIXI from 'pixi.js';
import './style.css';
import blackCat from '../src/assets/black-cat.png';
import gadinkiUrl from '../src/assets/gadinki.png';

//Aliases
const Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}

const app = new Application({
        width: 256, 
        height: 256,
        antialias: true, 
        transparent: false, 
        resolution: 1
    });
    const container = document.querySelector("#pixi-container");
    container.appendChild(app.view);
    
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.backgroundColor = 'red';
    app.renderer.resize(window.innerWidth, window.innerHeight);
    
    
    loader
    .add([
        gadinkiUrl,
    ])
    .on("progress", loadProgressHandler)
    .load(setup);
    
    function loadProgressHandler(loader, resource) {
        //Display the file `url` currently being loaded
        console.log("loading: " + resource.url); 
        
        //Display the percentage of files currently loaded
        console.log("progress: " + loader.progress + "%"); 
        
        //If you gave your files names as the first argument 
        //of the `add` method, you can access them like this
        //console.log("loading: " + resource.name);
    }
    
    function setup() {
        let texture = TextureCache[gadinkiUrl];
        let rectangle = new Rectangle(192, 128, 64,64);
        
        texture.frame = rectangle;
        
        let rocket = new Sprite(texture);
        
        //Position the rocket sprite on the canvas
        rocket.x = 32;
        rocket.y = 32;
        
        app.stage.addChild(rocket);
        
        //Render the stage   
        app.renderer.render(app.stage);
        console.log("All files loaded");
        window.pixiApp = app;
}
