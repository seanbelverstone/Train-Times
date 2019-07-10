/* Pseudocode
When user presses submit button, update the HTML with their new train and upload to firebase.
Retrieve the new trains from firebase.
Calculate the next arrival against first train time
Calculate minutes away
*/



var firebaseConfig = {
    apiKey: "AIzaSyDHOc7ZOHVskZIDsykkm7FVZRaxw0evKOQ",
    authDomain: "train-times-dc03f.firebaseapp.com",
    databaseURL: "https://train-times-dc03f.firebaseio.com",
    projectId: "train-times-dc03f",
    storageBucket: "",
    messagingSenderId: "171608185338",
    appId: "1:171608185338:web:ecb8d59dd5a0414d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    //Grabs the data from the form
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequencyInput").val().trim();

    //Stores it in a JSON object called newTrain
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    //Push newTrain to Firebase
    database.ref().push(newTrain);
    console.log(newTrain);

    alert("New train added!");

    //Clears the form
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");

});



//Firebase event
database.ref().on("child_added", function(childSnapshot) {

//Storing the firebase snapshot into a variable
var trainName = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;
      
//current time
var currentTime = moment();

//This subtracts the first train by a year to make sure it's before the current time (moment)
var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
// This calculates the difference between the current time and the first train
var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
var remainder = difference % frequency;
var minutesAway = frequency - remainder;
var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

//create the new rows and data cells
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
  );

  //append to the table
  $("#trainTable > tbody").append(newRow);


});