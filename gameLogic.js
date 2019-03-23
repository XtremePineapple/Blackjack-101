let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isAce_P = false;
let isAce_D = false;
let anteVal = 10;
let bankAmnt = 100;
let gameOver = false;

let hitButton = document.getElementById("hit");
let dealButton = document.getElementById("deal");
let stayButton = document.getElementById("stay");
let quitButton = document.getElementById("quit");
let bank = document.getElementById("bank");
let ante = document.getElementById("ante");

let pCard1 = document.getElementById("pCard1");
let pCard2 = document.getElementById("pCard2");
let dCard1 = document.getElementById("dCard1");
let dCard2 = document.getElementById("dCard2");

let overlay = document.getElementById("overlay");
let ovrText = document.getElementById("text");

let deckID = "";

let deckUpdate = {}; //Sample Return
//     "remaining": 51,
//     "success": true,
//     "deck_id": "96n9zskcwxhg",
//     "cards": [
//         {
//             "value": "10",
//             "images": {
//                 "svg": "https://deckofcardsapi.com/static/img/0C.svg",
//                 "png": "https://deckofcardsapi.com/static/img/0C.png"
//             },
//             "suit": "CLUBS",
//             "image": "https://deckofcardsapi.com/static/img/0C.png",
//             "code": "0C"
//         }
//     ]
// }

function reShuffle(){
    //let deckUpdate = fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    deckID = deckUpdate.deck_id;
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    isAce_P = false;
    isAce_D = false;
}

function playerDrawAndScore(card){
    //let deckUpdate = fetch("https://deckofcardsapi.com/api/deck/"+deckID+"/draw/?count=1");
    if (card !== undefined){ //if given a perameter, updates the image   
        card.src = deckUpdate.cards[0].image //updates card picture
    }
    deckID = deckUpdate.deck_id;
    let value = deckUpdate.cards[0].value;
    if (value === "ACE"){
        if (playerScore < 11){ //Won't add 11 if it would bust
            isAce_P = true;
            playerScore += 11;
            return playerScore;
        } else {
            playerScore += 1;
            return playerScore;
        }
    } else if (value === "KING" || value === "QUEEN" || value === "JACK"){
        playerScore += 10;
        return playerScore;
    } else {
        playerScore += Number(value);
        return playerScore;
    }
}
function checkBust_P(){
    if (playerScore > 21 && isAce_P === true){ // false if their score is over 21 but they have an Ace as an 11
        playerScore = playerScore - 10;
        isAce_P = false;
    }
    else if (playerScore > 21){ // true if their score is over 21
        BUST();
    }
}
function checkBlackJack_P(){//black jack event.  Comes immediately after initial deal
    if (playerScore === 21){
        bank += ante*3
        win = true;
        BLACKJACK();
    }
}

function dealerDrawAndScore(card = ''){
    //let deckUpdate = fetch("https://deckofcardsapi.com/api/deck/"+deckID+"/draw/?count=1");
    if (card !== ''){
        card.src = deckUpdate.cards[0].image;
    }
    deckID = deckUpdate.deck_id;
    let value = deckUpdate.cards[0].value;
    if (value === "ACE"){
        if (dealerScore < 11){ //Won't add 11 if it would bust
        isAce_D = true;
        dealerScore += 11;
        return dealerScore;
    } else {
        dealerScore += 1;
        return dealerScore;
        }
    } else if (value === "KING" || value === "QUEEN" || value === "JACK"){
        dealerScore += 10;
        return dealerScore;
    } else {
        dealerScore += Number(value);
        return dealerScore;
    }
}
function checkBust_D(){
    if (dealerScore > 21 && isAce_D === true){ // false if their score is over 21 but they have an Ace as an 11
        dealerScore = dealerScore - 10;
        isAce_D = false;
    }
    else if (dealerScore > 21){ // true if their score is over 21
        WIN();
    }
}
function checkBlackJack_D(){//comes immediately after deal and checkBlackJack_P()
    if(dealerScore === 21 && gameOver === false){
        BLACKJACKDealer();
    }
}


function dealerLogic(){
    while (dealerScore < 17){
        dealerDrawAndScore();
    }
    return dealerScore;
}

function winOrLose(){//determines winner or loser after dealer finishes getting cards
    if (playerScore > dealerScore){
       bank += 2*ante 
       return "WIN"
    }
    else if (playerscore === dealerScore){  //push event
        bank += ante
    } 
}

function BLACKJACK(){
    ovrText.innerHTML = "BLACKJACK! You Win!"
    overlay.style.display = "block" 
}
function BLACKJACKDealer(){
    ovrText.innerHTML = "The house got Blackjack! Better luck next time..."
    overlay.style.display = "block"
}

function anteFromBank(){
    bank -= ante
}


function WIN(){
    //TODO
}

function off(){
    document.getElementById("overlay").style.display = "none";
}

dealButton.addEventListener("click", () => {
    reShuffle();
    anteFromBank();
    playerDrawAndScore(pCard1);
    setTimeout(dealerDrawAndScore(dCard1), 1000);
    setTimeout(playerDrawAndScore(pCard2), 1000);
    setTimeout(dealerDrawAndScore(dCard2), 1000);
    setTimeout(checkBlackJack_P(), 1000);
    checkBlackJack_D();
});
hitButton.addEventListener("click", playerDrawAndScore());
stayButton.addEventListener("click", () => {
    dealerLogic();
    checkBust_D();
    winOrLose();
}); 
quitButton.addEventListener("click", reShuffle());