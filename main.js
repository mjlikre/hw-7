$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyA10jET27ZwCGNXPDG-iPA2O2RJQ9MFpDM",
        authDomain: "trainzz-a7ff3.firebaseapp.com",
        databaseURL: "https://trainzz-a7ff3.firebaseio.com",
        projectId: "trainzz-a7ff3",
        storageBucket: "trainzz-a7ff3.appspot.com",
        messagingSenderId: "547362981105",
        appId: "1:547362981105:web:6fffcf177d7540b8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var trainId=0;


    var trainName; 
    var destination;
    var trainFirst;
    var frequency;

    var database = firebase.database();
    var currentTrain;

    function writeTrainData(trainId, trainName, destination, trainFirst, frequency){
        database.ref('train/' + trainId).push({
            trainName : trainName,
            destination : destination,
            trainFirst : trainFirst,
            frequency : frequency
        });
        writeInput();

        
    };

    function getInput(){
        trainName = $('#train-name').val().trim();
        destination = $('#train-destination').val().trim();
        trainFirst = $('#train-first').val().trim();
        frequency = $('#train-freq').val().trim();
        if(trainName !== '' && destination !== '' && trainFirst !== '' && frequency !== '' ){
            
            writeTrainData(trainId, trainName, destination, trainFirst, frequency);
            

        }
        
        else{
            alert("Please fill all boxes");
        }


    }

    database.ref('train/' + trainId).on('value', function(snapshot){
        currentTrain = snapshot.val().key();   
    });

    function writeInput(){
        var $tr = $('<tr>')
        var trainNameTag = $('<td>').attr('scope', 'col').text(currentTrain.trainName);
        var trainDestination = $('<td>').attr('scope', 'col').text(currentTrain.destination);
        var trainFrequency = $('<td>').attr('scope', 'col').text(currentTrain.frequency);
        var trainNextArrival = $('<td>').attr('scope', 'col')
        var trainMinutesAway = $('<td>').attr('scope', 'col')
        $tr.append(trainNameTag, trainDestination, trainFrequency, trainNextArrival, trainMinutesAway);
        $("#train-display").append($tr);
        trainId++;

    }

    $('#submit-train').on('click', function(event){
        event.preventDefault();
        getInput()
        $('#train-name').val('')
        $('#train-destination').val('')
        $('#train-first').val('')
        $('#train-freq').val('')
    })
})
