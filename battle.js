(function () {
  //!initialize game
  var objImage = document.querySelector(".block");
  window.onload = init; //on page load
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  var randomX;
  var randomY;
  var moveCount = 0;
  var enemy = document.querySelector(".enemy");
  var movesLeft = document.querySelector("#headerSpan");
  movesLeft.innerHTML = 6;
  var playerHealth = document.querySelector("#playerHealth");
  var enemyHealth = document.querySelector("#enemyHealth");
  playerHealth.innerHTML = 100;
  var playerHit = document.querySelector("#playerHit");
  var enemyHit = document.querySelector("#enemyHit");
  playerHit.innerHTML = "";

  //! variables for NO OBJECT OVERLAPPING
  //? player position
  var playerXpos = window.scrollX + objImage.getBoundingClientRect().left; //X
  var playerYpos = window.scrollY + objImage.getBoundingClientRect().top; //Y
  //? enemy position
  var enemyXpos = window.scrollX + enemy.getBoundingClientRect().left; //X
  var enemyYpos = window.scrollY + enemy.getBoundingClientRect().top; //Y

  //! char text auto-reset every 1,5 sec
  setInterval(function initChar() {
    playerHit.innerText = "";
    enemyHit.innerText = "";
  }, 1500);

  //! key detection (if in boundaries true)

  document.addEventListener("keydown", getKeyAndMove);
  function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;

    //? player position
    var playerXpos = window.scrollX + objImage.getBoundingClientRect().left; //X
    var playerYpos = window.scrollY + objImage.getBoundingClientRect().top; //Y
    //? enemy position
    var enemyXpos = window.scrollX + enemy.getBoundingClientRect().left; //X
    var enemyYpos = window.scrollY + enemy.getBoundingClientRect().top; //Y

    //!check if the enemy is on the next block
    function enemyOnLeft() {
      if (playerXpos == enemyXpos + 100 && playerYpos == enemyYpos) {
        return true;
      }
    }
    function enemyOnRight() {
      if (playerXpos == enemyXpos - 100 && playerYpos == enemyYpos) {
        return true;
      }
    }
    function enemyOnTop() {
      if (playerYpos - 100 == enemyYpos && playerXpos == enemyXpos) {
        return true;
      }
    }
    function enemyUnder() {
      if (playerYpos == enemyYpos - 100 && playerXpos == enemyXpos) {
        return true;
      }
    }

    turnBtn.classList.remove("animate__animated");
    turnBtn.classList.remove("animate__fadeIn");
    if (key_code == 81) {
      endTurn();
      movesLeft.innerHTML = 6;
    } else if (moveCount < 6) {
      switch (key_code) {
        case 37: //left arrow key
          if (objImage.style.left !== "0px" && enemyOnLeft() != true) {
            moveLeft();
            moveCount += 1;
            movesLeft.innerHTML -= 1;
          }
          break;
        case 38: //Up arrow key
          if (objImage.style.top !== "0px" && enemyOnTop() != true) {
            moveUp();
            moveCount += 1;
            movesLeft.innerHTML -= 1;
          }

          break;
        case 39: //right arrow key
          if (objImage.style.left !== "600px" && enemyOnRight() != true) {
            moveRight();
            moveCount += 1;
            movesLeft.innerHTML -= 1;
          }

          break;
        case 40: //down arrow key
          if (objImage.style.top !== "600px" && enemyUnder() != true) {
            moveDown();
            moveCount += 1;
            movesLeft.innerHTML -= 1;
          }

          break;
        case 32: //space-attack if enemy in range only
          if (inRange() == true) {
            attack();
            moveCount = 6;
            movesLeft.innerHTML = 0;
            objImage.style.borderRight += 8 + "px solid white";
            setTimeout(resetClass, 500);
          } else {
            console.log("cant attack! Must be in front of enemy");
          }
          break;

          function inRange() {
            //!if in front of each other (for attack purposes)
            if (playerXpos == enemyXpos - 100 && playerYpos == enemyYpos) {
              return true;
            }
          }
      }
    } else {
      //!no moves left
      playerHit.innerHTML = "cant move";
      setInterval(function () {
        turnBtn.classList.add("animate__animated", "animate__fadeIn");
      }, 500);
      turnBtn.style.backgroundColor = "gold";
      turnBtn.style.color = "white";
    }

    console.log("player moved " + moveCount + " tiles");
  }

  //! MOVE FUNCTIONS

  function moveLeft() {
    objImage.style.left = parseInt(objImage.style.left) - 100 + "px";
    //looking = "left";
  }
  function moveUp() {
    objImage.style.top = parseInt(objImage.style.top) - 100 + "px";
    //looking = "up";
  }
  function moveRight() {
    objImage.style.left = parseInt(objImage.style.left) + 100 + "px";
    //looking = "right";
  }
  function moveDown() {
    objImage.style.top = parseInt(objImage.style.top) + 100 + "px";
    //looking = "down";
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

  //! initial player state

  function init() {
    objImage = document.querySelector(".block");
    objImage.style.position = "relative";
    objImage.style.left = "0px";
    objImage.style.top = "0px";
    objImage.classList.remove("animate__animated", "animate__fast");

    enemyPosition(); //game start random enemy position
  }

  //! ACTION FUNCTIONS
  function attack() {
    hitChance();
    objImage.classList.add(
      "animate__animated",
      "animate__bounce",
      "animate__fast"
    );
  }

  //! PLAYER ATTACK HIT PROPABILITY

  function hitChance() {
    var random = Math.floor(Math.random() * 5 + 1);

    if (random === 5) {
      playerHit.innerText = "miss!";
    } else {
      playerHit.innerText = "Hit!";
      if (enemyHealth.innerText <= 20) {
        //! ENEMY DEATH CONDITION
        enemyDeath();
      } else {
        enemyHealth.innerText -= 20;
        enemy.style.color = "red";
      }
    }
  }

  //! PLAYER REMOVE /RESET CLASSES
  function resetClass() {
    objImage.classList.remove("animate__bounce"),
      objImage.classList.remove("animate__animated"),
      objImage.classList.remove("animate__fast"),
      (objImage.style.borderBottom = ""),
      (objImage.style.borderTop = ""),
      (objImage.style.borderRight = ""),
      (objImage.style.borderLeft = "");
  }

  //! functions of enemy or player deaths

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
    }, 100); //?LOSE screen
  }

  //! END TURN BUTTON on press ---> random enemy move or attack

  const turnBtn = document.querySelector("#turnbtn");

  function endTurn() {
    var posX = enemy.style.left;
    var posY = enemy.style.top;
    moveCount = 0;

    turnBtn.style.backgroundColor = "white";
    turnBtn.style.color = "black";
    turnBtn.classList.remove("animate__animated");
    turnBtn.classList.remove("animate__fadeIn");

    //? ENEMY ATTACK FUNCTION

    randomEnemyMovement();
    console.log("enemy movement by one");

    //! ENEMY ATTACK HIT PROPABILITY
    function hitChanceEnemy() {
      var random = Math.floor(Math.random() * 6 + 1);
      console.log(random);
      if (random == 4 || random == 1) {
        enemyHit.innerText = "miss!";
      } else {
        enemyHit.innerText = "Hit!";
        if (playerHealth.innerText <= 20) {
          //! PLAYER DEATH CONDITION
          playerDeath();
        } else {
          playerHealth.innerText -= 20;
          objImage.style.color = "red";
        }
      }
    }
    //? enemy turn! RANDOM MOVEMENT

    function randomEnemyMovement() {
      //? player position
      var playerXpos = window.scrollX + objImage.getBoundingClientRect().left; //X
      var playerYpos = window.scrollY + objImage.getBoundingClientRect().top; //Y
      //? enemy position
      var enemyXpos = window.scrollX + enemy.getBoundingClientRect().left; //X
      var enemyYpos = window.scrollY + enemy.getBoundingClientRect().top; //Y
      if (playerYpos == enemyYpos && enemyXpos == playerXpos + 100) {
        //in fRont of player triggers attack
        console.log("enemy attacks");
        hitChanceEnemy();
      } else if (enemyXpos !== playerXpos && enemyYpos !== playerYpos) {
        console.log("enemy moved randomly by one");
        var randomDirection = Math.floor(Math.random() * 5) + 1;
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
  }
})();
