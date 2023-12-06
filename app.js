let newGameButton = document.querySelector(".new-game-button")
let hitButton = document.querySelector(".hit-button")
let standButton = document.querySelector(".stand-button")
let dealerHand = document.querySelector(".dealer-hand")
let playerHand = document.querySelector(".player-hand")
let results = document.querySelector(".results")
let dealerSum = 0;
let playerSum = 0;
let dealerAceAmount = 0;
let playerAceAmount = 0;
let hidden;
let deck;
let canHit = true;


window.onload = function() {
    createDeckOfCards();
    shuffle();
    startGame();
}

function createDeckOfCards() {
let suits = ["C", "D", "H", "S"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8","9", "10", "J", "Q", "K"];
deck = [];

    for(let i = 0; i < suits.length; i++) {
        for(let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]);
        }
    }
}

function shuffle() {
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;

    } 
    
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceAmount += checkAce(hidden);
    let cardImg1 = document.createElement("img");
    let cardImg2 = document.createElement("img");
    let card1 = deck.pop();
    let card2 = deck.pop();
    cardImg1.src = "./cards/" + card1 + ".png";
    cardImg2.src = "./cards/" + card2 + ".png";
    playerSum += getValue(card1) + getValue(card2);
    playerHand.append(cardImg1);
    playerHand.append(cardImg2);

    let cardImg3 = document.createElement("img");
    let card3 = deck.pop();
    cardImg3.src = "./cards/" + card3 + ".png";
    dealerSum += getValue(card3);
    dealerAceAmount += checkAce(card3);
    dealerHand.append(cardImg3);
    document.getElementById("dealer-sum").innnerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    hitButton.addEventListener("click", hit)
    standButton.addEventListener("click", stand)
    newGameButton.addEventListener("click", newGame)
    
}
function stand() {
    while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceAmount += checkAce(card);
    dealerHand.append(cardImg); 
    }
    dealerSum = reduceAce(dealerSum, dealerAceAmount);
    playerSum = reduceAce(playerSum, playerAceAmount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";


    let message = "";
    if(playerSum > 21) {
        message = "YOU LOOSE"
    } else if (dealerSum >21) {
        message = "You Win"
    } else if (playerSum === dealerSum) {
        message = "Tie!"
    } else if (playerSum > dealerSum) {
        message = "You Win"
    } else if (playerSum < dealerSum) {
        message = "YOU LOSE!"
    }

    results.innerText = message;
    document.getElementById("dealer-sum").innnerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;


}
function hit() {
    if(!canHit) {
        return;
    } else {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceAmount += checkAce(card);
    playerHand.append(cardImg);

    if (reduceAce(playerSum, playerAceAmount) > 21){
        canHit = false;
    }
    }
    document.getElementById("dealer-sum").innnerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    
}
function reduceAce(playerSum, playerAceAmount) {
while (playerSum > 21 && playerAceAmount > 0) {
    playerSum -= 10;
    playerAceAmount -= 1;
}
return playerSum;
}
function getValue(card) {
let data = card.split("-");
let value = data[0];
if (isNaN(value)) {
    if (value === "A") {
        return 11;
       } 
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if(card[0]==="A") {
        return 1;
    } else {
        return 0;
    }
}

    function newGame() {
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    results.innerHTML = "";
    const hiddenCard = document.createElement("img")
    hiddenCard.src = "./cards/BACK.png"
    hiddenCard.setAttribute("id", "hidden")
    dealerHand.appendChild(hiddenCard)
    deck;
    dealerSum = 0;
    playerSum = 0;
    dealerAceAmount = 0;
    playerAceAmount = 0;
    canHit = true;
    createDeckOfCards();
    shuffle();
    startGame();
};
