//LS = (1/2)(OW) + (1/2)(RW) = (1/2)(OW + RW)
/*
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
var isWin = true
function setWin(){
    isWin = !isWin;
}
function submitNewValues(){
    console.log(isWin);
}