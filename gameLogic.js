let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isAce_P = false;
let isAce_D = false;
let count = 0;

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
        isAce_P = true;
        playerScore += 11;
    } else if (value === "KING" || value === "QUEEN" || value === "JACK"){
        playerScore += 10;
    } else {
        playerScore += Number(value);
    }
}

function dealerDraw(){
    //let deckUpdate = fetch("https://deckofcardsapi.com/api/deck/"+deckID+"/shuffle/?deck_count=1");
    deckID = deckUpdate.deck_id;
    dealerHand.push(deckUpdate.cards[0].value);
}


console.log(deckUpdate.cards[0].code) //Syntax to reference the object the API 


