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

var database = firebase.database();
var currentTime = moment();

//Button for adding a train to the table and database
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //record user input
    var trainName = $("#train-name-input")
        .val()
        .trim();
    var trainDestination = $("#destination-input")
        .val()
        .trim();
    var firstTime = moment($("#first-train-time-input")
        .val(),
        "HH: mm").format("X");
    var trainFrequency = moment($("#frequency-input")
        .val(),
    "mm").format("X");

    //creates object locally for holding train data
    var newTrains = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTime,
        frequency: trainFrequency,
    };
    database.ref().push(newTrains);
})

//uploading data to database


database.ref().on(
    "child_added",
    function (childSnapshot) {
        var firstTimeConverted = moment(childSnapshot.val().firstTime, "HH:mm").subtract(1, "years");

        //var convertedDate = moment(childSnapshot.val().startDate, dateFormat);
        //Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % (childSnapshot.val().trainFrequency);

        // Minute Until Train
        var tMinutesTillTrain = (childSnapshot.val().trainFrequency) - tRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        //         var totalBilled = monthlyRate * monthsWorked;

        var newRow = $("<tr>");

        newRow.append("<td>" + childSnapshot.val().trainName + "</td>");
        newRow.append("<td>" + childSnapshot.val().trainDestination + "</td>");
        newRow.append("<td>" + childSnapshot.val().trainFrequency + "</td>");
        newRow.append("<td>" + nextTrain + "</td>");
        newRow.append("<td>" + tMinutesTillTrain + "</td>");
        $("#x").append(newRow);
    });





