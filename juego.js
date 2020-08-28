document.addEventListener('keydown', function(evento){
if(evento.keyCode == 32){
    console.log("salta");
    saltar();
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




function borraCanvas(){ //En el momento cambias altura/anchura del canvas se borra todo
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var trex = {y: suelo, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false};

function drawRex(){
    ctx.drawImage(imgRex,0,0,860,1039,100,trex.y,50,50);
}

function saltar(){
    trex.saltando = true;
trex.vy = trex.salto;
}


function gravedad(){
    if(trex.saltando == true){

        if(trex.y - trex.vy - trex.gravedad> suelo){
            trex.saltando == false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else{
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        } 
    }
}


//-------------------------------------------
//BUCLE PRINCIPAL

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal (){
    borraCanvas();
    gravedad();
    drawRex();
}
