function isInViewPort(elemento) {
  posicion = elemento.getBoundingClientRect().top;
  if (posicion >= 0 && posicion <= window.innerHeight + elemento.clientHeight) {
    return true;
  } else {
    return false;
  }
}
function isInCenter(elemento) {
  const posiciontop = elemento.getBoundingClientRect().top;
  const posicion = posiciontop + elemento.clientHeight * 0.5;
  if (
    posicion >= window.innerHeight * 0.05 &&
    posicion <= window.innerHeight * 0.95
  ) {
    return true;
  } else {
    return false;
  }
}

if (inicioOculto()) {
  ini.style.transform = "scale(0)";
} else {
  ini.style.transform = "scale(1)";
}

function inicioOculto() {
  const ini = document.getElementById("ini");
  const about = document.getElementById("about");

  const rectO = ini.getBoundingClientRect().top;
  const rectV = about.getBoundingClientRect().top;
  if (rectO >= rectV) {
    return true;
  } else {
    return false;
  }
}
let blockfill = false;

document.addEventListener("scroll", () => {
  //Ondas de la sección about, la parte superior
  const svg = document.querySelector(".svg");

  if (isInViewPort(svg)) {
    const posicion = svg.getBoundingClientRect().top;
    const desp = (posicion / window.innerHeight) * 50;
    svg.style.transform = `translateX(-${desp}%)`;
  }

  //Ondas de la sección about, la parte inferior
  const svgb = document.querySelector(".svgb");

  if (isInViewPort(svgb)) {
    const posicion = svgb.getBoundingClientRect().top;
    const desp = (posicion / window.innerHeight) * 50 - 50;
    svgb.style.transform = `translateX(${desp}%)`;
  }

  //Para ocultar la sección de inicio una vez pasada
  if (inicioOculto()) {
    ini.style.transform = "scale(0)";
  } else {
    ini.style.transform = "scale(1)";
  }

  //Para mostrar las habilidades
  const skills_container = document.getElementById("skills-container");
  const skills = document.querySelectorAll(".skill");

  if (isInCenter(skills_container)) {
    if (!blockfill) {
      fillAll();
      skills.forEach((element) => {
        element.style.transform = "translateY(0)";
        element.style.opacity = 1;
      });
      blockfill = true;
    }
  }
  if (!isInCenter(skills_container)) {
    blockfill = false;
    skills.forEach((element) => {
      element.style.transform = "translateY(-80px)";
      element.style.opacity = 0;
    });
  }

  //Para mostrar y ocultar los proyectos
  const proyectos = document.querySelector(".contenedor_contenedor");
  if (isInCenter(proyectos)) {
    proyectos.style.transform = "translateY(0)";
    proyectos.style.opacity = 1;
  } else {
    proyectos.style.transform = "translateY(-80px)";
    proyectos.style.opacity = 0;
  }
});

const c75 = document.querySelector(".c75");

function fillAll() {
  const c25 = document.querySelectorAll(".c25");
  const c50 = document.querySelectorAll(".c50");
  const c75 = document.querySelectorAll(".c75");
  const c100 = document.querySelectorAll(".c100");

  c25.forEach((elemento) => {
    fill(elemento, 0, 25);
  });
  c50.forEach((elemento) => {
    fill(elemento, 0, 50);
  });
  c75.forEach((elemento) => {
    fill(elemento, 0, 75);
  });
  c100.forEach((elemento) => {
    fill(elemento, 0, 100);
  });
}

function fill(element, ini, fin) {
  if (ini < fin) {
    if (ini + 10 >= fin) {
      ini += 0.3;
      element.style.background = `conic-gradient(#2196f3 0% ${ini}%, #fff ${ini}% 100%)`;
      setTimeout(() => {
        fill(element, ini, fin);
      }, 10);
    } else {
      ini++;
      element.style.background = `conic-gradient(#2196f3 0% ${ini}%, #fff ${ini}% 100%)`;
      setTimeout(() => {
        fill(element, ini, fin);
      }, 10);
    }
  }
}

function startmemory() {
  document.querySelector(
    "body"
  ).innerHTML += `<div id="game-container" class="d-flex align-items-center justify-content-center">
      <div class="game-content-memory">
        <iframe src="memory/index.html"></iframe>
      </div>
    </div>
  `;
  const juego_container = document.getElementById("game-container");

  juego_container.addEventListener("click", () => {
    juego_container.remove();
  });
}

function startmedio() {
  document.querySelector(
    "body"
  ).innerHTML += `<div id="game-container" class="d-flex align-items-center justify-content-center">
      <div class="game-content-memory">
        <iframe src="medio/index.html"></iframe>
      </div>
    </div>
  `;
  const juego_container = document.getElementById("game-container");

  juego_container.addEventListener("click", () => {
    juego_container.remove();
  });
}

function startsnake() {
  document.querySelector(
    "body"
  ).innerHTML += `<div id="game-container" class="d-flex align-items-center justify-content-center">
      <div class="game-content-memory">
        <iframe src="snake.html"></iframe>
      </div>
    </div>
`;
  const juego_container = document.getElementById("game-container");
  juego_container.querySelector("iframe").focus();

  juego_container.addEventListener("click", () => {
    juego_container.remove();
  });
}
