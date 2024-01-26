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
    DibujarLinea(PtInicio.x, PtInicio.y, PtFinal.x, PtFinal.y);

    //REINICIO DE VARIABLES
    PtInicio = {x: 0, y: 0};
    PtFinal = {x: 0, y: 0};
    PriClick = true;
  }
});



