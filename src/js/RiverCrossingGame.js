var myGamePiece;
var myObstacles=[];
function startGame() {
    
    //myGamePiece=new component(30,30,"wagonOnRiver.gif",10,120,"image");
    
    myGameArea.start();
    myGamePiece=new component(80,30,"../img/wagonOnRiver.gif",20,70,"image");
    //myObstacle  = new component(20, 10, "../img/rock.gif", 200, 100,"image");   
    myGamePiece.update();
    //myGamePiece = new component(30, 30, "red", 10, 120);
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        //this.canvas.width = 480;
        //this.canvas.height = 270;
        context = canvas.getContext("2d");
        document.body.insertBefore(canvas, document.body.childNodes[0]);
    	  this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        },
    clear : function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = canvas.getContext("2d");

    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
  this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}
function updateGameArea() {

    //myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    var x, y,minHeight, maxHeight;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)||everyinterval(100)) {
        x = canvas.width;
        minHeight = 30;
        maxHeight = 160;
        //y = canvas.height - 100
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        myObstacles.push(new component(20, 10, "../img/rock.gif", x, height,"image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    myGamePiece.newPos();
    myGamePiece.update();

}