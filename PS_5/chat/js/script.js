
$("#form_login").submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: "POST",
        url: "./auth.php",
        data: {login: $("#login").val(), password: $("#password").val(), submit: 'login'}
    })
            .done(result => {
                console.log(result);
                const res = JSON.parse(result);
                console.log(res);
                if(res.message){
                    if(res.message['login']){
                        $("#login").after(`<p class="error">${res.message['login']}</p>`);
                        setTimeout( () => {$("#login + .error").remove();},3000);
                    }
                    if(res.message['password']){
                         $("#password").after(`<p class="error">${res.message['password']}</p>`);
                          setTimeout( () => {$("#password + .error").remove();},3000);
                    }
                } else {
                    console.log(2);
//                $("#form").html(res.login);
                }
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
            .done(mess => {
                console.log(mess);
                $("#message").val('');
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
            .done(mess => {
                console.log(mess);
                $("#message").val('');
                checkMessage();
            });

});

$('#logout').click(()=>{
    $.ajax({
        method: "POST",
        url: "./auth.php",
        data: {logout: true}
    })
            .done(form => {
                $("#form").html(form);
            }); 
});

checkMessage();
setInterval(checkMessage, 5000);


function checkMessage() {
 let lastMessageTime =  $('.chat-container').attr("lastTimeMassage");
    $.ajax({
        method: "POST",
        url: "./messages.php",
        data: {lastMessage: lastMessageTime, timeNow: Date.now(), submit: 'check'}
    })
            .done(mess => {
                let messages = JSON.parse(mess);
                messages.forEach(message => {
                    lastMessageTime = writeMessage(message);

                });
                $('.chat-container').attr("lastTimeMassage", lastMessageTime);
            });
};

function writeMessage(obj) {
    const date = new Date(+obj.time);
    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    const time = `[${hour}:${minute}:${seconds}]`;
    const user = obj.user;
    const text = obj.message;
    const message = `<p class="message">${time} <span>${user}: </span>${text}</p>`;
    $('.chat-container').append(message);
    return date.getTime();
}



