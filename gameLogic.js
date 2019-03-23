let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isAce_P = false;
let isAce_D = false;
let ante = 0;
let bank = 100;

let hitButton = document.getElementById("hit");
let dealButton = document.getElementById("deal");
let stayButton = document.getElementById("stay");
let quitButton = document.getElementById("quit");


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
    card.src = deckUpdate.cards[0].image //updates card picture
    if (card !== ''){ //if given a perameter, updates the image   
        deckID = deckUpdate.deck_id;
    }
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
        return false;
    }
    else if (playerScore > 21){ // true if their score is over 21
        return true;
    }
    else{// false if their score is not over 21
        return false;
    }
}
function checkBlackJack_P(){//black jack event.  Comes immediately after initial deal
    //bank += ante*3 money
    return (playerScore === 21)
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
        return false;
    }
    else if (dealerScore > 21){ // true if their score is over 21
        return true;
    }
    else{// false if their score is not over 21
        return false;
    }
}
function checkBlackJack_D(){//comes immediately after deal and checkBlackJack_P()
    return (dealerScore === 21)
}


function dealerLogic(){
    while (dealerScore < 17){
        dealerDraw();
    }
    return dealerScore;
}

function winOrLose(){//determines winner or loser after dealer finishes getting cards
    if (playerScore > dealerScore){
       // bank += 2*ante money
       return "WIN"
    }
    else if (playerscore === dealerScore){  //push event
        // bank += ante money
    } 
}

dealButton.addEventListener("click", () => {
    reShuffle();
    playerDrawAndScore();
    dealerDrawAndScore();
    playerDrawAndScore();
    dealerDrawAndScore();
    checkBlackJack_P();
    checkBlackJack_D();
});
hitButton.addEventListener("click", playerDraw());
stayButton.addEventListener("click", () => {
    dealerLogic();
    winOrLose();
}); 
quitButton.addEventListener("click", reShuffle());