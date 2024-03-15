//ESTRUCTURA DE DATOS DE LAS FIGURAS
class Figura{
  constructor(posicion, tipo, x1, y1, x2, y2, r, l, borde, relleno){
    this.indice = posicion;
    this.tipo = tipo;
    this.co = {x1, y1, x2, y2};
    this.r = r
    this.l = l;
    this.crelleno = relleno;
    this.cborde = borde;
  }
}

//PILA PARA LAS FIGURAS
class PilaFiguras{
  constructor(){
    this.items = [];
  }
  push(figura){
    this.items.push(figura);
  }
  pop(){
    if (this.isEmpty()){
      return "La pila está vacía";
    }
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) {
      return "La pila está vacía";
    }
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
}

//FUNCION PARA SELECCIONAR FIGURA
function Seleccionar(x, y){


}



//FUNCION PARA DESACTIVAR EL FUNCIONAMIENTO DE LAS FUNCIONES 
function cancelar(){
  document.getElementById('inputPoligono').style.display = 'none';
  document.getElementById('inputTexto').style.display = 'none';
  Poligono = false;
  Elipse = false;
  Circulo = false;
  LineaDDAs = false;
  Cuadrado = false;
  Dibujar = false;
  Rectangulo = false;
  Rombo = false;
  Trapecio = false;
  PriClick = true;
  previewCanvas.style.zIndex = -1;
  quitarScript();
  Texto = false;
  Relleno = false;
  Seleccionar = false;
}

