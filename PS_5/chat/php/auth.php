<?php

define('FILE_NAME', '../data_base/users.json');
session_start();

if (isset($_POST['submit'])) {

    $data = validation();
    if (isset($data['message'])) {
        echo json_encode(['message' => $data['message']]);
        return;
    }

    $resultLogin = authentication($data);

    if (!$resultLogin['auth']) {
        echo json_encode(['message' => $resultLogin['message']]);
        return;
    }

    $_SESSION['user'] = $data['login'];
    echo json_encode(['login' => file_get_contents('../public/templates/chat.html'), 'message' => $resultLogin['message']]);
}

if (isset($_POST['logout'])) {
    $login = $_SESSION['user'];
    unset($_SESSION['user']);
    echo json_encode(['form' => file_get_contents("../public/templates/login.html"), 'message' => "Good bye $login"]);
}

function validation() {
    $result = [];

    foreach ($_POST as $key => $value) {
        if (!($key == 'login' || $key == 'password')) {
            continue;
        }

        if (empty($_POST[$key])) {
            $result['message'][$key] = "Field $key empty!";
            continue;
        }
        $value = strval($_POST[$key]);

        if ($key == 'login') {
            $value = strip_tags($value);
        }

        if (strlen($value) < 4) {
            $result['message'][$key] = "$key short";
            continue;
        }
        if (strlen($value) > 25) {
            $result['message'][$key] = "$key long";
            continue;
        }

        $result[$key] = $value;
    }
    return $result;
}

function authentication($data) {
    $login = $data['login'];
    $handle = fopen(FILE_NAME, 'r+');
    $filesize = filesize(FILE_NAME);
    $users = [];

    if ($filesize) {
        $users = json_decode(fread($handle, $filesize), TRUE);
    }

    if (!empty($users) && array_key_exists($login, $users)) {
        $passwordDB = $users[$login];
        if ($passwordDB == $data['password']) {
            return ['auth' => TRUE, 'message' => array('auth' => "Login success. Hello $login")];
        }
        return ['auth' => FALSE, 'message' => array('password' => 'Password wrong')];
    }
    
    $users[$login] = $data['password'];
    rewind($handle);
    fwrite($handle, json_encode($users));
    return ['auth' => TRUE, 'message' => array('auth' => "Register success. Hi $login")];
}
