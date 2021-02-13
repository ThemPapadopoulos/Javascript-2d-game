(function () {
  //!initialize game
  var objImage = document.querySelector(".block");
  window.onload = init; //on page load
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  var looking = "right";
  var randomX;
  var randomY;
  var moveCount = 0;
  var enemy = document.querySelector(".enemy");
  var movesLeft = document.querySelector("#headerSpan");
  movesLeft.innerHTML = 6;
  var playerHealth = document.querySelector('#playerHealth');
  playerHealth.innerHTML= 100;
  var playerHit = document.querySelector('#playerHit');
  playerHit.innerHTML="";

  
 
  //! char text auto-reset every 1,5 sec
  setInterval(function initChar() {
    playerHit.innerText = '';
    EnemyHit.innerText = '';
    playerHealth.innerText = '';
    EnemyHealth.innerText = '';
  }, 1500);

  //! key detection (if in boundaries true)

  document.addEventListener("keydown", getKeyAndMove);
  function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;

    turnBtn.classList.remove("animate__animated");
    turnBtn.classList.remove("animate__fadeIn");
    if (key_code == 81) {
      endTurn();
      movesLeft.innerHTML = 6;
    } else if (moveCount < 6) {
      switch (key_code) {
        case 37: //left arrow key
          if (objImage.style.left !== "0px") {
            moveLeft();
          }
          moveCount += 1;
          movesLeft.innerHTML -= 1;
          break;
        case 38: //Up arrow key
          if (objImage.style.top !== "0px") {
            moveUp();
          }
          moveCount += 1;
          movesLeft.innerHTML -= 1;
          break;
        case 39: //right arrow key
          if (objImage.style.left !== "600px") {
            moveRight();
          }
          moveCount += 1;
          movesLeft.innerHTML -= 1;
          break;
        case 40: //down arrow key
          if (objImage.style.top !== "600px") {
            moveDown();
          }
          moveCount += 1;
          movesLeft.innerHTML -= 1;
          break;
        case 32: //space-attack if enemy in range only
          if (inRange() == true) {
            attack();
            moveCount = 6;
            movesLeft.innerHTML = 0;
          } else {
            console.log("cant attack!");
          }
          break;

          function inRange() {
            if (
              objImage.style.left === enemy.style.left &&
              objImage.style.top === enemy.style.top
            ) {
              return true;
            }
          }
      }
    } else {
      playerHit.innerHTML = "cant move";
      setInterval(function () {
        turnBtn.classList.add("animate__animated", "animate__fadeIn");
      }, 500);
      turnBtn.style.backgroundColor = "gold";
      turnBtn.style.color = "white";
    }

    console.log("player moved " + moveCount + " tiles");
  }

  //! initial ENEMY state

  function enemyPosition() {
    randomX = Math.floor(Math.random() * 5);
    randomY = Math.floor(Math.random() * 5);
    enemy.style.cssText =
      "left: " +
      randomX * 100 +
      "px; top: " +
      randomY * 100 +
      "px; position: relative";
    enemyHealth.innerHTML = 100;
    
  }

  function init() {
    objImage = document.querySelector(".block");
    objImage.style.position = "relative";
    objImage.style.left = "0px";
    objImage.style.top = "0px";
    objImage.classList.remove("animate__animated", "animate__fast");

    enemyPosition(); //game start random enemy position
  }
  //! MOVE FUNCTIONS

  function moveLeft() {
    objImage.style.left = parseInt(objImage.style.left) - 100 + "px";
    looking = "left";
  }
  function moveUp() {
    objImage.style.top = parseInt(objImage.style.top) - 100 + "px";
    looking = "up";
  }
  function moveRight() {
    objImage.style.left = parseInt(objImage.style.left) + 100 + "px";
    looking = "right";
  }
  function moveDown() {
    objImage.style.top = parseInt(objImage.style.top) + 100 + "px";
    looking = "down";
  }

  //! ACTION FUNCTIONS
  function attack() {
    attackDirection();
    hitChance();
    objImage.classList.add(
      "animate__animated",
      "animate__bounce",
      "animate__fast"
    );
  }

  function attackDirection() {
    if (looking == "right") {
      objImage.style.borderRight += 8 + "px solid white";
      setTimeout(resetClass, 500);
    } else if (looking == "left") {
      objImage.style.borderLeft += 8 + "px solid white";
      setTimeout(resetClass, 500);
    } else if (looking == "up") {
      objImage.style.borderTop += 8 + "px solid white";
      setTimeout(resetClass, 500);
    } else {
      objImage.style.borderBottom += 8 + "px solid white";
      setTimeout(resetClass, 500);
    }
  }

  //! ATTACK HIT PROPABILITY

  function hitChance() {
    var random = Math.floor(Math.random() * 5 + 1);

    if (random === 5) {
      playerHit.innerHTML = "miss!";
    } else {
      playerHit.innerHTML = "Hit!";
      if (enemyHealth.innerHTML <= 20) {
        enemyDeath();
      } else {
        enemyHealth.innerHTML -= 20;
        enemy.style.color = "red";
      }
    }
  }
  function hitChanceEnemy() {
    var playerHealth = document.querySelector('#playerHealth');
    var random = Math.floor(Math.random() * 6 + 1);
    console.log(random);
     if (random == 4 || random==1) {
      enemyHit.innerHTML = "miss!";
    } else {
      enemyHit.innerHTML = "Hit!";
      if (playerHealth.innerHTML <= 20) {
        playerDeath();
      } else {
        playerHealth.innerHTML -= 20;
        objImage.style.color = "red";
      }
    }
  }
  

  function resetClass() {
    objImage.classList.remove("animate__bounce"),
      objImage.classList.remove("animate__animated"),
      objImage.classList.remove("animate__fast"),
      (objImage.style.borderBottom = ""),
      (objImage.style.borderTop = ""),
      (objImage.style.borderRight = ""),
      (objImage.style.borderLeft = "");
  }

  //! enemy or player deaths

  function enemyDeath() {
    enemy.classList.add("animate__animated", "animate__fadeOutDown");
    setTimeout(function () {
      document.querySelector("body").innerHTML =
        '<h1 class="animate__animated animate__backInDown">YOU WIN!</h1><br><br><div id="winScreen"></div>';
    }, 100); //?win screen
  }
  function playerDeath() {
    objImage.classList.add("animate__animated", "animate__fadeOutDown");
    setTimeout(function () {
      document.querySelector("body").innerHTML =
        '<h1 class="animate__animated animate__backInDown">YOU LOSE!</h1><br><br><div id="deathScreen"></div>';

    }, 100); //?win screen
  }

  //! END TURN BUTTON
  const turnBtn = document.querySelector("#turnbtn");

  function endTurn() {
    var posX = enemy.style.left;
    console.log(posX);
    var posY = enemy.style.top;
    console.log(posY);
    moveCount = 0;

    turnBtn.style.backgroundColor = "white";
    turnBtn.style.color = "black";
    turnBtn.classList.remove("animate__animated");
    turnBtn.classList.remove("animate__fadeIn");

    if (posX == "0px") {
      enemy.style.left = parseInt(enemy.style.left) + 100 + "px";
      console.log("enemy moved randomly was on the X wall");
    } else if (posY == "0px") {
      enemy.style.top = parseInt(enemy.style.top) + 100 + "px";
      console.log("enemy moved randomly was on the Y wall");
    } else {
      //! no collition with player

      if (objImage.style.left !== enemy.style.left &&
        objImage.style.top !== enemy.style.top) {
      randomEnemyMovement();
        } else {
          enemyAttack();
        }

    }
    function enemyAttack(){
      if (objImage.style.left == enemy.style.left && objImage.style.top == enemy.style.top){
      hitChanceEnemy();
    enemy.classList.add(
      "animate__animated",
      "animate__bounce",
      "animate__fast"
    );  
      }
    }
    
    
    
    //? enemy turn!

    function randomEnemyMovement() {
      var randomDirection = Math.floor(Math.random() * 4) + 1;
      console.log("enemy moved randomly by one");

      
        switch (randomDirection) {
          case 1:
            if (posX !== "0px") {
              enemy.style.left = parseInt(enemy.style.left) - 100 + "px";
            }
            break;

          case 2:
            if (posY !== "0px") {
              enemy.style.top = parseInt(enemy.style.top) - 100 + "px";
            }
            break;

          case 3:
            if (posX !== "500px") {
              enemy.style.left = parseInt(enemy.style.left) + 100 + "px";
            }
            break;

          case 4:
            if (posY !== "500px") {
              enemy.style.top = parseInt(enemy.style.top) + 100 + "px";
            }
            break;
        }
      
    }
  }

})();