function BordesC(context){
  var color = ColorBordes.value;
  context.fillStyle = color;
  context.strokeStyle = color;
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
function descargarPDF(context, fileName){
  var imgData = context.toDataURL("image/jpeg", 1.0);
  var pdf = new jsPDF();

  pdf.addImage(imgData, 'JPEG', 0, 0);
  pdf.save(fileName + ".pdf");
}

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
function DibujarTrapecio(context, xc, yc , r){
  let l = 6;
  let angulo = (Math.PI * 2) / l;
  let antx = xc + r;
  let anty = yc;
  for (let i = 3; i <= l; i ++){
    let x = xc + r * Math.cos(i * angulo);
    let y = yc + r * Math.sin(i * angulo);
    LineaDDA(context, antx, anty, x, y);
    antx = x;
    anty = y;
  }
  LineaDDA(context, xc - r, yc, xc + r, yc);
}

//FUNCION PARA ESCRIBIR EL TEXTO
function Escribir(context, tx, x, y){
  context.fillText(tx, x, y);
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







//FUNCION QUE PERMITE RELLENAR EL CONTENIDO DE UN CIRCULO
function RellenarCirculo(context, xc, yc, r, Color) {
  for (let i = xc - r; i <= xc + r; i++) {
    for (let j = yc - r; j <= yc + r; j++) {
      if ((i - xc) * (i - xc) + (j - yc) * (j - yc) <= r * r) {
        context.fillStyle = Color;
        context.fillRect(i, j, 1, 1);
      }
    }
  }
}
//FUNCION QUE PERMITE RELLENAR EL CONTENIDO DE UN RECTANGULO
function RellenarRectangulo(context, x1, y1, x2, y2, Color) {
  let startY = Math.min(y1, y2);
  let endY = Math.max(y1, y2);
  let startX = Math.min(x1, x2);
  let endX = Math.max(x1, x2);

  for (let i = startY; i <= endY; i++) {
    for (let j = startX; j <= endX; j++) {
      context.fillStyle = Color;
      context.fillRect(j, i, 1, 1);
    }
  }
}
//FUNCION PARA RELLENAR EL CONTENIDO DE UN CUADRADO
function RellenarCuadrado(context, x1, y1, x2, y2, Color) {
  let lado = Math.abs(x2 - x1);
  let startY = Math.min(y1, y2);
  let endY = startY + lado;
  let startX = Math.min(x1, x2);
  let endX = startX + lado;
  for (let i = startY; i <= endY; i++) {
    for (let j = startX; j <= endX; j++) {
      context.fillStyle = Color;
      context.fillRect(j, i, 1, 1);
    }
  }
}
//FUNCION PARA RELLENAR EL CONTENIDO DE UN POLIGONO REGULAR
function RellenarPoligonoRegular(context, xc, yc, r, l, Color) {
  let angulo = (Math.PI * 2) / l;
  let antx = xc + r;
  let anty = yc;
  let minY = yc;
  let maxY = yc;

  for (let i = 1; i <= l; i++) {
    let x = xc + r * Math.cos(i * angulo);
    let y = yc + r * Math.sin(i * angulo);
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }
for (let y = minY; y <= maxY; y++) {
    let xIntersects = [];
    for (let i = 1; i <= l; i++) {
      let x1 = xc + r * Math.cos((i - 1) * angulo);
      let y1 = yc + r * Math.sin((i - 1) * angulo);
      let x2 = xc + r * Math.cos(i * angulo);
      let y2 = yc + r * Math.sin(i * angulo);
      if ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)) {
        let xIntersect = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
        xIntersects.push(xIntersect);
      }
    }
    xIntersects.sort((a, b) => a - b);
    for (let i = 0; i < xIntersects.length; i += 2) {
      let x1 = Math.ceil(xIntersects[i]);
      let x2 = Math.floor(xIntersects[i + 1]);
      for (let x = x1; x <= x2; x++) {
        context.fillStyle = Color;
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}
//FUNCION PARA RELLENAR EL TRAPECIO
function RellenarTrapecio(context, xc, yc, r, Color) {
  let l = 6;
  let angulo = (Math.PI * 2) / l;
  let antx = xc + r;
  let anty = yc;
  let minY = yc + r;
  let maxY = yc;

  for (let i = 3; i <= l; i++) {
    let x = xc + r * Math.cos(i * angulo);
    let y = yc + r * Math.sin(i * angulo);
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  for (let y = minY; y <= maxY; y++) {
    let xIntersects = [];
    for (let i = 3; i <= l; i++) {
      let x1 = xc + r * Math.cos((i - 1) * angulo);
      let y1 = yc + r * Math.sin((i - 1) * angulo);
      let x2 = xc + r * Math.cos(i * angulo);
      let y2 = yc + r * Math.sin(i * angulo);
      if ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)) {
        let xIntersect = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
        xIntersects.push(xIntersect);
      }
    }
    xIntersects.sort((a, b) => a - b);
    for (let i = 0; i < xIntersects.length; i += 2) {
      let x1 = Math.ceil(xIntersects[i]);
      let x2 = Math.floor(xIntersects[i + 1]);
      for (let x = x1; x <= x2; x++) {
        context.fillStyle = Color;
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}
//FUNCION PARA RELLENAR LA ELIPSE
function RellenarElipse(context, xc, yc, a, b, Color) {
  context.fillStyle = Color;
  context.beginPath();
  context.ellipse(xc, yc, a, b, 0, 0, 2 * Math.PI);
  context.fill();
}




function  SeleccionRelleno(x, y) {
  let t = pila1.size() -1;
  var color = ColorBordes.value;
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          console.log(fig.co.x1);
          RellenarCirculo(contexto, fig.co.x1, fig.co.y1, fig.r, color);
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) ||
        (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          console.log("rectangulo si" + fig.indice)
          RellenarRectangulo(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2, color);
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          RellenarCuadrado(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2, color); 
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          console.log(fig.co.x1);
          RellenarPoligonoRegular(contexto, fig.co.x1, fig.co.y1, fig.r,  fig.l, color)
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          console.log(fig.co.x1);
          RellenarTrapecio(contexto, fig.co.x1, fig.co.y1, fig.r, color)
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);

        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          radioX = Math.abs(fig.co.x2 - fig.co.x1);
          radioY = Math.abs(fig.co.y2 - fig.co.y1);
          console.log(fig.co.x1);
          RellenarElipse(contexto, fig.co.x1, fig.co.y1, a, b, color);
        }
        break;
      
    }
  }

  return
}

