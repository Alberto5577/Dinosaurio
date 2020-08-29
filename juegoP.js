document.addEventListener('keydown', function(evento){
    if(evento.keyCode==32){/*Cuando el usuario presiona un espacio haga esto*/
      console.log("Salta");/*Que escriba por pantalla salta*/
      if(trex.saltando==false){
      saltar();
      }
    }
  });
  
  
  /*Vamos a cargar las imagenes*/
  var imgRex, imgNube, imgCactus, imgSuelo;
  function cargaImagenes(){
    imgRex= new Image();/*Vamos a decirle que laimagen del rex sea igual a una nueva imagen*/
    imgNube= new Image();
    imgCactus= new Image();
    imgSuelo= new Image();
  
    imgRex.src="img/rex.png";/*Indicamos la ruta del objeto*/
    imgNube.src="img/nube.png";
    imgCactus.src="img/cactus.png";
    imgSuelo.src="img/suelo.png";
  }
  var ancho = 700;
  var alto= 300;
  var canvas,ctx;
  /*Vamoa a inicializar*/
  function inicializa(){
    canvas=document.getElementById('canvas');/*Esta variable canvas vamos a decirle que sea igual al elemento del html llamado canvas*/
    ctx= canvas.getContext('2d');/*El contextto te dice como funciona la pizarra en 2d*/
    cargaImagenes();
  }
  
  /*Vamos a borrar la pizarra*/
  function borrarCanvas(){/*Para borrar el canvas lo más sencillo es borrarle pa altura y anchura*/
    canvas.width= ancho;
    canvas.height= alto;
  }
  
  var trex = {y: 250, vy:0,gravedad:2, salto:28, vymax:9, saltando: false};/*Pos 1 en donde se encuentra el trex, Pos 2, velocidad vertical cuanto sube los pixeles, 
  una gravedad de 2 y un salto de 20 pixeles y cada vez que pase un fotograma le restamos 2*/
  /*Vamos hacer la función que dibuja la imagen del rex*/
  function dibujaRex(){
    ctx.drawImage(imgRex,0,0,64,69,100,trex.y,50,50);/*Para dibujar la imagen tenemos que cargar el contexto y tenemos que utilizar el atributo ctx.drawImage();*/
  }
  
  
  /*Vamos hacer la funcion saltar*/
  function saltar(){
    trex.saltando=true;/*Tenemos que activarlo*/
    trex.vy=trex.salto;/*La velocidad vertical es igual a 28px*/
  }
  /*Vamos a hacer una funcion del comportamiento de la gravedad*/
  function gravedad(){/*Consiste en el movimiento de saltar */
    if(trex.saltando==true){/*Comprobar si el dinosaurio está saltando, se refiere que está en el aire, sino está en el aire no hay que 
      aplicarle la gravedad*/
      /*Entre más valla restanto el dibujo trex va ir subiendo para arriba*/
      if(trex.y-trex.vy-trex.gravedad>250){/*Si trex es mayor a 250 haga esto*/
          trex.saltando=false;/*Así deja de saltar*/
          trex.vy=0;/*Porque ha llegado al suelo y se ha parado*/
          trex.y=250;/*Para que queda exactamente en el suelo*/
      }else{
        trex.vy-=trex.gravedad;/*Esto es para que autodecrementado en 2 en 2, esto sube para arriba*/
        trex.y-=trex.vy;/*Le restamos la velocidad*/
      }
    }
  }
  
  //-----------------------------------------------------------------
  /*Bucle Principal*/
  var FPS=50;
  setInterval(function(){/*Nos dice cada cuanto tiempo tiene que ejecutarse una funcion concreta*/
    principal();
  },1000/FPS);
  
  function principal(){/*Aquí vamos a llamar todo este el bucle principal*/
    borrarCanvas();
    gravedad(); 
    dibujaRex();
  }