(function () {
  document.addEventListener("keydown", getKeyAndMove);
  objImage = document.querySelector(".block");
  var looking = "right";
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  var randomX;
  var randomY;
  var enemy = document.querySelector(".enemy");
  var enemyCurrentLeft = enemy.style.left;

  window.onload = init;

  function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
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
        break;
    }
  }

  //! initial state

  function enemyPosition() {
    randomX = Math.floor(Math.random() * 6);
    randomY = Math.floor(Math.random() * 6);
    enemy.style.cssText =
      "left: " +
      randomX * 100 +
      "px; top: " +
      randomY * 100 +
      "px; position: relative;";
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

  function resetClass() {
    objImage.classList.remove("animate__bounce"),
      objImage.classList.remove("animate__animated"),
      objImage.classList.remove("animate__fast"),
      (objImage.style.borderBottom = ""),
      (objImage.style.borderTop = ""),
      (objImage.style.borderRight = ""),
      (objImage.style.borderLeft = "");
  }

  //setTimeout(objImage.className='block',3000);
})();
