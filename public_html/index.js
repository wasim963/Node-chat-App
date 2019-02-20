const socket = io();

$(function () {
    let msgBox = $('#msgBox');
    let list = $('#messageList');
    let btn = $('#send');
    let sbmtBtn = $('#sbmtBtn');
    let nameBox = $('#userName');
    let loginDiv = $('#login-div');
    let chatDiv = $('#chat-div');

    let user = '';

    socket.on('recv_msg', function (data) {
        list.append("<li>" + data.username + ':' + data.message + "</li>")
    });

    btn.click(function () {
        let msg = msgBox.val();
        socket.emit('send_msg', {username: user, message: msg})
    });


    sbmtBtn.click(function () {
        user = nameBox.val();
        //Hide the login div
        loginDiv.hide();
        //Show the message div
        chatDiv.show();

        socket.emit('login', {user: user})

    })
});
