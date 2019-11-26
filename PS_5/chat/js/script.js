



$("#form_login").submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: "POST",
        url: "./auth.php",
        data: {login: $("#login").val(), password: $("#password").val(), submit:'login'}
    })
            .done(function (form) {
                $("#form").html(form);
            });


});
