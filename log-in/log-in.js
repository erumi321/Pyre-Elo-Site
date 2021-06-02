var username = ""
var password = ""

function updateName() {
    username = document.getElementById("namefield").value;
}
function updatePass() {
    password = document.getElementById("passfield").value;
}

function changePassShow() {
    var checkbox = document.getElementById("showpasscheck");
    if (checkbox.checked) {
        document.getElementById("passfield").setAttribute("type", "text");
    }else{
        document.getElementById("passfield").setAttribute("type", "password");
    }
}

function logIn(){
    if (username == "") {
        return;
    }
    db.collection("users").where("username", "==", username)
    .get()
    .then((querySnapshot) => {
        var didPlayerPass = false;
        querySnapshot.forEach((player) => {
            didPlayerPass = true;
            if (password == player.data().password) {
                localStorage.setItem('username', player.data().username);
                alert("Successfully Signed In");
                document.location.href = "index.html";
            }else{
                alert("Wrong Password");
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}

function signUp(){
    if (username == "" || password==""){
        return;
    }
    db.collection("users")
    .get()
    .then((querySnapshot) => {
        var isUsed = false;
        querySnapshot.forEach((user) => {
            if (user.data().username == username){
                alert("Username in use");
                isUsed = true;
                return;
            }
            console.log(user.id);
        });
        console.log("done");
        if (isUsed){
            return;
        }
        db.collection("users").add({
            username: username,
            password: password,
            rating: 1000
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            localStorage.setItem('username', username)
            alert("Success " + username + ", you have been signed in");
            document.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
}