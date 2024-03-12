function cancelar(){
  document.getElementById('inputPoligono').style.display = 'none';
  Poligono = false;
  Elipse = false;
  Circulo = false;
  /*LineaBre = false;
  LineaBase = false;*/
  LineaDDAs = false;
  Cuadrado = false;
  Dibujar = false;
  Rectangulo = false;
  Rombo = false;
  Trapecio = false;
  PriClick = true;
  previewCanvas.style.zIndex = -1;
  quitarScript();
}
//FUNCION PARA RELLENAR LA FIGURA
function RellenarFigura(){

}
//FUNCION PARA EXPORTAR EL LIENZO COMO UNA IMAGEN
function descargarPNG(context, fileName){
  var MIME_TYPE = "image/png";
  var imgURL = context.toDataURL(MIME_TYPE);
  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}
//FUNCION PARA EXPORTAR EL LIENZO COMO UN PDF
function descargarPDF(context, fileName){}

//FUNCIONAMIENTO PARA DIBUJAR UNA LINEA POR EL METODO BASICO
function DibujarLinea(context, X1, Y1, X2, Y2) {
  context.lineWidth = 1;
  
  // CALCULO DE LA PENDIENTE
  const m = (Y2 - Y1) / (X2 - X1);
  // CALCULO DE LA ORDENADA AL ORIGEN
  const b = Y1 - m * X1;
  
  deltaY = Y2 - Y1;
  deltaX = X2 - X1;
  
  // CONDICION PARA COMPROBAR SI DELTA Y ES MAYOR QUE DELTA X
  // ES DECIR LA RECTA ESTA INVERTIDA
  
  if (deltaY > deltaX) {
    if (Y2 > Y1) {
      for (let y = Y1; y <= Y2; y++) {
        const x = Math.round((y - b) / m);
        context.fillRect(x, y, 1, 1);
      }
    } else {
      for (let y = Y2; y <= Y1; y++) {
        const x = Math.round((y - b) / m);
        context.fillRect(x, y, 1, 1);
      }
    }
  } else {
    // DIBUJAR LA LINEA
    for (let x = X1; x <= X2; x++) {
      const y = Math.round(m * x + b);
      context.fillRect(x, y, 1, 1);
    }
  }
}

//FUNCIONAMIENTO PARA DIBUJAR LA LINEA POR EL METODO DE BRESENHAM
function LineaBresenham(context, X1, Y1, X2, Y2) {

  var dY = Y2 - Y1;
  var dX = X2 - X1;

  var IncYi, IncXi;
  if (dY >= 0) {
    IncYi = 1;
  } else {
    dY = -dY;
    IncYi = -1;
  }
  if (dX >= 0) {
    IncXi = 1;
  } else {
    dX = -dX;
    IncXi = -1;
  }

  var IncXr, IncYr;
  if (dX >= dY) {
    IncYr = 0;
    IncXr = IncXi;
  } else {
    IncXr = 0;
    IncYr = IncYi;

    var k = dX;
    dX = dY;
    dY = k;
  }

  var x = X1;
  var y = Y1;
  var avR = 2 * dY;
  var av = avR - dX;
  var avI = av - dX;

  do {
    context.fillRect(x, y, 1, 1);
    if (av >= 0) {
      x += IncXi;
      y += IncYi;
      av += avI;
    } else {
      x += IncXr;
      y += IncYr;
      av += avR;
    }
  } while (!(x === X2 && y === Y2)); 
}

//FUNCIONAMIENTO PARA DIBUJAR LA LINEA POR EL METODO DDA
function LineaDDA(context, X1, Y1, X2, Y2){
  let x = X1, y = Y1;
  const dX = Math.abs(X2 - X1);
  const dY = Math.abs(Y2 - Y1);
  let p, xi, yi;

  if (dX > dY) {
    p = dX;
  } else {
    p = dY;
  }

  xi = dX / p;
  yi = dY / p;

  if (X1 > X2) {
    xi *= -1;
  }
  if (Y1 > Y2) {
    yi *= -1;
  }

  for (let k = 1; k <= p; k++) {
    x += xi;
    y += yi;
    context.fillRect(x, y, 1, 1);
  }
}

//FUNCIONAMIENTO PARA DIBUJAR EL CUADRADO
function DibujarCuadrado(context, X1, Y1, X2, Y2) {
  context.lineWidth = 1;

  if ((X2 < X1 && Y2 > Y1) || (X2 > X1 && Y2 > Y1)){
    
    dX = Math.abs(X2 - X1);
    y2 = Y1 + dX;
    LineaBresenham(context, X1, Y1, X2, Y1);
    LineaBresenham(context, X1, y2, X2, y2);
    LineaBresenham(context, X1, Y1, X1, y2);
    LineaBresenham(context, X2, y2, X2, Y1);
  }else if((X2 > X1 && Y2 < Y1) || (X2 < X1 && Y2 < Y1)){
      
    dX = Math.abs(X2 - X1);
    y1 = Y1 - dX;
    LineaBresenham(context, X1, Y1, X2, Y1); 
    LineaBresenham(context, X1, Y1, X1, y1); 
    LineaBresenham(context, X2, Y1, X2, y1); 
    LineaBresenham(context, X1, y1, X2, y1);   
  }
}

