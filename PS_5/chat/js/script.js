
$(".container").on("submit", "#form_login", login);
$(".container").on("submit", "#form_chat", sendMessage);
$(".container").on("click", "#logout", logout);

checkMessage();
setInterval(checkMessage, 5000);

function login() {
    event.preventDefault();
    $.ajax({
        method: "POST",
        url: "./auth.php",
        data: {login: $("#login").val(), password: $("#password").val(), submit: 'login'}
    })
            .done(result => {
                const res = JSON.parse(result);
                if (res.login) {
                    $("#form").html(res.login);
                    temporaryMessageToUser("h1", res.message['auth'], 'mess', 'welcome');
                } else {
                    if (res.message['login']) {
                        temporaryMessageToUser("#login", res.message['login'], "error");
                    }
                    if (res.message['password']) {
                        temporaryMessageToUser("#password", res.message['password'], "error");
                    }
                }
            });
}

function sendMessage() {
    event.preventDefault();
    let time = Date.now();
    $.ajax({
        method: "POST",
        url: "./messages.php",
        data: {message: $("#message").val(), time: time, submit: 'send'}
    })
            .done(mess => {
                $("#message").val('');
                checkMessage();
                temporaryMessageToUser("#form_chat", JSON.parse(mess), 'mess');
            });

}

function logout() {
    $.ajax({
        method: "POST",
        url: "./auth.php",
        data: {logout: true}
    })
            .done(json => {
                const data = JSON.parse(json);
                $("#form").html(data.form);
                temporaryMessageToUser("h1", data.message, "mess", "bye");
            });
}

function checkMessage() {
    let lastMessageTime = $('.chat-container').attr("lastTimeMassage");
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
}
function temporaryMessageToUser(place, message, styleClass, dopStyleClass = '') {
    $(`${place}`).after(`<p class="${styleClass} ${dopStyleClass}">${message}</p>`);
    setTimeout(() => {
        $(`.${styleClass}`).remove();
    }, 3000);
}

function writeMessage(obj) {
    const date = new Date(+obj.time);
    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    const time = `[${hour}:${minute}:${seconds}]`;
    let text = obj.message.replace(':)','<img src="./smile/positiv.png">');
    text = text.replace(':(','<img src="./smile/negative.png">');
    const message = `<p class="message">${time} <span>${obj.user}: </span>${text}</p>`;
    $('.chat-container').append(message);
    return date.getTime();
}



