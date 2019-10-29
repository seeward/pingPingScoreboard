
// standard 52 card deck as json
// paths to imgs added 
const deck = [
    {
        "suit": "hearts",
        "path": "cards/2H.png", "value": 2
    },
    {
        "suit": "hearts",
        "path": "cards/3H.png", "value": 3
    },
    {
        "suit": "hearts",
        "path": "cards/4H.png", "value": 4
    },
    {
        "suit": "hearts",
        "path": "cards/5H.png", "value": 5
    },
    {
        "suit": "hearts",
        "path": "cards/6H.png", "value": 6
    },
    {
        "suit": "hearts",
        "path": "cards/7H.png", "value": 7
    },
    {
        "suit": "hearts",
        "path": "cards/8H.png", "value": 8
    },
    {
        "suit": "hearts",
        "path": "cards/9H.png", "value": 9
    },
    {
        "suit": "hearts",
        "path": "cards/10H.png", "value": 10
    },
    {
        "suit": "hearts",
        "path": "cards/JH.png", "value": "J"
    },
    {
        "suit": "hearts",
        "path": "cards/QH.png", "value": "Q"
    },
    {
        "suit": "hearts",
        "path": "cards/KH.png", "value": "K"
    },
    {
        "suit": "hearts",
        "path": "cards/AH.png", "value": "A"
    },
    {
        "suit": "diamonds",
        "path": "cards/2D.png", "value": 2
    },
    {
        "suit": "diamonds",
        "path": "cards/3D.png", "value": 3
    },
    {
        "suit": "diamonds",
        "path": "cards/4D.png", "value": 4
    },
    {
        "suit": "diamonds",
        "path": "cards/5D.png", "value": 5
    },
    {
        "suit": "diamonds",
        "path": "cards/6D.png", "value": 6
    },
    {
        "suit": "diamonds",
        "path": "cards/7D.png", "value": 7
    },
    {
        "suit": "diamonds",
        "path": "cards/8D.png", "value": 8
    },
    {
        "suit": "diamonds",
        "path": "cards/9D.png", "value": 9
    },
    {
        "suit": "diamonds",
        "path": "cards/10D.png", "value": 10
    },
    {
        "suit": "diamonds",
        "path": "cards/JD.png", "value": "J"
    },
    {
        "suit": "diamonds",
        "path": "cards/QD.png", "value": "Q"
    },
    {
        "suit": "diamonds",
        "path": "cards/KD.png", "value": "K"
    },
    {
        "suit": "diamonds",
        "path": "cards/AD.png", "value": "A"
    },
    {
        "suit": "clubs",
        "path": "cards/2C.png", "value": 2
    },
    {
        "suit": "clubs",
        "path": "cards/3C.png", "value": 3
    },
    {
        "suit": "clubs",
        "path": "cards/4C.png", "value": 4
    },
    {
        "suit": "clubs",
        "path": "cards/5C.png", "value": 5
    },
    {
        "suit": "clubs",
        "path": "cards/6C.png", "value": 6
    },
    {
        "suit": "clubs",
        "path": "cards/7C.png", "value": 7
    },
    {
        "suit": "clubs",
        "path": "cards/8C.png", "value": 8
    },
    {
        "suit": "clubs",
        "path": "cards/9C.png", "value": 9
    },
    {
        "suit": "clubs",
        "path": "cards/10C.png", "value": 10
    },
    {
        "suit": "clubs",
        "path": "cards/JC.png", "value": "J"
    },
    {
        "suit": "clubs",
        "path": "cards/QC.png", "value": "Q"
    },
    {
        "suit": "clubs",
        "path": "cards/KC.png", "value": "K"
    },
    {
        "suit": "clubs",
        "path": "cards/AC.png", "value": "A"
    },
    {
        "suit": "spades",
        "path": "cards/2S.png", "value": 2
    },
    {
        "suit": "spades",
        "path": "cards/3S.png", "value": 3
    },
    {
        "suit": "spades",
        "path": "cards/4S.png", "value": 4
    },
    {
        "suit": "spades",
        "path": "cards/5S.png", "value": 5
    },
    {
        "suit": "spades",
        "path": "cards/6S.png", "value": 6
    },
    {
        "suit": "spades",
        "path": "cards/7S.png", "value": 7
    },
    {
        "suit": "spades",
        "path": "cards/8S.png", "value": 8
    },
    {
        "suit": "spades",
        "path": "cards/9S.png", "value": 9
    },
    {
        "suit": "spades",
        "path": "cards/10S.png", "value": 10
    },
    {
        "suit": "spades",
        "path": "cards/JS.png", "value": "J"
    },
    {
        "suit": "spades",
        "path": "cards/QS.png", "value": "Q"
    },
    {
        "suit": "spades",
        "path": "cards/KS.png", "value": "K"
    },
    {
        "suit": "spades",
        "path": "cards/AS.png", "value": "A"
    }
]

