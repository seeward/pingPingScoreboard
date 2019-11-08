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
const player = document.getElementById('player');
const selfieHolder = document.getElementById('img-holder');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
var gameRunning = false,
    gameTotal,
    imgs = [],
    savedGames = [];

resetBtn.addEventListener('click', e => {
    window.location.reload();
});
const saveResults = results => {

    if (results.winner !== '') {
        fetch('https://end.codeplant.co.za/saveGame', {
            method: 'post',
            body: JSON.stringify(results)
        });
    }
};

const fetchSavedGames = () => {
    fetch('https://end.codeplant.co.za/fetchGames', {
        method: 'get'
    }).then(results => {
        results.json().then(json => {
            addResultsTable(json);
        });
    });
};
var addResultsTable = results => {
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
    var html = "<table class='table table-striped'><tr><td>Player</td><td>Wins</td></tr>";
    var resultsHolder = {};
    var wins = {};
    results.forEach(eachGame => {
        imgs.push({ src: eachGame.img, winner: eachGame.winner });
        if (!resultsHolder.hasOwnProperty(eachGame.winner)) {
            resultsHolder[eachGame.winner] = 1;
        } else {
            resultsHolder[eachGame.winner] += 1;
        }

        if (!wins.hasOwnProperty(eachGame.winner)) {
            var newO = {};
            newO.name = eachGame.winner;
            newO.wins = 1;
            wins[eachGame.winner] = newO;
        } else {
            wins[eachGame.winner].wins += 1;
        }
    });
    addImgs(imgs);
    var transformingWins = Object.keys(wins).map(eachWin => {
        return {
            name: wins[eachWin].name,
            wins: wins[eachWin].wins
        };
    });
    var sortedWins = transformingWins.sort(compare);
    // console.log(resultsHolder)
    var firstFiveKeys = Object.keys(sortedWins);
    firstFiveKeys.length = 20;
    firstFiveKeys.forEach(eachWinner => {
        html += "<tr><td>" + sortedWins[eachWinner].name + "</td><td>" + sortedWins[eachWinner].wins + "</td></tr>";
    });
    html += "</table>";
    if (sortedWins.length > 0) {
        holder.innerHTML = html;
    }
};
var addImgs = images => {
    console.log('into add imgs');
    var html = `<table class"table table-bordered"><tbody>`;
    imgs.forEach(eachImg => {
        if (eachImg.src) {
            html += `<tr><td><img src="${eachImg.src}" /></td></tr><tr><td>${eachImg.winner}</td></tr>`;
        }
    });
    html += `</tbody></table>`;

    selfieHolder.innerHTML = html;
};
var scores = {};
var finalResults = {};
const checkScores = (scores, total, results) => {
    if (scores.a == total || scores.b == total) {
        results.aScore = scores.a;
        results.bScore = scores.b;
        results.end = new Date();

        if (scores.a > scores.b) {
            scoreA.style.backgroundColor = "red";
            results.winner = results.playerA;
        } else {
            results.winner = results.playerB;
            scoreB.style.backgroundColor = "red";
        }
        finalResults = results;
        //saveResults(results)
        captureButton.style.display = 'inline';
        player.style.display = 'inline';
        canvas.style.display = 'inline';
    }
};
const startGame = total => {
    gameRunning = !gameRunning;
    gameTotal = total;
    resetRow.style.display = 'inline';

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

const constraints = {
    video: true
};

captureButton.addEventListener('click', () => {
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    // video.style.display = 'none';
    captureButton.style.display = 'none';

    // var img = canvas.toDataURL('image/jpeg', 0.5)
    finalResults.img = canvas.toDataURL('image/jpeg', 0.5);
    saveResults(finalResults);
});

//   Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    player.srcObject = stream;
});