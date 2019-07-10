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

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);
    console.log(newTrain);

    


});