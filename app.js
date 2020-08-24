/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var globalScore, roundScore, activePerson,gameState;

gameInitialisation();

document.querySelector(".btn-roll").addEventListener("click", function() { //stil jquery cant be used
  if(gameState){
    var dice = Math.floor((Math.random() * 6) + 1); //generates random score for dice whose scope is within this function
    document.querySelector(".dice").style.display = "block";

    document.querySelector(".dice").setAttribute("src", "dice-" + dice + ".png");
    //OR - document.querySelector(".dice").src("dice-"+dice+".png");
    if (dice !== 1) {
      roundScore += dice; //same as roundScore=roundScore+dice;
      $("#current-" + activePerson).text(roundScore); //adds score generated randomly
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if(gameState){
    globalScore[activePerson] += roundScore; //OR we could PUSH into array, too you know;
    document.querySelector("#score-" + activePerson).textContent = globalScore[activePerson];
    if (globalScore[activePerson] >= 100) {
      document.querySelector("#name-" + activePerson).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".player-" + activePerson + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePerson + "-panel").classList.remove("active");
      gameState=false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", gameInitialisation);

function gameInitialisation(){
  globalScore = [0, 0];
  roundScore = 0;
  activePerson = 0;
  gameState=true;
  // $(".dice").style.display = "none"; //didnt work
  document.querySelector(".dice").style.display = "none"; // so used DOM
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //resetting values
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");//we removed it to make sure that we don't have two classes being added, then added it back just in case if player 1 was having class "active"
}

function nextPlayer() {
  activePerson === 0 ? activePerson = 1 : activePerson = 0;
  roundScore = 0; //resetting score to zero
  document.getElementById("current-0").textContent = "0"; //updating current score too, to zero
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
