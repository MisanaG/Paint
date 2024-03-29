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
  eliminarFigura(indice) {
    this.items = this.items.filter(figura => figura.indice !== indice);
    n--;
  }
  clone() {
    const clonedPila = new PilaFiguras();
    this.items.forEach(figura => {
      clonedPila.push(new Figura(
        figura.indice,
        figura.tipo,
        figura.co.x1,
        figura.co.y1,
        figura.co.x2,
        figura.co.y2,
        figura.r,
        figura.l,
        figura.cborde,
        figura.crelleno
      ));
    });
    return clonedPila;
  }
}


//FUNCION PARA DESACTIVAR EL FUNCIONAMIENTO DE LAS FUNCIONES 
function cancelar(){
  document.getElementById('inputPoligono').style.display = 'none';
  document.getElementById('inputTexto').style.display = 'none';
  document.getElementById('inputArchivo').style.display = 'none';
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
  Borrar = false;
  Fondo = false;
  Frente = false;
  Delante = false;
  Atras= false;
  Escalar = false;
  Mover = false;
}

function BordesC(context, color){
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



//FUNCION QUE SELECCIONA Y RELLENA LA FIGURA
function  SeleccionRelleno(x, y) {
  let coloreada = null;
  let t = pila1.size() -1;
  var color = ColorBordes.value;
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          fig.crelleno = color;
          pila1.items[i] = fig;
          console.log(fig);
          coloreada =  pila1.items[i];
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) ||
        (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          console.log("rectangulo si" + fig.indice)
          RellenarRectangulo(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2, color);
          fig.crelleno = color;
          pila1.items[i] = fig;
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          RellenarCuadrado(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2, color); 
          fig.crelleno = color;
          pila1.items[i] = fig;
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          console.log(fig.co.x1);
          RellenarPoligonoRegular(contexto, fig.co.x1, fig.co.y1, fig.r,  fig.l, color)
          fig.crelleno = color;
          pila1.items[i] = fig;
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          console.log(fig.co.x1);
          RellenarTrapecio(contexto, fig.co.x1, fig.co.y1, fig.r, color)
          fig.crelleno = color;
          pila1.items[i] = fig;
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);

        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          console.log(fig.co.x1);
          RellenarElipse(contexto, fig.co.x1, fig.co.y1, a, b, color);
          fig.crelleno = color;
          pila1.items[i] = fig;
        }
        break;
      
    }
    if (coloreada !== null) break;
  }
  contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  Redibujo();
  return
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




//FUNCION QUE BORRA LA FIGURA DEL ARREGLO
function BorrarFigura(x, y){
  let borrada = null;
  let t = pila1.size() -1;
  //BordesC(contexto, "#FFFFFF")
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'linea':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
      case 'texto':

        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          borrada =  pila1.items[i];
          pila1.eliminarFigura(fig.indice);
        }
        break;
    }
    if (borrada !== null) break;
  }
  if (borrada !== null) {
    for (let i = 0; i < pila1.size(); i++) {
      let fig = pila1.items[i];
      if (fig.indice > borrada.indice) {
        fig.indice--; 
      }
    }
  }
  contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  Redibujo();
  return
}
//FUNCION QUE REDIBUJA TODAS LAS FIGURAS DEL ARREGLO
function Redibujo (){
  for (let i = 0; i < pila1.size(); i++) {
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;
    BordesC(contexto, fig.cborde)
    switch (fig.tipo){
      case 'circulo':
        CirculoBresenham(contexto, fig.co.x1, fig.co.y1, fig.r);
        if (fig.crelleno !== "white"){
          RellenarCirculo(contexto, fig.co.x1, fig.co.y1, fig.r, fig.crelleno);
        }
        break;
      case 'rectangulo':
        DibujarRectangulo(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2);
          if (fig.crelleno !== "white"){
            RellenarRectangulo(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2, fig.crelleno);
          }
        break;
      case 'cuadrado':
        DibujarCuadrado(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2);
          if (fig.crelleno !== "white"){
            RellenarCuadrado(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2, fig.crelleno);
          }
        break;
      case 'poligono':
        PoligonoRegular(contexto, fig.co.x1, fig.co.y1, fig.r,  fig.l,);
          if (fig.crelleno !== "white"){
            RellenarPoligonoRegular(contexto, fig.co.x1, fig.co.y1, fig.r,  fig.l, fig.crelleno);
          }
        break;
      case 'trapecio':
        DibujarTrapecio(contexto, fig.co.x1, fig.co.y1, fig.r);
          if (fig.crelleno !== "white"){
            RellenarTrapecio(contexto, fig.co.x1, fig.co.y1, fig.r,  fig.l, fig.crelleno);
          }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        DibujarElipse(contexto, fig.co.x1, fig.co.y1, a, b);
          if (fig.crelleno !== "white"){
            RellenarElipse(contexto, fig.co.x1, fig.co.y1, a, b, fig.crelleno);
          }
        break;
      case 'linea':
        LineaDDA(contexto, fig.co.x1, fig.co.y1, fig.co.x2, fig.co.y2);
        break;
      case 'texto':
        Escribir(contexto, fig.crelleno, fig.co.x1, fig.co.y1)
        break;
    }
  }
}




