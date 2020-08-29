document.addEventListener('keydown', function(evento){
if(evento.keyCode == 32){
    console.log("salta");

    if(nivel.muerto == false){
        if(trex.saltando == false){
            saltar(); 
        }
    }
    else{
        nivel.velocidad = 9;
        nivel.muerto = false;
        nube.velocidad = 1;
        cactus.x = ancho + 100;
        nube.x = ancho + 100;
    }
    
}
})


var imgRex, imgNube, imgCactus, imgSuelo;
function cargaImagenes(){
    imgRex = new Image;
    imgCactus = new Image;
    imgNube = new Image;
    imgSuelo = new Image;

    imgRex.src = 'img/rex.png';
    imgCactus.src = 'img/cactus.png';
    imgNube.src = 'img/cloud.png';
    imgSuelo.src = 'img/suelo.png';
}


var ancho = 700;
var alto = 300;
var canvas, ctx;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}

function borraCanvas(){
    canvas.width = 700;
    canvas.height = 300;
}

var suelo = 200;
var trex = {y: suelo, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false};
var nivel = {velocidad: 9, puntuacion: 0, muerto: false};
var cactus = {x: ancho + 100 , y: suelo};
var nube = {x: 400, y: 100, velocidad: 1};
var suelog = {x: 0, y: suelo + 30};

function drawRex(){
    ctx.drawImage(imgRex,0,0,860,1039,100,trex.y,50,50);
}

function drawCactus(){
    ctx.drawImage(imgCactus,0,0,498,980,cactus.x,cactus.y,498,980);
}

function drawNube(){
    ctx.drawImage(imgNube,0,0,728,318,nube.x,nube.y,728,318);
}

function drawSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,604,19,suelog.x, suelog.y,604,19);
}

function logicaSuelo(){
    if(suelog.x > 640){
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}

function logicaCactus(){
    if(cactus.x < -100){
        cactus.x = ancho + 100;
    }
    else{
        cactus.x -= nivel.velocidad;
    }
}

function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho + 100;
    }
    else{
        nube.x -= 2;
    }
}


function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}


function gravedad(){
    if(trex.saltando == true){

        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else{
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        } 
    }
}

function colision(){
    //cactus.x
    //trex.y

    if(cactus.x >= 100 && cactus.x <= 150){
        if(trex.y >= suelo-25){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }

}



//-------------------------------------------
//BUCLE PRINCIPAL

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    drawSuelo();
    drawNube();
    drawCactus();
    drawRex();
}
