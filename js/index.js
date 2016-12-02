$(document).ready(function() {
    // function create(argument) {
    //     $(".errorMsg").hide();       
    // };
    function updateInvitedEvents(evntDetails, userId) {
        var invits = evntDetails.invitees;
        invits.push(userId);
        var eventListModelUrl = "https://quiet-chamber-25164.herokuapp.com/api/events/" + evntDetails.id;
        $.ajax({
            url: eventListModelUrl,
            type: 'put',
            dataType: 'json',
            data: { "invitees": invits },
            success: function(data) {
                $.hideLoading();
                var dive = "<div class='container22' id='newDiv1'><h3 style='color:green'> Registration Successful </h3><h4><a href='https://www.dropbox.com/s/9l9ppfxuqu166uz/android-debug.apk?dl=0' class='link'>click here</a> to download <em style='color:#8c43ab'>Happie App </em> Apk and login with your registration details.</h4></div>";
                $('.header').text('Download');
                $('.login').append(dive);

            },
            error: function(data) {
                $.hideLoading();
            }

        });
    }

    function getUserInvitedEvent(userId) {
        // var eventId = "584147c1a6944404004ce82f";
        var myCurrentUrl = decodeURIComponent(window.location.href);
        var getIDIndex = myCurrentUrl.indexOf("{");
        var getId = myCurrentUrl.substr(getIDIndex, myCurrentUrl.length);
        var eventId = JSON.parse(getId).id;
        // var invitees =decodeURIComponent(qwe);
        // var invitieObject = { "invitees": $.merge( [userId]) };
        var eventListModelUrl = "https://quiet-chamber-25164.herokuapp.com/api/events/" + eventId;
        $.ajax({
            url: eventListModelUrl,
            type: 'get',
            dataType: 'json',

            success: function(data) {

                updateInvitedEvents(data, userId);
            },
            error: function(argument) {
                console.log("error");
            }

        });
    };



    $("form").on("submit", function(event) {
        $.showLoading();
        event.preventDefault();
        var username = $('#username').val().toLowerCase().trim();
        var password = $('#password').val().toLowerCase().trim();
        var mobile = $('#mobile').val().trim();
        var email = $('#email').val().toLowerCase().trim();

        var values = {

            "username": username,
            "password": password,
            "mobile": mobile,
            "displayName": username,
            "email": email,
            "mobileDataStatus": "on",
            "profilePicture": "./assets/images/emptyImage.png",
            "playerId": ""

        };


        if (username || mobile || email || password != "") {
            $.ajax({
                url: "https://quiet-chamber-25164.herokuapp.com/api/users",
                type: 'post',
                dataType: 'json',
                data: values,
                success: function(data) {
                    $("#myform").hide();

                    getUserInvitedEvent(data.id);




                },
                error: function(argument) {
                    $.hideLoading();
                    $(".errorMsg").show();
                    $(".error").text('Registration UnSuccessful');
                    setTimeout(function() {
                        $('.errorMsg').hide();
                    }, 4000);
                }
            });
        } else {
            $.hideLoading();
            $(".errorMsg").show();

            $(".error").text('please fill the details ..');
            setTimeout(function() {
                $('.errorMsg').hide();
            }, 4000);
            // debugger;

        }

    });
});
