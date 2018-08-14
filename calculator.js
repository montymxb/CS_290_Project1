//determine base value(mantissa)
function mantissa(band1,band2){
  function getVal(color){
    if (color==="black"){
      return 0;
    } else if(color ==="brown"){
      return 1;
    } else if(color === "red"){
      return 2;
    } else if(color === "orange"){
      return 3;
    } else if(color === "yellow"){
      return 4;
    } else if(color === "green"){
      return 5;
    } else if(color === "blue"){
      return 6;
    } else if(color === "violet"){
      return 7;
    } else if(color === "grey"){
      return 8;
    } else if(color === "white"){
      return 9;
    }
  }
  let p1 = getVal(band1);
  let p2 = getVal(band2);
  return (10*p1) + p2;
}

//determine multiplier
function multiplier(band3){
  function getMult(color){
    if (color==="black"){
      return 1;
    } else if(color ==="brown"){
      return 10;
    } else if(color === "red"){
      return 100;
    } else if(color === "orange"){
      return 1000;
    } else if(color === "yellow"){
      return 10000;
    } else if(color === "green"){
      return 100000;
    } else if(color === "blue"){
      return 1000000;
    } else if(color === "violet"){
      return 10000000;
    } else if(color === "grey"){
      return 100000000;
    } else if(color === "white"){
      return 1000000000;
    } else if(color === "gold"){
      return .1;
    } else if(color === "silver"){
      return .01;
    }
  }
  return getMult(band3);
}

//claculate resistance values
function resistance(b1,b2,b3){
  let resistorValue = mantissa(b1,b2) * multiplier(b3);
  return resistorValue;
}

//determine tolerance
function tolerance(band4,rv){
  function getTol(color){
    if (color==="brown"){
      return .01;
    } else if(color === "red"){
      return .02;
    } else if(color === "green"){
      return .005;
    } else if(color === "blue"){
      return .0025;
    } else if(color === "violet"){
      return .001;
    } else if(color === "grey"){
      return .0005;
    }  else if(color === "gold"){
      return .05;
    } else if(color === "silver"){
      return .1;
    }
    return rv*getTol(band4);
}
