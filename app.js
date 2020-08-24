/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var globalScore, roundScore, activePerson;

globalScore = [0, 0];
roundScore = 0;
activePerson = 0;

// $(".dice").style.display = "none"; //didnt work
document.querySelector(".dice").style.display = "none"; // so used DOM
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function() { //stil jquery cant be used
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

});

document.querySelector(".btn-hold").addEventListener("click", function() {
  globalScore[activePerson] += roundScore; //OR we could PUSH into array, too you know;
  document.querySelector("#score-" + activePerson).textContent = globalScore[activePerson];
  if (globalScore[activePerson] >= 10) {
    document.querySelector("#name-" + activePerson).textContent = "WINNER!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-" + activePerson + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePerson + "-panel").classList.remove("active");
  } else {
    nextPlayer();
  }
});


function nextPlayer() {
  activePerson === 0 ? activePerson = 1 : activePerson = 0;
  roundScore = 0; //resetting score to zero
  document.getElementById("current-0").textContent = "0"; //updating current score too to zero
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
