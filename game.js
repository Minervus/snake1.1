var canvas = document.getElementById("the-game");
var context = canvas.getContext("2d");
var game, snake, food;


game = {
  
  score: 0,
  fps: 20,
  over: true,
  message: null,
  
  start: function() {
    game.over = false;
    game.message = null;
    game.score = 0;
    game.fps = 8; //game speed! Difficulty 
    snake.init();
    food.set();
    
    console.log((document.getElementById("highScores").innerHTML));

    
  },
  
  stop: function() { // Stop game and display message
    game.over = true;
    scoreBox.checkScore(); 
    game.message = 'Game Over!';
    
  },
  
  drawBox: function(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x - (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y + (size / 2));
    context.lineTo(x - (size / 2), y + (size / 2));
    context.closePath();
    context.fill();
  },
  
  /*drawScore: function() { //Draws the score
    context.fillStyle = '#999';
    context.font = (canvas.height) + 'px Impact, sans-serif';
    context.textAlign = 'center';
    context.fillText(game.score, canvas.width / 2, canvas.height * 0.9);
    document.getElementById("currentScore").innerHTML = game.score; 
  },*/
  

  drawMessage: function() {
    if (game.message !== null) {
      context.fillStyle = '#00F';
      context.strokeStyle = '#FFF';
      context.font = (canvas.height / 10) + 'px Impact';
      context.textAlign = 'center';
      context.fillText(game.message, canvas.width / 2, canvas.height / 2);
      context.strokeText(game.message, canvas.width / 2, canvas.height / 2);
    }
  },
  
  resetCanvas: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
 
};




snake = {
  
  size: canvas.width / 40,
  x: null,
  y: null,
  color: '#0F0',
  direction: 'left',
  sections: [],
  
  init: function() {
    snake.sections = [];
    snake.direction = 'left';
    snake.x = canvas.width / 2 + snake.size / 2;
    snake.y = canvas.height / 2 + snake.size / 2;
    for (var i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
      snake.sections.push(i + ',' + snake.y); 
    }
  },
  
  move: function() {
    switch (snake.direction) {
      case 'up':
        snake.y -= snake.size;
        break;
      case 'down':
        snake.y += snake.size;
        break;
      case 'left':
        snake.x -= snake.size;
        break;
      case 'right':
        snake.x += snake.size;
        break;
    }
    snake.checkCollision(); // Run collision check before snake growth
    snake.checkGrowth();
    snake.sections.push(snake.x + ',' + snake.y);
  },
  
  draw: function() { //Draw snake section
    for (var i = 0; i < snake.sections.length; i++) {
      snake.drawSection(snake.sections[i].split(','));
    }    
  },
  
  
  drawSection: function(section) { //Add section to snake
    game.drawBox(parseInt(section[0]), parseInt(section[1]), snake.size, snake.color);
  },
  
  checkCollision: function() { // Stops game if 'isCollision' returns true
    if (snake.isCollision(snake.x, snake.y) === true) {
      game.stop();
    }
  },
  
  isCollision: function(x, y) { // Defines decisions as if snake section hits canvas sides
    if (x < snake.size / 2 ||
        x > canvas.width ||
        y < snake.size / 2 ||
        y > canvas.height ||
        snake.sections.indexOf(x + ',' + y) >= 0) {
      //toHighScoreList(); 
      return true;
    }
  },
  
//Add to Score and Increase Speed every 2 points (food)
  checkGrowth: function() {
    if (snake.x == food.x && snake.y == food.y) {
      game.score++; //score increment
      if (game.score % 2 == 0 && game.fps < 60) {
        game.fps++ ;// For every 2 additions to score, add 1 speed
        console.log("game speed UP" + " " + game.fps);
         
      }
      food.set();
    } else {
      snake.sections.shift();
    }
  }

  
  
};

//document.getElementById("newGame").addEventListener("click", game.start); 

/*
var score = game.score; 
var gameResult = {}; 
var highScoreList = []; 

function toHighScoreList() {
  gameResult = {player: playerName, score: game.score}; 
  highScoreList.push(gameResult); 
  document.getElementById("highScores").innerHTML = JSON.stringify(highScoreList[0]); 
  

  //for (var gameResult in highScoreList)
  //highScoreList.sort(function(a, b) {return a.score - b.score})

  //if(highScoreList.length >= 4) {
    //highScoreList.pop(); 
  //}

  for(var i=0; i<highScoreList.length; i++){
    document.getElementById("highScores").innerHTML=(highScoreList[i].playerName) + " - score: " + (highScoreList[i].score);
  }
}
*/

