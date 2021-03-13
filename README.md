# Javascript-2d-game

a simple JS made game(work in progress)

type: turn-based tactics.

MADE WITH HTML - CSS AND VANILLA JAVASCRIPT
USES THE ANIMATE.CSS LIBRARY https://animate.style/
AND ICONS BY https://game-icons.net/

MOVEMENT : ARROW KEYS
ATTACK: SPACE
END TURN: Q
PRESS REFRESH TO RESTART GAME

LIVE DEMO: https://thempapadopoulos.github.io/Javascript-2d-game/


*************************************************************************

3rd Huge Update! 15/02/2021

1. Added an intro screen with a basic story
2. Added a clickable map with 2 locations! (for now)...
3. Tutorial message added!
4. Some battle tweaking/optimization on mechanics (better boundaries.no player overlapping the enemy anymore, enemy attacks automatically when the player is in front of player)
5. Added the element of choise. A small menu under the player icon. Player can go left or right on map. 
6. Choosing left will pop a message showing the consequences of your choice.
7. You can click to dismiss messages.
8. Battle and Map split into different js snd css files.

The map controls are done with left mouse clicks.

the battle map controls are done with the keyboard.




*************************************************************************

2nd update 13/02/2021:

Enemy random movement added!

List of changes:

1. Enemy moves by one block on each end turn.
2. Enemy attacks once if its in front of player on end turn.
3. Added enemy attack probability set to 66,6%.
4. Added miss! and Hit! text on Enemy.
5. added Player Health set to 100.
6. enemy attack set to 20 damage.
7. if the player is hit -20 and red text.
8. if player health reach 0 - player dies with a cool animation!
9. Game over screen added with animation and image.
10. Different screen for win or loose!
11. Player can only attack only when standing in front of the enemy.
12. Added (working) 'moves left' counter!
13. Set some Boundaries for movement and attack, the player cant move outside the field, nor the enemy!

*************************************************************************

1st update 12/02/2021:

turn based movement added!

List of changes:

1 the player can move with the arrows 5 times and then has to end turn.
2 Attacking instantly finishes the turn.
3 added attack probability set to 80%
4 added Miss! and Hit! text
5 attack set to 20 damage
6 enemy health initially appearing on white text with health set to 100
7 if the enemy is hit -20 and red text
8 if enemy health reach 0 - enemy dies with a cool animation!

