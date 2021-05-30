
//LS = (1/2)(OW) + (1/2)(RW) = (1/2)(OW + RW)
/* Liberation Score (suggested by C0ranium)
Name   |Overall Record  |Recent Record  |Overall Win%(OW)|Recent Win%(RW)   |Liberation Score(LS)
Team 1 |  4-2           | 1-2           | 0.67           |0.33              |0.5
Team 2 |  4-2           | 3-0           | 0.67           |1                 |0.835
Team 3 |  3-3           | 2-1           | 0.5            |0.67              |0.585
Team 4 |  1-5           | 0-3           | 0.167          |0                 |0.08

*/

/*Elo:
1) For each win, add your opponent's rating plus 400,
2) For each loss, add your opponent's rating minus 400,
3) And divide this sum by the number of played games.
ex 2 wins and 2 losses:
(w+400 + x + 400 + y - 400 + z - 400) / 4
or
(w+x+y+z+400(2)-400(2))
or
(Total opponent elo + 400 * (Wins - Losses)) / Total Games
*/

/* Fide:

https://www.quora.com/How-are-the-FIDE-ratings-calculated-and-what-do-they-reflect-about-a-player

If Player A has a rating of Ra and Player B has a rating of Rb then the exact formula
for the expected socre of player a is
Ea = 1 / 1 + 10 ^ ((Rb-Ra)/400)

Similarly the expected score for Player B is
Eb = 1 / 1 + 10^((Ra-Rb)/400)

Here when the rating difference is more than 400, the expected score decreases, 
this is because you have less probability to win when playing against a player who is
400 points higher than you.
After calculating Expected score and getting actual score, the updated rating
( previous rating ± Rating change) is calculated.

Supposing Player A was expected to score Ea points but actually scored Sa points.
The formula for updatign their rating is:
R'a = Ra + K(Sa-Ea)
Here ‘K' is known as K-factor (maximum possible adjustment per game) 
which varies from player to player. K = 16 for masters and K = 32 for weaker players. 
This implies the less your rating is, you'll get more points, the more your rating is, 
you'll get less points.

(for this I'll use 24 as a base for everyone)
*/

/* erumi's score:
AS = Player A Score
BS = Player B Score
aD (Average Divider) = ((AS + BS) / 2) / 10

On win for Player A the change is:
(AS / aD) * (BS/AS)
and Player B would lose that many points

If B wins then the change is
(BS / aD) * (AS/BS)
and Player A would lose that many points

A is 1200 B is 700
Divisor is 95 (Average divided by 10)
Player A wins (1200/95) * (7/12)= 7.36842105263  (Player A's rating over Divisor
times that by the fraction of B's rating over A's)
Player B wins (700/95) * (12/7)= 12.6315789474   (Player B's rating over Divisor
times that by the fraction of A's rating over B's)

A is 1200 B is 1000
Divisor is 110
Player A wins (1200/110) * (5/6) = 9.09090909091
Player B wins (1000/110) * (6/5) = 10.9090909091

A is 3000 B is 100
Divisor is 155
Fraction is 30/1
Player A wins (3000 / 155) * 1/30 = 0.64516129032
Player B wins (100 / 155) * 30 = 19.3548387097

A is 800 B is 600
Divisor is 70
Player A wins (800/70) * (3/4) = 8.57142857143
Player B wins (600/70) * (4/3) = 11.4285714286

A is 1000 B is 2000
Divisor is 150
Player A wins (1000/150)*(2) = 13.3333333333
Player B wins (2000/150) * (1/2) = 6.66666666667

A is 1000 B is 1000
Divisor is 100
A wins (1000/100) *1 = 10
B wins (1000/100) * 1 = 10
*/

var username = "";
var oppName = ""
var isWin = true

function setup() {
    username = localStorage.getItem("username");
    console.log(username);
    document.getElementById("name--label").innerHTML = (username != null) ? "Logged in as: " + username : "Not signed in"; 
}

function updateOppName() {
    oppName = document.getElementById("oppnamefield").value;
}

function setWin(){
    isWin = !isWin;
}
function submitNewValues(){
    if (oppName == "") {
        return;
    }
    db.collection("users").where("username", "==", username)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((player) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(player.id, " => ", player.data());
            var oppId = "";
            db.collection("users").where("username", "==", oppName)
            .get()
            .then((oppSnapshot) => {
                oppSnapshot.forEach((opp) => {
                    console.log(opp.id, " => ", opp.data());
                    var AS = player.data().rating;
                    var BS = opp.data().rating;
                    console.log(AS + " " + BS);
                    var aD = eval("((" + AS + "+" + BS + ") / 2) / 10");
                    console.log(aD);
                    var aWinChange = eval("(" + AS + "/" + aD + ") * (" + BS + "/" + AS + ")");
                    var bWinChange = eval("(" + BS + "/" + aD + ") * (" + AS + "/" + BS + ")");

                    var changeA = 0;
                    var changeB = 0;
                    if (isWin == true) {
                        changeA = aWinChange;
                        changeB = eval("-1 * " + aWinChange)
                    }else{
                        changeA = eval("-1 * " + bWinChange);
                        changeB = bWinChange
                    }
                    console.log(Math.round(changeA));
                    console.log(Math.round(changeB));
                    changeA = Math.round(changeA);
                    changeB = Math.round(changeB);
                    db.collection("users").doc(player.id).set({
                        password: player.data().password,
                        username: player.data().username,
                        rating: Math.round(player.data().rating + changeA)
                    })
                    .then(() => {
                        console.log("User rating updated succesfully");
                        document.getElementById("new--rating").innerHTML = "Your rating is: " + Math.round(player.data().rating + changeA)
                        db.collection("users").doc(player.id).collection("matchHistory").add({
                            opponent: opp.data().username,
                            oppRating: opp.data().rating, //Rating at the time of match before score applied
                            win: isWin,
                            ratingChange: changeA
                        }).catch((error) => {
                            console.error("Error adding new item to user history: ", error);
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                    db.collection("users").doc(opp.id).set({
                        password: opp.data().password,
                        username: opp.data().username,
                        rating: Math.round(opp.data().rating + changeB)
                    })
                    .then(() => {
                        db.collection("users").doc(opp.id).collection("matchHistory").add({
                            opponent: player.data().username,
                            oppRating: player.data().rating, //Rating at the time of match before score applied
                            win: !isWin,
                            ratingChange: changeB
                        }).catch((error) => {
                            console.error("Error adding new item to opponent history: ", error);
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                });
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}