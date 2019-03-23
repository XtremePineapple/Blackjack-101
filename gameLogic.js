let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isAce_P = false;
let isAce_D = false;
let ante = 25;

let hitButton = document.getElementById("hit");
let dealButton = document.getElementById("deal");
let stayButton = document.getElementById("stay");
let quitButton = document.getElementById("quit");

let deckID = "";

let deckUpdate = { //Sample Return
    "remaining": 51,
    "success": true,
    "deck_id": "96n9zskcwxhg",
    "cards": [
        {
            "value": "10",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/0C.svg",
                "png": "https://deckofcardsapi.com/static/img/0C.png"
            },
            "suit": "CLUBS",
            "image": "https://deckofcardsapi.com/static/img/0C.png",
            "code": "0C"
        }
    ]
}

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

function playerDraw(){
    //let deckUpdate = fetch("https://deckofcardsapi.com/api/deck/"+deckID+"/shuffle/?deck_count=1");
    deckID = deckUpdate.deck_id;
    playerHand.push(deckUpdate.cards[0].value);
    return playerHand;
}
function playerScore(){
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

function dealerDraw(){
    //let deckUpdate = fetch("https://deckofcardsapi.com/api/deck/"+deckID+"/shuffle/?deck_count=1");
    deckID = deckUpdate.deck_id;
    dealerHand.push(deckUpdate.cards[0].value);
}
function dealerScore(){
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

console.log(deckUpdate.cards[0].code) //Syntax to reference the object the API 