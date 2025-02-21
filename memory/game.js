//Variables globales
let valCarta = 0;
let restoCartas = 0;
let block = 0;

//Compruebo de manera local si el tamaño es correcto
function checkSize() {
  const tamano = document.getElementById("board-size");
  let mida = tamano.value;
  if (
    mida <= 1 ||
    mida == 3 ||
    mida == 5 ||
    mida == 7 ||
    mida > 8 ||
    mida == ""
  ) {
    alert("Introduce un numero correcto de tamaño");
    location.reload();
  }
  return mida;
}

async function reiniciarEvents() {
  block = 1;
  await pausa(2000);
  block = 0;
  iniciarImagenes();
}

//Creo los contenedores y les añado la imagen inicial
function dibujarTablero(size) {
  const tablero = document.getElementById("game-board");

  let posiciones = "";
  for (let i = size - 1; i >= 0; i--) {
    for (let ii = 0; ii < size; ii++) {
      posiciones += `<div id=${i}${ii} class="cell"><input class="x" value="${ii}" hidden><input class="y" value="${i}" hidden><img src="" alt=""></img></div>`;
    }
  }
  tablero.innerHTML = posiciones;

  establecerFilas(size);
  iniciarImagenes();
  eventCartas();

  restoCartas = (size * size) / 2;

  document.getElementById("remaining-pairs").innerHTML = restoCartas;
}

//Función para hacer una pausa
function pausa(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Añado las variables del css para que se adapte al tamaño
function establecerFilas(size) {
  var r = document.querySelector(":root");
  r.style.setProperty("--boardSize", size);
}

//Función para añadir las imagenes a los contenedores creados
function iniciarImagenes() {
  const celdas = document.querySelectorAll(".cell");
  celdas.forEach((celda) => {
    const img = celda.querySelector("img");
    img.src = "images/image0.png";
  });
}

//Función para iniciar el juego
async function startGame() {
  const mida = checkSize();

  try {
    const result = await fetch(
      `http://localhost/start.js?size=${mida}`
    );
    if (!result.ok) {
      throw new Error("Error en la respuesta");
    }

    const resultado = await result.json();

    //Compruebo si el servidor aprueba el tamaño del tablero
    if (resultado.success === 1) {
      dibujarTablero(mida);
    } else {
      alert("Se ha producido un problema");
      location.reload();
    }
  } catch (error) {
    alert(`Se ha producido un error: ${error.message}`);
  }
}

function eventCartas() {
  const cartas = document.querySelectorAll(".cell");

  cartas.forEach((carta) => {
    carta.addEventListener("click", function () {
      const x = carta.querySelector(".x").value;
      const y = carta.querySelector(".y").value;
      const imgCarta = carta.querySelector("img");

      img = document.createElement("img");
      img.src = `images/image0.png`;

      if (imgCarta.src == img.src && block == 0) {
        girarCarta(x, y);
      }
    });
  });
}

async function girarCarta(x, y) {
  try {
    const result = await fetch(
      `http://localhost/js.php?x=${x}&y=${y}`
    );
    if (!result.ok) {
      throw new Error("Error en la respuesta");
    }

    const resultado = await result.json();

    const carta = document.getElementById(y + x);

    img = carta.querySelector("img");

    img.src = `images/image${resultado.value}.png`;

    if (valCarta != 0) {
      reiniciarEvents();
      if (valCarta == resultado.value) {
        restarCarta();
      }
      valCarta = 0;
    } else {
      valCarta = resultado.value;
    }
  } catch (error) {
    alert(`Se ha producido un error: ${error.message}`);
  }
}

function restarCarta() {
  const resto = document.getElementById("remaining-pairs");

  restoCartas--;

  resto.innerHTML = restoCartas;

  if (restoCartas <= 0) {
    alert("Fin del juego");
    location.reload();
  }
}

function startListeners() {
  const btn = document.getElementById("start-game");
  btn.addEventListener("click", function () {
    startGame();
  });
}

startListeners();
