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
  function RellenarElipse(context, xc, yc, a, b, Color) {
    context.fillStyle = Color;
    context.beginPath();
    context.ellipse(xc, yc, a, b, 0, 0, 2 * Math.PI);
    context.fill();
  } 
  

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