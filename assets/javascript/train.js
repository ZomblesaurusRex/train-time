var firebaseConfig = {
    apiKey: "AIzaSyBMMyJK9b-exKC6fW9EvWRSWCrAJ1LWhJE",
    authDomain: "ucsd-d57ed.firebaseapp.com",
    databaseURL: "https://ucsd-d57ed.firebaseio.com",
    projectId: "ucsd-d57ed",
    storageBucket: "",
    messagingSenderId: "757799123284",
    appId: "1:757799123284:web:79b883aa97836cf7db70c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.databse();

//Button for adding a train to the table and database
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    //record user input
    var trainName = ("#train-name-input")
    .val()
    .trim();
    var trainDestination = ("#destination-input")
    .val()
    .trim();
    var firstTime = ("#first-train-time-input")
    .val()
    .trim();
})