//FUNCION PARA GUARDAR LAS FIGURAS COMO UN TXT
function guardar(pilaFiguras) {
  let contenido = '';
  pilaFiguras.items.forEach(figura => {
    contenido += `Indice: ${figura.indice}, Tipo: ${figura.tipo}, x1: ${figura.co.x1}, y1: ${figura.co.y1}, x2: ${figura.co.x2}, y2: ${figura.co.y2}), Radio: ${figura.r}, Lados: ${figura.l}, Borde: ${figura.cborde}, Relleno: ${figura.crelleno}\n`;
  });
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'figuras.txt';
  link.click();
}

//FUNCION PARA ABRIR EL ARCHIVO, CARGAR LOS ELEMENTOS EN LA PILA Y REDIBUJAR LAS FIGURAS
function abrirArchivo() {
  const inputArchivo = document.querySelector('input[name="archivosubido"]');
  const archivo = inputArchivo.files[0];
  const lector = new FileReader();
  lector.onload = function (eventoLector) {
    const contenido = eventoLector.target.result;
    const figuras = parsearContenidoFiguras(contenido);
    console.log('Las figuras leídas del archivo son:');
    console.log(figuras);
    figuras.forEach(figura => {
      pila1.push(figura);
    });

    Redibujo();
  };
  lector.readAsText(archivo);
}

//FUNCION PARA OBTENER EL CONTENIDO DEL ARCHIVO TXT
function parsearContenidoFiguras(contenido) {
  const lineas = contenido.split('\n');
  const figuras = [];
  lineas.forEach((linea, indice) => {
    const partes = linea.split(',');
    if (partes.length >= 7) {
      const indiceParte = partes[0].split(':')[1].trim();
      const tipoParte = partes[1].split(':')[1].trim();
      const x1 = parseInt(partes[2].split(':')[1].trim());
      const y1 = parseInt(partes[3].split(':')[1].trim());
      const x2 = parseInt(partes[4].split(':')[1].trim());
      const y2 = parseInt(partes[5].split(':')[1].trim()); 
      const r = parseFloat(partes[6].split(':')[1].trim());
      const l = parseInt(partes[7].split(':')[1].trim());
      const borde = partes[8].split(':')[1].trim();
      const relleno = partes[9].split(':')[1].trim();

      const figura = new Figura(indiceParte, tipoParte, x1, y1, x2, y2, r, l, borde, relleno);
      figuras.push(figura);
    }
  });
  return figuras;
}


//FUNCION PARA TRAER AL FRENTE
function EnviarFrente(x, y){
  let capa = null;
  let t = pila1.size() -1;
  
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          capa =  pila1.items[i]; 
          console.log(capa)
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          capa =  pila1.items[i];
          
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          capa =  pila1.items[i];
          
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          capa =  pila1.items[i];
          
        }
        break;
      case 'linea':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
      case 'texto':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
    }
    if (capa !== null) break;
  }
  if (capa !== null) {
    for (let i = 0; i < pila1.size(); i++) {
      let fig = pila1.items[i];
      if (fig.indice > capa.indice) {
        fig.indice--; 
      }else if (fig.indice == capa.indice){
        fig.indice = pila1.size()+1; 
      }

    }
  }
  pila1.items.sort((a, b) => a.indice - b.indice);
  contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  Redibujo();
  return
}

