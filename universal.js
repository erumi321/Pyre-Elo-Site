var firebaseConfig = {
    apiKey: "AIzaSyCsSCQK9Ap9xo8cCRpEI3nNeS65b5JIHoU",
    authDomain: "pyre-elo-calc.firebaseapp.com",
    projectId: "pyre-elo-calc",
    storageBucket: "pyre-elo-calc.appspot.com",
    messagingSenderId: "1056798113239",
    appId: "1:1056798113239:web:4ba364ced92286bc0cdf92",
    measurementId: "G-YHTLKM2RS5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  function universalSetup(){
      if (localStorage.getItem("username") != null || localStorage.getItem("username") == "") {
        document.getElementById("topnav--loginbtn").innerHTML = "Profile";
        document.getElementById("topnav--loginbtn").setAttribute("href", "/profile.html");
      }else{
        document.getElementById("topnav--loginbtn").innerHTML = "Log-In / Register";
        document.getElementById("topnav--loginbtn").setAttribute("href", "/log-in.html");
      }
  }

  function reverseObject(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
        keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]]= value;
    }       

    return newObject;
}