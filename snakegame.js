var canvas, ctx,text;
var score=0;
var maxScore=0;
var curKey=0;
var color,curcolor;
      window.onload = function() {
        scoreTrack=this.document.getElementById("score");
        maxTrack=this.document.getElementById("mScore");
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        document.addEventListener("keydown", keyDownEvent);
        // render X times per second
        var x = 8;
        setInterval(draw, 1000 / x);
      };
      // game world
      var gridSize = (tileSize = 20); // 20 x 20 = 400
      var nextX = (nextY = 0);
      // snake
      var defaultTailSize = 3;
      var tailSize = defaultTailSize;
      var snakeTrail = [];
      var snakeX = (snakeY = 10);
      // apple
      var appleX = (appleY = 15);
      // draw
      function draw() {
        // move snake in next pos
        scoreTrack.innerHTML=" "+score.toString();
        maxTrack.innerHTML=" "+maxScore.toString();
        snakeX += nextX;
        snakeY += nextY;
        // snake over game world?
        if (snakeX < 0) {
          snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
          snakeX = 0;
        }
        if (snakeY < 0) {
          snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
          snakeY = 0;
        }
        //set initial colors
        if(color==undefined){
            var red, blue, green;
            red=(Math.random()*257).toString();
            green=(Math.random()*257).toString();
            blue=(Math.random()*257).toString();
            color="rgba("+red+","+green+","+blue+",1.0)";
            curcolor="rgba(257, 257, 257, 1.000)";
        }
        //snake bite apple?
        if (snakeX == appleX && snakeY == appleY) {
          tailSize++;
          score=score+1;
          if(score>maxScore){
              maxScore=score;
          }
          curcolor=color;
          red=(Math.random()*257).toString();
          green=(Math.random()*257).toString();
          blue=(Math.random()*257).toString();
          color="rgba("+red+","+green+","+blue+",1.0)";
          appleX = Math.floor(Math.random() * gridSize);
          appleY = Math.floor(Math.random() * gridSize);
        }
        //paint background
        if(color=="rgba(28,29,36,1.0)" || curcolor=="rgba(28,29,36,1.0)"){
            ctx.fillStyle = "rgba(257,257,257,1.0)";
        }
        else{
            ctx.fillStyle = "rgba(28,29,36,1.0)";
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // paint snake
        ctx.fillStyle = curcolor;
        for (var i = 0; i < snakeTrail.length; i++) {
          ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
          );
          //snake bites it's tail?
          if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
            score=0;
            red=(Math.random()*257).toString();
            green=(Math.random()*257).toString();
            blue=(Math.random()*257).toString();
            color="rgba("+red+","+green+","+blue+",1.0)";
            curcolor="rgba(257, 257, 257, 1.000)";
            
          }
        }
        // paint apple
        ctx.fillStyle =color;
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
        //set snake trail
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
          snakeTrail.shift();
        }
      }
      // input
      function keyDownEvent(e) {
        if(!(Math.abs(e.keyCode-curKey)==2)){
            curKey=e.keyCode;
            switch (e.keyCode) {
            case 37:
                nextX = -1;
                nextY = 0;
                break;
            case 38:
                nextX = 0;
                nextY = -1;
                break;
            case 39:
                nextX = 1;
                nextY = 0;
                break;
            case 40:
                nextX = 0;
                nextY = 1;
                break;
        }
        }
      }