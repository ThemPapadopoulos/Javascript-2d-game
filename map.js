(function () {
  //! THIS IS THE INTRO/STORY SCREEN
  var intro = document.querySelector("#intro");
  intro.addEventListener("click", function () {
    var intro = document.querySelector("#intro");
    intro.style.display = "none";
    map.style.visibility = "initial";
  });

  //! THIS IS THE TUTORIAL WINDOW
  var tutorial = document.querySelector("#tutorial");
  tutorial.addEventListener("click", function () {
    tutorial.style.display = "none";
  });

  var player = document.querySelector("#player");
  var town1 = document.querySelector("#town");
  var map = document.querySelector("#map");

  //? player position
  var playerX = window.scrollX + player.getBoundingClientRect().left; //X
  var playerY = window.scrollY + player.getBoundingClientRect().top; //Y

  var clicked = false; //if clicked dont run the next function.
  player.addEventListener("click", function () {
    //menu appear

    if (clicked == false) {
      var playermenu = document.createElement("nav");
      player.append(playermenu);

      clicked = true;
    } else {
      player.style.cssText += " top:540px; left:465px";
      console.log("already clicked");
      document.querySelector("nav").innerHTML = "";
    }
  });

  var goLeft = document.querySelector("#goLeft");
  var goRight = document.querySelector("#goRight");

  //! FIRST CHOISE LEFT/ MOVE TO THE NEXT VILLAGE/SKIP THE FIGHT
  goLeft.addEventListener("click", function goLeftF() {
    player.style.cssText += " top:540px; left:465px";
    var narration = document.createElement("div");
    narration.setAttribute("id", "narration");
    map.append(narration);
    narration.innerHTML =
      '"You reached the first town, choosing not to fight the goblin. your choise costs the lives of the nearby villagers."';
    town1.innerHTML = "";
    narration.addEventListener("click", function () {
      narration.style.display = "none";
    });
  });

  //! FIRST CHOISE RIGHT/ FIGHT THE BEAST
  goRight.addEventListener("click", function goRightF() {
    player.style.cssText += " top:540px; left:565px";
    town1.innerHTML = "";

    setTimeout(function goToFight() {
      tutorial.style.display = "none";
      warnings = document.querySelector("#warnings");
      warnings.style.cssText +=
        "position: absolute; padding:10px; width:280px; height:150px; font-size:50px; background-color:red; top: 280px; left:280px; color:white; text-alignment:center;";
      warnings.innerHTML = "BRACE YOURSELF!";
    }, 500);

    setTimeout(function goToFight() {
      map.style.display = "none";
      var mainBattle = document.querySelector("#main");

      mainBattle.style.display = "initial";
    }, 3000);
  });
})();
