<?php

define('FILENAME', 'data_base/users.json');
session_start();

if (!empty($_POST) && !empty($_POST['submit'])) {

    $data = validation();
    if (isset($data['message'])) {
        echo json_encode(['message' => $data['message']]);
    }
    else {
        $resultLogin = authentication($data);

        if ($resultLogin['auth']) {
            $_SESSION['user'] = $data['login'];
            echo json_encode(['login' => file_get_contents('templates/chat.html'), 'message' => $resultLogin['message']]);
        }
        else {
            echo json_encode(['message' => $resultLogin['message']]);
        }
    }
}

if (!empty($_POST) && !empty($_POST['logout'])) {
    $login = $_SESSION['user'];
    unset($_SESSION['user']);
    echo json_encode(['form' => file_get_contents("templates/login.html"), 'message' => "Good bye $login"]);
}

function validation() {
    $result = [];

    foreach ($_POST as $key => $value) {
        if (!($key == 'login' || $key == 'password')) {
            continue;
        }

        if (!empty($_POST[$key])) {
            $value = strval($_POST[$key]);

            if (strlen($value) < 4) {
                $result['message'][$key] = "$key short";
            }
            else if (strlen($value) > 25) {
                $result['message'][$key] = "$key long";
            }
            else {
                $result[$key] = $value;
            }
        }
        else {
            $result['message'][$key] = "Field $key empty!";
        }
    }
    return $result;
}

function authentication($data) {
    $login = $data['login'];
    $handle = fopen(FILENAME, 'r+');
    $filesize = filesize(FILENAME);
    $users = [];

    if ($filesize) {
        $users = json_decode(fread($handle, $filesize), TRUE);
    }

    if (!empty($users) && array_key_exists($login, $users)) {
        $passwordDB = $users[$login];
        if ($passwordDB == $data['password']) {
            $result = ['auth' => TRUE, 'message' => array('auth' => "Login success. Hello $login")];
        }
        else {
            $result = ['auth' => FALSE, 'message' => array('password' => 'Password wrong')];
        }
    }
    else {
        $users[$login] = $data['password'];
        rewind($handle);
        fwrite($handle, json_encode($users));
        $result = ['auth' => TRUE, 'message' => array('auth' => "Register success. Hi $login")];
    }
    fclose($handle);
    return $result;
}
