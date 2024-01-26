function DibujarLinea(X1, Y1, X2, Y2) {
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

function LineaBresenham(X1, Y1, X2, Y2) {

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


function LineaBresenham(X1, Y1, X2, Y2) {

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

function DibujarCuadrado(X1, Y1, X2, Y2) {
    context.lineWidth = 1;

    if ((X2 < X1 && Y2 > Y1) || (X2 > X1 && Y2 > Y1)){
    
      dX = Math.abs(X2 - X1);
      console.log(dX);
      y2 = Y1 + dX;
      LineaBresenham(X1, Y1, X2, Y1);
      LineaBresenham(X1, y2, X2, y2);
      LineaBresenham(X1, Y1, X1, y2);
      LineaBresenham(X2, y2, X2, Y1);
    }else if((X2 > X1 && Y2 < Y1) || (X2 < X1 && Y2 < Y1)){
      
      dX = Math.abs(X2 - X1);
      y1 = Y1 - dX;
      LineaBresenham(X1, Y1, X2, Y1); 
      LineaBresenham(X1, Y1, X1, y1); 
      LineaBresenham(X2, Y1, X2, y1); 
      LineaBresenham(X1, y1, X2, y1); 
      
    }
}