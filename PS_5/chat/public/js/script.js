const TIME_UPDATE = 1000;
const TIME_DELETE_MESSAGE = 5000;
$('.container').on('submit', '#form_login', login);
$('.container').on('submit', '#form_chat', sendMessage);
$('.container').on('click', '#logout', logout);

checkMessage();
setInterval(checkMessage, TIME_UPDATE);

function login() {
    event.preventDefault();
    $.ajax({    
        method: 'POST',
        url: '../php/auth.php',
        data: {login: $('#login').val(), password: $('#password').val(), submit: 'login'}
    })
            .done(result => {
                const res = JSON.parse(result);
                if (res.login) {
                    $('#form').html(res.login);
                    temporaryMessageToUser('h1', res.message['auth'], 'mess', 'welcome');
                } else {
                    if (res.message['login']) {
                        temporaryMessageToUser('#login', res.message['login'], 'error');
                    }
                    if (res.message['password']) {
                        temporaryMessageToUser('#password', res.message['password'], 'error');
                    }
                }
            });
}

function sendMessage() {
    event.preventDefault();
    let time = Date.now();
    if (!$("#message").val()) {
        temporaryMessageToUser();
        return;
    }
    $.ajax({
        method: 'POST',
        url: '../php/messages.php',
        data: {message: $('#message').val(), time: time, submit: 'send'}
    })
            .done(mess => {
                $('#message').val('');
                checkMessage();
                temporaryMessageToUser('#form_chat', JSON.parse(mess), 'mess');
            });

}

function logout() {
    $.ajax({
        method: 'POST',
        url: '../php/auth.php',
        data: {logout: true}
    })
            .done(json => {
                const data = JSON.parse(json);
                $('#form').html(data.form);
                temporaryMessageToUser('h1', data.message, 'mess', 'bye');
            });
}

function checkMessage() {
    let lastMessageTime = $('.chat-container').attr('lastTimeMassage');
    $.ajax({
        method: 'POST',
        url: '../php/messages.php',
        data: {lastMessage: lastMessageTime, timeNow: Date.now(), submit: 'check'}
    })
            .done(mess => {
                let messages = JSON.parse(mess);
                messages.forEach(message => {
                    lastMessageTime = writeMessage(message);
                });
                $('.chat-container').attr('lastTimeMassage', lastMessageTime);
            });
}
function temporaryMessageToUser(place, message, styleClass, dopStyleClass = '') {

    $(`${place} ~ .${styleClass}`).remove();
    $(`${place}`).after(`<p class="${styleClass} ${dopStyleClass}">${message}</p>`);
    
    setTimeout(() => {
        $(`.${styleClass}`).remove();
    }, TIME_DELETE_MESSAGE);
}

function writeMessage(dataMessage) {
    const date = new Date(+dataMessage.time);
    const time = formatTime(date);
    const text = replaceSmile(dataMessage.message);
    const message = `<p class="message">${time} <span>${dataMessage.user}: </span>${text}</p>`;
    $('.chat-container').append(message);
    $('.chat').scrollTop($('.chat-container .message').last()[0].offsetTop);
    return date.getTime();
}

function formatTime(date) {
    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return `[${hour}:${minute}:${seconds}]`;
}

function replaceSmile(text){
    text = text.replace(':)', '<img src="./smile/positiv.png">');
    text = text.replace(':(', '<img src="./smile/negative.png">');
    return text;
}



