(function () {
  document.addEventListener("keydown", getKeyAndMove);
  objImage = document.querySelector(".block");
  var looking = "right";
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  var randomX;
  var randomY;
  var moveCount=0;
  var attackCount=0;
  var enemy = document.querySelector(".enemy");
  window.onload = init;
  setInterval(function initChar() {
    objImage.innerHTML = "";
  }, 1500);
  
  
  function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    moveCount+=1;
    turnBtn.classList.remove("animate__animated");
  turnBtn.classList.remove("animate__fadeIn");
  if(key_code==81){
    endTurn();
  }
   else if (moveCount<6){
    switch (key_code) {
      case 37: //left arrow key
        moveLeft();
        break;
      case 38: //Up arrow key
        moveUp();
        break;
      case 39: //right arrow key
        moveRight();
        break;
      case 40: //down arrow key
        moveDown();
        break;
      case 32: //space-attack
        attack();
        moveCount=6;
        break;
    } 
  }else {
      objImage.innerHTML = 'cant move';
      setInterval(function() {
        turnBtn.classList.add(
          "animate__animated",
          "animate__fadeIn"
        )}, 500);
      turnBtn.style.backgroundColor='gold';
        turnBtn.style.color='white';
    }
    
    console.log(moveCount);
  }

  //! initial ENEMY state

  function enemyPosition() {
    randomX = Math.floor(Math.random() * 6);
    randomY = Math.floor(Math.random() * 6);
    enemy.style.cssText =
      "left: " +
      randomX * 100 +
      "px; top: " +
      randomY * 100 +
      "px; position: relative;";
    enemy.innerHTML = 100;
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
      objImage.innerHTML = "miss!";
    } else {
      objImage.innerHTML = "Hit!";
      if (enemy.innerHTML <= 20) {
        death();
      } else {
        enemy.innerHTML -= 20;
        enemy.style.color = "red";
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

  //! enemy death
  function death() {
    enemy.classList.add("animate__animated", "animate__fadeOutDown");
  }


  //! END TURN BUTTON
  const turnBtn = document.querySelector('#turnbtn');
  
  //setTimeout(objImage.className='block',3000);

  function endTurn(){
    moveCount=0;
    turnBtn.style.backgroundColor='white';
    turnBtn.style.color='black';
    turnBtn.classList.remove("animate__animated");
    turnBtn.classList.remove("animate__fadeIn");
    }
})();