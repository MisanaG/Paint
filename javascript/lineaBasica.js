//GUARDAR EL ELEMENTO Y EL CONTEXTO
const mainCanvas = document.getElementById("Canvas");
const context = mainCanvas.getContext("2d");

//PUNTOS DE LA GRAFICA
let PtInicio = {x: 0, y: 0};
let PtFinal = {x: 0, y: 0};

var PriClick = true;


mainCanvas.addEventListener("click", function(event){
  //OBTENER COORDENADAS
  var  rect = mainCanvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  //DIBUJAR PRIMER PUNTO
  if (PriClick){
    PtInicio.x = mouseX;
    PtInicio.y = mouseY;
    PriClick = false;
  }else {
    PtFinal.x = mouseX;
    PtFinal.y = mouseY;
    //DIBUJAR LA LINEA
    DibujarLinea();

    //REINICIO DE VARIABLES
    PtInicio = {x: 0, y: 0};
    PtFinal = {x: 0, y: 0};
    PriClick = true;
  }
});


//FUNCION PARA DIBUJAR
function DibujarLinea(){
  context.beginPath();
  context.lineWidth = 1;

  //CALCULO DE LA PENDIENTE
  const m = (PtFinal.y - PtInicio.y)/(PtFinal.x - PtInicio.x);
  //CALCULO DE LA ORDENADA AL ORIGEN
  const b = PtInicio.y - m *PtInicio.x;

  deltaY = PtFinal.y - PtInicio.y;
  deltaX = PtFinal.x - PtInicio.x;

  //CONDICION PARA COMPROBAR SI DELTA Y ES MAYOR QUE DELTA X
  // ES DECIR LA RECTA ESTA INVERTIDA

  if (deltaY > deltaX){

    if (PtFinal.y > PtInicio.y){
      for (let y = PtInicio.y; y <= PtFinal.y; y++) {
        const x = (y - b) / m;
        context.lineTo (x, y);
      }
    }else{
      for (let y = PtFinal.y; y <= PtInicio.y; y++) {
        const x = (y - b) / m;
        context.lineTo (x, y);
      }
    }
  }else{
    //DIBUJAR LA LINEA
    for (let x = PtInicio.x; x <= PtFinal.x; x++) {
      const y = m * x +b;
      context.lineTo (x, y);
    }
  }
  context.stroke();
}