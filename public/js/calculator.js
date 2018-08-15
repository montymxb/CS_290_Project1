


      var resistanceValue;
      var toleranceValue;

      function loadDoc() {
        var xhttp = new XMLHttpRequest();
/*        xhttp.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
          }
        };
*/
        xhttp.open("POST", "calculate", true);

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send("fname="+resistanceValue+"&lname="+toleranceValue);
        
      }

      function mantissa(band1, band2) {
        function getVal(color) {
          if (color === "black") {
            return 0;
          } else if (color === "brown") {
            return 1;
          } else if (color === "red") {
            return 2;
          } else if (color === "orange") {
            return 3;
          } else if (color === "yellow") {
            return 4;
          } else if (color === "green") {
            return 5;
          } else if (color === "blue") {
            return 6;
          } else if (color === "violet") {
            return 7;
          } else if (color === "grey") {
            return 8;
          } else if (color === "white") {
            return 9;
          } else {
            return 0;
          }
        }
        let p1 = getVal(band1);
        let p2 = getVal(band2);
        return (10 * p1) + p2;
      }

      function multiplier(band3) {
        function getMult(color) {
          if (color === "black") {
            return 1;
          } else if (color === "brown") {
            return 10;
          } else if (color === "red") {
            return 100;
          } else if (color === "orange") {
            return 1000;
          } else if (color === "yellow") {
            return 10000;
          } else if (color === "green") {
            return 100000;
          } else if (color === "blue") {
            return 1000000;
          } else if (color === "violet") {
            return 10000000;
          } else if (color === "grey") {
            return 100000000;
          } else if (color === "white") {
            return 1000000000;
          } else if (color === "gold") {
            return .1;
          } else if (color === "silver") {
            return .01;
          } else {
            return 0;
          }
        }
        return getMult(band3);
      }

      function resistance(b1, b2, b3) {
        let resistorValue = mantissa(b1, b2) * multiplier(b3);
        return resistorValue;
      }

      function tolerance(band4, rv) {
        function getTol(color) {
          if (color === "brown") {
            return .01;
          } else if (color === "red") {
            return .02;
          } else if (color === "green") {
            return .005;
          } else if (color === "blue") {
            return .0025;
          } else if (color === "violet") {
            return .001;
          } else if (color === "grey") {
            return .0005;
          } else if (color === "gold") {
            return .05;
          } else if (color === "silver") {
            return .1;
          } else {
            return 0;
          }
        }
        return rv * getTol(band4);
      }


      function myFunction1() {
        document.getElementById("myDropdown1").classList.toggle("show");
      }

      function myFunction2() {
        document.getElementById("myDropdown2").classList.toggle("show");
      }

      function myFunction3() {
        document.getElementById("myDropdown3").classList.toggle("show");
      }

      function myFunction4() {
        document.getElementById("myDropdown4").classList.toggle("show");
      }


      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

      function calculate(ba1, ba2, ba3, ba4) {
        var omega = resistance(ba1, ba2, ba3);
        var delta = tolerance(ba4, omega);
        resistanceValue = omega;
        toleranceValue = delta;
        document.getElementById("resval").innerHTML = omega;
        document.getElementById("tolval").innerHTML = delta;
      }



      function pressb1(n) {
        if (n == 1) {
          document.getElementById("b1color").innerHTML = "black";
        } else if (n == 2) {
          document.getElementById("b1color").innerHTML = "brown";
        } else if (n == 3) {
          document.getElementById("b1color").innerHTML = "red";
        } else if (n == 4) {
          document.getElementById("b1color").innerHTML = "orange";
        } else if (n == 5) {
          document.getElementById("b1color").innerHTML = "yellow";
        } else if (n == 6) {
          document.getElementById("b1color").innerHTML = "green";
        } else if (n == 7) {
          document.getElementById("b1color").innerHTML = "blue";
        } else if (n == 8) {
          document.getElementById("b1color").innerHTML = "violet";
        } else if (n == 9) {
          document.getElementById("b1color").innerHTML = "gray";
        } else if (n == 10) {
          document.getElementById("b1color").innerHTML = "white";
        }


        var c1 = document.getElementById("b1color").innerHTML;
        var c2 = document.getElementById("b2color").innerHTML;
        var c3 = document.getElementById("b3color").innerHTML;
        var c4 = document.getElementById("b4color").innerHTML;
        document.getElementById("testing").innerHTML = c1;
        calculate(c1, c2, c3, c4);
      }

      function pressb2(n) {
        //sets current color
        if (n == 1) {
          document.getElementById("b2color").innerHTML = "black";
        } else if (n == 2) {
          document.getElementById("b2color").innerHTML = "brown";
        } else if (n == 3) {
          document.getElementById("b2color").innerHTML = "red";
        } else if (n == 4) {
          document.getElementById("b2color").innerHTML = "orange";
        } else if (n == 5) {
          document.getElementById("b2color").innerHTML = "yellow";
        } else if (n == 6) {
          document.getElementById("b2color").innerHTML = "green";
        } else if (n == 7) {
          document.getElementById("b2color").innerHTML = "blue";
        } else if (n == 8) {
          document.getElementById("b2color").innerHTML = "violet";
        } else if (n == 9) {
          document.getElementById("b2color").innerHTML = "gray";
        } else if (n == 10) {
          document.getElementById("b2color").innerHTML = "white";
        }

        //currently these are not passing vlaid inputs
        //not yet sure why
        var c1 = document.getElementById("b1color").innerHTML;
        var c2 = document.getElementById("b2color").innerHTML;
        var c3 = document.getElementById("b3color").innerHTML;
        var c4 = document.getElementById("b4color").innerHTML;
        //figuringout what is getting passed
        document.getElementById("testing").innerHTML = c1;
        calculate(c1, c2, c3, c4);
      }

      function pressb3(n) {
        //sets current color
        if (n == 1) {
          document.getElementById("b3color").innerHTML = "black";
        } else if (n == 2) {
          document.getElementById("b3color").innerHTML = "brown";
        } else if (n == 3) {
          document.getElementById("b3color").innerHTML = "red";
        } else if (n == 4) {
          document.getElementById("b3color").innerHTML = "orange";
        } else if (n == 5) {
          document.getElementById("b3color").innerHTML = "yellow";
        } else if (n == 6) {
          document.getElementById("b3color").innerHTML = "green";
        } else if (n == 7) {
          document.getElementById("b3color").innerHTML = "blue";
        } else if (n == 8) {
          document.getElementById("b3color").innerHTML = "violet";
        } else if (n == 9) {
          document.getElementById("b3color").innerHTML = "gray";
        } else if (n == 10) {
          document.getElementById("b3color").innerHTML = "white";
        } else if (n == 11) {
          document.getElementById("b3color").innerHTML = "gold";
        } else if (n == 12) {
          document.getElementById("b3color").innerHTML = "silver";
        }

        var c1 = document.getElementById("b1color").innerHTML;
        var c2 = document.getElementById("b2color").innerHTML;
        var c3 = document.getElementById("b3color").innerHTML;
        var c4 = document.getElementById("b4color").innerHTML;
        document.getElementById("testing").innerHTML = c1;
        calculate(c1, c2, c3, c4);
      }

      function pressb4(n) {
        //sets current color
        if (n == 1) {
          document.getElementById("b4color").innerHTML = "black";
        } else if (n == 2) {
          document.getElementById("b4color").innerHTML = "brown";
        } else if (n == 3) {
          document.getElementById("b4color").innerHTML = "red";
        } else if (n == 4) {
          document.getElementById("b4color").innerHTML = "orange";
        } else if (n == 5) {
          document.getElementById("b4color").innerHTML = "yellow";
        } else if (n == 6) {
          document.getElementById("b4color").innerHTML = "green";
        } else if (n == 7) {
          document.getElementById("b4color").innerHTML = "blue";
        } else if (n == 8) {
          document.getElementById("b4color").innerHTML = "violet";
        } else if (n == 9) {
          document.getElementById("b4color").innerHTML = "gray";
        } else if (n == 10) {
          document.getElementById("b4color").innerHTML = "white";
        } else if (n == 11) {
          document.getElementById("b4color").innerHTML = "gold";
        } else if (n == 12) {
          document.getElementById("b4color").innerHTML = "silver";
        }

        //currently these are not passing vlaid inputs
        //not yet sure why
        var c1 = document.getElementById("b1color").innerHTML;
        var c2 = document.getElementById("b2color").innerHTML;
        var c3 = document.getElementById("b3color").innerHTML;
        var c4 = document.getElementById("b4color").innerHTML;
        //figuringout what is getting passed
        document.getElementById("testing").innerHTML = c1;
        calculate(c1, c2, c3, c4);
      }
