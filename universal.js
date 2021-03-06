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

var currentRating = localStorage.getItem("rating");

var setUpSnapshot = localStorage.getItem("setUpSnapshot");

function universalSetup() {
	setUpSnapshot = localStorage.getItem("setUpSnapshot");
	if (localStorage.getItem("nextCycle") == null){
		localStorage.setItem("nextCycle", true);
	}
	if (localStorage.getItem("theme") == null) {
		localStorage.setItem("theme", "light");
	}
	if (document.getElementById("modal--theme") != null) {
		document.getElementById("modal--theme").setAttribute("href", "modal/" + localStorage.getItem("theme") + "modal.css");
	}
	if (localStorage.getItem("username") != null && localStorage.getItem("username") != "" && localStorage.getItem("password") != null && localStorage.getItem("password") != "") {
		var d = new Date();
		if (localStorage.getItem("lastSetupReadTime") == null) {
			localStorage.setItem("lastSetupReadTime", 0);
		}
		if (parseInt(localStorage.getItem("lastSetupReadTime")) + 300000 <= d.getTime() || setUpSnapshot == null) {
			db.collection("users")
				.where("username", "==", localStorage.getItem("username"))
				.where("password", "==", sha256(localStorage.getItem("password")))
				.get()
				.then((querySnapshot) => {
					localStorage.setItem("lastSetupReadTime", d.getTime());
					setUpSnapshot = querySnapshot;
					localStorage.setItem("setUpSnapshot", JSON.stringify(querySnapshot.docs));
					if (querySnapshot.docs == null || querySnapshot.docs.length == 0) {
						alert("Inccorrect log-in, don't do that man");
						logout();
						return;
					}
					querySnapshot.forEach((player) => {
						currentRating = player.data().rating;
						localStorage.setItem("rating", player.data().rating);
					});
					document.getElementById("topnav--loginbtn").innerHTML = "Profile";
					document.getElementById("scorelabel").innerHTML = "Score: " + currentRating;
					document.getElementById("topnav--loginbtn").setAttribute("href", "profile.html");
					document.getElementById("topnav--loginbtn").setAttribute("onlick", "window.open('profile.html', '_self');");
				});
		} else {
		console.log("old");
		if (currentRating == null) {
				currentRating = setUpSnapshot[0].data().rating;
				localStorage.setItem("rating", setUpSnapshot[0].data().rating);
			} else {
				currentRating = localStorage.getItem("rating");
			}
			document.getElementById("topnav--loginbtn").innerHTML = "Profile";
			document.getElementById("scorelabel").innerHTML = "Score: " + currentRating;
			document.getElementById("topnav--loginbtn").setAttribute("href", "profile.html");
			document.getElementById("topnav--loginbtn").setAttribute("onlick", "window.open('profile.html', '_self');");
		}
	} else {
		document.getElementById("topnav--loginbtn").innerHTML = "Log-In / Register";
		document.getElementById("scorelabel").innerHTML = "";
		document.getElementById("topnav--loginbtn").setAttribute("href", "log-in.html");
		document.getElementById("topnav--loginbtn").setAttribute("onlick", "window.open('log-in.html', '_self');");
		if (document.getElementById("topnav--staging") != null) {
			document.getElementById("topnav--staging").remove();
		}
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
		newObject[keys[i]] = value;
	}

	return newObject;
}

function logout() {
	localStorage.clear()
	window.open('index.html', '_self');
}

var searchInput = document.getElementById("oppnamefield");
var suggestionPanel = document.getElementById("suggestions");

function updateTheme(pageName) {
	document.getElementById("universal--theme").setAttribute("href", localStorage.getItem("theme") + "universal.css");
	document.getElementById("page--theme").setAttribute("href", pageName + "/" + localStorage.getItem("theme") + pageName + ".css");
	setTimeout(() => { document.body.classList.remove("hidden"); }, 200);
	searchInput = document.getElementById("oppnamefield");
	suggestionPanel = document.getElementById("suggestions");

	if (searchInput != null) {
		db.collection("users").where("username", "!=", localStorage.getItem("username"))
			.get()
			.then((querySnapshot) => {
				userList = querySnapshot.docs;
				updateSearch();
			});
		searchInput.addEventListener("keyup", function () {
			showSuggestions();
			updateSearch();
		})
	}
}

var userList = {}

// if (searchInput != null){
// 	searchInput.addEventListener("keyup", function() {
// 		showSuggestions();
// 		updateSearch();
// 	})
// }
function showSuggestions() {
	suggestionPanel.classList.remove("suggestions--hidden");
}

function hideSuggestions() {
	setTimeout(() => { suggestionPanel.classList.add("suggestions--hidden"); }, 100);

}

function updateSearch() {
	var input = searchInput.value;
	suggestionPanel.innerHTML = "";
	if (input != null) {
		var suggestions = userList.filter(function (user) {
			return user.data().username.toLowerCase().startsWith(input.toLowerCase());
		});
		if (input == "") {
			suggestions = userList;
		}
		if (suggestions.length == 0) {
			hideSuggestions();
			return;
		}
		if (suggestions.length > 0) {
			if (suggestions.length > 6) {
				suggestions = suggestions.slice(0, 6);
			}
		}

		suggestions.forEach((user) => {
			var div = document.createElement("div");
			div.innerHTML = user.data().username;
			div.setAttribute("onclick", "setOppName('" + user.data().username + "');")
			suggestionPanel.appendChild(div);
		})
	} else {
		hideSuggestions();
	}
}

var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value >>> amount) | (value << (32 - amount));
	};

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty] * 8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
			k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
		}
	}

	ascii += '\x80' // Append ??' bit (plus zero padding)
	while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j >> 8) return; // ASCII check: only accept characters in range 0-255
		words[i >> 2] |= j << ((3 - i) % 4) * 8;
	}
	words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
	words[words[lengthProperty]] = (asciiBitLength)

	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e & hash[5]) ^ ((~e) & hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
					w[i - 16]
					+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
					+ w[i - 7]
					+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
				) | 0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

			hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1) | 0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i]) | 0;
		}
	}

	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i] >> (j * 8)) & 255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};