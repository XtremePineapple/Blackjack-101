let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isAce_P = false;
let isAce_D = false;
let bankVal = 100;
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
let dOverflow = document.getElementById("dOverflow");

let deckID = "";

function off() {
    document.getElementById("overlay").style.display = "none";
  }

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
    
    const fetchDeckId = async () => {
        let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        let json =  await response.json();
        deckID = json.deck_id;
        console.log(`deck id fetched from reshuffle: ${deckID}`);
    }
    
    fetchDeckId();   

    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    isAce_P = false;
    isAce_D = false;
}



function playerDrawAndScore(card){

    let cardValue;
    let cardImage;

    // const fetchDeckId = async () => {
    //     let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    //     let json =  await response.json();
    //     deckID = json.deck_id;
    //     console.log(`deck id fetched from reshuffle: ${deckID}`);
    // }
    
    // fetchDeckId(); 

    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=4")
        .then(function(response){
            return response.json();
        })
        .then(function(data){

            
            pCard1.src = data.cards[0].image; //updates card picture
            pCard2.src = data.cards[1].image; //updates card picture
            dCard1.src = data.cards[2].image; //updates card picture
            dCard2.src = data.cards[3].image; //updates card picture
        })
    
    

    // const fetchCard = async () => {
    //     let response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
    //     let json =  await response.json();
    //     debugger;
    //     return json;
    //     console.log(json);
    //     debugger;
        
    //     console.log(`deck id fetched from reshuffle: ${deckID}`);
    // }

    // json = fetchCard();
    

    
    
    if (cardValue === "ACE"){
        if (playerScore < 11){ //Won't add 11 if it would bust
            isAce_P = true;
            playerScore += 11;
            return playerScore;
        } else {
            playerScore += 1;
            return playerScore;
        }
    } else if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK"){
        playerScore += 10;
        return playerScore;
    } else {
        playerScore += Number(cardValue);
        return playerScore;
    }
}

function playerHit(){

    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=4")
        .then(function(response){
            return response.json();
        })
        .then(function(data){

            dOverflow.innerHTML += `<li>${data.cards[0].value} of ${data.cards[0].suit}</li>`

        })
    
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
        bankVal += ante*3
        bank.innerHTML = bankVal;
        win = true;
        BLACKJACK();
    }
}

function dealerDrawAndScore(card = ''){
    
    let cardValue;
    let cardImage;

    const fetchDeckId = async () => {
        let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        let json =  await response.json();
        deckID = json.deck_id;
        console.log(`deck id fetched from reshuffle: ${deckID}`);
    }
    
    fetchDeckId(); 

    console.log(deckID);

    const fetchCard = async () => {
        let response = await fetch("https://deckofcardsapi.com/api/deck/jihhvb8gyasc/draw/?count=1");
        let json =  await response.json();
        console.log(json);
        cardValue = json.cards[0].value;
        cardImage = json.cards[0].image;
        console.log(`deck id fetched from reshuffle: ${deckID}`);
    }

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
       bankVal += 2*ante;
       bank.innerHTML =bankVal;
       WIN();
    }
    else if (playerscore === dealerScore){  //push event
        bankVal += ante;
        bank.innerHTML = bankVal;
        TIE();
    } else {
        LOSE();
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
    bankVal -= ante
}


function WIN(){
    ovrText.innerHTML = "You Win!"
    overlay.style.display = "block" 
}

function TIE(){
    ovrText.innerHTML = "It's a Push!"
    overlay.style.display = "block" 
}

function LOSE(){
    ovrText.innerHTML = "You Lose! Better luck next time..."
    overlay.style.display = "block" 
}

function off(){
    document.getElementById("overlay").style.display = "none";
}

dealButton.addEventListener("click", playerDrawAndScore);
hitButton.addEventListener("click", playerHit);
stayButton.addEventListener("click", () => {
    dealerLogic();
    checkBust_D();
    winOrLose();
}); 