//FUNCIONAMIENTO PARA HACER RECTANGULOS
function DibujarRectangulo(context, X1, Y1, X2, Y2) {
  context.lineWidth = 1;

  if ((X2 < X1 && Y2 > Y1) || (X2 > X1 && Y2 > Y1)){    
    LineaDDA(context, X1, Y1, X2, Y1);
    LineaDDA(context, X1, Y2, X2, Y2);
    LineaDDA(context, X1, Y1, X1, Y2);
    LineaDDA(context, X2, Y2, X2, Y1);
  }else if((X2 > X1 && Y2 < Y1) || (X2 < X1 && Y2 < Y1)){
    LineaDDA(context, X1, Y1, X2, Y1); 
    LineaDDA(context, X1, Y1, X1, Y2); 
    LineaDDA(context, X2, Y1, X2, Y2); 
    LineaDDA(context, X1, Y2, X2, Y2);   
  }
}
//FUNCIONAMIENTO PARA DIBUJAR EL CIRCULO USANDO EL ALGORITMO DE BRESENHAM
function CirculoBresenham(context, xc , yc, r){
  let x = 0;
  let y = r;
  let p = 3 - 2 * r;

  function dibujarPuntos(x, y) {
    context.fillRect(xc + x, yc + y, 1, 1);
    context.fillRect(xc - x, yc + y, 1, 1);
    context.fillRect(xc + x, yc - y, 1, 1);
    context.fillRect(xc - x, yc - y, 1, 1);
    context.fillRect(xc + y, yc + x, 1, 1);
    context.fillRect(xc - y, yc + x, 1, 1);
    context.fillRect(xc + y, yc - x, 1, 1);
    context.fillRect(xc - y, yc - x, 1, 1);
  }

  dibujarPuntos(x, y);

  while (x < y) {
    x++;
    if (p < 0) {
      p += 4 * x + 6;
    } else {
      y--;
      p += 4 * (x - y) + 10;
    }
    dibujarPuntos(x, y);
  }
}

//FUNCIONAMIENTO PARA DIBIJAR UN POLIGONO REGULAR
function PoligonoRegular(context, xc, yc , r , l){
  let angulo = (Math.PI * 2) / l;
  let antx = xc + r;
  let anty = yc;
  for (let i = 1; i <= l; i ++){
    let x = xc + r * Math.cos(i * angulo);
    let y = yc + r * Math.sin(i * angulo);
    LineaDDA(context, antx, anty, x, y);
    antx = x;
    anty = y;
  }
}

//FUNCIONAMIENTO PARA DIBUJAR UNA ELIPSE
function DibujarElipse(context, xc, yc, a, b) {
  var x = 0;
  var y = b;    
  
  var px = Math.round(Math.pow(b, 2) - Math.pow(a, 2) * b + 0.25 * Math.pow(a, 2));
  PuntosElipse(context, x, y, xc, yc);
  
  while (Math.pow(b, 2) * x < Math.pow(a, 2)* y) {
    x++;
    if (px < 0) {
      px += 2 * Math.pow(b, 2) * x + Math.pow(b, 2);
    } else {
      y--;
      px += 2 * Math.pow(b, 2) * x - 2 * Math.pow(a, 2)* y + Math.pow(b, 2);
    }
    PuntosElipse(context, x, y, xc, yc);
  }
  
  var py = Math.round(Math.pow(b, 2) * (x + 0.5) * (x + 0.5) + Math.pow(a, 2) * (y - 1) * (y - 1) - Math.pow(a, 2) * Math.pow(b, 2));
  
  while (y > 0) {
    y--;
    if (py < 0) {
      x++;
      py += 2 * Math.pow(b, 2) * x - 2 * Math.pow(a, 2)* y + Math.pow(a, 2);
    } else {
      py += -2 * Math.pow(a, 2)* y + Math.pow(a, 2);
    }
    PuntosElipse(context, x, y, xc, yc);
  }
}

//FUNCION QUE DIBUJA LOS PUNTO DE LA ELIPSE
function PuntosElipse(context,  x, y, xc, yc) {
  context.fillRect(xc + x, yc + y, 1, 1);
  context.fillRect(xc - x, yc + y, 1, 1);
  context.fillRect(xc + x, yc - y, 1, 1);
  context.fillRect(xc - x, yc - y, 1, 1);
}

//FUNCION QUE BORRA EL RECTANGULO DE LA FIGURA
function BorrarFigura(X1, Y1, X2, Y2){
  contexto.clearRect(X1, Y1, X2, Y2);
}

//FUNCION PARA DIBIJAR EL TRAPECIO
function DibujarTrapecio(context, X1, Y1, X2){
  if (X2 < X1){
    let cx = (X1-X2)/2;
    let x = cx/2;
    LineaDDA(context, X1, Y1, X2, Y1);
    //LineaDDA(context, X1 + cx, Y1, X1 + cx, Y1-cx);
    LineaDDA(context, X1 - x, Y1 - cx , X2 + x, Y1-cx);
    LineaDDA(context, X1, Y1, X1 - x, Y1 - cx);
    LineaDDA(context, X2, Y1, X2 + x, Y1-cx);
  }else{
    let cx = (X2-X1)/2;
    let x = cx/2;
    LineaDDA(context, X1, Y1, X2, Y1);
    //LineaDDA(context, X1 + cx, Y1, X1 + cx, Y1-cx);
    LineaDDA(context, X1 + x, Y1 - cx , X2 - x, Y1-cx);
    LineaDDA(context, X1, Y1, X1 + x, Y1 - cx);
    LineaDDA(context, X2, Y1, X2 - x, Y1-cx);
  }

}

//FUNCIONES PARA ABRIR Y CERRAR EL FUNCIONAMIENTO DEL DIBUJAR LIBRE
function agregarScript() {
  var script = document.createElement('script');
  script.src = 'javascript/dibujar.js'; 
  script.id = 'miScript';
  document.head.appendChild(script);
}
function quitarScript() {
  var script = document.getElementById('miScript');
  if (script) {
    document.head.removeChild(script);
  }
}
