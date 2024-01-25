//GUARDAR EL ELEMENTO Y EL CONTEXTO
const mainCanvas = document.getElementById("Canvas");
const context = mainCanvas.getContext("2d");

let initialX;
let initialY;

const dibujar = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = 10;
  context.strokeStyle = "#000";
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();
  
  initialX = cursorX;
  initialY = cursorY;
};

const mouseDown = (evt) => {
  evt.preventDefault();
  if ( evt.changedTouches === undefined) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
  }else{
    initialX = evt.changedTouches[0].pageX - correccionX;
    initialY = evt.changedTouches[0].pageY - correccionY;
  }
  dibujar(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
  mainCanvas.addEventListener('touchmove', mouseMoving);
};
  
const mouseMoving = (evt) => {
  evt.preventDefault();
  if ( evt.changedTouches === undefined) {
    dibujar(evt.offsetX, evt.offsetY);
  }else{
    dibujar( evt.changedTouches[0].pageX - correccionX  , evt.changedTouches[0].pageY - correccionY );
  }
};

const mouseUp = () => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
  mainCanvas.removeEventListener("touchmove", mouseMoving);
};
  
mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);

