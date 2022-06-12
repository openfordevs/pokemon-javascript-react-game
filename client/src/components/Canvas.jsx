import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
var centerX = 0;
var centerY = 0;

const Canvas = ({draw, height, width}) => {
  const [keys, setKeys] = useState({
    ArrowUp: {
      pressed: false,
    },
    ArrowDown: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    }
  })

  const canvas = React.useRef();
  React.useEffect(() => {
    const ctx = canvas.current.getContext('2d');
  // const ctx = this.refs.canvas.getContext('2d');
    const canvasAct = document.querySelector('canvas')
      ctx.fillStyle = 'white';
      ctx.fillRect(centerX, centerY, width, height) // fill the canvas with black color
      ctx.drawImage(canvasAct, centerX, centerY, width, height)

    const gameScene = new Image();
      gameScene.src =
      "https://i.imgur.com/rkxlut8.png";
    const playerImage = new Image()
      playerImage.src =
      "https://i.imgur.com/z7zrjm4.png";

  draw(ctx);

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position
    this.image = image
  }
  draw(){
    ctx.drawImage(this.image, centerX, centerY, width, height);
  }
}
  const gameSceneLayer = new Sprite({
    position: { 
      x: centerX,
      y: centerY
    },
    image: gameScene
  })

  function animate() {
    window.requestAnimationFrame(animate);
    gameSceneLayer.draw()
    ctx.drawImage(playerImage,
    // START CROPPING SPRITE HERE
    centerX, 
    centerY, 
    playerImage.width / 4,
    playerImage.height,
    // ACTUAL SPRITE SIZE
    width / 2 - (playerImage.width / 4) / 2, // Divide a sprite into 4 parts and take the middle one
    height / 2 - playerImage.height / 2,
    playerImage.width / 4, 
    playerImage.height,
    // END CROPPING SPRITE HERE
    );   
    
    if(keys.ArrowUp.pressed) {
      console.log('Andou para baixo')
    }
  }
  
  animate();
}, [draw, height, width, keys]);
// Creating an Infinite Loop

// Walk 

window.addEventListener('keydown', (event) => {
  const { key } = event;
  switch (key) {
    case 'ArrowUp':
      setKeys({ ...keys, ArrowUp: { pressed: true }})
    break
    case 'ArrowDown':
      setKeys({ ...keys, ArrowDown: { pressed: true }})
    break
    case 'ArrowLeft':
      setKeys({ ...keys, ArrowLeft: { pressed: true }})
    break
    case 'ArrowRight':
      setKeys({ ...keys, ArrowRight: { pressed: true }})
    break
    default:
    break
  }
})

window.addEventListener('keyup', (event) => {
  const { key } = event;
  switch (key) {
    case 'ArrowUp':
      setKeys({ ...keys, ArrowUp: { pressed: false }})
    break
    case 'ArrowDown':
      setKeys({ ...keys, ArrowDown: { pressed: false }})
    break
    case 'ArrowLeft':
      setKeys({ ...keys, ArrowLeft: { pressed: false }})
    break
    case 'ArrowRight':
      setKeys({ ...keys, ArrowRight: { pressed: false }})
    break
    default:
    break
  }
})
return (
    <canvas ref={canvas} height={height} width={width} />
  );
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Canvas;
