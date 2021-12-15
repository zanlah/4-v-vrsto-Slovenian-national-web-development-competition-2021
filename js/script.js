var igralec1_zeton =
  "<img src='images/logo-feri-rumen.png' class='zeton1' width='100px'/>";
var igralec2_zeton =
  "<img src='images/logo-feri-rdec.png' class='zeton2' width='100px'/>";
var polje = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

$(() => {
  // vpiši svojo kodo
});
var igralec1 = "";
var igralec2 = "";
var naPotezi = 0;
var poteza = 0;
var aliIgra = 0;
var moveTimestamp = 0;
window.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("startGameBtn").click();
  }
});
function novaigra() {
  if (!aliIgra) {
    input1 = document.getElementById("igralec1input").value;
    input2 = document.getElementById("igralec2input").value;
    if (input1.length == 0 || input2.length == 0) {
      alert("Vnesite obe imeni.");
    } else if (input1 == input2) {
      alert("Imeni ne smeta biti enaki. Vnesite novo ime.");
    } else {
      aliIgra = 1;
      igralec1 = input1;
      igralec2 = input2;

      if (Math.random() >= 0.5) {
        naPotezi = 1;
        igralecNaPotezi(1);
      } else {
        naPotezi = 2;
        igralecNaPotezi(2);
      }
      tableCreate();
    }
  } else {
    if (confirm("Ste sredi igre, hočete končati in začeti novo?")) {
      newGame();
    }
  }
}
function igralecNaPotezi(a) {
  if (a == 1) {
    document.getElementById("naPotezi").innerText = "na potezi: " + igralec1;
  } else {
    document.getElementById("naPotezi").innerText = "na potezi: " + igralec2;
  }
}
function handlePlay(id) {
  //počakam sekundo da se animacija konča
  if (Date.now() - moveTimestamp > 1000) {
    moveTimestamp = Date.now();
    var x = id.split(",")[0];
    var y = id.split(",")[1];
    console.log(x + " " + y);

    console.log(polje);
    animateCoin(x + "," + getFreePlace(x));
    poteza++;

    if (poteza % 2) {
      igralecNaPotezi(1);
    } else {
      igralecNaPotezi(2);
    }
    setTimeout(function () {
      var zmagovalec = preveriZmagovalca(polje);
      if (zmagovalec) {
        if (zmagovalec == 1) {
          document.getElementById("naPotezi").innerHTML =
            "<p style='color:gold'>Zmagovalec " + igralec1 + "<p>";
        } else {
          document.getElementById("naPotezi").innerHTML =
            "<p style='color:gold'>Zmagovalec " + igralec2 + "<p>";
        }
        setTimeout(function () {
          if (confirm("Konec igre, za novo igro pritisnite 'ok'.")) {
            newGame();
          }
        }, 500);
      }
    }, 1000);
  }
}
function animateCoin(id) {
  var vrsta = id.split(",")[1];

  var zeton;
  var zetonClass;
  if (poteza % 2) {
    zeton = igralec1_zeton;
    zetonClass = "zeton1";
  } else {
    zeton = igralec2_zeton;
    zetonClass = "zeton2";
  }
  document.getElementById(id).innerHTML = zeton;
  var rect = document.getElementById(id).getBoundingClientRect();
  var tabela = document.getElementById("igralnoPolje").getBoundingClientRect();

  var hostDiv = document.getElementById(id);

  var d = hostDiv.getElementsByClassName(zetonClass)[0];

  d.style.position = "absolute";

  d.style.top = Math.floor(tabela.top - 250) + "px";
  $(d).animate(
    {
      top: Math.floor(rect.top - 145) + "px",
    },
    1000
  );
}
function getFreePlace(x) {
  y = 5;
  while (polje[y][x] == 1 || polje[y][x] == 2) {
    y--;
  }

  if (poteza % 2) {
    polje[y][x] = 1;
  } else {
    polje[y][x] = 2;
  }

  console.log(y);
  return y;
}
function preveriVrsto(a, b, c, d) {
  return a != 0 && a == b && a == c && a == d;
}

function preveriZmagovalca(bd) {
  for (r = 0; r < 3; r++)
    for (c = 0; c < 7; c++)
      if (preveriVrsto(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
        return bd[r][c];

  for (r = 0; r < 6; r++)
    for (c = 0; c < 4; c++)
      if (preveriVrsto(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
        return bd[r][c];

  for (r = 0; r < 3; r++)
    for (c = 0; c < 4; c++)
      if (
        preveriVrsto(
          bd[r][c],
          bd[r + 1][c + 1],
          bd[r + 2][c + 2],
          bd[r + 3][c + 3]
        )
      )
        return bd[r][c];

  for (r = 3; r < 6; r++)
    for (c = 0; c < 4; c++)
      if (
        preveriVrsto(
          bd[r][c],
          bd[r - 1][c + 1],
          bd[r - 2][c + 2],
          bd[r - 3][c + 3]
        )
      )
        return bd[r][c];

  return 0;
}
function newGame() {
  for (var i = 0; i < polje.length; i++) {
    for (j = 0; j < polje[i].length; j++) {
      polje[i][j] = 0;
    }
  }
  document.getElementById("igralnoPolje").innerHTML = "";

  aliIgra = 0;
  novaigra();
}
