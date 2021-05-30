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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }