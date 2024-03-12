//GUARDAR EL ELEMENTO Y EL CONTEXTO
/*const mainCanvas = document.getElementById("Canvas");
const context = mainCanvas.getContext("2d");*/


const dibujar = (cursorX, cursorY) => {
  if (!Dibujar) return;
  BordesC(contexto);
  contexto.beginPath();
  contexto.moveTo(initialX, initialY);
  contexto.lineWidth = 1;
  
  contexto.lineCap = "round";
  contexto.lineJoin = "round";
  contexto.lineTo(cursorX, cursorY);
  contexto.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseDown = (evt) => {
  evt.preventDefault();
  drawing = true;
  if (evt.changedTouches === undefined) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
  } else {
    initialX = evt.changedTouches[0].pageX - correccionX;
    initialY = evt.changedTouches[0].pageY - correccionY;
  }
  dibujar(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
  mainCanvas.addEventListener("touchmove", mouseMoving);
};

const mouseMoving = (evt) => {
  evt.preventDefault();
  if (drawing) {
    if (evt.changedTouches === undefined) {
      dibujar(evt.offsetX, evt.offsetY);
    } else {
      dibujar(
        evt.changedTouches[0].pageX - correccionX,
        evt.changedTouches[0].pageY - correccionY
      );
    }
  }
};

const mouseUp = () => {
  drawing = false;
  mainCanvas.removeEventListener("mousemove", mouseMoving);
  mainCanvas.removeEventListener("touchmove", mouseMoving);
};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);

