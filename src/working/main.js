var scoreA = document.getElementById("playerScoreA");
var scoreB = document.getElementById("playerScoreB");
var playerA = document.getElementById("playerA");
var playerB = document.getElementById("playerB");
var playerAname = document.getElementById("playeraName");
var playerBname = document.getElementById("playerbName");
var namesRow = document.getElementById("namesRow");
var buttonRow = document.getElementById("button-row");
var resetRow = document.getElementById("reset-row");
var resetBtn = document.getElementById("reset");
var gameRunning = false
var gameTotal
resetBtn.addEventListener('click', (e)=>{
    window.location.reload()
})
const saveResults = (results) => {
    if(results.winner !== ''){
        fetch('http://localhost:1880/saveGame', {
            method: 'post',
            body: JSON.stringify(results)
        })
    }
    
}
var savedGames = [];
const fetchSavedGames = (results) => {
    fetch('http://localhost:1880/fetchGames', {
        method: 'get'
    }).then((results) => {
        results.json().then((json)=>{
            addResultsTable(json)
        })
    })
}

var addResultsTable = (results) => {
    function compare(a, b) {
        if (a.wins < b.wins) {
            return 1;
        }
        if (a.wins > b.wins) {
            return -1;
        }
        return 0;
    }
    var holder = document.getElementById('scoreboard');
    var html = "<table class='table table-striped'><tr><td>Player</td><td>Wins</td></tr>"
    var resultsHolder = {};
    var wins = {}
    results.forEach((eachGame)=>{

        if(!resultsHolder.hasOwnProperty(eachGame.winner)){
            resultsHolder[eachGame.winner] = 1
        } else {
            resultsHolder[eachGame.winner] += 1
        }
        
        if(!wins.hasOwnProperty(eachGame.winner)){
            var newO = {}
            newO.name = eachGame.winner
            newO.wins = 1
            wins[eachGame.winner] = newO
        } else {
            wins[eachGame.winner].wins += 1
        }
    })
    var transformingWins = Object.keys(wins).map((eachWin)=>{
        return {
            name: wins[eachWin].name,
            wins: wins[eachWin].wins
        }
    })
    var sortedWins = transformingWins.sort(compare);
    // console.log(resultsHolder)
    var firstFiveKeys = Object.keys(sortedWins)
    firstFiveKeys.length = 20
    firstFiveKeys.forEach((eachWinner)=>{
        html += "<tr><td>"+sortedWins[eachWinner].name+"</td><td>"+sortedWins[eachWinner].wins+"</td></tr>"
    })
    html += "</table>";
    if(sortedWins.length > 0){
        holder.innerHTML = html
    }
    
}
var scores = {};
const checkScores = (scores, total, results) => {
    if (scores.a == total || scores.b == total) {
        results.aScore = scores.a;
        results.bScore = scores.b;
        results.end = new Date();
        
    
        if (scores.a > scores.b) {
            scoreA.style.backgroundColor = "red";
            results.winner = results.playerA
        } else {
            results.winner = results.playerB
            scoreB.style.backgroundColor = "red";
        }
        saveResults(results)
    }
};
const startGame = total => {
    gameRunning = !gameRunning
    gameTotal = total
    resetRow.style.display = 'inline'

    var results = {
        playerA: playerA.value,
        playerB: playerB.value,
        aScore: 0,
        bScore: 0,
        start: new Date(),
        end: undefined
    };
    scores = { a: 0, b: 0 };
    scoreA.style.backgroundColor = "white";
    scoreB.style.backgroundColor = "white";
    playerAname.innerHTML = playerA.value;
    playerBname.innerHTML = playerB.value;
    scoreA.innerHTML = scores.a;
    scoreB.innerHTML = scores.b;
    namesRow.style.display = "none";
    buttonRow.style.display = "none";
    scoreA.addEventListener("click", () => {
        if (scores.a < total) {
            scores.a++;
            scoreA.innerHTML = scores.a;
            checkScores(scores, total, results);
        }
    });
    scoreB.addEventListener("click", () => {
        if (scores.b < total) {
            scores.b++;
            scoreB.innerHTML = scores.b;
            checkScores(scores, total, results);
        }
    });
};

document.getElementById("start11").addEventListener("click", () => {
    startGame(11);
});
document.getElementById("start21").addEventListener("click", () => {
    startGame(21);
});
fetchSavedGames();