//FUNCION PARA MANDAR AL FONDO
function EnviarFondo(x, y){
  let capa = null;
  let t = pila1.size() -1;
  
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          capa =  pila1.items[i]; 
          console.log(capa)
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          capa =  pila1.items[i];
          
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          capa =  pila1.items[i];
          
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          capa =  pila1.items[i];
          
        }
        break;
      case 'linea':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
      case 'texto':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          
        }
        break;
    }
    if (capa !== null) break;
  }
  if (capa !== null) {
    for (let i = 0; i < pila1.size(); i++) {
      let fig = pila1.items[i];
      if (fig.indice > capa.indice) {
        fig.indice--; 
      }else if (fig.indice < capa.indice){
        fig.indice++; 
      }else if (fig.indice == capa.indice){
        fig.indice = 1; 
      }

    }
  }
  pila1.items.sort((a, b) => a.indice - b.indice);
  contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  Redibujo();
  return
}

//FUNCION PARA MANDAR ATRAS
function EnviarAtras(x, y){
  let capa = null;
  let t = pila1.size() -1;
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
          capa = pila1.items[i];
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
      case 'linea':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
      case 'texto':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice - 1;
          pila1.items[i] = fig;
        }
        break;
    }
    if (capa !== null){
      fig = pila1.items[i-1];
      fig.indice = fig.indice + 1;
      pila1.items[i-1] = fig;
      break;
    } 
  }

  pila1.items.sort((a, b) => a.indice - b.indice);
  contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  Redibujo();
  return
}

//FUNCION PARA MANDAR DELANTE
function EnviarDelante(x, y){
  let capa = null;
  let t = pila1.size() -1;
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
          capa = pila1.items[i];
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
      case 'linea':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
      case 'texto':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          capa =  pila1.items[i];
          fig.indice = fig.indice + 1;
          pila1.items[i] = fig;
        }
        break;
    }
    if (capa !== null){
      fig = pila1.items[i+1];
      fig.indice = fig.indice - 1;
      pila1.items[i+1] = fig;
      break;
    } 
  }

  pila1.items.sort((a, b) => a.indice - b.indice);
  contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  Redibujo();
  return
}



//FUNCION QUE PERMITE OBTENER LAS COORDENADAS GUARDADAS
function ObtenerCo(x, y){
  let t = pila1.size() -1;
  for (let i = t; i >= 0; i--){
    let fig = pila1.items[i];
    let { x1, y1, x2, y2 } = fig.co;

    switch (fig.tipo){

      case 'circulo':
        let distanciaAlCentro = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro <= fig.r){
          return { x1: x1, y1: y1, posicion: i , tipo: fig.tipo};
        }
        break;
      case 'rectangulo':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
      case 'cuadrado':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
      case 'poligono':
        let distanciaAlCentro2 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (distanciaAlCentro2 <= fig.r){
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
      case 'trapecio':
        let distanciaAlCentro3 = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        if (y <= y1 && distanciaAlCentro3 <= fig.r) {
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
      case 'elipse':
        a = Math.abs(x2 - x1);
        b = Math.abs(y2 - y1);
        let distanciaAlCentro4 = Math.pow((x - x1) / a, 2) + Math.pow((y - y1) / b, 2);
        if (distanciaAlCentro4 <= 1){
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
      case 'linea':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
      case 'texto':
        if ((x >= x1 && x <= x2 && y >= y1 && y <= y2) || (x >= x2 && x <= x1 && y >= y2 && y <= y1) || (x >= x1 && x <= x2 && y <= y1 && y >= y2) || (x >= x2 && x <= x1 && y <= y2 && y >= y1)){
          return { x1: x1, y1: y1, posicion: i, tipo: fig.tipo};
        }
        break;
    }

  }
  return null
}


//FUNCION QUE CLONA Y GAURDA LA PILA DE LAS FIGURAS
function guardarEstado() {
  historialIndex++;
  historial = historial.slice(0, historialIndex);
  let estado = {
    figuraData: pila1.clone(),
  };
  historial.push(estado);
}

//FUNCION PARA DESHACER
function deshacer() {
  if (historialIndex > 0) {
      historialIndex--;
      let estado = historial[historialIndex];
      pila1 = estado.figuraData.clone();
      contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      Redibujo();
  }
}

//FUNCION PARA REAHACER
function rehacer() {
  if (historialIndex < historial.length - 1) {
      historialIndex++;
      let estado = historial[historialIndex];
      pila1 = estado.figuraData.clone();
      contexto.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      Redibujo();
  }
}