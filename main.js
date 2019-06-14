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

    var database = firebase.database();


    $('#submit-train').on('click', function(event){
        event.preventDefault();
        
        var trainName = $('#train-name').val().trim();
        var destination = $('#train-destination').val().trim();
        var trainFirst = moment($('#train-first').val().trim(), "HH:mm").subtract(10, 'years').format("X");
        var frequency = $('#train-freq').val().trim();

        var newTrain = {
            name : trainName,
            destination : destination,
            firstTrain : trainFirst,
            frequency : frequency
        }

        database.ref().push(newTrain)

        $('#train-name').val('');
        $('#train-destination').val('');
        $('#train-first').val('');
        $('#train-freq').val('');

        return false;

    })

    database.ref().on('child_added', function(snap){
        var trainName = snap.val().name;
        var destination = snap.val().destination;
        var frequency = snap.val().frequency;
        var trainFirst = snap.val().firstTrain
        
        var remainder = moment().diff(moment.unix(trainFirst), 'minutes')%frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, 'm').format('hh:mm A');
        console.log(remainder)
        console.log(minutes);
        console.log(arrival);
        $('#tbody').append('<tr><td>'+trainName+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+'</td></tr>');
    })


    
})
    