
$("#form_login").submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: "POST",
        url: "./auth.php",
        data: {login: $("#login").val(), password: $("#password").val(), submit: 'login'}
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
                console.log(mess);
                $("#message").val('');
            });

});

let lastMessageTime = 0;
checkMessage(lastMessageTime);
setInterval(checkMessage, 5000, lastMessageTime);

function checkMessage(lastMessageTime) {
    $.ajax({
        method: "POST",
        url: "./messages.php",
        data: {lastMessage: lastMessageTime, timeNow: Date.now(), submit: 'check'}
    })
            .done(function (mess) {
                console.log(mess);
                let messages = JSON.parse(mess);
                messages.forEach(message => {
                    lastMessageTime = writeMessage(message);
                    
                });
            });;
}



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


//
//        $(document).one("ajaxSuccess",function(){



