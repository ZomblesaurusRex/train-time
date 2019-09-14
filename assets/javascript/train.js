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
moment().format();
var database = firebase.database();
var currentTime = moment();

var tMinutesTillTrain = 0;

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
    var firstTime = $("#first-train-time-input")
        .val()
        .trim();
    var trainFrequency = $("#frequency-input")
        .val()
        .trim();


    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTime);
    console.log(trainFrequency);
    //Moment JS math caclulations to determine train next arrival time and the number of minutes away from destination.
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    //creates object locally for holding train data
    var newTrains = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTime,
        frequency: trainFrequency,
        nextTrain: nextTrain,
        tMinutesTillTrain: tMinutesTillTrain,
        currentTime: currentTime.format("hh:mm A")
    };
    database.ref().push(newTrains);
    console.log("train name in database: " + newTrains.trainName);
    console.log("destination in database: " + newTrains.destination);
    console.log("first train time in database: " + newTrains.firstTrainTime);
    console.log("train frequency in database: " + newTrains.trainFrequency);
    console.log("next train in database: " + newTrains.nextTrain);
    console.log("minutes away in database: " + newTrains.tMinutesTillTrain);
    console.log("current time in database: " + newTrains.currentTime);

    alert("added succesfully");

    //Remove the text from the form boxes after user presses the add to schedule button.
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");


})

//uploading data to database


database.ref().on(
    "child_added",
    function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());
        console.log(prevChildKey);

        var trainName = childSnapshot.val().trainName;
        var trainDestination = childSnapshot.val().trainDestination;
        var firstTime = childSnapshot.val().firstTime;
        var trainFrequency = childSnapshot.val().trainFrequency;
        var nextTrain = childSnapshot.val().nextTrain;
        var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
        var currentTime = childSnapshot.val().currentTime;

        //var convertedDate = moment(childSnapshot.val().startDate, dateFormat);
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

        //Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % trainFrequency;

        // Minute Until Train
        var tMinutesTillTrain = trainFrequency - tRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
        //         var totalBilled = monthlyRate * monthsWorked;
        var tRow = $("<tr>");
        var trainTd = $("<td>").html(trainName);
        var destTd = $("<td>").html(trainDestination);
        var trainFrequencyTd = $("<td>").html(trainFrequency);
        var nextTrainTd = $("<td>").text(nextTrain);
        var tMinutesTillTrainTd = $("<td>").text(tMinutesTillTrain);

        $("#x").append(tRow);
        tRow.append(trainTd);
        tRow.append(destTd);
        tRow.append(trainFrequencyTd);
        tRow.append(nextTrainTd);
        tRow.append(tMinutesTillTrainTd);
        // var newRow = $("<tr>");
        // newRow.append("<td scope='col'>" + childSnapshot.val().trainName + "</td>");
        // newRow.append("<td scope='col'>" + childSnapshot.val().trainDestination + "</td>");
        // newRow.append("<td scope='col'>" + childSnapshot.val().trainFrequency + "</td>");
        // newRow.append("<td scope='col'>" + nextTrain + "</td>");
        // newRow.append("<td scope='col'>" + tMinutesTillTrain + "</td>");
        // $("#x").append(newRow);
    });





