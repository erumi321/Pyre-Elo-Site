function logout() {
    localStorage.removeItem("username");
    document.location.href = "../home/home.html";
}

function buildMatchHistory() {

    db.collection("users").where("username", "==", localStorage.getItem('username'))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
            db.collection("users").doc(user.id).collection("matchHistory")
            .orderBy("timefrom", "desc")
            .get()
            .then((historySnapshot) => {
                historySnapshot.forEach((match) => {
                    var change = (eval(match.data().ratingChange) > 0) ? "+"+match.data().ratingChange: match.data().ratingChange;
                    var historycardholder = document.getElementById("basehistorycard").cloneNode(true);
                    historycardholder.classList.remove("hidden");
                    var card = historycardholder.children[0];
                    console.log(match.data().modded);
                    card.children[0].children[0].setAttribute("src", (!match.data().modded)? "icons/unmoddedIcon512512.png" : "icons/moddedIcon512512.png")
                    card.children[1].children[0].innerHTML = user.data().username;
                    card.children[1].children[1].innerHTML = match.data().opponent;
                    if (match.data().win){
                        card.children[2].children[0].innerHTML = "Win(" + match.data().ratingChange + ")";
                        card.children[2].children[1].innerHTML = "Lose(" + eval(-1 * match.data().ratingChange) + ")";
                    }else{
                        card.children[2].children[0].innerHTML = "Lose(" + match.data().ratingChange + ")";
                        card.children[2].children[1].innerHTML = "Win(" + eval(-1 * match.data().ratingChange) + ")";
                    }
                    card.children[3].innerHTML = match.data().date;
                    document.getElementById("matchhistorylist").appendChild(historycardholder);
                })
            })
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}