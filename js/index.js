$(document).ready(function() {
    function create(argument) {
        $(".errorMsg").hide();
    }


    $("form").on("submit", function(event) {
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
        $.each($('#myform').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });


        if (username || mobile || email || password != "") {
            $.ajax({
                url: "https://quiet-chamber-25164.herokuapp.com/api/users",
                type: 'post',
                dataType: 'json',
                data: values,
                success: function(data) {

                    $("#myform").hide();
                    var dive = "<div class='container22' id='newDiv1'><h3 style='color:green'> Registration Successful </h3><h4><a href='https://www.dropbox.com/s/9l9ppfxuqu166uz/android-debug.apk?dl=0' class='link'>click here</a> to download <em style='color:#8c43ab'>Happie App </em> Apk</h4></div>";
                    $('.header').text('Download');
                    $('.login').append(dive);


                },
                error: function(argument) {

                    $(".errorMsg").show();
                    $(".error").text('Registration UnSuccessful');
                    setTimeout(function() {
                        $('.errorMsg').hide();
                    }, 4000);
                }
            });
        } else {
            $(".errorMsg").show();
            $(".error").text('please fill the details ..');
            setTimeout(function() {
                $('.errorMsg').hide();
            }, 4000);

        }

    });
});