const pathToBackImg = 'cards/back.png';
// some vars
var playerCardOne, playerCardTwo, hitme, hold, score, dealerScore, aceRow, make1, make11, currentCardIndex;
var deal = document.getElementById("deal")
var score = 0;
let shuffledDeck = [];
let playersHand = [];
let dealersHand = [];
let cardsDealt = [];
// algorithim to shuffle cards
var fisherYates = (array) => {
    // we start at the end of the array
    var currentIndex = array.length,
        temporaryValue,
        randomIndex; // While there remain elements to shuffle...

    while (0 !== currentIndex) {
        // Pick a remaining element between current location and beginning
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1; // And swap it with the current element.
        // get the value of our current index

        temporaryValue = array[currentIndex]; // replace it with our new random element's value from whats left

        array[currentIndex] = array[randomIndex]; // copy the value that was at this point in the array to the random index

        array[randomIndex] = temporaryValue; // this will stop swapping when the index is at 0
    }

    return array;
};
const start = () => {
    // reset vars
    currentCardIndex = 0;
    score = 0;
    const g = document.getElementById('game')
    score = document.getElementById("score")
    dealerScore = document.getElementById("dealerscore")
    playerCardOne = document.getElementById("cardone")
    playerCardTwo = document.getElementById("cardtwo")
    playerCardThree = document.getElementById("cardthree")
    playerCardFour = document.getElementById("cardfour")
    playerCardFive = document.getElementById("cardfive")
    playerCardSix = document.getElementById("cardsix")
    var winner = document.getElementById("winner")
    var dealTotal = document.getElementById("dealertotal")
    var mytotal = document.getElementById("mytotal")
    var dealerCardOne = document.getElementById("dealercardone")
    var dealerCardTwo = document.getElementById("dealercardtwo")
    var dealerCardThree = document.getElementById("dealercardthree")
    var dealerCardFour = document.getElementById("dealercardfour")
    var dealerCardFive = document.getElementById("dealercardfive")
    var dealerCardSix = document.getElementById("dealercardsix")
    aceRow = document.getElementById("acerow")
    hitme = document.getElementById("hitme")
    hold = document.getElementById("hold")
    make1 = document.getElementById("make1")
    make11 = document.getElementById("make11")


    // set up previous score
    if (localStorage.getItem('playerWins')) {
        mytotal.innerHTML = localStorage.getItem('playerWins')
    } else {
        mytotal.innerHTML = 0
    }
    if (localStorage.getItem('dealerWins')) {
        dealTotal.innerHTML = localStorage.getItem('dealerWins')
    } else {
        dealTotal.innerHTML = 0
    }
    // reset values
    winner.innerHTML = '';
    aceRow.style.display = 'none';
    playerCardOne.innerHTML = ''
    playerCardTwo.innerHTML = ''
    playerCardThree.innerHTML = ''
    playerCardFour.innerHTML = ''
    playerCardFive.innerHTML = ''
    playerCardSix.innerHTML = ''
    score.innerHTML = '';
    // get a newly shuffled deck
    const shuffledDeck = fisherYates(deck);


    // deal player hand
    // pull 2 random numbers between 1 and 52
    let rand1 = Math.floor(Math.random() * 52)
    let rand2 = Math.floor(Math.random() * 52)
    // make sure they are not the same card
    if (rand1 === rand2) {
        rand2 = Math.floor(Math.random() * 52)
    }
    // grab random cards from the deck
    const cardOne = shuffledDeck[rand1];
    const cardTwo = shuffledDeck[rand2];
    // add cards to players hand
    playersHand.push(cardOne, cardTwo);
    // function to turn card over
    const flipCard = () => {
        console.log(aceRow.style.display)
        if (aceRow.style.display === 'block') {
            score.innerHTML = "First select the value of the Ace"
            return
        } else {
            currentCardIndex = 1;
            playerCardTwo.innerHTML = '<img src="' + cardTwo.path + '" width="175"/>';
            if (cardTwo.value === 'A') {
                aceRow.style.display = 'block'
            }
        }
    }
    // handle Aces
    if (cardOne.value === 'A') {
        playerCardOne.innerHTML = '<img src="' + cardOne.path + '" width="175"/>';
        aceRow.style.display = 'block'
    } else {
        playerCardOne.innerHTML = '<img src="' + cardOne.path + '" width="175"/>';
    }

    // first show back of 2nd card
    playerCardTwo.innerHTML = '<img src="' + pathToBackImg + '" width="175"/>';

    // dealers hand
    let dealerRand1 = Math.floor(Math.random() * 52)
    let dealerRand2 = Math.floor(Math.random() * 52)
    if (dealerRand1 === dealerRand2) {
        dealerRand2 = Math.floor(Math.random() * 52)
    }
    const dealerCardOneVal = shuffledDeck[dealerRand1];
    const dealerCardTwoVal = shuffledDeck[dealerRand2];
    dealersHand.push(dealerCardOneVal, dealerCardTwoVal);
    dealerCardOne.innerHTML = '<img src="' + dealerCardOneVal.path + '" width="175"/>';
    dealerCardTwo.innerHTML = '<img src="' + pathToBackImg + '" width="175"/>';

    // event handlers
    make1.removeEventListener('click', null);
    make1.addEventListener('click', (e) => {

        playersHand.forEach((eachCard, i) => {
            if (eachCard.value === 'A' && i === currentCardIndex) {
                eachCard.value = 1
            }
        })
        aceRow.style.display = 'none';
    })
    make11.addEventListener('click', (e) => {

        playersHand.forEach((eachCard, i) => {
            if (eachCard.value === 'A' && i === currentCardIndex) {
                eachCard.value = 11
            }
        })
        aceRow.style.display = 'none';
    })
    playerCardTwo.addEventListener('click', flipCard)
    hitme.removeEventListener('click', null);
    hitme.addEventListener('click', (e) => {
        switch (playersHand.length) {
            case 2:
                cardThree = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];
                playerCardThree.innerHTML = '<img src="' + cardThree.path + '" width="175"/>';
                console.log(cardThree);
                currentCardIndex = 2
                if (cardThree.value === 'A') {
                    aceRow.style.display = 'block'
                }

                playersHand.push(cardThree);
                break;
            case 3:
                currentCardIndex = 3
                cardFour = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];
                playerCardFour.innerHTML = '<img src="' + cardFour.path + '" width="175"/>';
                if (cardFour.value === 'A') {
                    aceRow.style.display = 'block'
                }
                playersHand.push(cardFour);
                break;
            case 4:
                currentCardIndex = 4
                cardFive = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];
                playerCardFive.innerHTML = '<img src="' + cardFive.path + '" width="175"/>';
                if (cardFive.value === 'A') {
                    aceRow.style.display = 'block'
                }
                playersHand.push(cardFive);

                break;
            case 5:
                currentCardIndex = 5
                cardSix = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];
                playerCardSix.innerHTML = '<img src="' + cardSix.path + '" width="175"/>';
                if (cardSix.value === 'A') {
                    aceRow.style.display = 'block'
                }
                playersHand.push(cardSix);

                break;

            default:

                break;
        }
    })
    hold.removeEventListener('click', null);
    var total = 0;
    hold.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation();
        dealerCardTwo.innerHTML = '<img src="' + dealerCardTwoVal.path + '" width="175"/>';
        var dealerTotal = 0;
        // get total of dealers cards
        dealersHand.forEach((eachcard) => {
            if (eachcard.value === "J" || eachcard.value === "Q" || eachcard.value === "K") {
                eachcard.value = 10;
            }
            if (eachcard.value === "A") {
                eachcard.value = 11;
            }
            dealerTotal += eachcard.value
        })
        // if dealer has less than 16 then take another card
        while (dealerTotal < 16) {
            // grab a new card from the deck
            var newCard = shuffledDeck[Math.floor(Math.random() * 52)]
            dealersHand.push(newCard)
            // find which card we are at
            switch (dealersHand.length) {
                case 2:
                    dealerCardThree.innerHTML = '<img src="' + newCard.path + '" width="175"/>';

                    break;
                case 3:
                    dealerCardFour.innerHTML = '<img src="' + newCard.path + '" width="175"/>';

                    break;
                case 4:
                    dealerCardFive.innerHTML = '<img src="' + newCard.path + '" width="175"/>';

                    break;
                case 5:
                    dealerCardSix.innerHTML = '<img src="' + newCard.path + '" width="175"/>';

                    break;

            }
            // adjust royal cards   
            if (newCard.value === "J" || newCard.value === "Q" || newCard.value === "K") {
                newCard.value = 10
            }
            // adjust aces
            if (newCard.value === "A") {
                newCard.value = 11
            }
            dealerTotal = dealerTotal + newCard.value
        }
        // get total of players cards
        playersHand.forEach((eachcard) => {
            // adjust for royal cards
            if (eachcard.value === "J" || eachcard.value === "Q" || eachcard.value === "K") {
                eachcard.value = 10;
            }
            // aces are already adjusted by user choice
            total += eachcard.value
        })
        aceRow.style.display = 'none'
        playersHand.length = 0;

        score.innerHTML = "You have : " + total
        dealerScore.innerHTML = "Dealer has : " + dealerTotal
        if ((total <= 21 && dealerTotal <= 21) && total === dealerTotal) {
            winner.innerHTML = 'its a push';
            return
        }
        if (total > dealerTotal && total <= 21) {
            winner.innerHTML = 'You Win!!!';
            if (localStorage.getItem('playerWins')) {
                currentTotal = localStorage.getItem('playerWins')
                localStorage.setItem('playerWins', Number(currentTotal) + 1)
            } else {
                localStorage.setItem('playerWins', 1)
            }

        } else {
            if (dealerTotal > 21) {
                winner.innerHTML = 'You Win!!!';
                if (localStorage.getItem('playerWins')) {
                    currentTotal = localStorage.getItem('playerWins')
                    localStorage.setItem('playerWins', Number(currentTotal) + 1)
                } else {
                    localStorage.setItem('playerWins', 1)
                }
            } else {
                winner.innerHTML = 'Dealer Wins...';
                if (localStorage.getItem('dealerWins')) {
                    currentTotal = localStorage.getItem('dealerWins')
                    localStorage.setItem('dealerWins', Number(currentTotal) + 1)
                } else {
                    localStorage.setItem('dealerWins', 1)
                }
            }

        }

    })
}

// deal button
deal.addEventListener('click', () => {
    window.location.reload()
})