scoreBox = {
  score: game.score,
  highScore: parseInt(document.getElementById("highScores").innerHTML), 

  checkScore: function(){
    if(game.score > this.highScore) {
      this.highScore = game.score; 
      console.log("this is the new score: " + this.highScore); 
      document.getElementById("highScores").innerHTML = this.highScore; 
    }
  }

}; 




console.log("Game Speed is:" + game.fps); 

gameState = {
  
  setEasy: function(){
  game.fps = 5; 
  console.log("Game Speed is:" + game.fps); 
  document.getElementById("diffSetting").innerHTML = "Easy Mode"; 
  document.body.style.backgroundImage = "url('images/green.png')";
  document.getElementById("title").innerHTML = "Snake"; 
  document.getElementById("title").style.color = '#000000';
  document.getElementById("title").style.fontSize = '36px'; 

},

  setNormal: function(){
  game.fps = 20; 
  console.log("Game Speed is:" + game.fps);
  document.getElementById("diffSetting").innerHTML = "Normal"; 
  document.body.style.backgroundImage = "url('images/green.png')";
  document.getElementById("title").innerHTML = "Snake";   
  document.getElementById("title").style.color = '#000000'; 
  document.getElementById("title").style.fontSize = '36px'; 
},

  setHard: function(){
  game.fps = 25; 
  console.log("Game Speed is:" + game.fps); 
  document.getElementById("diffSetting").innerHTML = "Hard"; 
  document.body.style.backgroundImage = "url('images/green.png')"; 
  document.getElementById("title").innerHTML = "Snake"; 
  document.getElementById("title").style.color = '#000000';
  document.getElementById("title").style.fontSize = '36px'; 
},

  setInsane: function(){
  game.fps = 35; 
  console.log("Game Speed is:" + game.fps); 
  document.getElementById("diffSetting").innerHTML = "INSANE!";
  document.body.style.backgroundImage = "url('images/fire1bg.png')"; 
  document.getElementById("title").innerHTML = "INSANE MODE!!!"; 
  document.getElementById("title").style.color = '#FF0000'; 
  document.getElementById("title").style.fontSize = '60px'; 
  document.getElementById("title").style.fontWeight = 'bold'; 
}

};





var easy = document.getElementById("easy"); 
var normal = document.getElementById("normal"); 
var hard = document.getElementById("hard"); 
var insane = document.getElementById("insane"); 

easy.addEventListener("click", gameState.setEasy); 
normal.addEventListener("click", gameState.setNormal); 
hard.addEventListener("click", gameState.setHard); 
insane.addEventListener("click", gameState.setInsane); 









food = {
  size: null, 
  x: null,
  y: null,
  color: '#0FF',
  
  set: function() { // Sets the location for the next food item (set method/property of object)
    food.size = snake.size;
    food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
    food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;

  },
  
  draw: function() { // Draws food in the location made by set: function() above. 
    game.drawBox(food.x, food.y, food.size, food.color);
    document.getElementById("currentScore").innerHTML = game.score;
  }
  
};

var inverseDirection = {
  'up': 'down',
  'left': 'right',
  'right': 'left',
  'down': 'up'
};

var keys = {
  up: [38, 75, 87],
  down: [40, 74, 83],
  left: [37, 65, 72],
  right: [39, 68, 76],
  start_game: [13, 32]
};

function getKey(value){
  for (var key in keys){
    if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0){
      return key;
    }
  }
  return null;
}

addEventListener("keydown", function (e) {
    var lastKey = getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].indexOf(lastKey) >= 0
        && lastKey != inverseDirection[snake.direction]) {
      snake.direction = lastKey;
    } else if (['start_game'].indexOf(lastKey) >= 0 && game.over) {
      game.start();
    }
}, false);



var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;

function loop() {
  if (game.over == false) {
    game.resetCanvas();
    snake.move();
    food.draw();
    snake.draw();
    game.drawMessage();
  }
  setTimeout(function() {
    requestAnimationFrame(loop);
  }, 1000 / game.fps);
}

requestAnimationFrame(loop);
