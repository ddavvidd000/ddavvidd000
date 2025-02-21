document.getElementById("nuevoturno").disabled="true";
let canvas = document.getElementById("jugador");
let canva = canvas.getContext("2d");
let img = new Image();
img.src="./media/carta49.png";
let x=195;
let y=395;
let puntos=0;
document.getElementById("mj").innerHTML=puntos;
let sumacartasj=0;
document.getElementById("cartasjugador").innerHTML=sumacartasj;
let sumacartasm=0;
document.getElementById("cartasmaquina").innerHTML=sumacartasm;
let cartasusadas=[];
let fin=false;
const cartas = [
    ["carta0.png", 1],
    ["carta1.png", 2],
    ["carta10.png", 0.5],
    ["carta11.png", 0.5],
    ["carta12.png", 1],
    ["carta13.png", 2],
    ["carta14.png", 3],
    ["carta15.png", 4],
    ["carta16.png", 5],
    ["carta17.png", 6],
    ["carta18.png", 7],
    ["carta2.png", 3],
    ["carta21.png", 0.5],
    ["carta22.png", 0.5],
    ["carta23.png", 0.5],
    ["carta24.png", 1],
    ["carta25.png", 2],
    ["carta26.png", 3],
    ["carta27.png", 4],
    ["carta28.png", 5],
    ["carta29.png", 6],
    ["carta3.png", 4],
    ["carta30.png", 7],
    ["carta33.png", 0.5],
    ["carta34.png", 0.5],
    ["carta35.png", 0.5],
    ["carta36.png", 1],
    ["carta37.png", 2],
    ["carta38.png", 3],
    ["carta39.png", 4],
    ["carta4.png", 5],
    ["carta40.png", 5],
    ["carta41.png", 6],
    ["carta42.png", 7],
    ["carta45.png", 0.5],
    ["carta46.png", 0.5],
    ["carta47.png", 0.5],
    ["carta5.png", 6],
    ["carta6.png", 7],
    ["carta9.png", 0.5]
];

function deshabilitarBotones(){
    document.getElementById("cogercarta").disabled="true";
    document.getElementById("plantarse").disabled="true";
}

function habilitarBotones(){
    document.getElementById("cogercarta").disabled="";
    document.getElementById("plantarse").disabled="";
}

function nuevoTurno(){
    sumacartasj=0;
    fin=false;
    document.getElementById("nuevoturno").disabled="true";
    document.getElementById("cartasjugador").innerHTML=sumacartasj;
    document.getElementById("cartasjugador").style.backgroundColor="";
    sumacartasm=0;
    document.getElementById("cartasmaquina").innerHTML=sumacartasm;
    document.getElementById("cartasmaquina").style.backgroundColor="";
    habilitarBotones();
    canva.clearRect(150, 0, canvas.width-150, canvas.height);
    cartasusadas=[];
    x=195;
    y=395;
}

function aleat(){
    let aleat=Math.floor(Math.random() * 39);
    return aleat;
}

img.onload = function() {
    canva.drawImage(img, 0, 0, 100, 150);
};

let imgp = new Image();

function cogerCarta(tur){
    let turno;
    let suma;
    let posicion;
    if(tur=="jugador"){
        turno="cartasjugador";
        suma=sumacartasj;
        posicion=x;
    }
    if(tur=="maquina"){
        turno="cartasmaquina";
        suma=sumacartasm;
        posicion=y;
    }

    let num = aleat();
    while(cartasusadas.includes(num)){
        num = aleat();
    }
    cartasusadas.push(num);
    imgp.src="./media/"+cartas[num][0];
    posicion+=5;
    imgp.onload = function() {
        canva.drawImage(imgp, posicion, Math.floor(Math.random() * 5), 100, 150);
    };
    suma+=cartas[num][1];
    document.getElementById(turno).innerHTML=suma;

    if(tur=="jugador"){
        sumacartasj=suma;
        x=posicion;
    }
    if(tur=="maquina"){
        sumacartasm=suma;
        y=posicion;
    }

    if(suma>7.5){
        document.getElementById(turno).style.backgroundColor="red";
        deshabilitarBotones();
        comprobarVictoria();
        fin=true;
    }
}

function cogerCartaMaquina(){
    let num = aleat();
    while(cartasusadas.includes(num)){
        num = aleat();
    }
    cartasusadas.push(num);
    imgp.src="./media/"+cartas[num][0];
    y+=5;
    imgp.onload = function() {
        canva.drawImage(imgp, y, Math.floor(Math.random() * 5), 100, 150);
    };
    sumacartasm+=cartas[num][1];
    document.getElementById("cartasmaquina").innerHTML=sumacartasm;
    if(sumacartasm>7.5){
        document.getElementById("cartasmaquina").style.backgroundColor="red";
        deshabilitarBotones();
        comprobarVictoria();
        fin=true;
    }
}

function plantarse(){
    deshabilitarBotones();
    document.getElementById("cartasjugador").style.backgroundColor="green";
    if(sumacartasm<=5.5){
        setTimeout(() => {
            cogerCarta("maquina");
            plantarse();
        }, 2000);
    }

    if(sumacartasm>5.5&&sumacartasm<=7.5){
        document.getElementById("cartasmaquina").style.backgroundColor="green"
        comprobarVictoria();
    }
}

function comprobarVictoria(){
    fin=true;
    if(sumacartasj<=7.5&&sumacartasm<=7.5){
        if (sumacartasj>sumacartasm){
            puntos++;
        }else if(sumacartasm>sumacartasj){
            puntos--;
        }
    }else if(sumacartasj<=7.5&&sumacartasm>7.5){
        puntos++;
    }else if(sumacartasj>7.5&&sumacartasm<=7.5){
        puntos--;
    }
    if(puntos>=5)document.getElementsByTagName("body").item(0).innerHTML="<h1>Has ganado</h1>";
    if(puntos<=-5)document.getElementsByTagName("body").item(0).innerHTML="<h1>Has perdido</h1>";
    document.getElementById("mj").innerHTML=puntos;
    document.getElementById("nuevoturno").disabled="";
}

document.getElementById("cogercarta").addEventListener("click", function(){
    cogerCarta("jugador");
    if(sumacartasm<=5.5){
        setTimeout(() => {
            if(fin==false){
                cogerCarta("maquina");
                habilitarBotones();
            }
        }, 2000);
        deshabilitarBotones();
    }
});

document.getElementById("plantarse").addEventListener("click", function(){
    plantarse();
});

document.getElementById("nuevoturno").addEventListener("click", function(){
    nuevoTurno();
});