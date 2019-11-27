
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

$("#form_chat").submit(function (event) {
    event.preventDefault();
    let time = Date.now();
    $.ajax({
        method: "POST",
        url: "./messages.php",
        data: {message: $("#message").val(), time: time, submit: 'send'}
    })
            .done(function (mess) {
                alert(mess);
            });
});
function checkMessage(){

    $.ajax({
        method: "POST",
        url: "./messages.php",
        data: {lastMessage: $("#message").val(), submit: 'check'}
    })
            .done(function (mess) {
                alert(mess);
            });

};
checkMessage();

setInterval(checkMessage, 5000);
//
//        $(document).one("ajaxSuccess",function(){



