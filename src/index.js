import * as PIXI from 'pixi.js';
import './style.css';

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}

//Aliases
const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
const app = new Application({ 
    width: 512, 
    height: 512,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
const container = document.querySelector("#pixi-container");
container.appendChild(app.view);

//load a JSON file and run the `setup` function when it's done
loader
  .add('../src/assets/treasureHunter.json')
  .load(setup);

//Define variables that might be used in more 
//than one function
let dungeon, explorer, treasure, door, id;


function setup() {

    //There are 3 ways to make sprites from textures atlas frames
  
    //1. Access the `TextureCache` directly
    let dungeonTexture = TextureCache["dungeon.png"];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);
  
    
  
    //3. Create an optional alias called `id` for all the texture atlas 
    //frame id textures.
    // id = PIXI.loader.resources['../src/assets/treasureHunter.json'].textures; 
    
    //Make the treasure box using the alias
    treasure = new Sprite(id["treasure.png"]);
    app.stage.addChild(treasure);
  
    //Position the treasure next to the right edge of the canvas
    treasure.x = app.stage.width - treasure.width - 48;
    treasure.y = app.stage.height / 2 - treasure.height / 2;
    app.stage.addChild(treasure);
  
    //Make the exit door
    door = new Sprite(id["door.png"]); 
    door.position.set(32, 0);
    app.stage.addChild(door);
  
    //Make the blobs
    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150;
  
    //Make as many blobs as there are `numberOfBlobs`
    for (let i = 0; i < numberOfBlobs; i++) {
  
      //Make a blob
      let blob = new Sprite(id["blob.png"]);
  
      //Space each blob horizontally according to the `spacing` value.
      //`xOffset` determines the point from the left of the screen
      //at which the first blob should be added.
      let x = spacing * i + xOffset;
  
      //Give the blob a random y position
      //(`randomInt` is a custom function - see below)
      let y = randomInt(0, app.stage.height - blob.height);
  
      //Set the blob's position
      blob.x = x;
      blob.y = y;
  
      //Add the blob sprite to the stage
      app.stage.addChild(blob);
    }
  }
  
  //The `randomInt` helper function
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }